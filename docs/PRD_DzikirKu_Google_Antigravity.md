# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# DzikirKu — Digital Dzikir Counter

| Informasi | Detail |
|---|---|
| Nama produk | DzikirKu |
| Jenis produk | Aplikasi penghitung dzikir (digital tasbih) |
| Dokumen | Product Requirements Document (PRD) |
| Versi dokumen | 1.0 |
| Status | Draft siap implementasi MVP |
| Target implementasi | Google Antigravity |
| Platform MVP | Mobile-first Progressive Web App (PWA), dioptimalkan untuk iPhone/iOS Safari |
| Bahasa antarmuka | Bahasa Indonesia |
| Pengguna utama | Individu Muslim yang ingin menghitung dan mencatat aktivitas dzikir |

---

## 1. Ringkasan Produk

DzikirKu adalah aplikasi tasbih digital yang membantu pengguna menghitung dzikir, menetapkan target hitungan, memilih jenis dzikir, dan melihat riwayat aktivitas. Pengalaman utama harus sederhana: pengguna membuka aplikasi, memilih dzikir, lalu mengetuk tombol hitung berukuran besar.

Aplikasi mengadaptasi konsep visual dari referensi tasbih digital yang diberikan: penghitung fisik dengan tombol utama yang mudah dijangkau, serta cincin digital penghitung. Implementasi aplikasi menggunakan antarmuka mobile bergaya iOS dengan tampilan bersih, tenang, dan tidak mengganggu kekhusyukan.

### 1.1 Tujuan Produk

1. Menyediakan penghitung dzikir digital yang mudah digunakan dengan satu tangan.
2. Mengurangi kesalahan hitung melalui tombol undo, indikator target, dan penyimpanan otomatis.
3. Memungkinkan pengguna memilih dzikir bawaan atau membuat dzikir sendiri.
4. Menyimpan riwayat hitungan agar pengguna dapat memantau aktivitas harian, mingguan, dan bulanan.
5. Tetap dapat digunakan tanpa koneksi internet.

### 1.2 Prinsip Produk

- **Fokus pada dzikir:** layar penghitung tidak dipenuhi elemen yang tidak penting.
- **Satu aksi utama:** tombol hitung harus menjadi elemen paling jelas dan mudah disentuh.
- **Tidak kehilangan hitungan:** setiap perubahan hitungan disimpan secara lokal secara otomatis.
- **Offline-first:** fungsi penghitung dan riwayat tetap tersedia tanpa internet.
- **Konten tidak menghakimi:** target merupakan preferensi pengguna, bukan penilaian atas kualitas ibadah.
- **Akurat dan transparan:** aplikasi tidak membuat klaim agama atau menentukan keutamaan suatu dzikir.

---

## 2. Asumsi dan Batasan Implementasi

Agar pekerjaan dapat langsung dimulai di Google Antigravity, PRD ini menetapkan keputusan awal berikut.

1. MVP dibuat sebagai **PWA**, bukan aplikasi native Swift. PWA harus responsif dan terasa seperti aplikasi iPhone ketika dibuka melalui Safari atau ditambahkan ke Home Screen.
2. MVP tidak mewajibkan login dan tidak membutuhkan backend. Data disimpan di perangkat pengguna.
3. Bahasa awal hanya Bahasa Indonesia. Dukungan bahasa lain dapat ditambahkan setelah MVP.
4. Tanggal dan zona waktu mengikuti pengaturan perangkat. Tanggal Gregorian menjadi sumber utama agregasi statistik.
5. Penampilan tanggal Hijriah bersifat opsional dan tidak boleh ditampilkan menggunakan konversi yang tidak dapat dipastikan. Jika belum tersedia sumber/library yang memadai, tampilkan tanggal Gregorian saja.
6. Getaran dan suara bersifat opsional. Jika browser/perangkat tidak mendukung fitur getaran, aplikasi tetap berjalan normal tanpa error.
7. Semua target dzikir dapat diubah. Target awal pada data contoh hanya nilai awal yang dapat diedit, bukan ketetapan agama.

### 2.1 Di Luar Ruang Lingkup MVP

- Login, registrasi, dan sinkronisasi cloud antarperangkat.
- Social feed, leaderboard, kompetisi, dan berbagi pencapaian.
- Fitur komunitas atau komunikasi antar pengguna.
- Notifikasi pengingat ibadah terjadwal.
- Integrasi smartwatch atau perangkat tasbih Bluetooth.
- Konten kajian, tafsir, hadis, atau rekomendasi amalan.
- Aplikasi native App Store yang dibangun dengan Swift/SwiftUI.

---

## 3. Target Pengguna dan Kebutuhan

### 3.1 Persona Utama

**Pengguna individu** yang ingin menghitung dzikir dengan ponsel, baik saat di rumah, di perjalanan, maupun setelah salat.

### 3.2 Kebutuhan Pengguna

- Saya ingin menambah hitungan cukup dengan satu sentuhan.
- Saya ingin mengetahui jumlah hitungan saat ini dan sisa menuju target.
- Saya ingin memperbaiki hitungan jika tidak sengaja menekan tombol dua kali.
- Saya ingin berpindah jenis dzikir tanpa kehilangan catatan sesi sebelumnya.
- Saya ingin membuat dzikir sendiri dengan target yang saya tentukan.
- Saya ingin mengetahui total hitungan pada hari ini dan melihat riwayat sebelumnya.
- Saya ingin aplikasi tetap menyimpan hitungan saat koneksi internet terputus atau aplikasi ditutup.

---

## 4. Ruang Lingkup Fitur

### 4.1 Prioritas

| Prioritas | Arti |
|---|---|
| P0 — Wajib MVP | Harus tersedia sebelum MVP dinyatakan selesai |
| P1 — Penting | Diupayakan setelah fungsi P0 stabil; dapat masuk rilis minor |
| P2 — Pengembangan berikutnya | Tidak menghambat peluncuran MVP |

| Fitur | Prioritas |
|---|---|
| Counter tambah hitungan | P0 |
| Pilih dzikir bawaan | P0 |
| Target hitungan yang dapat diubah | P0 |
| Undo satu hitungan | P0 |
| Reset sesi dengan konfirmasi | P0 |
| Penyimpanan otomatis lokal | P0 |
| Riwayat sesi dan rekap harian | P0 |
| Grafik aktivitas 7 hari | P0 |
| Dzikir custom | P0 |
| Pengaturan getaran dan suara | P1 |
| Rekap mingguan dan bulanan | P0 |
| Ekspor/impor cadangan data JSON | P1 |
| Pengingat dzikir | P2 |
| Sinkronisasi cloud | P2 |
| Multi-bahasa | P2 |

---

## 5. Struktur Navigasi dan Informasi

Gunakan navigasi bawah dengan empat tab utama:

1. **Beranda** — penghitung dzikir aktif.
2. **Dzikir** — daftar dzikir dan pengelolaan dzikir custom.
3. **Riwayat** — statistik dan catatan sesi.
4. **Pengaturan** — preferensi aplikasi dan pengelolaan data.

Navigasi harus tetap mudah dijangkau pada layar ponsel. Perhatikan safe area bagian bawah iPhone agar navigasi tidak tertutup Home Indicator.

---

## 6. Spesifikasi Layar dan Fungsionalitas

## 6.1 Layar Beranda / Counter

**Tujuan:** menjadi layar utama untuk melakukan hitungan dzikir.

### Elemen UI

1. Header dengan logo/wordmark sederhana **DzikirKu** dan ikon pengaturan/notifikasi (notifikasi dapat disembunyikan pada MVP karena belum ada fitur pengingat).
2. Sapaan singkat dan tanggal hari ini.
3. Kartu **Dzikir Hari Ini** atau informasi sesi aktif.
4. Pemilih jenis dzikir aktif, misalnya Subhanallah.
5. Teks Arab, transliterasi Latin, dan arti jika tersedia.
6. Cincin progress (progress ring) yang menunjukkan hitungan terhadap target.
7. Angka hitungan saat ini dengan ukuran sangat besar.
8. Keterangan `X dari Y` dan/atau sisa hitungan menuju target.
9. Tombol **Reset**.
10. Tombol utama **Hitung** berbentuk lingkaran besar.
11. Tombol **Target** untuk mengubah target sesi.
12. Indikator pencapaian target.
13. Navigasi bawah empat tab.

### Perilaku Counter

- Nilai awal sesi baru adalah `0`.
- Setiap ketukan pada tombol utama menambah hitungan tepat `1`.
- Hitungan tidak boleh menjadi angka negatif.
- Tombol **Undo** mengurangi satu hitungan terakhir dan tidak boleh menghasilkan nilai di bawah `0`.
- Tombol Undo harus tersedia tanpa mengganggu tombol Hitung. Tempatkan sebagai tombol sekunder di dekat tombol utama atau pada kontrol sesi.
- Progress ring menggunakan rumus `min(count / target, 1)`. Progress maksimum 100%.
- Jika `count >= target`, tampilkan status **Target tercapai** dan berikan umpan balik visual yang halus.
- Setelah target tercapai, pengguna tetap boleh melanjutkan hitungan. Angka hitungan tetap bertambah; progress ring tetap 100%.
- Jika target diubah ketika sesi sedang berjalan, hitungan tidak direset. Progress dihitung ulang berdasarkan target baru.
- Ketukan cepat berulang harus dihitung satu per satu. Hindari debounce yang menyebabkan ketukan valid terbuang.
- Perubahan hitungan disimpan otomatis setelah setiap aksi.

### Tombol Reset

- Ketika ditekan, tampilkan dialog konfirmasi: `Reset hitungan sesi ini? Hitungan saat ini akan dihapus dari sesi aktif.`
- Sediakan tindakan **Batal** dan **Reset**.
- Reset tidak boleh terjadi hanya karena satu sentuhan tanpa konfirmasi.
- Reset mengembalikan hitungan sesi aktif ke `0`.
- Reset tidak membuat catatan sesi selesai secara otomatis.

### Penyelesaian / Perpindahan Sesi

- Sediakan aksi **Selesaikan sesi** pada area kontrol sesi atau menu sekunder.
- Jika pengguna menyelesaikan sesi dengan hitungan lebih dari `0`, simpan sesi ke riwayat dengan status `completed`.
- Jika pengguna memilih dzikir lain saat sesi aktif memiliki hitungan lebih dari `0`, tampilkan pilihan: **Simpan sesi**, **Buang sesi**, atau **Kembali**.
- Jika hitungan sesi masih `0`, pengguna dapat berpindah dzikir tanpa dialog.
- Setelah sesi disimpan, sesi aktif berikutnya dimulai dari `0` dengan dzikir dan target yang dipilih.
- Jangan membuat catatan riwayat ganda ketika pengguna membuka ulang aplikasi atau berpindah tab.

### Kriteria Penerimaan

- [ ] Tombol Hitung menambah tepat satu hitungan per ketukan.
- [ ] Angka dan progress ring diperbarui tanpa reload halaman.
- [ ] Hitungan bertahan setelah refresh, aplikasi ditutup, atau perangkat offline.
- [ ] Undo mengurangi satu hitungan dan tidak pernah menghasilkan angka negatif.
- [ ] Reset selalu meminta konfirmasi.
- [ ] Target tercapai ditandai dengan jelas, tetapi counter tetap dapat dilanjutkan.
- [ ] Tidak ada sesi duplikat di riwayat.

## 6.2 Layar Pilih Dzikir

**Tujuan:** memungkinkan pengguna memilih dzikir yang akan dihitung.

### Dzikir Bawaan MVP

Sediakan data awal berikut. Pengguna boleh mengubah target masing-masing.

| Nama | Teks Arab | Transliterasi | Target awal |
|---|---|---|---:|
| Subhanallah | سُبْحَانَ اللَّهِ | Subhanallah | 33 |
| Alhamdulillah | الْحَمْدُ لِلَّهِ | Alhamdulillah | 33 |
| Allahu Akbar | اللَّهُ أَكْبَرُ | Allahu Akbar | 33 |
| La ilaha illallah | لَا إِلَٰهَ إِلَّا اللَّهُ | La ilaha illallah | 100 |

**Catatan konten:** teks Arab dan transliterasi harus disimpan sebagai data terpisah agar dapat dikoreksi tanpa mengubah komponen UI. Verifikasi penulisan teks Arab sebelum rilis. Target di atas merupakan nilai awal aplikasi yang dapat diubah pengguna, bukan klaim ketentuan agama.

### Elemen UI

- Header `Pilih Dzikir` dan tombol kembali.
- Deskripsi singkat: `Pilih dzikir yang ingin Anda hitung`.
- Daftar kartu dzikir.
- Setiap kartu menampilkan teks Arab, transliterasi, target, dan status terpilih.
- Kartu dzikir aktif memiliki border/indikator hijau.
- Tombol **Dzikir custom**.

### Perilaku

- Ketuk kartu untuk memilih dzikir.
- Jika belum ada hitungan pada sesi aktif, pemilihan langsung mengaktifkan dzikir baru.
- Jika sesi aktif memiliki hitungan, terapkan alur penyimpanan/perpindahan sesi pada bagian 6.1.
- Dzikir custom minimal memiliki nama/transliterasi dan target. Teks Arab dan arti bersifat opsional.
- Validasi target: bilangan bulat minimal `1`, maksimal `100000`.
- Pengguna dapat mengedit dan menghapus dzikir custom.
- Dzikir bawaan tidak dapat dihapus, tetapi target default atau preferensi target pengguna dapat diubah.

### Form Dzikir Custom

Field:

| Field | Wajib | Aturan |
|---|---|---|
| Nama dzikir | Ya | 2–60 karakter |
| Teks Arab | Tidak | Unicode, boleh kosong |
| Transliterasi | Ya | 2–100 karakter |
| Arti/keterangan | Tidak | Maksimal 160 karakter |
| Target default | Ya | Integer 1–100000 |

### Kriteria Penerimaan

- [ ] Empat dzikir bawaan tersedia saat instalasi pertama.
- [ ] Dzikir aktif ditandai dengan jelas.
- [ ] Dzikir custom dapat ditambah, diedit, dipilih, dan dihapus.
- [ ] Target tidak menerima nilai kosong, nol, negatif, desimal, atau melebihi batas.
- [ ] Perpindahan dzikir tidak menghilangkan hitungan secara diam-diam.

## 6.3 Layar Riwayat Dzikir

**Tujuan:** menampilkan rekap dan sesi yang telah disimpan.

### Elemen UI

1. Header `Riwayat Dzikir`.
2. Tab periode **Harian**, **Mingguan**, dan **Bulanan**.
3. Kartu ringkasan periode terpilih:
   - tanggal/rentang periode;
   - total hitungan;
   - jumlah sesi (opsional tetapi disarankan).
4. Grafik aktivitas:
   - Harian: total hitungan per hari selama 7 hari terakhir.
   - Mingguan: total hitungan per minggu selama 4–8 minggu terakhir.
   - Bulanan: total hitungan per bulan selama 6–12 bulan terakhir.
5. Daftar sesi terbaru dengan tanggal, nama dzikir, jumlah hitungan, dan status.
6. Aksi `Lihat semua` untuk membuka seluruh catatan sesi.
7. Tampilan kosong yang mengarahkan pengguna memulai sesi pertama.

### Aturan Agregasi

- Total hitungan periode merupakan penjumlahan `count` seluruh sesi yang disimpan dan tanggal selesainya berada di periode tersebut.
- Gunakan `completedAt` sebagai tanggal sesi untuk agregasi.
- Sesi yang belum diselesaikan tidak masuk ke riwayat dan agregasi.
- Gunakan zona waktu lokal perangkat untuk menentukan hari dan tanggal.
- Hari dimulai pukul 00.00 waktu lokal.
- Grafik 7 hari harus menampilkan label hari dalam Bahasa Indonesia dan angka total pada tooltip/label bila ruang mencukupi.
- Jika tidak ada aktivitas pada suatu hari, nilai grafik adalah `0`, bukan menghilangkan tanggal tersebut.
- Jika pengguna mengubah zona waktu perangkat, data historis harus tetap konsisten sebisa mungkin. Simpan timestamp ISO/UTC dan gunakan zona waktu lokal saat menampilkan agregasi.

### Kriteria Penerimaan

- [ ] Tab Harian, Mingguan, dan Bulanan menghasilkan agregasi yang benar.
- [ ] Total hitungan sama dengan penjumlahan sesi yang tersimpan dalam periode.
- [ ] Grafik tetap menampilkan periode tanpa aktivitas dengan nilai nol.
- [ ] Sesi terbaru tampil paling atas.
- [ ] Riwayat tetap tersedia setelah aplikasi ditutup dan dibuka kembali.
- [ ] Tampilan kosong muncul jika belum ada sesi tersimpan.

## 6.4 Layar Pengaturan

**Tujuan:** mengatur preferensi aplikasi dan menjaga data pengguna.

### Pengaturan MVP

- Getaran saat tombol Hitung ditekan: ON/OFF.
- Suara saat tombol Hitung ditekan: ON/OFF.
- Tema: mengikuti sistem / terang (MVP boleh hanya terang).
- Target default untuk dzikir baru.
- Tentang aplikasi dan versi.
- Hapus seluruh data lokal dengan konfirmasi dua tahap.

### Perilaku Getaran dan Suara

- Default getaran: OFF atau ON sesuai hasil pengujian kenyamanan; sediakan kontrol yang jelas.
- Default suara: OFF.
- Hormati status mute dan kemampuan browser.
- Jika API getaran tidak didukung, jangan menampilkan error; kontrol dapat diberi keterangan `Tidak didukung perangkat` atau dinonaktifkan.
- Jangan memutar suara otomatis saat aplikasi pertama dibuka.

### Pengelolaan Data

- Hapus data harus meminta konfirmasi yang jelas dan menjelaskan bahwa riwayat serta dzikir custom di perangkat akan terhapus.
- Fitur ekspor/impor JSON adalah P1. Bila diimplementasikan, validasi struktur file saat impor dan jangan menimpa data lama tanpa persetujuan pengguna.

---

## 7. Design System dan UI Guidelines

### 7.1 Arah Visual

Gunakan pendekatan **iOS-inspired, clean, calm, premium**. Referensi visual berupa tiga mockup iPhone yang diberikan pengguna: layar penghitung, pemilihan dzikir, dan riwayat.

### 7.2 Palet Warna

| Token | Warna | Penggunaan |
|---|---|---|
| `color-primary` | `#0B5A3B` | Tombol utama, tab aktif, aksen utama |
| `color-primary-dark` | `#123D2A` | Teks utama dan aksen gelap |
| `color-primary-soft` | `#EAF1E3` | Latar kartu aktif dan progress track |
| `color-background` | `#FBF8F1` | Latar aplikasi ivory |
| `color-surface` | `#FFFFFF` | Kartu dan modal |
| `color-gold` | `#D8B65C` | Aksen ring/tombol dan detail |
| `color-text` | `#202820` | Teks utama |
| `color-muted` | `#737A72` | Teks sekunder |
| `color-border` | `#E8E4D9` | Garis pemisah dan border |
| `color-danger` | `#B42318` | Reset/hapus dan pesan kesalahan |

Warna harus memiliki kontras yang memadai. Jangan menggunakan warna emas untuk teks berukuran kecil di atas latar putih jika kontrasnya rendah.

### 7.3 Tipografi

- Gunakan font sistem iOS jika tersedia, dengan fallback `Inter`, `SF Pro Display`, `-apple-system`, `BlinkMacSystemFont`, dan `sans-serif`.
- Angka counter harus besar, tebal, dan mudah dibaca.
- Teks Arab menggunakan font yang mendukung aksara Arab dengan baik, misalnya Noto Naskh Arabic atau fallback sistem yang sesuai.
- Atur line-height teks Arab agar harakat tidak terpotong.

### 7.4 Komponen dan Spasi

- Kartu: radius 18–24 px.
- Tombol utama counter: lingkaran, diameter sekitar 112–136 px pada viewport ponsel umum.
- Target area sentuh minimum 44 × 44 CSS px; tombol Hitung dibuat jauh lebih besar.
- Gunakan shadow sangat halus, bukan efek 3D berat.
- Gunakan ikon outline sederhana dan konsisten.
- Sisakan ruang kosong yang cukup; hindari ornamen masjid/geometri yang mengganggu angka counter.
- Hindari scroll horizontal.
- Perhatikan notch, status bar, dan safe-area inset iPhone.

### 7.5 Responsivitas

- Desain utama untuk lebar 375–430 px.
- Tetap layak digunakan pada layar lebih kecil mulai 320 px.
- Pada tablet/desktop, tampilkan konten dengan lebar maksimum yang nyaman dan jangan meregangkan tombol counter secara berlebihan.
- Pastikan keyboard tidak menutupi field form dzikir custom.

---

## 8. Model Data

Gunakan penyimpanan lokal berbasis IndexedDB. `localStorage` hanya boleh dipakai untuk preferensi ringan atau fallback, bukan sebagai satu-satunya penyimpanan riwayat.

### 8.1 Entity: `Dhikr`

```ts
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
```

### 8.2 Entity: `ActiveSession`

```ts
export interface ActiveSession {
  id: string;
  dhikrId: string;
  count: number;
  target: number;
  startedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### 8.3 Entity: `DhikrSession`

```ts
export interface DhikrSession {
  id: string;
  dhikrId: string;
  dhikrNameSnapshot: string;
  dhikrArabicSnapshot?: string;
  dhikrTransliterationSnapshot: string;
  count: number;
  target: number;
  startedAt: string; // ISO 8601
  completedAt: string; // ISO 8601
  durationSeconds: number;
  status: "completed";
}
```

Simpan snapshot nama dzikir agar riwayat tetap terbaca walaupun pengguna kemudian mengubah atau menghapus dzikir custom.

### 8.4 Entity: `AppSettings`

```ts
export interface AppSettings {
  id: "app-settings";
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  theme: "light" | "system";
  defaultTarget: number;
  language: "id";
  updatedAt: string;
}
```

### 8.5 Relasi dan Aturan Data

- Satu `Dhikr` dapat memiliki banyak `DhikrSession`.
- Hanya ada satu `ActiveSession` aktif dalam MVP.
- `ActiveSession` harus dipulihkan saat aplikasi dibuka kembali.
- `DhikrSession` adalah arsip yang tidak berubah ketika data dzikir sumber diedit.
- Gunakan UUID untuk ID.
- Semua timestamp disimpan dalam ISO 8601/UTC. Tampilkan berdasarkan zona waktu lokal perangkat.
- Lakukan validasi saat membaca data dari IndexedDB; data rusak tidak boleh membuat aplikasi gagal dibuka.

---

## 9. Aturan Bisnis dan Perhitungan

### 9.1 Counter

```ts
function incrementCount(count: number): number {
  return count + 1;
}

function decrementCount(count: number): number {
  return Math.max(0, count - 1);
}

function getProgress(count: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(count / target, 1);
}

function getRemaining(count: number, target: number): number {
  return Math.max(0, target - count);
}
```

### 9.2 Perhitungan Rekap

```ts
const totalCount = sessionsInPeriod.reduce(
  (sum, session) => sum + session.count,
  0
);
```

Pastikan filter periode menggunakan batas awal dan akhir periode dalam zona waktu lokal, kemudian dibandingkan dengan timestamp sesi.

### 9.3 Keamanan terhadap Double Tap dan Race Condition

- Update counter harus bersifat atomik di state aplikasi.
- Penyimpanan async tidak boleh mengembalikan nilai state ke hitungan sebelumnya.
- Saat beberapa ketukan terjadi dengan cepat, semua ketukan harus diproses berurutan.
- Hindari men-disable tombol Hitung selama proses penyimpanan IndexedDB. UI harus tetap responsif.

---

## 10. Persyaratan Teknis

### 10.1 Stack yang Direkomendasikan

Gunakan stack yang sederhana, umum, dan mudah dipelihara oleh Google Antigravity:

- **Frontend:** React + TypeScript + Vite.
- **Styling:** Tailwind CSS atau CSS Modules dengan design tokens. Jangan mencampur banyak pendekatan styling.
- **Icons:** Lucide React.
- **Local database:** IndexedDB dengan library kecil seperti `idb` atau Dexie.
- **Charts:** Recharts atau library chart ringan yang mendukung responsivitas.
- **PWA:** manifest dan service worker untuk installability serta caching aset aplikasi.
- **Testing:** Vitest + React Testing Library; Playwright untuk alur end-to-end bila tersedia.

Jika proyek yang sudah ada menggunakan stack berbeda, audit terlebih dahulu dan pertahankan stack yang stabil. Jangan mengganti stack tanpa alasan teknis.

### 10.2 Struktur Folder Rekomendasi

```text
dzikirku/
├── public/
│   ├── icons/
│   ├── manifest.webmanifest
│   └── ...
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── providers/
│   ├── components/
│   │   ├── layout/
│   │   ├── counter/
│   │   ├── dhikr/
│   │   ├── history/
│   │   └── ui/
│   ├── features/
│   │   ├── home/
│   │   ├── dhikr-library/
│   │   ├── history/
│   │   └── settings/
│   ├── hooks/
│   ├── lib/
│   │   ├── database.ts
│   │   ├── date-utils.ts
│   │   ├── haptics.ts
│   │   └── validation.ts
│   ├── data/
│   │   └── default-dhikr.ts
│   ├── types/
│   ├── styles/
│   └── main.tsx
├── tests/
├── README.md
└── package.json
```

### 10.3 Persistensi dan Offline

- Semua fungsi inti harus berjalan tanpa koneksi internet.
- Simpan data counter aktif setelah setiap perubahan.
- Cache file aplikasi statis melalui service worker.
- Tampilkan indikator offline hanya jika memang bermanfaat; jangan mengganggu counter.
- Jika penyimpanan gagal, tampilkan pesan yang jelas dan jangan berpura-pura bahwa data sudah tersimpan.
- Saat aplikasi dimulai, tampilkan data dari IndexedDB sebelum menginisialisasi sesi kosong.

### 10.4 PWA dan iOS

- Sediakan `manifest.webmanifest` dengan nama `DzikirKu`, short name `DzikirKu`, ikon aplikasi, warna tema, dan `display: standalone`.
- Sediakan ikon ukuran standar PWA, minimal 192×192 dan 512×512.
- Atur `theme-color` dan status bar agar selaras dengan warna aplikasi.
- Gunakan CSS `env(safe-area-inset-top)` dan `env(safe-area-inset-bottom)`.
- Uji melalui Safari iOS, termasuk setelah aplikasi ditambahkan ke Home Screen.
- Jangan mengasumsikan `navigator.vibrate()` tersedia pada iOS Safari. Gunakan feature detection.
- Data lokal browser dapat hilang jika pengguna menghapus data situs/browser. Beri keterangan di Pengaturan; fitur ekspor data menjadi opsi backup yang penting untuk rilis berikutnya.

---

## 11. Persyaratan Non-Fungsional

| Area | Persyaratan |
|---|---|
| Performa | Counter merespons segera, idealnya di bawah 100 ms secara visual pada perangkat modern |
| Keandalan | Tidak kehilangan hitungan setelah refresh atau aplikasi ditutup normal |
| Offline | Counter, daftar dzikir, pengaturan, dan riwayat tersedia offline setelah aplikasi dimuat pertama kali |
| Privasi | Tidak mengirim data hitungan ke server pada MVP |
| Keamanan | Validasi input; jangan merender teks custom sebagai HTML mentah |
| Aksesibilitas | Label kontrol jelas, kontras memadai, ukuran sentuh minimal 44 px |
| Kompatibilitas | Safari iOS versi modern dan browser Chromium modern |
| Responsif | Tidak ada overflow horizontal pada ponsel |
| Maintainability | TypeScript strict mode, komponen reusable, fungsi bisnis terpisah dari UI |

---

## 12. Privasi dan Keamanan Data

- MVP menyimpan data hanya di perangkat pengguna.
- Jangan meminta izin kontak, lokasi, kamera, mikrofon, atau akses lain yang tidak dibutuhkan.
- Jangan menambahkan analytics pihak ketiga pada MVP tanpa keputusan eksplisit.
- Jangan mengirim teks dzikir custom atau riwayat ke layanan eksternal.
- Hapus data lokal hanya setelah konfirmasi.
- Jika kelak ditambahkan sinkronisasi cloud, buat persetujuan pengguna, kebijakan privasi, dan mekanisme penghapusan akun/data sebelum rilis.

---

## 13. Error State dan Edge Cases

1. **Penyimpanan gagal:** tampilkan pesan `Hitungan belum berhasil disimpan. Periksa ruang penyimpanan perangkat.` dan pertahankan nilai di memori selama aplikasi masih terbuka.
2. **Data IndexedDB rusak:** lakukan penanganan error dan tawarkan reset data lokal; jangan crash pada layar kosong.
3. **Target tidak valid:** tampilkan validasi dekat input.
4. **Dzikir custom dihapus saat sedang aktif:** minta konfirmasi; pertahankan snapshot sesi dan pindahkan pengguna ke dzikir bawaan atau minta memilih dzikir lain.
5. **Aplikasi ditutup saat sesi aktif:** pulihkan hitungan dan target yang terakhir tersimpan.
6. **Target tercapai:** jangan menghentikan counter secara otomatis.
7. **Hitungan sangat besar:** tetap tampilkan dengan format angka yang terbaca; jangan overflow dari layout.
8. **Tidak ada riwayat:** tampilkan empty state, bukan grafik yang rusak.
9. **Browser tidak mendukung getaran:** fitur lain tetap berjalan.
10. **Pengguna mengetuk Undo pada hitungan nol:** tidak ada perubahan dan tidak ada error.
11. **Perpindahan tanggal saat sesi aktif:** simpan timestamp sesi; sesi dicatat pada waktu penyelesaian (`completedAt`).
12. **Pengguna menekan tombol Hitung berulang kali:** jangan kehilangan event yang valid karena debounce yang terlalu agresif.

---

## 14. Analitik Produk dan KPI MVP

Karena MVP bersifat lokal dan tanpa backend, KPI berikut dapat digunakan sebagai kriteria evaluasi melalui pengujian manual atau telemetry yang baru ditambahkan dengan persetujuan di masa depan.

- Keberhasilan menyelesaikan alur: buka aplikasi → pilih dzikir → hitung → selesaikan sesi → lihat riwayat.
- Tidak ada kehilangan hitungan pada skenario refresh, tutup/buka ulang, dan offline.
- Tidak ada duplikasi sesi pada riwayat.
- Semua target valid dan perubahan target tidak mereset counter.
- Pengguna dapat melakukan satu hitungan dengan satu tap tanpa membuka menu tambahan.
- Tidak ada error kritis pada Safari iOS dan Chrome Android.

---

## 15. Test Plan dan Acceptance Test

### 15.1 Unit Test

- Increment: `0 → 1`, `12 → 13`.
- Decrement: `1 → 0`, `0 → 0`.
- Progress: `0/33 → 0`, `12/33 → 36.36%`, `33/33 → 100%`, `40/33 → 100%`.
- Remaining: `12/33 → 21`, `33/33 → 0`, `40/33 → 0`.
- Validasi target: menerima integer 1–100000 dan menolak nilai tidak valid.
- Agregasi riwayat: memastikan total harian/mingguan/bulanan benar.
- Perhitungan batas hari lokal: menguji sesi dekat pergantian tanggal.

### 15.2 Integration Test

- Counter tersimpan ke IndexedDB setelah setiap ketukan.
- ActiveSession dipulihkan setelah reload.
- Selesaikan sesi membuat satu record DhikrSession.
- Selesaikan sesi yang sama tidak membuat record kedua.
- Pergantian dzikir menawarkan simpan/buang/kembali jika hitungan lebih dari nol.
- Dzikir custom tersimpan dan muncul setelah aplikasi dimulai ulang.
- Hapus dzikir custom tidak merusak tampilan riwayat lama.

### 15.3 End-to-End Test

**Skenario A — Menghitung dzikir sampai target**
1. Buka Beranda.
2. Pilih Subhanallah.
3. Tekan Hitung 33 kali.
4. Pastikan counter menunjukkan 33 dari 33 dan status target tercapai.
5. Tekan Hitung lagi.
6. Pastikan counter menjadi 34 dan progress tetap 100%.
7. Selesaikan sesi.
8. Buka Riwayat dan pastikan sesi berisi 34 hitungan.

**Skenario B — Undo dan reset**
1. Hitung 5 kali.
2. Tekan Undo sekali dan pastikan menjadi 4.
3. Tekan Reset.
4. Pilih Batal dan pastikan tetap 4.
5. Tekan Reset lagi dan konfirmasi.
6. Pastikan hitungan kembali menjadi 0.

**Skenario C — Pemulihan sesi**
1. Hitung 12 kali.
2. Tutup/refresh aplikasi.
3. Buka kembali.
4. Pastikan hitungan tetap 12 dan target tidak berubah.

**Skenario D — Dzikir custom**
1. Buka tab Dzikir.
2. Tambahkan dzikir custom dengan nama, transliterasi, dan target 50.
3. Pilih dzikir custom.
4. Hitung 10 kali.
5. Selesaikan sesi.
6. Pastikan dzikir custom dan riwayatnya tersimpan.

**Skenario E — Riwayat**
1. Buat beberapa sesi pada tanggal yang sama dan tanggal berbeda.
2. Periksa rekap Harian, Mingguan, dan Bulanan.
3. Cocokkan nilai total grafik dengan penjumlahan sesi.

---

## 16. Tahapan Implementasi di Google Antigravity

Jangan meminta agent membuat seluruh aplikasi dalam satu instruksi besar tanpa checkpoint. Implementasikan bertahap, jalankan aplikasi, dan uji setelah setiap tahap.

### Tahap 1 — Setup dan Fondasi

- Audit folder proyek dan tools yang tersedia.
- Buat proyek React + TypeScript + Vite jika belum ada proyek.
- Terapkan konfigurasi linting dan TypeScript strict.
- Siapkan design tokens, font, layout, dan navigasi bawah.
- Buat empat rute/tab utama dengan placeholder.

**Definition of Done:** aplikasi berjalan lokal, layout mobile benar, navigasi antar-tab berfungsi.

### Tahap 2 — Database dan Counter

- Implementasikan IndexedDB.
- Seed empat dzikir bawaan saat database pertama kali dibuat.
- Implementasikan ActiveSession dan pemulihan sesi.
- Buat tombol Hitung, Undo, Reset dengan konfirmasi, progress ring, serta pengaturan target.
- Pastikan ketukan cepat tidak hilang.

**Definition of Done:** seluruh fungsi hitung bekerja dan hitungan pulih setelah reload/offline.

### Tahap 3 — Daftar Dzikir dan Dzikir Custom

- Buat layar pilih dzikir.
- Implementasikan pemilihan dzikir dan perpindahan sesi.
- Buat tambah/edit/hapus dzikir custom.
- Validasi semua field.

**Definition of Done:** seluruh alur dzikir bawaan dan custom bekerja tanpa kehilangan sesi.

### Tahap 4 — Riwayat dan Grafik

- Implementasikan penyimpanan sesi selesai.
- Buat agregasi harian, mingguan, bulanan.
- Buat grafik dan daftar sesi.
- Uji batas tanggal dan zona waktu.

**Definition of Done:** angka pada kartu, grafik, dan daftar riwayat konsisten.

### Tahap 5 — Pengaturan, PWA, dan Offline

- Implementasikan pengaturan getaran/suara.
- Tambahkan manifest, ikon, service worker, dan caching.
- Tambahkan safe-area iOS.
- Uji Safari iOS dan mode Home Screen.

**Definition of Done:** aplikasi dapat di-install sebagai PWA dan fungsi inti berjalan offline.

### Tahap 6 — QA dan Penyempurnaan

- Jalankan unit test, integration test, dan E2E test.
- Uji ukuran layar 320, 375, 390, 430 px.
- Periksa aksesibilitas, kontras, font Arab, dan safe area.
- Perbaiki bug sebelum menambahkan fitur P1/P2.

**Definition of Done:** seluruh acceptance criteria P0 terpenuhi dan tidak ada bug kritis yang diketahui.

---

## 17. Instruksi Utama untuk Google Antigravity

Gunakan teks berikut sebagai prompt utama saat memulai proyek. Lampirkan file PRD ini sebagai konteks.

> Anda bertindak sebagai Senior Product Engineer dan Senior UI Engineer. Bangun aplikasi bernama **DzikirKu** berdasarkan PRD terlampir. Target MVP adalah PWA mobile-first dengan tampilan iOS-inspired, Bahasa Indonesia, dan offline-first.
>
> Sebelum menulis kode, baca seluruh PRD, periksa struktur folder/proyek yang sudah ada, lalu buat ringkasan rencana implementasi dan daftar file yang akan dibuat/diubah. Jangan menghapus atau mengganti konfigurasi proyek yang sudah berfungsi tanpa alasan teknis.
>
> Prioritaskan akurasi fungsi counter dan persistensi data. Gunakan React + TypeScript + Vite jika belum ada stack yang ditentukan. Gunakan IndexedDB untuk data dzikir, sesi aktif, riwayat, dan pengaturan yang relevan. Pisahkan business logic dari komponen UI. Terapkan TypeScript strict, validasi input, dan error handling.
>
> Ikuti design system pada PRD: ivory background, deep Islamic green, soft green cards, dan aksen gold. Buat UI bersih, elegan, minim ornamen, mudah digunakan dengan satu tangan, serta responsif untuk iPhone. Tombol Hitung harus menjadi aksi paling dominan.
>
> Implementasikan secara bertahap sesuai Tahap 1 sampai Tahap 6. Setelah setiap tahap, jalankan aplikasi dan test yang relevan, perbaiki error, lalu laporkan file yang berubah, hasil pengujian, dan pekerjaan yang belum selesai. Jangan mengklaim fitur selesai jika belum diuji.
>
> Jangan menambahkan login, backend, cloud sync, iklan, analytics, atau fitur di luar scope MVP tanpa persetujuan. Jangan mengarang dalil atau klaim agama. Gunakan data dzikir bawaan persis sesuai PRD dan jadikan target dapat diedit pengguna.
>
> Hasil akhir harus dapat dijalankan secara lokal dengan instruksi yang jelas di README, memiliki PWA manifest dan offline caching, serta memenuhi seluruh acceptance criteria P0 pada PRD.

---

## 18. Definition of MVP Complete

MVP DzikirKu dapat dinyatakan selesai apabila seluruh kondisi berikut terpenuhi:

- [ ] Pengguna dapat membuka aplikasi di browser ponsel dan menambahkannya ke Home Screen sebagai PWA.
- [ ] Beranda menampilkan dzikir aktif, hitungan, target, dan progress ring.
- [ ] Tombol Hitung dan Undo berfungsi akurat.
- [ ] Reset memerlukan konfirmasi.
- [ ] Hitungan dan sesi aktif tersimpan setelah reload dan dapat dipulihkan.
- [ ] Empat dzikir bawaan tersedia.
- [ ] Pengguna dapat membuat, mengedit, memilih, dan menghapus dzikir custom.
- [ ] Perpindahan dzikir tidak membuang hitungan tanpa persetujuan.
- [ ] Sesi selesai tersimpan satu kali ke riwayat.
- [ ] Rekap Harian, Mingguan, dan Bulanan benar.
- [ ] Grafik dan daftar riwayat konsisten.
- [ ] Fitur inti tetap berjalan tanpa koneksi internet.
- [ ] Tidak ada bug kritis pada Safari iOS dan browser Chromium modern.
- [ ] README menjelaskan cara instalasi, menjalankan, build, dan pengujian aplikasi.

---

## 19. Risiko dan Keputusan yang Perlu Dijaga

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data lokal terhapus oleh pengguna/browser | Riwayat hilang | Jelaskan batasan local-only; prioritaskan ekspor/impor JSON pada rilis P1 |
| Dukungan getaran berbeda antarperangkat | Fitur tidak konsisten | Feature detection dan fallback tanpa error |
| Tanggal/Hijriah tidak akurat | Informasi menyesatkan | Gunakan Gregorian sebagai sumber utama; Hijriah hanya jika sumber akurat tersedia |
| Ketukan cepat tidak tercatat | Hitungan salah | Uji rapid tap dan pastikan state update atomik |
| Riwayat ganda | Statistik salah | Buat sesi hanya pada aksi penyelesaian eksplisit dan gunakan ID unik |
| Teks Arab tidak terbaca | Pengalaman buruk | Gunakan font Arab yang sesuai dan uji harakat serta line-height |
| Scope melebar | MVP terlambat dan sulit stabil | Tuntaskan P0 sebelum fitur P1/P2 |

---

## 20. Catatan Versi Berikutnya

Fitur yang dapat dipertimbangkan setelah MVP stabil:

- Backup dan restore data melalui file JSON.
- Sinkronisasi antarperangkat dengan akun pengguna.
- Widget counter di Home Screen jika platform memungkinkan.
- Pengingat waktu dzikir yang dapat dikonfigurasi.
- Tema gelap.
- Multi-bahasa.
- Native wrapper atau aplikasi native iOS/Android jika kebutuhan distribusi App Store/Play Store sudah jelas.

**Prinsip keputusan:** jangan menambahkan fitur baru sebelum counter, penyimpanan lokal, perpindahan sesi, dan riwayat terbukti akurat. Untuk aplikasi tasbih digital, keandalan hitungan jauh lebih penting daripada banyaknya fitur.
