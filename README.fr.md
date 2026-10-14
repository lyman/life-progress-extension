# Progression de vie · life-progress

Extension de navigateur (page nouvel onglet / pop-up de la barre d'outils) qui garde sous les yeux la barre de progression de votre vie.

Configuration par défaut : date de naissance **1980-02-20** · espérance de vie **30 000 jours** (≈ 82,1 ans · jusqu'au 2062-04-10) — modifiable à tout moment via la **⚙** en haut à droite de la page.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Extension de navigateur (Edge / Chrome et autres Chromium · v1.3.3)

Le code se trouve dans `extension/`, avec trois points d'entrée :

| Point d'entrée | Remarques |
|---|---|
| Nouvel onglet | Barre de progression plein page + champ de recherche. **Ne fonctionne pas dans Vivaldi** : Vivaldi ne permet pas aux extensions de prendre en charge le nouvel onglet (il utilise sa propre page d'accueil) |
| Pop-up de la barre d'outils | Cliquez sur l'icône de la barre d'outils pour voir la progression — fonctionne sur tous les navigateurs (utilisateurs de Vivaldi : utilisez celle-ci) |
| Raccourci clavier | `Alt+Shift+L` ouvre la pop-up (modifiable dans Extensions → Raccourcis clavier) |

Installation : ouvrez `edge://extensions` (Chrome : `chrome://extensions`, Vivaldi : `vivaldi://extensions`) →
activez le **Mode développeur** → **Charger l'extension non empaquetée** → sélectionnez le dossier `extension/`.
**Après avoir modifié le code, cliquez sur « Actualiser » sur cette page** (les changements de manifest imposent toujours un rechargement), puis épinglez l'icône dans la barre d'outils.

- Modifier les paramètres : **⚙** en haut à droite de la page — date de naissance / espérance de vie, appliqué instantanément, commun au nouvel onglet et à la pop-up (stocké dans `chrome.storage`, synchronisé entre appareils connectés au même compte) ; les valeurs d'usine se trouvent en haut de `extension/life-core.js`
- Barre de recherche : interroge le moteur de recherche par défaut du navigateur (`chrome.search`) ; si l'API n'est pas disponible (page ouverte comme simple fichier, p. ex.), le formulaire revient à Bing — pour changer ce repli, modifiez le `action` du `<form>` et le `name` de l'`<input>` dans `extension/newtab.html`
- Les thèmes clair et sombre suivent automatiquement le système
- Langues : 19 langues dans `extension/_locales/` suivant la langue du navigateur (repli sur l'anglais si aucune correspondance) ; ajouter une langue = ajouter un dossier ; le format des nombres suit la région du navigateur ; les langues RTL (arabe, etc.) inversent automatiquement la mise en page
- Régénérer les icônes : `python3 tools/make_icons.py` (carré arrondi bleu + barre blanche à 57 %, sortie dans `extension/icons/`)

## Structure du projet

```
life-progress/
├── extension/           # l'extension elle-même (sélectionnez ce dossier pour « Charger l'extension non empaquetée »)
│   ├── manifest.json    # manifeste MV3 (permission storage, raccourci clavier)
│   ├── newtab.html/js   # nouvel onglet : barre plein page + recherche
│   ├── popup.html/js    # pop-up de la barre d'outils : barre compacte
│   ├── life-core.js     # source unique de logique : config par défaut + calculs + lecture/écriture chrome.storage
│   ├── i18n.js          # point d'entrée msg() + remplacement du texte statique + direction RTL
│   ├── settings.js      # ⚙ panneau de paramètres (partagé par les deux pages, injecté)
│   ├── _locales/        # 19 packs de langue ; suivent la langue du navigateur, repli sur en
│   └── icons/           # icônes en toutes tailles (générées par tools/make_icons.py)
└── tools/
    └── make_icons.py    # générateur d'icônes (stdlib pure ; modifiez PCT/BG puis relancez)
```

## Licence

[MIT](LICENSE) © 2026 Li Ruibo
