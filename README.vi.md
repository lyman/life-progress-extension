# Tiến độ cuộc đời · life-progress

Tiện ích mở rộng trình duyệt (trang thẻ mới / cửa sổ pop-up trên thanh công cụ) luôn giữ thanh tiến độ cuộc đời của bạn trong tầm mắt.

Cấu hình mặc định: ngày sinh **1980-02-20** · tuổi thọ dự kiến **30.000 ngày** (≈ 82,1 năm · đến 2062-04-10) — thay đổi bất cứ lúc nào qua **⚙** ở góc trên phải của trang.

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Português (BR)](README.pt-BR.md) · [Русский](README.ru.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [हिन्दी](README.hi.md) · [ไทย](README.th.md) · **Tiếng Việt** · [Bahasa Indonesia](README.id.md)

## Tiện ích mở rộng trình duyệt (Edge / Chrome và các trình duyệt Chromium khác · v1.3.2)

Mã nằm trong `extension/`, với ba điểm vào:

| Điểm vào | Ghi chú |
|---|---|
| Thẻ mới | Thanh tiến độ toàn trang + ô tìm kiếm. **Không hoạt động trên Vivaldi**: Vivaldi không cho tiện ích thay thế trang thẻ mới (dùng trang khởi động riêng) |
| Pop-up thanh công cụ | Bấm biểu tượng trên thanh công cụ để xem tiến độ — hoạt động trên mọi trình duyệt (người dùng Vivaldi: dùng cái này) |
| Phím tắt | `Alt+Shift+L` mở pop-up (đổi được trong Tiện ích → Phím tắt) |

Cài đặt: mở `edge://extensions` (Chrome: `chrome://extensions`, Vivaldi: `vivaldi://extensions`) →
bật **chế độ nhà phát triển** → **Tải tiện ích đã giải nén** → chọn thư mục `extension/`.
**Sau khi cập nhật mã, bấm "Tải lại" trên trang đó** (thay đổi manifest luôn yêu cầu tải lại), rồi ghim biểu tượng lên thanh công cụ.

- Đổi cài đặt: **⚙** ở góc trên phải của trang — ngày sinh / tuổi thọ dự kiến, áp dụng ngay, dùng chung cho thẻ mới và pop-up (lưu trong `chrome.storage`, đồng bộ giữa các thiết bị đăng nhập cùng tài khoản); giá trị mặc định nằm ở đầu `extension/life-core.js`
- Ô tìm kiếm: tìm qua công cụ tìm kiếm mặc định của trình duyệt (`chrome.search`); nếu API không khả dụng (vd. mở trang như tệp thông thường), form quay về Bing — đổi phương án dự phòng này qua `action` của `<form>` và `name` của `<input>` trong `extension/newtab.html`
- Hai giao diện sáng và tối tự động theo hệ thống
- Ngôn ngữ: 19 ngôn ngữ trong `extension/_locales/` theo ngôn ngữ trình duyệt (không khớp thì dùng tiếng Anh); thêm ngôn ngữ = thêm một thư mục; định dạng số theo vùng miền của trình duyệt; ngôn ngữ RTL (ví dụ tiếng Ả Rập) tự động lật bố cục
- Tạo lại biểu tượng: `python3 tools/make_icons.py` (ô vuông bo góc màu xanh + thanh trắng 57%, xuất ra `extension/icons/`)

## Cấu trúc dự án

```
life-progress/
├── extension/           # bản thân tiện ích (chọn thư mục này khi "Tải tiện ích đã giải nén")
│   ├── manifest.json    # manifest MV3 (quyền storage, phím tắt)
│   ├── newtab.html/js   # thẻ mới: thanh toàn trang + tìm kiếm
│   ├── popup.html/js    # pop-up thanh công cụ: thanh gọn
│   ├── life-core.js     # nguồn logic duy nhất: cấu hình mặc định + tính toán + đọc/ghi chrome.storage
│   ├── i18n.js          # điểm vào msg() + thay văn bản tĩnh + hướng RTL
│   ├── settings.js      # ⚙ bảng cài đặt (dùng chung hai trang, chèn vào)
│   ├── _locales/        # 19 gói ngôn ngữ; theo ngôn ngữ trình duyệt, dự phòng en
│   └── icons/           # biểu tượng mọi kích cỡ (do tools/make_icons.py tạo)
└── tools/
    └── make_icons.py    # bộ tạo biểu tượng (chỉ thư viện chuẩn; sửa PCT/BG rồi chạy lại)
```

## Giấy phép

[MIT](LICENSE) © 2026 Li Ruibo
