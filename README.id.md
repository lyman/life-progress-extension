# Kemajuan hidup · life-progress

Ekstensi peramban (halaman tab baru / popup bilah alat) yang menjaga bilah kemajuan hidup Anda tetap terlihat.

Konfigurasi bawaan: tanggal lahir **1980-02-20** · harapan hidup **30.000 hari** (≈ 82,1 tahun · hingga 2062-04-10) — ubah kapan saja lewat **⚙** di pojok kanan atas halaman.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · **Bahasa Indonesia**

## Ekstensi peramban (Edge / Chrome dan Chromium lainnya · v1.3.2)

Kode ada di `extension/`, dengan tiga titik masuk:

| Titik masuk | Catatan |
|---|---|
| Tab baru | Bilah kemajuan satu halaman penuh + kotak pencarian. **Tidak berfungsi di Vivaldi**: Vivaldi tidak mengizinkan ekstensi mengambil alih tab baru (memakai halaman awalnya sendiri) |
| Popup bilah alat | Klik ikon di bilah alat untuk melihat kemajuan — berfungsi di semua peramban (pengguna Vivaldi: gunakan ini) |
| Pintasan papan ketik | `Alt+Shift+L` membuka popup (bisa diubah di Ekstensi → Pintasan keyboard) |

Instal: buka `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
aktifkan **mode pengembang** → **Muat ekstensi tidak terkemas** → pilih folder `extension/`.
**Setelah memperbarui kode, klik "Muat ulang" di halaman itu** (perubahan manifest selalu meminta muat ulang), lalu sematkan ikon di bilah alat.

- Mengubah pengaturan: **⚙** di pojok kanan atas halaman — tanggal lahir / harapan hidup, langsung berlaku dan dipakai bersama tab baru serta popup (disimpan di `chrome.storage`, tersinkron antar perangkat dengan akun yang sama); nilai bawaan pabrik ada di bagian atas `extension/life-core.js`
- Kotak pencarian: mencari dengan mesin pencari bawaan peramban (`chrome.search`); jika API tidak tersedia (mis. halaman dibuka sebagai berkas biasa), formulir beralih ke Bing — ubah cadangan ini lewat `action` pada `<form>` dan `name` pada `<input>` di `extension/newtab.html`
- Tema terang dan gelap mengikuti sistem secara otomatis
- Bahasa: 19 bahasa di `extension/_locales/` mengikuti bahasa peramban (jatuh ke Inggris bila tidak cocok); menambah bahasa = menambah folder; format angka mengikuti locale peramban; bahasa RTL (mis. Arab) otomatis mencerminkan tata letak
- Membuat ulang ikon: `python3 tools/make_icons.py` (persegi bulat biru + bilah putih 57%, keluaran di `extension/icons/`)

## Struktur proyek

```
life-progress/
├── extension/           # ekstensi itu sendiri (pilih folder ini untuk "Muat ekstensi tidak terkemas")
│   ├── manifest.json    # manifest MV3 (izin storage, pintasan keyboard)
│   ├── newtab.html/js   # tab baru: bilah satu halaman + pencarian
│   ├── popup.html/js    # popup bilah alat: bilah ringkas
│   ├── life-core.js     # sumber logika tunggal: konfigurasi bawaan + perhitungan + baca/tulis chrome.storage
│   ├── i18n.js          # titik masuk msg() + penggantian teks statis + arah RTL
│   ├── settings.js      # ⚙ panel pengaturan (dipakai bersama dua halaman, diinjeksi)
│   ├── _locales/        # 19 paket bahasa; mengikuti bahasa peramban, cadangan en
│   └── icons/           # ikon semua ukuran (dihasilkan tools/make_icons.py)
└── tools/
    └── make_icons.py    # pembuat ikon (hanya pustaka standar; ubah PCT/BG lalu jalankan lagi)
```

## Lisensi

[MIT](LICENSE) © 2026 Li Ruibo
