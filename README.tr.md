# Yaşam ilerlemesi · life-progress

Yaşam ilerleme çubuğunuzu hep göz önünde tutan bir tarayıcı uzantısı (yeni sekme sayfası / araç çubuğu açılır penceresi).

Varsayılan yapılandırma: doğum tarihi **1980-02-20** · beklenen ömür **30.000 gün** (≈ 82,1 yıl · 2062-04-10'a kadar) — sayfanın sağ üst köşesindeki **⚙** ile dilediğiniz zaman değiştirin.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · **Türkçe** · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Tarayıcı uzantısı (Edge / Chrome ve diğer Chromium tabanlılar · v1.3.2)

Kod `extension/` klasöründedir ve üç giriş noktası vardır:

| Giriş noktası | Notlar |
|---|---|
| Yeni sekme | Tam sayfa ilerleme çubuğu + arama kutusu. **Vivaldi'de çalışmaz**: Vivaldi, uzantıların yeni sekmeyi devralmasına izin vermez (kendi başlangıç sayfasını kullanır) |
| Araç çubuğu açılır penceresi | Araç çubuğu simgesine tıklayın, ilerlemeyi görürsünüz — her tarayıcıda çalışır (Vivaldi kullanıcıları: bunu kullanın) |
| Klavye kısayolu | `Alt+Shift+L` açılır pencereyi açar (Uzantılar → Klavye kısayolları bölümünden değiştirilebilir) |

Kurulum: `edge://extensions` adresini açın (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
**Geliştirici modu**nu etkinleştirin → **Paketlenmemiş uzantıyı yükle** → `extension/` klasörünü seçin.
**Kodu güncelledikten sonra aynı sayfada "Yeniden yükle"ye tıklayın** (manifest değişiklikleri her zaman yeniden yükleme gerektirir) ve simgeyi araç çubuğuna sabitleyin.

- Ayarları değiştirme: sayfanın sağ üst köşesindeki **⚙** — doğum tarihi / beklenen ömür, anında uygulanır ve yeni sekme ile açılır pencere tarafından paylaşılır (`chrome.storage` içinde saklanır, aynı hesaba giriş yapan cihazlar arasında eşitlenir); fabrika varsayılanları `extension/life-core.js` dosyasının başındadır
- Arama kutusu: tarayıcının varsayılan arama motoruyla arar (`chrome.search`); API kullanılamıyorsa (örn. sayfa sıradan bir dosya olarak açıldığında) form Bing'e geri döner — bu yedeği `extension/newtab.html` içindeki `<form>`'un `action`'ı ve `<input>`'un `name`'i üzerinden değiştirin
- Açık ve koyu temalar sistemi otomatik olarak izler
- Diller: `extension/_locales/` içindeki 19 dil tarayıcı dilini izler (eşleşme yoksa İngilizceye düşer); dil eklemek = klasör eklemek; sayı biçimi tarayıcının bölge ayarını izler; RTL dilleri (örn. Arapça) düzeni otomatik aynalar
- Simgeleri yeniden oluşturma: `python3 tools/make_icons.py` (mavi yuvarlatılmış kare + %57 beyaz ilerleme çubuğu, çıktı `extension/icons/`)

## Proje yapısı

```
life-progress/
├── extension/           # uzantının kendisi ("Paketlenmemiş uzantıyı yükle" için bu klasörü seçin)
│   ├── manifest.json    # MV3 manifesti (storage izni, klavye kısayolu)
│   ├── newtab.html/js   # yeni sekme: tam sayfa çubuk + arama
│   ├── popup.html/js    # araç çubuğu açılır penceresi: kompakt çubuk
│   ├── life-core.js     # tek mantık kaynağı: varsayılan yapılandırma + hesaplama + chrome.storage okuma/yazma
│   ├── i18n.js          # msg() giriş noktası + statik metin değişimi + RTL yönü
│   ├── settings.js      # ⚙ ayar paneli (iki sayfa tarafından paylaşılır, enjekte edilir)
│   ├── _locales/        # 19 dil paketi; tarayıcı dilini izler, varsayılan en
│   └── icons/           # tüm boyutlarda simgeler (tools/make_icons.py üretir)
└── tools/
    └── make_icons.py    # simge üreteci (yalnızca standart kütüphane; PCT/BG'yi değiştirip yeniden çalıştırın)
```

## Lisans

[MIT](LICENSE) © 2026 Li Ruibo
