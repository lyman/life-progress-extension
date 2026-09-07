// 数据渲染：新标签页（配置和计算在 life-core.js，文案在 _locales，⚙ 设置面板在 settings.js）
function renderLife() {
  const r = calcLife();
  document.getElementById('pct').textContent = r.pct.toFixed(2);
  const meter = document.getElementById('meter');
  meter.setAttribute('aria-valuenow', r.pct.toFixed(1));
  meter.setAttribute('aria-label', msg('progressAria', [r.pct.toFixed(2)]));
  requestAnimationFrame(() => { document.getElementById('fill').style.width = r.pct + '%'; });
  document.getElementById('day').textContent    = msg('dayStat',    [r.lived.toLocaleString(), r.age]);
  document.getElementById('remain').textContent = msg('remainStat', [r.left.toLocaleString(), r.years, r.end]);
}
onLifeConfig(renderLife);

// 搜索走浏览器默认搜索引擎（chrome.search，需 manifest 的 search 权限）；
// API 不可用时（如直接以文件打开）走表单原生提交（Bing，见 newtab.html 里的回退配置）
const searchForm = document.querySelector('form.search');
searchForm.addEventListener('submit', e => {
  if (!(typeof chrome !== 'undefined' && chrome.search?.query)) return; // 无 API → 原生提交
  e.preventDefault();
  const q = searchForm.querySelector('input').value.trim();
  if (q) chrome.search.query({ text: q, disposition: 'CURRENT_TAB' }, () => void chrome.runtime.lastError);
});
