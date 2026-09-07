// ===== 默认配置（页面上点 ⚙ 可随时覆盖，改这里只改「出厂默认」） =====
const DEFAULT_BIRTHDAY   = '1980-02-20';  // 出生日期
const DEFAULT_TOTAL_DAYS = 30000;         // 预期寿命（天）

// —— 配置存取：chrome.storage.sync（登录同一账号的浏览器自动同步） ——
const DEFAULTS  = { birthday: DEFAULT_BIRTHDAY, totalDays: DEFAULT_TOTAL_DAYS };
const storageApi = typeof chrome !== 'undefined' && chrome.storage ? chrome.storage : null;
const storage    = storageApi ? storageApi.sync : null;

function sanitize(c) {
  const birthday = /^\d{4}-\d{2}-\d{2}$/.test(c.birthday) && !isNaN(Date.parse(c.birthday))
    ? c.birthday : DEFAULT_BIRTHDAY;
  const n = Number(c.totalDays);
  return { birthday, totalDays: Number.isInteger(n) && n > 0 ? n : DEFAULT_TOTAL_DAYS };
}

let cfg = { ...DEFAULTS };
const ready = storage
  ? storage.get(DEFAULTS).then(stored => { cfg = sanitize(stored); }).catch(() => {})
  : Promise.resolve();

function getCfg() { return cfg; }

// 渲染入口：配置首次从 storage 读完后回调一次；之后每次配置变化（保存 / 重置 / 其他页面修改）再回调
function onLifeConfig(render) {
  ready.then(render);
  document.addEventListener('life-config-changed', render);
}

async function saveLifeConfig(patch) {
  cfg = sanitize({ ...cfg, ...patch });
  try { if (storage) await storage.set({ birthday: cfg.birthday, totalDays: cfg.totalDays }); } catch {} // 配额/未登录等写入失败时，本次会话内仍生效
  document.dispatchEvent(new CustomEvent('life-config-changed'));
}

// 其他上下文（新标签页 ↔ 弹窗）保存了新配置 → 跟着刷新
if (storageApi && storageApi.onChanged) storageApi.onChanged.addListener((changes, area) => {
  if (area !== 'sync' || !(changes.birthday || changes.totalDays)) return;
  cfg = sanitize({
    birthday:   changes.birthday  ? changes.birthday.newValue  : cfg.birthday,
    totalDays:  changes.totalDays ? changes.totalDays.newValue : cfg.totalDays,
  });
  document.dispatchEvent(new CustomEvent('life-config-changed'));
});

// —— 核心计算 ——
function calcLife(now = new Date()) {
  const { birthday, totalDays } = getCfg();
  const [y, m, d] = birthday.split('-').map(Number);
  // 用「民用日期的 UTC」做差，避免夏令时/时区导致差一天
  const lived = Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(y, m - 1, d)) / 86400000);
  const left  = totalDays - lived;
  return {
    lived, left,
    pct:   lived / totalDays * 100,
    age:   (lived / 365.25).toFixed(1),
    years: (left / 365.25).toFixed(1),
    end:   new Date(Date.UTC(y, m - 1, d) + totalDays * 86400000).toISOString().slice(0, 10),
  };
}
