# 인생 진행률 · life-progress

새 탭과 툴바 팝업에서 인생 진행률 바를 언제든 확인하는 브라우저 확장 프로그램.

기본 설정: 생년월일 **1980-02-20** · 예상 수명 **30000 일** (≈ 82.1 세 · 2062-04-10까지) — 페이지 오른쪽 위의 **⚙** 에서 언제든 변경할 수 있습니다.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## 브라우저 확장 프로그램(Edge / Chrome 등 Chromium 계열 · v1.3.2)

코드는 `extension/`에 있으며 세 가지 진입점이 있습니다:

| 진입점 | 설명 |
|---|---|
| 새 탭 | 페이지 전체 진행률 바 + 검색창. **Vivaldi에서는 작동하지 않습니다**: Vivaldi는 확장 프로그램의 새 탭 인수를 허용하지 않습니다(자체 시작 페이지 사용) |
| 툴바 팝업 | 툴바 아이콘을 클릭하면 진행률이 바로 표시됩니다. 모든 브라우저에서 사용 가능(Vivaldi는 이쪽을 사용) |
| 키보드 단축키 | `Alt+Shift+L`로 팝업을 엽니다(확장 프로그램 관리 → 키보드 단축키에서 변경 가능) |

설치: `edge://extensions` (Chrome은 `chrome://extensions`, Vivaldi는 `vivaldi://extensions`) →
'개발자 모드' 켜기 → '압축해제된 확장 프로그램 로드' → `extension/` 폴더 선택.
**코드를 업데이트한 뒤에는 해당 페이지에서 '새로 고침'을 클릭**(manifest 변경 시 필수)하고 아이콘을 툴바에 고정하세요.

- 설정 변경: 페이지 오른쪽 위의 **⚙** 에서 생년월일 / 예상 수명을 변경하면 즉시 적용되며 새 탭과 팝업이 공유합니다(`chrome.storage`에 저장, 같은 계정에 로그인한 기기 간 동기화); 기본값은 `extension/life-core.js` 상단에 있습니다
- 검색창: 브라우저 기본 검색 엔진으로 검색(`chrome.search`); API를 사용할 수 없을 때(예: 파일로 직접 열기)는 Bing 폼 제출로 대체 — 대체 엔진을 바꾸려면 `extension/newtab.html`의 `<form>`의 `action`과 `<input>`의 `name`을 수정
- 밝은/어두운 두 가지 테마가 시스템을 자동으로 따라갑니다
- 다국어: `extension/_locales/`에 19개 언어, 브라우저 언어를 자동으로 따라갑니다(일치하지 않으면 영어로 대체); 언어 추가 = 폴더 추가; 숫자 형식은 브라우저 로캘을 따릅니다; RTL 언어(아랍어 등)는 레이아웃을 자동 미러링
- 아이콘 재생성: `python3 tools/make_icons.py`(파란 둥근 사각형 + 흰색 57% 진행률 바, `extension/icons/`로 출력)

## 프로젝트 구조

```
life-progress/
├── extension/           # 확장 프로그램 본체('압축해제된 확장 프로그램 로드'에서 이 폴더 선택)
│   ├── manifest.json    # MV3 매니페스트(storage 권한, 단축키)
│   ├── newtab.html/js   # 새 탭: 페이지 전체 바 + 검색창
│   ├── popup.html/js    # 툴바 팝업: 컴팩트 바
│   ├── life-core.js     # 유일한 로직 위치: 기본 설정 + 계산 + chrome.storage 읽기/쓰기
│   ├── i18n.js          # 문구 진입점 msg() + 정적 텍스트 교체 + RTL 방향
│   ├── settings.js      # ⚙ 설정 패널(두 페이지 공용, 주입식)
│   ├── _locales/        # 19개 언어 팩. 브라우저 언어를 따름, 미일치 시 en으로 대체
│   └── icons/           # 다양한 크기의 아이콘(tools/make_icons.py가 생성)
└── tools/
    └── make_icons.py    # 아이콘 생성 스크립트(표준 라이브러리만 사용. PCT/BG 수정 후 재실행)
```

## 라이선스

[MIT](LICENSE) © 2026 Li Ruibo
