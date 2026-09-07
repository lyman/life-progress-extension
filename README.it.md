# Progresso della vita · life-progress

Estensione del browser (pagina nuova scheda / popup della barra degli strumenti) che tiene sempre sott'occhio la barra di avanzamento della tua vita.

Configurazione predefinita: data di nascita **1980-02-20** · aspettativa di vita **30.000 giorni** (≈ 82,1 anni · fino al 2062-04-10) — modificabile in qualsiasi momento con la **⚙** in alto a destra nella pagina.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · **Italiano** · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Estensione del browser (Edge / Chrome e altri Chromium · v1.3.2)

Il codice si trova in `extension/`, con tre punti di ingresso:

| Punto di ingresso | Note |
|---|---|
| Nuova scheda | Barra di avanzamento a pagina intera + casella di ricerca. **Non funziona in Vivaldi**: Vivaldi non consente alle estensioni di prendere in carico la nuova scheda (usa una pagina iniziale propria) |
| Popup della barra | Clic sull'icona nella barra per vedere l'avanzamento — funziona in tutti i browser (utenti Vivaldi: usate questo) |
| Scorciatoia da tastiera | `Alt+Shift+L` apre il popup (modificabile in Estensioni → Scorciatoie da tastiera) |

Installazione: apri `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
attiva la **modalità sviluppatore** → **Carica estensione non pacchettizzata** → seleziona la cartella `extension/`.
**Dopo aver aggiornato il codice, clicca "Ricarica" in quella pagina** (le modifiche al manifest richiedono sempre un ricaricamento), poi fissa l'icona nella barra degli strumenti.

- Modificare le impostazioni: **⚙** in alto a destra nella pagina — data di nascita / aspettativa di vita, applicata all'istante e condivisa tra nuova scheda e popup (salvata in `chrome.storage`, sincronizzata tra i dispositivi con lo stesso account); i valori predefiniti sono in testa a `extension/life-core.js`
- Casella di ricerca: cerca con il motore di ricerca predefinito del browser (`chrome.search`); se l'API non è disponibile (es. pagina aperta come semplice file), il modulo ricade su Bing — per cambiare questo ripiego, modifica `action` del `<form>` e `name` dell'`<input>` in `extension/newtab.html`
- I temi chiaro e scuro seguono automaticamente il sistema
- Lingue: 19 lingue in `extension/_locales/` seguono la lingua del browser (ripiego sull'inglese se non c'è corrispondenza); aggiungere una lingua = aggiungere una cartella; la formattazione dei numeri segue la lingua del browser; le lingue RTL (es. arabo) specchiano automaticamente il layout
- Rigenerare le icone: `python3 tools/make_icons.py` (quadrato blu arrotondato + barra bianca al 57%, output in `extension/icons/`)

## Struttura del progetto

```
life-progress/
├── extension/           # l'estensione stessa (seleziona questa cartella per "Carica estensione non pacchettizzata")
│   ├── manifest.json    # manifest MV3 (permesso storage, scorciatoia da tastiera)
│   ├── newtab.html/js   # nuova scheda: barra a pagina intera + ricerca
│   ├── popup.html/js    # popup della barra: barra compatta
│   ├── life-core.js     # unica fonte di logica: config predefinita + calcolo + lettura/scrittura chrome.storage
│   ├── i18n.js          # punto d'ingresso msg() + sostituzione testo statico + direzione RTL
│   ├── settings.js      # ⚙ pannello impostazioni (condiviso da entrambe le pagine, iniettato)
│   ├── _locales/        # 19 pacchetti lingua; seguono la lingua del browser, ripiego su en
│   └── icons/           # icone di tutte le dimensioni (generate da tools/make_icons.py)
└── tools/
    └── make_icons.py    # generatore di icone (solo libreria standard; modifica PCT/BG e riesegui)
```

## Licenza

[MIT](LICENSE) © 2026 Li Ruibo
