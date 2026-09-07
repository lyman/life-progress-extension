# Levensvoortgang · life-progress

Een browserextensie (nieuw tabblad / pop-up in de werkbalk) die je levensvoortgangsbalk altijd in beeld houdt.

Standaardconfiguratie: geboortedatum **1980-02-20** · verwachte levensduur **30.000 dagen** (≈ 82,1 jaar · tot 2062-04-10) — wijzig op elk moment via het **⚙** rechtsboven op de pagina.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · **Nederlands** · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Browserextensie (Edge / Chrome en andere Chromium-browsers · v1.3.2)

De code staat in `extension/`, met drie toegangspunten:

| Toegangspunt | Toelichting |
|---|---|
| Nieuw tabblad | Voortgangsbalk over de hele pagina + zoekvak. **Werkt niet in Vivaldi**: Vivaldi staat extensies niet toe het nieuwe tabblad over te nemen (gebruikt een eigen startpagina) |
| Werkbalk-pop-up | Klik op het werkbalkpictogram om de voortgang te zien — werkt in elke browser (Vivaldi-gebruikers: gebruik deze) |
| Sneltoets | `Alt+Shift+L` opent de pop-up (aanpasbaar via Extensies → Sneltoetsen) |

Installatie: open `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
schakel **ontwikkelaarsmodus** in → **Uitgepakte extensie laden** → kies de map `extension/`.
**Klik na een code-update op die pagina op "Opnieuw laden"** (manifestwijzigingen vereisen altijd een herlaadbeurt) en zet het pictogram vast in de werkbalk.

- Instellingen wijzigen: **⚙** rechtsboven op de pagina — geboortedatum / verwachte levensduur, direct van toepassing en gedeeld door nieuw tabblad en pop-up (opgeslagen in `chrome.storage`, gesynchroniseerd tussen apparaten met hetzelfde account); de standaardwaarden staan bovenaan `extension/life-core.js`
- Zoekvak: zoekt met de standaardzoekmachine van de browser (`chrome.search`); is de API niet beschikbaar (bijv. bij openen als gewoon bestand), dan valt het formulier terug op Bing — wijzig deze terugval via het `action` van het `<form>` en het `name` van de `<input>` in `extension/newtab.html`
- Licht en donker thema volgen het systeem automatisch
- Talen: 19 talen in `extension/_locales/` volgen de browsertaal (bij geen match: Engels); een taal toevoegen = een map toevoegen; de notatie van getallen volgt de regio-instelling van de browser; RTL-talen (bijv. Arabisch) spiegelen de layout automatisch
- Pictogrammen opnieuw genereren: `python3 tools/make_icons.py` (blauw afgerond vierkant + witte balk van 57%, uitvoer in `extension/icons/`)

## Projectstructuur

```
life-progress/
├── extension/           # de extensie zelf (kies deze map bij "Uitgepakte extensie laden")
│   ├── manifest.json    # MV3-manifest (storage-machtiging, sneltoets)
│   ├── newtab.html/js   # nieuw tabblad: balk over de hele pagina + zoeken
│   ├── popup.html/js    # werkbalk-pop-up: compacte balk
│   ├── life-core.js     # enige bron van logica: standaardconfig + berekening + chrome.storage-lezen/schrijven
│   ├── i18n.js          # msg()-toegangspunt + statische tekstvervanging + RTL-richting
│   ├── settings.js      # ⚙ instellingenpaneel (gedeeld door beide pagina's, geïnjecteerd)
│   ├── _locales/        # 19 taalpakketten; volgen de browsertaal, terugval op en
│   └── icons/           # pictogrammen in alle maten (gegenereerd door tools/make_icons.py)
└── tools/
    └── make_icons.py    # pictogramgenerator (alleen standaardbibliotheek; pas PCT/BG aan en draai opnieuw)
```

## Licentie

[MIT](LICENSE) © 2026 Li Ruibo
