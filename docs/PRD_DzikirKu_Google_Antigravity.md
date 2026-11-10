# PRODUCT REQUIREMENTS DOCUMENT (PRD) — FINAL RELEASE

# DzikirKu — Digital Dzikir Counter & Islamic Daily Companion

| Informasi | Detail |
|---|---|
| **Nama produk** | DzikirKu |
| **Jenis produk** | Aplikasi penghitung dzikir (digital tasbih) & kumpulan doa/dzikir harian |
| **Dokumen** | Product Requirements Document (PRD) |
| **Versi dokumen** | **2.0 (Final Release)** |
| **Status** | **Selesai Diimplementasikan & Live Deployed** |
| **Target implementasi** | Google Antigravity / Web Mobile |
| **Platform Target** | Mobile-first Progressive Web App (PWA), dioptimalkan untuk iPhone / iOS Safari |
| **Bahasa antarmuka** | Bahasa Indonesia |
| **Live Web App** | **https://kliknet115-git.github.io/DzikirKu/** |
| **GitHub Repository** | **https://github.com/kliknet115-Git/DzikirKu** |
| **Pengguna utama** | Umat Muslim yang ingin menghitung dzikir dan membaca doa harian dengan tenang |

---

## 1. Ringkasan Produk & Latar Belakang

**DzikirKu** adalah aplikasi tasbih digital modern dan tenang yang dirancang khusus untuk penggunaan mobile (terutama iPhone / iOS Safari) sebagai **Progressive Web App (PWA)** dengan prinsip **100% Offline-First**, penyimpanan lokal penuh (**IndexedDB**), dan tanpa ketergantungan cloud / backend.

Aplikasi mengadaptasi konsep visual cincin tasbih digital fisik: penghitung utama dengan tombol besar yang mudah dijangkau satu tangan (jempol), cincin progress (*progress ring*), umpan balik getaran/suara yang menenangkan, serta kumpulan dzikir dan doa harian yang disusun rapi sesuai sunnah dan rujukan dokumen sumber.

### 1.1 Evaluasi & Penyesuaian dari Rencana Awal (MVP v1.0 ➔ Final v2.0)
Selama proses iterasi dan implementasi nyata:
1. **Pembersihan Fitur Riwayat (History Elimination)**:
   - Fitur menu Riwayat, grafik batang (*bar charts*), dan alur "Selesaikan Sesi" dihapus dan dibersihkan secara menyeluruh dari UX aplikasi agar pengguna dapat berfokus sepenuhnya pada kekhusyukan hitungan dan membaca doa tanpa beban analitik atau pencatatan berlebih.
2. **Penambahan Menu Dzikir Harian (Pagi Petang)**:
   - Diintegrasikan berdasarkan dokumen `Prototype_UI_Dzikir_iOS_Revisi_Mode_Pagi_Petang.html` (19 Dzikir Pagi & 18 Dzikir Petang) lengkap dengan mode switcher, penyesuai font (`Aa`), dan counter hitungan mandiri per bacaan.
3. **Penambahan Menu Kumpulan Doa**:
   - Diintegrasikan berdasarkan dokumen `Prototype_UI_Doa_iOS.html` (5 kategori doa tematik, termasuk 20 rangkaian Doa Umroh dan 4 Takbir Sholat Jenazah) dengan navigasi hierarkis elegan.
4. **Tipografi Arab**:
   - Ditetapkan menggunakan font **Amiri** (kaligrafi Naskh klasik) dengan perataan harakat yang nyaman dibaca dan terhindar dari pemotongan harakat.

---

## 2. Struktur Navigasi Aplikasi (5 Menu Utama)

Bilah navigasi bawah (*Bottom Navigation Bar*) dirancang fixed dengan dukungan iOS Safe Area Insets (`env(safe-area-inset-bottom)`), terdiri dari 5 menu utama:

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                               DzikirKu                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
│    [Beranda]    [Pagi Petang]     [Dzikir]      [Doa]     [Pengaturan] │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Beranda (`home`)**: Layar counter utama tasbih digital, cincin progress interaktif, tombol Hitung jempol, Undo, Reset sesi, dan tombol ganti target langsung.
2. **Pagi Petang (`daily-dhikr`)**: Bacaan dzikir pagi (19 doa) dan petang (18 doa) berlembar sesuai sunnah, dilengkapi hitungan interaktif pengulangan.
3. **Dzikir (`dhikr`)**: Pustaka 6 dzikir bawaan terurut dan fasilitas pengelolaan dzikir custom pribadi (tambah, edit, hapus).
4. **Doa (`doa`)**: Kumpulan doa tematik berjenjang (Sebelum & Sesudah Berdoa, Ampunan & Rezeki, Pertolongan, 20 Doa Umroh, dan Sholat Jenazah).
5. **Pengaturan (`settings`)**: Preferensi haptic feedback, audio click, target default dzikir baru, ekspor/impor cadangan JSON, reset data lokal, dan panduan instalasi iOS.

---

## 3. Spesifikasi Layar & Fungsionalitas Detail

### 3.1 Layar Beranda / Counter Presisi (`HomePage`)

**Tujuan:** Menjadi layar utama penghitung dzikir dengan kontrol satu tangan yang responsif dan tenang.

#### Elemen Antarmuka:
- **Header**: Wordmark *DzikirKu*, sapaan waktu dinamis (Selamat Pagi / Siang / Sore / Malam), dan tanggal hari ini (Bahasa Indonesia).
- **Kartu Dzikir Aktif**: Menampilkan nama dzikir, lafaz Arab dalam font Amiri, transliterasi Latin, dan arti terjemahan. Dilengkapi tombol dropdown cepat menuju tab Dzikir.
- **Banner Pintasan Dzikir Harian**: Akses cepat 1-klik menuju menu Pagi Petang.
- **Progress Ring Interaktif**: Lingkaran persentase SVG responsif yang menghitung `min(count / target, 1)`. Aksen berubah menjadi emas (*gold*) saat target tercapai.
- **Angka Hitungan Raksasa**: Tipografi angka tabular yang jelas, dilengkapi keterangan `Sisa X lagi` dan `X dari Y`.
- **Tombol Kontrol Sesi**:
  - **Reset**: Mengembalikan hitungan ke 0 dengan dialog konfirmasi keamanan (mencegah ketidaksengajaan).
  - **Hitung**: Tombol lingkaran dominan (diameter ~120px) dengan responsivitas instan tanpa debounce yang mengorbankan ketukan cepat.
  - **Target**: Modal cepat untuk mengubah target hitungan sesi aktif tanpa mereset angka hitungan yang sudah berjalan.
  - **Undo**: Tombol untuk mengurangi hitungan 1 langkah (tidak pernah menghasilkan angka negatif).

---

### 3.2 Layar Dzikir Pagi & Petang (`DailyDhikrPage`)

**Tujuan:** Memandu pembacaan dzikir harian sesuai sunnah dengan pengalaman membaca berlembar yang nyaman.

#### Spesifikasi Konten:
- **Dzikir Pagi**: 19 bacaan lengkap (Ayat Kursi, Surah Al-Ikhlas, Al-Falaq, An-Nas, Sayyidul Istighfar, Doa Perlindungan, Asbahna wa Asbahal Mulku, Tasbih 100x, dsb.).
- **Dzikir Petang**: 18 bacaan lengkap (Penyesuaian waktu petang seperti Amsayna wa Amsal Mulku, dsb.).

#### Fitur & Interaktivitas:
1. **Mode Switcher Segmented Control**: Berpindah antara mode ☀️ **Pagi** dan 🌙 **Petang** dengan status progres mandiri.
2. **Pengatur Ukuran Font (`Aa`)**: Tiga tingkat ukuran font Arab (*Normal*, *Besar*, *Ekstra Besar*).
3. **Kartu Teks Bacaan**:
   - Header nomor urut & judul surah/doa.
   - Blok teks Arab (font Amiri) dengan baris rapi dan spasi harakat optimal.
   - Blok transliterasi Latin.
   - Blok arti terjemahan bahasa Indonesia.
   - Blok fadhilah / keutamaan dan referensi hadis/ayat.
4. **Tombol Hitung Interaktif per Bacaan**:
   - Indikator target per bacaan (misal 1x, 3x, atau 100x).
   - Mengetuk tombol hitung memajukan counter bacaan saat ini; saat target tercapai, tombol berubah warna hijau sukses dengan animasi centang.
5. **Navigasi Bacaan & Bottom Sheet**:
   - Tombol **Sebelumnya** dan **Bacaan Berikutnya**.
   - Tombol **Daftar Bacaan** membuka *Bottom Sheet Modal* untuk melompat langsung ke nomor doa mana saja.
   - Modal selamat saat seluruh rangkaian dzikir telah selesai dibaca.

---

### 3.3 Layar Pilih Dzikir & Custom Dzikir (`DhikrLibraryPage`)

**Tujuan:** Memilih dzikir bawaan atau mengelola daftar dzikir pribadi.

#### 6 Dzikir Bawaan Resmi (Urutan Standar):
1. **Subhanallah** (سُبْحَانَ ٱللَّهِ) — Target bawaan: **33x**
2. **Alhamdulillah** (الْحَمْدُ لِلَّهِ) — Target bawaan: **33x**
3. **Allahuakbar** (اللَّهُ أَكْبَرُ) — Target bawaan: **33x**
4. **Lailaha illallah** (لَا إِلَٰهَ إِلَّا اللَّهُ) — Target bawaan: **100x**
5. **Subhanallahi wabihamdihi** (سُبْحَانَ اللهِ وَبِحَمْدِهِ) — Target bawaan: **100x**
6. **Astagfirullaha waatubu ilaih** (أَسْتَغْفِرُ اللهَ وَأَتُوْبُ إِلَيْهِ) — Target bawaan: **100x**

#### Pengelolaan Dzikir Custom:
- **Tambah Dzikir Custom**: Form input nama dzikir (wajib), teks Arab (opsional), transliterasi Latin (wajib), arti (opsional), dan target hitungan (wajib, 1–100.000).
- **Edit & Hapus**: Dzikir custom dapat disunting atau dihapus kapan saja.
- **Konfirmasi Ganti Dzikir**: Jika pengguna memilih dzikir lain saat sesi aktif sedang memiliki hitungan > 0, aplikasi memunculkan dialog konfirmasi apakah ingin beralih dan mereset hitungan sesi aktif.

---

### 3.4 Layar Kumpulan Doa (`DoaPage`)

**Tujuan:** Menyediakan kompilasi doa tematik harian, ibadah umroh, dan fardhu kifayah dalam antarmuka berjenjang.

#### 5 Kategori Doa Utama:
1. **Sebelum dan Sesudah Berdoa** (3 bacaan):
   - Doa Sebelum Berdoa, Doa Memohon Pengabulan, Doa Sesudah Berdoa.
2. **Doa Meminta Ampunan dan Rezeki** (1 doa):
   - Ampunan dosa, kelapangan rumah, dan keberkahan rezeki.
3. **Doa Memohon Pertolongan** (1 doa):
   - Bersandar pada daya dan kekuatan Allah (doa perlindungan dan petunjuk).
4. **Doa Umroh** (20 rangkaian doa lengkap sesuai manasik):
   - Doa Keluar Rumah, Doa Masuk Kendaraan, Doa Kendaraan Bergerak, Niat Umroh, Talbiyah, Masuk/Keluar Masjidil Haram, Melihat Ka'bah, Memulai Tawaf, Posisi Hajar Aswad, Maqam Ibrahim, Minum Air Zamzam, Menuju & Menaiki Bukit Shafa, Doa Shafa & Marwah, hingga Doa Sa'i di Pilar Hijau.
5. **Sholat Jenazah** (5 bacaan sesuai 4 takbir dan salam):
   - Takbir 1 (Al-Fatihah), Takbir 2 (Sholawat Ibrahimiyah), Takbir 3 (Doa Jenazah lengkap), Takbir 4 (Doa penutup), dan Salam.

#### Fitur Layar Doa:
- **Navigasi Hierarkis**: Beranda Doa (5 Kategori) ➔ Daftar Doa dalam Kategori ➔ Detail Halaman Doa.
- **Kartu Aksen Emas & Tipografi Amiri**: Teks Arab yang nyaman dibaca, transliterasi miring, arti terjemahan, serta kartu catatan khusus dalil rujukan (misal QS Hud: 41, QS Al-Baqarah: 125).
- **Penanganan Doa Bebas**: Untuk tahapan tawaf/sa'i yang tidak memiliki lafaz baku khusus, ditampilkan kartu keterangan ramah *Berdo'a Bebas*.
- **Bottom Sheet Drawer & Pager Bar**: Berpindah bacaan secara instan lewat daftar laci bawah atau tombol navigasi berikutnya/kembali ke awal.

---

### 3.5 Layar Pengaturan (`SettingsPage`)

**Tujuan:** Mengelola preferensi fisik, penyimpanan, dan keamanan data.

#### Fitur-Fitur:
- **Getaran (Haptic Feedback)**: Toggle ON/OFF dengan deteksi kapabilitas perangkat (`navigator.vibrate`).
- **Suara Ketukan (Audio Feedback)**: Suara klik halus sintetis melalui Web Audio API tanpa delay aset file audio.
- **Target Standar Dzikir Baru**: Mengatur default target awal saat membuat dzikir custom baru.
- **Ekspor Cadangan Data (JSON)**: Mengunduh berkas `.json` berisi preferensi dan seluruh dzikir custom.
- **Impor Cadangan Data (JSON)**: Memulihkan kembali data cadangan ke IndexedDB perangkat.
- **Hapus Seluruh Data**: Reset aman 2-tahap (Dialog Konfirmasi 1 & Konfirmasi Final) untuk mengembalikan aplikasi ke kondisi awal pabrik.
- **Panduan Install iPhone (iOS Guide Modal)**: Tutorial 4 langkah cara menambahkan aplikasi ke Layar Utama iPhone.

---

## 4. Arsitektur Teknis & Design System

### 4.1 Tech Stack
- **Framework & Language**: React 19, TypeScript 5.9, Vite 8 (Rolldown engine).
- **Styling**: Tailwind CSS v4, custom CSS variables, CSS Safe Area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`).
- **Icons**: Lucide React.
- **Local Persistence**: IndexedDB via library `idb` v8.
- **Testing**: Vitest v5 (25 unit tests mencakup counter logic, date formatting, dan input validation).
- **PWA & Service Worker**: `manifest.webmanifest`, `sw.js` cache-first policy.

### 4.2 Design Tokens & Palet Warna
| Token | Nilai Hex | Peruntukan |
|---|---|---|
| `color-primary` | `#0B5A3B` | Tombol utama, tab aktif, border fokus |
| `color-primary-dark` | `#123D2A` | Teks judul utama, header, aksen gelap |
| `color-primary-soft` | `#EAF1E3` | Latar badge, track lingkaran progress |
| `color-background` | `#FBF8F1` | Background utama aplikasi (ivory tenang) |
| `color-surface` | `#FFFFFF` | Background kartu, modal dialog |
| `color-gold` | `#D8B65C` | Aksen cincin progress saat target tercapai, garis aksen doa |
| `color-text` | `#202820` | Teks isi reguler |
| `color-muted` | `#737A72` | Teks sekunder, label tanggal, ikon inaktif |
| `color-border` | `#E8E4D9` | Garis pembatas kartu dan navigasi |
| `color-danger` | `#B42318` | Tombol reset dan aksi zona berbahaya |

### 4.3 Tipografi
- **UI Latin & Angka**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif`.
- **Teks Arab**: **Amiri** (`family=Amiri:wght@400;700`), fallback `Traditional Arabic`, `Simplified Arabic`, `serif`.
- **Pengaturan Rendering Arab**:
  ```css
  .arabic-text {
    font-family: 'Amiri', 'Traditional Arabic', 'Simplified Arabic', serif;
    direction: rtl;
    line-height: 2.2;
    font-feature-settings: "cv01" on, "cv02" on;
    text-rendering: optimizeLegibility;
  }
  ```

---

## 5. Model Data (IndexedDB Schema)

Database lokal menggunakan nama **`DzikirKuDB`** versi 2 dengan 3 Object Stores:

```ts
// 1. Store: 'dhikr'
export interface Dhikr {
  id: string;
  name: string;
  arabicText?: string;
  transliteration: string;
  meaning?: string;
  defaultTarget: number;
  isBuiltIn: boolean;
  sortOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

// 2. Store: 'activeSession'
export interface ActiveSession {
  id: string;
  dhikrId: string;
  count: number;
  target: number;
  startedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

// 3. Store: 'settings'
export interface AppSettings {
  id: 'app-settings';
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'system';
  defaultTarget: number;
  language: 'id';
  updatedAt: string; // ISO 8601
}
```

---

## 6. Persyaratan Non-Fungsional, Privasi, & Offline PWA

1. **100% Offline-First**:
   - Seluruh logika, teks doa, dan database tersimpan di memori perangkat.
   - Service worker meng-cache seluruh berkas statis dan file font Google Fonts (`fonts.googleapis.com` dan `fonts.gstatic.com`).
   - Aplikasi dapat dibuka dalam **Mode Pesawat (Airplane Mode)** tanpa koneksi internet.
2. **Privasi & Keamanan Penuh**:
   - Tidak ada pengumpulan data pribadi, analitik pelacak, login akun, atau koneksi server pihak ketiga.
3. **Mobile-First & iOS Safari Optimization**:
   - Mencegah double-tap zoom yang tidak diinginkan (`touch-action: manipulation`).
   - Penyesuaian penuh Safe Area Insets atas (notch/Dynamic Island) dan bawah (Home bar).

---

## 7. Rincian Deployment & Distribusi

- **Repository Source Code**: [https://github.com/kliknet115-Git/DzikirKu](https://github.com/kliknet115-Git/DzikirKu)
  - Branch `main`: Seluruh kode sumber, pengujian, dan dokumentasi lengkap.
  - Branch `gh-pages`: Berkas build produksi siap saji untuk web hosting statis.
- **Aplikasi Web Publik**: [https://kliknet115-git.github.io/DzikirKu/](https://kliknet115-git.github.io/DzikirKu/)
- **Cara Pasang di iPhone**:
  Buka tautan di Safari ➔ Ketuk tombol **Share** ➔ Pilih **"Add to Home Screen"** ➔ Ketuk **"Add"**.
