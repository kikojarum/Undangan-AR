/* ================================================================
   config.js — SATU-SATUNYA FILE YANG PERLU DIUBAH PER KLIEN
   ================================================================
   Cara pakai:
   1. Ubah semua nilai di bawah sesuai data klien
   2. Upload foto ke /assets/
   3. Deploy ke Cloudflare Pages
   ================================================================ */

const CONFIG = {

  /* ──────────────────────────────────────────
     1. IDENTITAS MEMPELAI
  ────────────────────────────────────────── */
  groom: {
    fullName:  "Asep Abdul Aziz Algifari",   // Nama lengkap untuk seksi mempelai
    shortName: "Aziz",                    // Nama pendek untuk cover & penutup
    parents:   "Putra pertama dari\nBapak",
    instagram: "@kikojarum",
    igLink:    "https://instagram.com/",
    photo:     "assets/foto-pria.jpg",   // Kosongkan jika belum ada. Isi: "assets/foto-pria.jpg"
  },

  bride: {
    fullName:  "Riska",
    shortName: "Riska",
    parents:   "Putri pertama dari\nBapak",
    instagram: "@khariska_01",
    igLink:    "https://instagram.com/",
    photo:     "assets/foto-wanita.jpg",   // Isi: "assets/foto-wanita.jpg"
  },

  /* ──────────────────────────────────────────
     2. TANGGAL & WAKTU
  ────────────────────────────────────────── */
  event: {
    displayDate:  "Rabu, 07 Juli 2027",   // Teks tanggal di cover & kartu acara
    countdownISO: "2027-07-07T11:00:00",   // Format: YYYY-MM-DDTHH:MM:SS (waktu resepsi)

    akad: {
      time:     "08.00 – 10.00 WIB",
      location: "Masjid Uswatun Hasanah\nJl. Telaga Kec. Bantarkawung Brebes",
      mapsURL:  "https://maps.google.com/?q=Masjid+Al-Ikhlas+Jakarta",
    },

    resepsi: {
      time:     "11.00 – 15.00 WIB",
      location: "Rumah mempelai wanita\nJl. Telaga Kec. Bantarkawung Brebes",
      mapsURL:  "https://maps.google.com/?q=Gedung+Harmoni+Jakarta",
    },

    rsvpDeadline: "7 Juli 2027",  // Batas konfirmasi kehadiran
  },

  /* ──────────────────────────────────────────
     3. TEMA WARNA
     Pilih salah satu: "blush" | "sage" | "lavender" | "gold" | "sky"
  ────────────────────────────────────────── */
  theme: "blush",

  /* ──────────────────────────────────────────
     4. RSVP — GOOGLE FORM
     Cara setup:
     a) Buat Google Form dengan 3 pertanyaan (Nama, Kehadiran, Ucapan)
     b) Klik Send → salin URL → ganti /viewform dengan /formResponse
     c) Inspect element form → cari name="entry.XXXXXXX" untuk setiap field
  ────────────────────────────────────────── */
  googleForm: {
    url:          "https://docs.google.com/forms/d/e/XXXXXXXXXXXXXXXX/formResponse",
    fields: {
      name:       "entry.000000001",   // Ganti dengan ID nyata
      attendance: "entry.000000002",   // Ganti dengan ID nyata
      message:    "entry.000000003",   // Ganti dengan ID nyata
    },
  },

  /* ──────────────────────────────────────────
     5. MUSIK
     Taruh file musik di assets/music.mp3
     Atau isi URL eksternal di bawah (opsional)
  ────────────────────────────────────────── */
  musicTitle: "assets/music.mp3",

  /* ──────────────────────────────────────────
     6. BUKU TAMU AWAL (dummy / seed data)
     Tampil saat halaman pertama dibuka.
     Kosongkan array [] jika tidak ingin ada dummy.
  ────────────────────────────────────────── */
  guestbookSeed: [
    
  ],

};

/* ================================================================
   DAFTAR TEMA WARNA — JANGAN DIUBAH
   Untuk menambah tema baru, duplikasi salah satu objek di bawah
   dan daftarkan key-nya di CONFIG.theme di atas.
================================================================ */
const THEMES = {

  blush: {
    label:       "Blush Rose",
    accent:      "#d4726a",
    accentDark:  "#8b3530",
    accentMid:   "#e8a09b",
    accentPale:  "#fdf0ef",
    accentLine:  "#f5cec9",
    coverBg:     "linear-gradient(160deg, #fff5f4 0%, #ffe8e6 100%)",
    heroBg:      "#fff9f8",
    pageBg:      "#fffbfb",
    cdBg:        "linear-gradient(135deg, #d4726a, #c05850)",
    textDark:    "#2a1614",
    textMid:     "#7a4040",
    textLight:   "#b08080",
  },

  sage: {
    label:       "Sage Garden",
    accent:      "#6b9e7a",
    accentDark:  "#2d5e3a",
    accentMid:   "#9dc4a8",
    accentPale:  "#f0f7f2",
    accentLine:  "#c8e4ce",
    coverBg:     "linear-gradient(160deg, #f4f9f5 0%, #e4f2e8 100%)",
    heroBg:      "#f8fcf8",
    pageBg:      "#fbfdfb",
    cdBg:        "linear-gradient(135deg, #6b9e7a, #4a7d5a)",
    textDark:    "#162318",
    textMid:     "#3d6045",
    textLight:   "#7aa882",
  },

  lavender: {
    label:       "Dusty Lavender",
    accent:      "#8b6fa8",
    accentDark:  "#4a2d6e",
    accentMid:   "#b89fcc",
    accentPale:  "#f5f0fb",
    accentLine:  "#ddd0ee",
    coverBg:     "linear-gradient(160deg, #f8f4fd 0%, #ede5f8 100%)",
    heroBg:      "#fbf8fe",
    pageBg:      "#fdf9ff",
    cdBg:        "linear-gradient(135deg, #8b6fa8, #6a4e8a)",
    textDark:    "#1e1228",
    textMid:     "#5a3d78",
    textLight:   "#9e80bb",
  },

  gold: {
    label:       "Warm Gold",
    accent:      "#c09040",
    accentDark:  "#7a5a18",
    accentMid:   "#ddb96a",
    accentPale:  "#fdf6e8",
    accentLine:  "#f0dba8",
    coverBg:     "linear-gradient(160deg, #fffcf4 0%, #fdf0d0 100%)",
    heroBg:      "#fffdf6",
    pageBg:      "#fffef9",
    cdBg:        "linear-gradient(135deg, #c09040, #9a7020)",
    textDark:    "#28200a",
    textMid:     "#7a6030",
    textLight:   "#b8963e",
  },

  sky: {
    label:       "Sky Blue",
    accent:      "#4a8fbf",
    accentDark:  "#1a4e78",
    accentMid:   "#80b8d8",
    accentPale:  "#eef6fc",
    accentLine:  "#b8d8ef",
    coverBg:     "linear-gradient(160deg, #f4f9fd 0%, #ddeef8 100%)",
    heroBg:      "#f7fbfe",
    pageBg:      "#fafcff",
    cdBg:        "linear-gradient(135deg, #4a8fbf, #2a6090)",
    textDark:    "#0d1f2d",
    textMid:     "#2d5a78",
    textLight:   "#6a9ab8",
  },

};
