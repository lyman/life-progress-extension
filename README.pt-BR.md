# Progresso da vida · life-progress

Extensão de navegador (página de nova aba / popup da barra de ferramentas) que mantém a barra de progresso da sua vida sempre à vista.

Configuração padrão: data de nascimento **1980-02-20** · expectativa de vida **30.000 dias** (≈ 82,1 anos · até 2062-04-10) — altere a qualquer momento pela **⚙** no canto superior direito da página.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · **Português (BR)** · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md)

## Extensão de navegador (Edge / Chrome e outros Chromium · v1.3.3)

O código está em `extension/`, com três pontos de entrada:

| Ponto de entrada | Observações |
|---|---|
| Nova aba | Barra de progresso de página inteira + caixa de pesquisa. **Não funciona no Vivaldi**: o Vivaldi não permite que extensões assumam a nova aba (ele usa a própria página inicial) |
| Popup da barra | Clique no ícone da barra de ferramentas para ver o progresso — funciona em todos os navegadores (usuários do Vivaldi: use este) |
| Atalho de teclado | `Alt+Shift+L` abre o popup (pode ser alterado em Extensões → Atalhos de teclado) |

Instalação: abra `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
ative o **modo do desenvolvedor** → **Carregar sem compactação** → selecione a pasta `extension/`.
**Depois de atualizar o código, clique em "Recarregar" nessa página** (mudanças no manifest sempre exigem recarregar) e fixe o ícone na barra de ferramentas.

- Alterar configurações: **⚙** no canto superior direito da página — data de nascimento / expectativa de vida, aplicado na hora e compartilhado entre a nova aba e o popup (salvo em `chrome.storage`, sincronizado entre dispositivos com a mesma conta); os valores padrão ficam no topo de `extension/life-core.js`
- Caixa de pesquisa: pesquisa com o mecanismo de pesquisa padrão do navegador (`chrome.search`); se a API não estiver disponível (ex.: página aberta como arquivo comum), o formulário recorre ao Bing — para trocar esse recurso, edite o `action` do `<form>` e o `name` do `<input>` em `extension/newtab.html`
- Os temas claro e escuro seguem o sistema automaticamente
- Idiomas: 19 idiomas em `extension/_locales/` seguem o idioma do navegador (fallback para inglês); adicionar um idioma = adicionar uma pasta; a formatação de números segue a região do navegador; idiomas RTL (ex.: árabe) espelham o layout automaticamente
- Regenerar ícones: `python3 tools/make_icons.py` (quadrado azul arredondado + barra branca de 57%, saída em `extension/icons/`)

## Estrutura do projeto

```
life-progress/
├── extension/           # a extensão em si (selecione esta pasta em "Carregar sem compactação")
│   ├── manifest.json    # manifesto MV3 (permissão storage, atalho de teclado)
│   ├── newtab.html/js   # nova aba: barra de página inteira + pesquisa
│   ├── popup.html/js    # popup da barra de ferramentas: barra compacta
│   ├── life-core.js     # única fonte de lógica: config padrão + cálculo + leitura/escrita do chrome.storage
│   ├── i18n.js          # ponto de entrada msg() + substituição de texto estático + direção RTL
│   ├── settings.js      # ⚙ painel de configurações (compartilhado pelas duas páginas, injetado)
│   ├── _locales/        # 19 pacotes de idioma; seguem o idioma do navegador, fallback en
│   └── icons/           # ícones em todos os tamanhos (gerados por tools/make_icons.py)
└── tools/
    └── make_icons.py    # gerador de ícones (apenas biblioteca padrão; ajuste PCT/BG e execute novamente)
```

## Licença

[MIT](LICENSE) © 2026 Li Ruibo
