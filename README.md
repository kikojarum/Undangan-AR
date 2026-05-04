# 💌 Undangan Digital — Sistem Multi-Klien

## Cara Pakai Untuk Klien Baru

### HANYA PERLU UBAH 1 FILE: `js/config.js`

Buka file tersebut, ubah nilai-nilainya, selesai.

```
js/config.js   ← ✏️  SATU-SATUNYA FILE YANG DIUBAH PER KLIEN
js/script.js   ← 🚫  Jangan diubah (engine)
css/style.css  ← 🚫  Jangan diubah (tampilan)
index.html     ← 🚫  Jangan diubah (struktur)
```

---

## Isi config.js Yang Perlu Diisi

| Field | Keterangan |
|-------|-----------|
| `groom.fullName` | Nama lengkap mempelai pria |
| `groom.shortName` | Nama pendek untuk cover & penutup |
| `groom.photo` | Path foto: `"assets/foto-pria.jpg"` (kosongkan jika belum ada) |
| `bride.*` | Sama seperti groom |
| `event.displayDate` | Teks tanggal: `"Sabtu, 14 Juni 2025"` |
| `event.countdownISO` | Format ISO: `"2025-06-14T11:00:00"` |
| `event.akad.*` | Waktu & lokasi akad + URL Google Maps |
| `event.resepsi.*` | Waktu & lokasi resepsi + URL Google Maps |
| `theme` | Pilih: `"blush"` / `"sage"` / `"lavender"` / `"gold"` / `"sky"` |
| `googleForm.url` | URL Google Form (lihat cara di bawah) |
| `googleForm.fields` | Entry ID setiap field form |
| `guestbookSeed` | Ucapan awal yang tampil (bisa dikosongkan) |

---

## 5 Tema Warna

| Key | Nama | Cocok Untuk |
|-----|------|-------------|
| `blush` | 🌸 Blush Rose | Pernikahan feminin, muda, elegan |
| `sage` | 🌿 Sage Garden | Tema outdoor, garden party, natural |
| `lavender` | 💜 Dusty Lavender | Mewah, romantic, dreamy |
| `gold` | ✨ Warm Gold | Klasik, formal, tradisional |
| `sky` | 💙 Sky Blue | Fresh, modern, bersih |

Ganti cukup 1 baris di config.js:
```js
theme: "sage",  // ← ganti nama tema
```

---

## Cara Tambah Foto

### Foto Mempelai
Taruh foto di `/assets/`, lalu isi di config.js:
```js
groom: {
  photo: "assets/foto-pria.jpg",   // ← isi path-nya
},
bride: {
  photo: "assets/foto-wanita.jpg",
},
```

### Foto Galeri
Di `index.html`, cari bagian galeri dan ganti placeholder dengan `<img>`:
```html
<!-- SEBELUM -->
<div class="gal-item" style="--i:1">
  <div class="gal-ph"><span>📷</span><small>Foto 1</small></div>
</div>

<!-- SESUDAH -->
<div class="gal-item" style="--i:1">
  <img src="assets/foto-1.jpg" alt="Foto 1">
</div>
```

**Tips kompresi foto:** gunakan https://squoosh.app — target max 150KB per foto.

---

## Setup Google Form RSVP

1. Buka https://forms.google.com → buat form baru
2. Tambah 3 pertanyaan:
   - **Nama** (Short answer)
   - **Kehadiran** (Multiple choice: Hadir / Tidak Hadir / Masih Ragu)
   - **Ucapan** (Paragraph)
3. Klik **Send** → salin URL → ubah `/viewform` → `/formResponse`
4. Isi di config.js: `googleForm.url`
5. Cari entry ID: buka URL form di browser → klik kanan → Inspect → cari `name="entry.XXXXXXX"` → isi ke `googleForm.fields`

---

## Deploy ke Cloudflare Pages

### Upload Langsung (Paling Mudah)
1. Login https://dash.cloudflare.com
2. **Workers & Pages** → **Pages** → **Create a project**
3. Pilih **"Direct Upload"**
4. ZIP seluruh folder `undangan/` → upload
5. **Deploy site** → URL aktif instan

### Via GitHub (Auto-deploy)
1. Push folder ke GitHub repo
2. Cloudflare Pages → **Connect to Git** → pilih repo
3. Build command: *(kosong)* | Output directory: `/`
4. Setiap push → auto deploy

### URL Personalisasi Tamu
```
https://nama.pages.dev/?to=Bapak+Budi
```
Tampil di cover: **"Kepada Yth. Bapak Budi"**

---

## Checklist Per Klien

- [ ] Edit `js/config.js` (nama, tanggal, lokasi, tema)
- [ ] Upload foto ke `/assets/` + update config.js & index.html
- [ ] Upload musik ke `/assets/music.mp3`
- [ ] Setup Google Form + isi entry ID di config.js
- [ ] Test di HP (buka dengan `?to=NamaTamu`)
- [ ] Deploy ke Cloudflare Pages

---

## Struktur File

```
undangan/
├── index.html          ← Jangan diubah
├── css/
│   └── style.css       ← Jangan diubah
├── js/
│   ├── config.js       ← ✏️  UBAH INI setiap ganti klien
│   └── script.js       ← Jangan diubah
└── assets/
    ├── music.mp3       ← Upload musik klien
    ├── foto-pria.jpg   ← Upload foto mempelai pria
    ├── foto-wanita.jpg ← Upload foto mempelai wanita
    └── foto-1.jpg … foto-6.jpg  ← Upload foto galeri
```
