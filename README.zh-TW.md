# 人生進度 · life-progress

瀏覽器擴充功能（新分頁 / 工具列彈出視窗），隨時查看人生進度條。

預設配置：生日 **1980-02-20** · 預期壽命 **30000 天**（≈82.1 歲 · 到期 2062-04-10）——頁面上點右上角 **⚙** 隨時修改。

[English](README.md) · [简体中文](README.zh-CN.md) · **繁體中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## 瀏覽器擴充功能（Edge / Chrome 等 Chromium 核心 · v1.3.2）

檔案在 `extension/`，含三個入口：

| 入口 | 說明 |
|---|---|
| 新分頁 | 整頁進度條 + 搜尋框。**Vivaldi 不生效**：Vivaldi 不允許擴充功能接管新分頁（使用自家起始頁），屬瀏覽器行為 |
| 工具列彈出視窗 | 點擴充功能圖示直接彈出進度，所有瀏覽器皆可用（Vivaldi 請用這個） |
| 快捷鍵 | `Alt+Shift+L` 直接呼出彈出視窗（可在 擴充功能管理 → 鍵盤快捷鍵 修改） |

安裝：`edge://extensions`（Chrome 為 `chrome://extensions`，Vivaldi 為 `vivaldi://extensions`）→
開啟「開發人員模式」→「載入解壓縮的擴充功能」→ 選 `extension/` 資料夾。
**更新程式碼後需在該頁點「重新載入」**（manifest 變更必須重載），並將圖示固定到工具列。

- 修改配置：頁面右上角 **⚙** 直接改出生日期 / 預期壽命，儲存即生效，新分頁與彈出視窗共用（存 `chrome.storage`，登入同一帳號跨裝置同步）；出廠預設值在 `extension/life-core.js` 頂部
- 搜尋框：走瀏覽器預設搜尋引擎（`chrome.search`）；API 無法使用時（如直接以檔案開啟）回退 Bing 表單提交——改回退引擎就改 `extension/newtab.html` 中 `<form>` 的 `action` 與 `<input>` 的 `name`
- 明暗兩套配色跟隨系統自動切換
- 多語言：`extension/_locales/` 共 19 種語言，跟隨瀏覽器語言自動切換（無匹配時回退英文）；新增語言 = 新增一個目錄；數字格式隨瀏覽器地區；RTL 語言（如阿拉伯文）自動鏡像版面
- 重新產生圖示：`python3 tools/make_icons.py`（藍底圓角方塊 + 57% 白色進度條，輸出到 `extension/icons/`）

## 專案結構

```
life-progress/
├── extension/           # 擴充功能本體（「載入解壓縮的擴充功能」選這個資料夾）
│   ├── manifest.json    # MV3 資訊清單（含 storage 權限、快捷鍵）
│   ├── newtab.html/js   # 新分頁：整頁進度條 + 搜尋框
│   ├── popup.html/js    # 工具列彈出視窗：緊湊版進度條
│   ├── life-core.js     # 唯一邏輯處：預設配置 + 計算 + chrome.storage 讀寫
│   ├── i18n.js          # 文案入口 msg() + 靜態文字替換 + RTL 方向
│   ├── settings.js      # ⚙ 設定面板（兩個頁面共用，注入式）
│   ├── _locales/        # 19 個語言包，跟隨瀏覽器語言，未匹配回退 en
│   └── icons/           # 各尺寸圖示（由 tools/make_icons.py 產生）
└── tools/
    └── make_icons.py    # 圖示產生腳本（純標準庫，可改 PCT/BG 後重跑）
```

## 授權條款

[MIT](LICENSE) © 2026 Li Ruibo
