// ⚙ 设置面板：新标签页和弹窗共用，注入齿轮按钮 + 表单（配色沿用各页面的 CSS 变量）
(function () {
  const inPopup = location.pathname.endsWith('popup.html'); // 弹窗里表单占位固定、窗口太矮，改为占行内撑开

  const style = document.createElement('style');
  style.textContent = `
    .life-gear {
      position: fixed; top: 10px; right: 12px; z-index: 9;
      width: 30px; height: 30px; display: grid; place-items: center;
      border: none; border-radius: 8px; cursor: pointer;
      background: transparent; color: var(--text-muted);
      transition: color .15s;
    }
    .life-gear:hover, .life-gear[aria-expanded="true"] { color: var(--text-primary); }
    .life-panel {
      position: fixed; top: 44px; right: 12px; z-index: 9;
      width: 236px; padding: 14px; text-align: left;
      background: var(--surface); color: var(--text-primary);
      border: 1px solid color-mix(in srgb, var(--text-primary) 12%, transparent);
      border-radius: 12px;
      box-shadow: 0 8px 28px rgba(0, 0, 0, .18);
      font-size: 13px;
    }
    .life-panel[hidden] { display: none; }
    .life-panel label { display: block; margin-bottom: 4px; color: var(--text-secondary); }
    .life-panel input {
      width: 100%; padding: 6px 8px; margin-bottom: 10px;
      font: inherit; color: var(--text-primary); background: transparent;
      border: 1px solid color-mix(in srgb, var(--text-primary) 15%, transparent);
      border-radius: 8px; outline: none;
    }
    .life-panel input:focus { border-color: var(--accent); }
    .life-error { display: none; margin: -4px 0 8px; font-size: 12px; color: #d13438; }
    .life-error.show { display: block; }
    .life-row { display: flex; gap: 8px; justify-content: flex-end; }
    .life-panel button {
      padding: 5px 12px; font: inherit; cursor: pointer;
      border-radius: 8px;
      border: 1px solid color-mix(in srgb, var(--text-primary) 15%, transparent);
      background: transparent; color: var(--text-secondary);
    }
    .life-panel button[type="submit"] { background: var(--accent); border-color: var(--accent); color: #fff; }
    .in-popup .life-panel { position: static; width: auto; margin-top: 12px; box-shadow: none; }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = inPopup ? 'in-popup' : '';
  root.innerHTML = `
    <button class="life-gear" type="button" aria-label="${msg('settings')}" aria-expanded="false" title="${msg('settings')}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <form class="life-panel" hidden>
      <label for="life-birthday">${msg('birthday')}</label>
      <input id="life-birthday" type="date" required>
      <label for="life-days">${msg('totalDays')}</label>
      <input id="life-days" type="number" min="1" step="1" required>
      <p class="life-error">${msg('invalidInput')}</p>
      <div class="life-row">
        <button type="button" class="life-reset">${msg('reset')}</button>
        <button type="submit">${msg('save')}</button>
      </div>
    </form>`;
  document.body.appendChild(root);

  const gear    = root.querySelector('.life-gear');
  const panel   = root.querySelector('.life-panel');
  const err     = root.querySelector('.life-error');
  const birthday = root.querySelector('#life-birthday');
  const days     = root.querySelector('#life-days');

  function open() {
    const c = getCfg();
    birthday.value = c.birthday;
    days.value = c.totalDays;
    err.classList.remove('show');
    panel.hidden = false;
    gear.setAttribute('aria-expanded', 'true');
  }
  function close() {
    panel.hidden = true;
    gear.setAttribute('aria-expanded', 'false');
  }

  gear.addEventListener('click', () => panel.hidden ? open() : close());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });
  document.addEventListener('click', e => { if (!panel.hidden && !root.contains(e.target)) close(); });

  panel.addEventListener('submit', e => {
    e.preventDefault();
    const totalDays = Number(days.value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday.value) || !Number.isInteger(totalDays) || totalDays <= 0) {
      err.classList.add('show');
      return;
    }
    err.classList.remove('show');
    saveLifeConfig({ birthday: birthday.value, totalDays });
    close();
  });

  root.querySelector('.life-reset').addEventListener('click', () => {
    saveLifeConfig(DEFAULTS);
    close();
  });
})();
