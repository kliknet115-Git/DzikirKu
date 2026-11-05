# DzikirKu — Digital Tasbih Mobile App (iOS PWA)

Aplikasi tasbih digital modern dan tenang yang dirancang khusus untuk penggunaan mobile (terutama iPhone / iOS Safari) sebagai **Progressive Web App (PWA)** dengan prinsip **Offline-First**, penyimpanan lokal penuh (**IndexedDB**), dan tanpa ketergantungan cloud / backend.

---

## 🌟 Fitur Utama

1. **Beranda / Counter Presisi**:
   - Tombol utama **HITUNG** berukuran besar, nyaman disentuh dengan satu tangan (jempol).
   - Progress ring interaktif mengindikasikan target dzikir tercapai (aksen emas).
   - Tombol **Undo** untuk mengurangi satu hitungan (tidak pernah negatif).
   - Tombol **Reset** dengan dialog konfirmasi keamanan (mencegah reset tidak disengaja).
   - Pengaturan target fleksibel langsung dari layar beranda.
   - Status pencapaian target dengan haptic & feedback suara.

2. **Pagi Petang (Dzikir Harian)**:
   - Sesuai dengan spesifikasi *Prototype UI Dzikir iOS Revisi*:
     - **Dzikir Pagi**: 19 bacaan lengkap beserta teks Arab, keterangan waktu/jumlah, dan makna terjemahan.
     - **Dzikir Petang**: 18 bacaan lengkap beserta teks Arab, keterangan waktu/jumlah, dan makna terjemahan.
   - Dilengkapi *Mode Switcher* (☀️ Pagi / 🌙 Petang), tombol penyesuai ukuran font (`Aa`), serta *Daftar Dzikir (Bottom Sheet)* untuk berpindah bacaan secara instan.
   - Disertai tombol *Hitung* interaktif untuk memudahkan pelacakan pengulangan bacaan (1x, 3x, hingga 100x).

3. **Pilih Dzikir & Dzikir Custom**:
   - 6 Dzikir Bawaan standar (terurut):
     1. **Subhanallah** (سُبْحَانَ ٱللَّهِ) — Target 33
     2. **Alhamdulillah** (الْحَمْدُ لِلَّهِ) — Target 33
     3. **Allohuakbar** (اللَّهُ أَكْبَرُ) — Target 33
     4. **Lailaha illallah** (لَا إِلَٰهَ إِلَّا اللَّهُ) — Target 100
     5. **Subhanallahi wabihamdihi** (سُبْحَانَ اللهِ وَبِحَمْدِهِ) — Target 100
     6. **Astagfirullaha waatubu ilaih** (أَسْتَغْفِرُ اللهَ وَأَتُوْبُ إِلَيْهِ) — Target 100
   - Tambah, edit, dan hapus dzikir custom (Nama, Teks Arab, Transliterasi, Arti, Target).
   - Dialog konfirmasi aman saat berpindah jenis dzikir ketika terdapat hitungan aktif.

4. **Kumpulan Doa (Sesuai Prototype UI Doa iOS)**:
   - Terdiri dari 5 kategori doa utama:
     1. **Sebelum dan Sesudah Berdoa** (3 bacaan)
     2. **Doa Meminta Ampunan dan Rezeki** (1 doa)
     3. **Doa Memohon Pertolongan** (1 doa)
     4. **Doa Umroh** (20 doa & bacaan perjalanan, tawaf, dan sa'i)
     5. **Sholat Jenazah** (4 takbir + salam, 5 bacaan)
   - Dilengkapi navigasi hierarkis (Daftar Kategori ➔ Daftar Bacaan ➔ Detail Doa), kartu aksen emas, teks Arab resolusi tinggi, transliterasi, terjemahan, catatan rujukan, penyesuai ukuran font (`Aa`), serta *Bottom Sheet* daftar bacaan.

5. **Pengaturan & Manajemen Data**:
   - Pengaturan getaran (Haptic feedback) dengan deteksi dukungan perangkat.
   - Pengaturan suara ketukan lembut.
   - Ubah target default untuk dzikir baru.
   - **Ekspor Cadangan Data (JSON)** & **Impor Cadangan Data**.
   - Hapus seluruh data lokal dengan konfirmasi 2-tahap (aman).

6. **PWA & Dioptimalkan untuk iPhone (iOS)**:
   - Dukungan Safe Area Insets iOS (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`).
   - Service Worker (`sw.js`) untuk caching aset statis dan fungsi penuh tanpa koneksi internet.
   - `manifest.webmanifest`, Apple Touch Icon, dan icon maskable.
   - Panduan interaktif install ke Layar Utama (*Add to Home Screen*) langsung di dalam aplikasi.

---

## 📱 Panduan Install di iOS (iPhone)

Aplikasi ini dapat di-install langsung di iPhone menjadi aplikasi mandiri (*standalone app*) tanpa browser address bar:

1. Jalankan aplikasi di komputer atau server lokal (misal: `npm run dev -- --host`).
2. Sambungkan iPhone ke jaringan Wi-Fi yang sama dengan komputer.
3. Buka **Safari** di iPhone dan akses URL lokal yang tampil (misal: `http://192.168.x.x:5173`).
4. Tekan tombol **Share** (ikon kotak dengan panah ke atas di bagian bawah Safari).
5. Gulir ke bawah dan pilih **"Add to Home Screen"** (Tambah ke Layar Utama).
6. Tekan **"Add"** (Tambah) di pojok kanan atas.
7. Ikon **DzikirKu** akan muncul di Home Screen iPhone Anda dan dapat dibuka selayaknya aplikasi iOS native.

---

## 🚀 Cara Menjalankan di Lokal

### 1. Masuk ke direktori proyek
```bash
cd dzikirku
```

### 2. Jalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di `http://localhost:5173`. Untuk membukanya di iPhone pada Wi-Fi yang sama:
```bash
npm run dev -- --host
```

### 3. Menjalankan Pengujian Unit (Vitest)
```bash
npm test
```

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build siap saji akan berada di folder `dist/`.

---

## 📂 Struktur Proyek

```text
dzikirku/
├── public/
│   ├── icons/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── manifest.webmanifest
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── counter/        # CountButton, ProgressRing
│   │   ├── layout/         # Header, BottomNav
│   │   └── ui/             # Modal, ConfirmDialog
│   ├── data/
│   │   ├── default-dhikr.ts
│   │   └── daily-dhikr.ts  # Doa Dzikir Pagi (19) & Petang (18)
│   ├── features/
│   │   ├── home/           # HomePage (Counter & Ring)
│   │   ├── daily-dhikr/    # DailyDhikrPage (Pagi Petang iOS UX)
│   │   ├── dhikr-library/  # DhikrLibraryPage (Pilih & Custom Dzikir)
│   │   └── settings/       # SettingsPage (Preferensi, Ekspor/Impor)
│   ├── lib/
│   │   ├── counter.ts      # Logika murni counter
│   │   ├── database.ts     # IndexedDB client & schema
│   │   ├── date-utils.ts   # Format tanggal lokal Indonesia
│   │   ├── haptics.ts      # Web Audio & Vibrate API
│   │   └── validation.ts   # Validasi form & input
│   ├── styles/
│   │   └── index.css       # Design tokens & Tailwind CSS
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── App.tsx             # Root component & state coordinator
│   └── main.tsx            # Entry point
├── tests/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔒 Privasi dan Keamanan

- **100% Client-Side**: Tidak ada analytics, pelacakan, iklan, atau koneksi eksternal.
- Seluruh hitungan dan preferensi tersimpan aman di IndexedDB perangkat pengguna.
