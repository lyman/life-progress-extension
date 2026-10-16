# Postęp życia · life-progress

Rozszerzenie przeglądarki (strona nowej karty / okno podręczne na pasku narzędzi), które trzyma pasek postępu Twojego życia zawsze na widoku.

Konfiguracja domyślna: data urodzenia **1980-02-20** · przewidywana długość życia **30 000 dni** (≈ 82,1 roku · do 2062-04-10) — zmień w każdej chwili przez **⚙** w prawym górnym rogu strony.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · **Polski** · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Rozszerzenie przeglądarki (Edge / Chrome i inne Chromium · v1.3.4)

Kod znajduje się w `extension/` i ma trzy punkty wejścia:

| Punkt wejścia | Uwagi |
|---|---|
| Nowa karta | Pasek postępu na całą stronę + pole wyszukiwania. **Nie działa w Vivaldi**: Vivaldi nie pozwala rozszerzeniom przejmować nowej karty (używa własnej strony startowej) |
| Okno podręczne | Kliknij ikonę na pasku narzędzi, aby zobaczyć postęp — działa w każdej przeglądarce (użytkownicy Vivaldi: użyjcie tego) |
| Skrót klawiszowy | `Alt+Shift+L` otwiera okno podręczne (zmienisz w Rozszerzenia → Skróty klawiszowe) |

Instalacja: otwórz `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
włącz **tryb programisty** → **Załaduj rozszerzenie rozpakowane** → wybierz folder `extension/`.
**Po aktualizacji kodu kliknij „Odśwież" na tej stronie** (zmiany manifestu zawsze wymagają przeładowania), a następnie przypnij ikonę do paska narzędzi.

- Zmiana ustawień: **⚙** w prawym górnym rogu strony — data urodzenia / długość życia, działa natychmiast i jest wspólna dla nowej karty i okna (zapisywane w `chrome.storage`, synchronizowane między urządzeniami na tym samym koncie); ustawienia fabryczne są na początku `extension/life-core.js`
- Pole wyszukiwania: szuka przez domyślną wyszukiwarkę przeglądarki (`chrome.search`); gdy interfejs API jest niedostępny (np. strona otwarta jako zwykły plik), formularz wysyła zapytanie do Binga — ten zapas zmienisz przez `action` w `<form>` i `name` w `<input>` w `extension/newtab.html`
- Motywy jasny i ciemny automatycznie podążają za systemem
- Języki: 19 języków w `extension/_locales/` podąża za językiem przeglądarki (gdy brak dopasowania — angielski); dodanie języka = dodanie folderu; format liczb zgodny z ustawieniami regionalnymi; języki RTL (np. arabski) automatycznie odbijają układ
- Ponowne wygenerowanie ikon: `python3 tools/make_icons.py` (niebieski zaokrąglony kwadrat + biały pasek 57%, wynik w `extension/icons/`)

## Struktura projektu

```
life-progress/
├── extension/           # samo rozszerzenie (wybierz ten folder przy „Załaduj rozszerzenie rozpakowane")
│   ├── manifest.json    # manifest MV3 (uprawnienie storage, skrót klawiszowy)
│   ├── newtab.html/js   # nowa karta: pasek na całą stronę + wyszukiwanie
│   ├── popup.html/js    # okno podręczne: kompaktowy pasek
│   ├── life-core.js     # jedyne źródło logiki: konfiguracja domyślna + obliczenia + odczyt/zapis chrome.storage
│   ├── i18n.js          # punkt wejścia msg() + podmiana tekstu statycznego + kierunek RTL
│   ├── settings.js      # ⚙ panel ustawień (wspólny dla obu stron, wstrzykiwany)
│   ├── _locales/        # 19 pakietów językowych; podążają za językiem przeglądarki, rezerwa: en
│   └── icons/           # ikony we wszystkich rozmiarach (generuje tools/make_icons.py)
└── tools/
    └── make_icons.py    # generator ikon (czysta biblioteka standardowa; zmień PCT/BG i uruchom ponownie)
```

## Licencja

[MIT](LICENSE) © 2026 Li Ruibo
