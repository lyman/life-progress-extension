// 多语言：文案在 _locales/*/messages.json，Chrome 按浏览器语言自动选择，无匹配时回退 default_locale（en）
function msg(name, subs) {
  const s = typeof chrome !== 'undefined' && chrome.i18n ? chrome.i18n.getMessage(name, subs) : '';
  return s || name; // 缺 key 时直接显示 key，便于发现漏译
}

// 静态文案替换：HTML 里标 data-i18n="key"（文本）/ data-i18n-placeholder="key"（占位符），标签里保留中文作兜底
if (typeof chrome !== 'undefined' && chrome.i18n) {
  const uiLang = chrome.i18n.getUILanguage();
  document.documentElement.lang = uiLang;
  // RTL 语言（ar 等）自动镜像布局
  document.documentElement.dir = new Intl.Locale(uiLang).getTextInfo?.().direction === 'rtl' ? 'rtl' : 'ltr';
}
document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = msg(el.dataset.i18n); });
document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = msg(el.dataset.i18nPlaceholder); });
