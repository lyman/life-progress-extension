# 人生进度 · life-progress

浏览器扩展（新标签页 / 工具栏弹窗），随时查看人生进度条。

默认配置：生日 **1980-02-20** · 预期寿命 **30000 天**（≈82.1 岁 · 到期 2062-04-10）——页面上点右上角 **⚙** 随时改。

[English](README.md) · **简体中文** · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## 浏览器扩展（Edge / Chrome 等 Chromium 内核 · v1.3.4）

文件在 `extension/`，含三个入口：

| 入口 | 说明 |
|---|---|
| 新标签页 | 整页进度条 + 搜索框。**Vivaldi 不生效**：Vivaldi 不允许扩展接管新标签页（用自家起始页），属浏览器行为 |
| 工具栏弹窗 | 点扩展图标直接弹出进度，全浏览器可用（Vivaldi 用这个） |
| 快捷键 | `Alt+Shift+L` 直接呼出弹窗（可在 扩展管理 → 键盘快捷键 改） |

安装：`edge://extensions`（Chrome 为 `chrome://extensions`，Vivaldi 为 `vivaldi://extensions`）→
打开「开发人员模式」→「加载解压缩的扩展」→ 选 `extension/` 文件夹。
**更新代码后需在该页点「重新加载」**（manifest 变更必须重载），并把图标固定到工具栏。

- 改配置：页面右上角 **⚙** 直接改出生日期 / 预期寿命，保存即生效，新标签页和弹窗共用（存 `chrome.storage`，登录同一账号跨设备同步）；出厂默认值在 `extension/life-core.js` 顶部
- 搜索框：走浏览器默认搜索引擎（`chrome.search`）；API 不可用时（如直接以文件打开）回退 Bing 表单提交——改回退引擎就改 `extension/newtab.html` 中 `<form>` 的 `action` 和 `<input>` 的 `name`
- 明暗两套配色跟随系统自动切换
- 多语言：`extension/_locales/` 共 19 种语言，跟随浏览器语言自动切换（无匹配回退英文）；加语言 = 加一个目录；数字格式随浏览器区域；RTL 语言（如阿拉伯语）自动镜像布局
- 重新生成图标：`python3 tools/make_icons.py`（蓝底圆角方块 + 57% 白色进度条，输出到 `extension/icons/`）

## 项目结构

```
life-progress/
├── extension/           # 扩展本体（「加载解压缩的扩展」选这个文件夹）
│   ├── manifest.json    # MV3 清单（含 storage 权限、快捷键）
│   ├── newtab.html/js   # 新标签页：整页进度条 + 搜索框
│   ├── popup.html/js    # 工具栏弹窗：紧凑版进度条
│   ├── life-core.js     # 唯一逻辑处：默认配置 + 计算 + chrome.storage 读写
│   ├── i18n.js          # 文案入口 msg() + 静态文本替换 + RTL 方向
│   ├── settings.js      # ⚙ 设置面板（两个页面共用，注入式）
│   ├── _locales/        # 19 个语言包，跟随浏览器语言，未匹配回退 en
│   └── icons/           # 各尺寸图标（由 tools/make_icons.py 生成）
└── tools/
    └── make_icons.py    # 图标生成脚本（纯标准库，可改 PCT/BG 后重跑）
```

## 许可证

[MIT](LICENSE) © 2026 Li Ruibo
