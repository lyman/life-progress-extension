// 数据渲染：工具栏弹窗（配置和计算在 life-core.js，文案在 _locales，⚙ 设置面板在 settings.js）
function renderLife() {
  const r = calcLife();
  document.getElementById('label').textContent = msg('label', [getCfg().totalDays.toLocaleString()]);
  document.getElementById('pct').textContent = r.pct.toFixed(2);
  document.getElementById('meter').setAttribute('aria-valuenow', r.pct.toFixed(1));
  document.getElementById('fill').style.width = r.pct + '%';
  document.getElementById('day').textContent    = msg('dayStatShort',    [r.lived.toLocaleString(), r.age]);
  document.getElementById('remain').textContent = msg('remainStatShort', [r.left.toLocaleString(), r.years, r.end]);
}
onLifeConfig(renderLife);
