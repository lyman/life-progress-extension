# Lebensfortschritt · life-progress

Eine Browser-Erweiterung (Neuer-Tab-Seite / Toolbar-Popup), die deinen Lebensfortschrittsbalken immer im Blick behält.

Standardkonfiguration: Geburtstag **1980-02-20** · Lebenserwartung **30.000 Tage** (≈ 82,1 Jahre · bis 2062-04-10) — jederzeit änderbar über das **⚙** oben rechts auf der Seite.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Browser-Erweiterung (Edge / Chrome und andere Chromium-Browser · v1.3.4)

Der Code liegt in `extension/` und hat drei Einstiegspunkte:

| Einstiegspunkt | Hinweise |
|---|---|
| Neuer Tab | Ganzseitiger Fortschrittsbalken + Suchfeld. **Funktioniert nicht in Vivaldi**: Vivaldi erlaubt Erweiterungen nicht, den neuen Tab zu übernehmen (nutzt eine eigene Startseite) |
| Toolbar-Popup | Klick auf das Toolbar-Symbol zeigt den Fortschritt — in jedem Browser nutzbar (Vivaldi-Nutzer: dieses verwenden) |
| Tastenkürzel | `Alt+Shift+L` öffnet das Popup (änderbar unter Erweiterungen → Tastenkürzel) |

Installation: `edge://extensions` öffnen (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
**Entwicklermodus** aktivieren → **Entpackte Erweiterung laden** → den Ordner `extension/` auswählen.
**Nach Code-Änderungen auf derselben Seite „Neu laden" klicken** (Manifest-Änderungen erfordern immer ein Neuladen), dann das Symbol in der Toolbar anheften.

- Einstellungen ändern: **⚙** oben rechts auf der Seite — Geburtstag / Lebenserwartung, wird sofort angewendet und von neuem Tab und Popup gemeinsam genutzt (gespeichert in `chrome.storage`, synchronisiert zwischen Geräten mit demselben Konto); Werksdefaults stehen am Anfang von `extension/life-core.js`
- Suchfeld: sucht mit der Standardsuchmaschine des Browsers (`chrome.search`); ist die API nicht verfügbar (z. B. als einfache Datei geöffnet), fällt das Formular auf Bing zurück — diesen Rückfall änderst du über `action` des `<form>` und `name` des `<input>` in `extension/newtab.html`
- Hell- und Dunkelmodus folgen automatisch dem System
- Sprachen: 19 Sprachen in `extension/_locales/` folgen der Browsersprache (Rückfall auf Englisch); Sprache hinzufügen = Ordner hinzufügen; die Zahlenformatierung folgt der Browser-Region; RTL-Sprachen (z. B. Arabisch) spiegeln das Layout automatisch
- Icons neu erzeugen: `python3 tools/make_icons.py` (blaues abgerundetes Quadrat + weißer 57-%-Balken, Ausgabe in `extension/icons/`)

## Projektstruktur

```
life-progress/
├── extension/           # die Erweiterung selbst (bei „Entpackte Erweiterung laden" diesen Ordner wählen)
│   ├── manifest.json    # MV3-Manifest (storage-Berechtigung, Tastenkürzel)
│   ├── newtab.html/js   # neuer Tab: ganzseitiger Balken + Suchfeld
│   ├── popup.html/js    # Toolbar-Popup: kompakter Balken
│   ├── life-core.js     # einzige Logik-Quelle: Standardkonfiguration + Berechnung + chrome.storage-I/O
│   ├── i18n.js          # msg()-Einstieg + statischer Textersatz + RTL-Richtung
│   ├── settings.js      # ⚙ Einstellungspanel (von beiden Seiten genutzt, injiziert)
│   ├── _locales/        # 19 Sprachpakete; folgen der Browsersprache, Rückfall en
│   └── icons/           # Icons in allen Größen (erzeugt von tools/make_icons.py)
└── tools/
    └── make_icons.py    # Icon-Generator (nur Standardbibliothek; PCT/BG anpassen und neu ausführen)
```

## Lizenz

[MIT](LICENSE) © 2026 Li Ruibo
