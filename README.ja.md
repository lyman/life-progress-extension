# 人生の進捗 · life-progress

新しいタブとツールバーポップアップで人生の進捗バーをいつでも確認できるブラウザ拡張機能。

デフォルト設定：生年月日 **1980-02-20** · 想定寿命 **30000 日**（≈82.1 歳 · 2062-04-10 まで）——ページ右上の **⚙** でいつでも変更できます。

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## ブラウザ拡張機能（Edge / Chrome などの Chromium 系 · v1.3.4）

コードは `extension/` にあり、3 つの入口があります：

| 入口 | 説明 |
|---|---|
| 新しいタブ | ページ全体の進捗バー + 検索ボックス。**Vivaldi では機能しません**：Vivaldi は拡張機能による新しいタブの乗っ取りを許可していません（独自のスタートページを使用） |
| ツールバーポップアップ | ツールバーのアイコンをクリックすると進捗が表示され、どのブラウザでも使えます（Vivaldi はこちらを） |
| キーボードショートカット | `Alt+Shift+L` でポップアップを開けます（拡張機能管理 → キーボードショートカット で変更可能） |

インストール：`edge://extensions`（Chrome は `chrome://extensions`、Vivaldi は `vivaldi://extensions`）→
「デベロッパーモード」を有効化 →「パックされていない拡張機能を読み込む」→ `extension/` フォルダを選択。
**コードを更新したら同ページで「再読み込み」をクリック**（manifest の変更には必須）、アイコンをツールバーに固定してください。

- 設定の変更：ページ右上の **⚙** で生年月日 / 想定寿命を変更、保存してすぐ反映。新しいタブとポップアップで共有（`chrome.storage` に保存、同じアカウントの端末間で同期）；出荷時のデフォルト値は `extension/life-core.js` の先頭にあります
- 検索ボックス：ブラウザのデフォルト検索エンジンで検索（`chrome.search`）。API が使えない場合（ファイルとして直接開いたときなど）は Bing へのフォーム送信にフォールバック — 予備エンジンを変えるには `extension/newtab.html` の `<form>` の `action` と `<input>` の `name` を編集
- ライト / ダークの 2 テーマがシステムに自動追従
- 多言語：`extension/_locales/` に 19 言語、ブラウザの言語に自動追従（一致しない場合は英語にフォールバック）；言語の追加 = フォルダを追加するだけ；数値の書式はブラウザの地域設定に従います；RTL 言語（アラビア語など）はレイアウトを自動ミラー
- アイコンの再生成：`python3 tools/make_icons.py`（青い角丸四角 + 白 57% の進捗バー、`extension/icons/` へ出力）

## プロジェクト構成

```
life-progress/
├── extension/           # 拡張機能本体（「パックされていない拡張機能を読み込む」でこのフォルダを選択）
│   ├── manifest.json    # MV3 マニフェスト（storage 権限、ショートカット）
│   ├── newtab.html/js   # 新しいタブ：ページ全体のバー + 検索ボックス
│   ├── popup.html/js    # ツールバーポップアップ：コンパクトなバー
│   ├── life-core.js     # ロジックはここだけ：デフォルト設定 + 計算 + chrome.storage 読み書き
│   ├── i18n.js          # 文言入口 msg() + 静的テキスト置換 + RTL 方向
│   ├── settings.js      # ⚙ 設定パネル（両ページで共用、注入式）
│   ├── _locales/        # 19 の言語パック。ブラウザ言語に追従、未対応は en にフォールバック
│   └── icons/           # 各サイズのアイコン（tools/make_icons.py が生成）
└── tools/
    └── make_icons.py    # アイコン生成スクリプト（標準ライブラリのみ。PCT/BG を変えて再実行）
```

## ライセンス

[MIT](LICENSE) © 2026 Li Ruibo
