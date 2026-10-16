# Progreso de vida · life-progress

Extensión de navegador (página de nueva pestaña / ventana emergente de la barra de herramientas) que mantiene a la vista la barra de progreso de tu vida.

Configuración predeterminada: fecha de nacimiento **1980-02-20** · esperanza de vida **30 000 días** (≈ 82,1 años · hasta el 2062-04-10) — cámbiala cuando quieras con la **⚙** de la esquina superior derecha.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Extensión de navegador (Edge / Chrome y otros Chromium · v1.3.4)

El código está en `extension/`, con tres puntos de entrada:

| Punto de entrada | Notas |
|---|---|
| Nueva pestaña | Barra de progreso a página completa + caja de búsqueda. **No funciona en Vivaldi**: Vivaldi no permite que las extensiones se apoderen de la nueva pestaña (usa su propia página de inicio) |
| Ventana emergente | Haz clic en el icono de la barra de herramientas para ver el progreso; funciona en todos los navegadores (usuarios de Vivaldi: usad esta) |
| Atajo de teclado | `Alt+Shift+L` abre la ventana emergente (se puede cambiar en Extensiones → Atajos de teclado) |

Instalación: abre `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
activa el **modo de desarrollador** → **Cargar descomprimida** → selecciona la carpeta `extension/`.
**Tras actualizar el código, haz clic en "Actualizar" en esa página** (los cambios de manifest siempre exigen recargar) y fija el icono en la barra de herramientas.

- Cambiar ajustes: **⚙** en la esquina superior derecha — fecha de nacimiento / esperanza de vida, se aplica al instante y es común a la nueva pestaña y la ventana emergente (guardado en `chrome.storage`, sincronizado entre dispositivos con la misma cuenta); los valores de fábrica están al principio de `extension/life-core.js`
- Caja de búsqueda: busca con el buscador predeterminado del navegador (`chrome.search`); si la API no está disponible (p. ej., al abrir la página como archivo), el formulario recurre a Bing — para cambiar ese respaldo, edita el `action` del `<form>` y el `name` del `<input>` en `extension/newtab.html`
- Los temas claro y oscuro siguen al sistema automáticamente
- Idiomas: 19 idiomas en `extension/_locales/` según el idioma del navegador (si no coincide, se usa inglés); añadir un idioma = añadir una carpeta; el formato numérico sigue la configuración regional; los idiomas RTL (p. ej. árabe) reflejan el diseño automáticamente
- Regenerar iconos: `python3 tools/make_icons.py` (cuadrado azul redondeado + barra blanca al 57 %, salida en `extension/icons/`)

## Estructura del proyecto

```
life-progress/
├── extension/           # la extensión en sí (selecciona esta carpeta en "Cargar descomprimida")
│   ├── manifest.json    # manifiesto MV3 (permiso storage, atajo de teclado)
│   ├── newtab.html/js   # nueva pestaña: barra a página completa + búsqueda
│   ├── popup.html/js    # ventana emergente: barra compacta
│   ├── life-core.js     # única fuente de lógica: config predeterminada + cálculo + lectura/escritura de chrome.storage
│   ├── i18n.js          # punto de entrada msg() + sustitución de texto estático + dirección RTL
│   ├── settings.js      # ⚙ panel de ajustes (compartido por ambas páginas, inyectado)
│   ├── _locales/        # 19 paquetes de idioma; siguen el idioma del navegador, respaldo en inglés
│   └── icons/           # iconos en todos los tamaños (generados por tools/make_icons.py)
└── tools/
    └── make_icons.py    # generador de iconos (solo biblioteca estándar; ajusta PCT/BG y vuelve a ejecutar)
```

## Licencia

[MIT](LICENSE) © 2026 Li Ruibo
