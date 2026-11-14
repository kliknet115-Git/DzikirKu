# ATURAN BAKU PENAMBAHAN KONTEN DOA & DZIKIR (ISLAMIC CONTENT AUDIT PROTOCOL)

Dokumen ini merupakan aturan wajib dan permanen bagi AI Assistant (Antigravity) dan seluruh pengembang dalam proyek **DzikirKu**. Setiap kali pengguna mengunggah (*upload*), meminta penambahan, atau memperbarui doa/dzikir baru, **WAJIB** dilakukan audit sumber terlebih dahulu sebelum dimasukkan ke dalam kode aplikasi.

---

## 1. TUJUAN & PRINSIP UTAMA

1. **Prioritas Keakuratan Sumber di Atas Kuantitas**: Jangan pernah mengorbankan keaslian teks Arab dan sanad demi menambah jumlah doa.
2. **Kesesuaian Matan**: Teks Arab yang dimasukkan wajib cocok dengan lafaz/matan pada sumber rujukan primer.
3. **Pemisahan Kategori Sumber (Anti-Misatribusi)**:
   - Dilarang keras mengklaim doa susunan manusia (*custom dua*) atau atsar sahabat (*athar*) sebagai hadits Nabi Muhammad ﷺ.
   - Doa yang bersumber dari Al-Qur'an wajib dilabeli sebagai `QURAN`, bukan hadits.
4. **Kejujuran Ilmiah Derajat Hadits**:
   - Derajat hadits (Sahih, Hasan, Dhaif, Maudhu') wajib menyertakan dasar atau nama ulama yang menilai (misal: Syaikh Al-Albani, Imam At-Tirmidzi, dsb.).
   - Jangan menulis "Sahih" hanya karena hadits tersebut ada di internet atau dalam sebuah kitab.
   - Jika belum ada verifikasi ulama terpercaya, tandai sebagai "Belum Ditemukan Penilaian".

---

## 2. TUJUH (7) SITUS RUJUKAN RESMI WAJIB

Verifikasi dan takhrij sumber **HANYA** boleh menggunakan 7 situs terverifikasi berikut:

### A. Referensi Hadits
1. **https://hadits.in/** (Ensiklopedi 9 Kitab Hadits / Kutubut Tis'ah)
2. **https://www.hadits.id/** (Koleksi Hadits Sahih & Sunan)
3. **https://hadits.tazkia.ac.id/** (Basis Data Hadits Tazkia)
4. **https://hadits.arina.id/** (Portal Takhrij & Hadits Arina)

### B. Referensi Al-Qur'an
5. **https://quran.kemenag.go.id/** (Lajnah Pentashihan Mushaf Al-Qur'an Kemenag RI)
6. **https://quran.ksu.edu.sa/index.php?l=id#aya=1_1&m=hafs&qaree=husary&trans=id_indonesian** (Ayah Quran KSU)

### C. Referensi Keilmuan Islam
7. **https://ilmuislam.id/** (Pustaka Ilmu Islam & Takhrij Terverifikasi)

> **PENTING**: Dilarang mengganti atau mengambil rujukan dari blog pribadi, media sosial, forum, atau situs di luar daftar 7 di atas. Simpan URL spesifik yang membuktikan keabsahan matan dan derajat hadits.

---

## 3. PROSEDUR AUDIT 5-LANGKAH (SEBELUM INPUT DATA)

Setiap doa baru yang diunggah wajib melalui 5 tahapan audit berikut:

### Langkah 1: Klasifikasi Jenis Sumber
Kelompokkan doa ke dalam salah satu dari 4 kategori:
- **`QURAN`**: Bersumber dari ayat Al-Qur'an.
  - Wajib cantumkan nama Surah dan Nomor Ayat.
  - Jika hanya mengutip sebagian ayat, wajib beri label: *Potongan QS. [Nama Surah]: [Ayat]*.
- **`HADITH`**: Bersumber dari matan hadits Nabi Muhammad ﷺ.
  - Wajib cantumkan nama kitab hadits, nama sahabat perawi, nomor hadits, dan derajat hadits.
- **`ATHAR`**: Bersumber dari perkataan/amalan sahabat atau tabi'in.
  - Wajib dikategorikan sebagai atsar, jangan dinisbatkan sebagai sabda Nabi ﷺ.
- **`CUSTOM DUA`**: Doa susunan ulama, doa umum, atau doa Asmaul Husna.
  - Boleh dibaca, tetapi dilarang diberi label hadits.

### Langkah 2: Audit Teks Arab & Harakat
- Periksa kesempurnaan huruf, harakat, dan keutuhan lafaz matan.
- **Cek Ziyadah (Tambahan Kata)**: Pastikan tidak ada penggabungan lafaz susunan manusia di awal/akhir matan hadits (seperti kasus doa "Allahumma inni atabarra'u..." yang digabung ke hadits Abu Dawud 1510).
- Jika ada variasi redaksi yang sah antar-kitab, cantumkan variasi tersebut dengan catatan sumbernya.

### Langkah 3: Audit Terjemahan Bahasa Indonesia
- Pastikan terjemahan setia pada makna teks Arab aslinya.
- Tidak boleh ada kata kunci yang hilang atau penambahan makna berlebihan yang mengubah konteks doa.

### Langkah 4: Takhrij & Derajat Hadits
- Cari berdasarkan teks Arab pada `hadits.in`, `hadits.id`, `hadits.tazkia.ac.id`, atau `hadits.arina.id`.
- Catat: Nama Kitab, Nomor Hadits, dan Penilai Derajat Hadits.
- Ingat: Penomoran hadits bisa berbeda antar-kitab/edisi. **Kecocokan MATAN (isi teks) adalah prioritas utama**, bukan sekadar angka nomor hadits.

### Langkah 5: Audit Waktu & Frekuensi Bacaan
- Verifikasi apakah jumlah bacaan (1x, 3x, 7x, 10x, 33x, 100x) bersumber dari dalil yang sahih atau sekadar target aplikasi.
- Verifikasi apakah doa tersebut khusus pagi, khusus petang, keduanya, atau dibaca setelah shalat wajib.

---

## 4. STATUS HASIL AUDIT

Setiap doa yang diperiksa harus memiliki salah satu label status audit:
- `VERIFIED`: Teks Arab, terjemahan, dan rujukan primer 100% cocok.
- `VERIFIED WITH VARIATION`: Sumber primer cocok, terdapat variasi lafaz sah yang terdokumentasi.
- `INCORRECT REFERENCE`: Teks benar, tetapi nomor hadits atau nama kitab salah rujuk.
- `INCORRECT ARABIC`: Ditemukan kesalahan huruf, harakat, atau penambahan kalimat (*ziyadah*).
- `INCORRECT TRANSLATION`: Terjemahan tidak mencerminkan teks Arab aslinya.
- `INCORRECT ATTRIBUTION`: Salah label (misal: doa susunan/atsar dilabeli hadits Nabi ﷺ).
- `GRADE NEEDS CORRECTION`: Derajat hadits keliru atau dicantumkan tanpa penilaian ulama.
- `NEEDS CONTEXT CORRECTION`: Dalil benar tetapi konteks penggunaannya tidak sesuai.
- `UNVERIFIED`: Sumber primer belum ditemukan di 7 situs rujukan (TIDAK BOLEH DITAMPILKAN SEBAGAI HADITS).

---

## 5. TATA KELOLA KODE (CODE GOVERNANCE)

Ketika menambahkan doa yang telah lolos audit ke dalam file TypeScript (`dzikirku/src/data/doa-data.ts`, `daily-dhikr-data.ts`, atau `default-dhikr.ts`):

1. **Struktur Data Wajib**:
   ```typescript
   {
     id: "kategori-urutan",
     title: "Judul Doa",
     arabic: "النَّصُّ الْعَرَبِيُّ الْمُدَقَّقُ",
     transliteration: "Transliterasi latin yang benar",
     translation: "Terjemahan bahasa Indonesia yang akurat",
     source: "Kitab/Surah & Nomor", // Contoh: "HR. Abu Dawud no. 1510", "QS. Al-Baqarah: 201"
     sourceType: "hadith" | "quran" | "athar" | "custom", // Wajib eksplisit
     grade: "Sahih menurut Syaikh Al-Albani", // Wajib jika hadith
     sourceUrl: "https://hadits.in/abu-daud/1510", // Salah satu dari 7 web rujukan
     note?: "Keterangan tambahan jika potongan ayat atau variasi matan"
   }
   ```
2. **Review & Konfirmasi**:
   - Jika doa yang diunggah pengguna memiliki status selain `VERIFIED` (misalnya tergolong doa susunan atau ada matan yang rancu), beritahukan hasil audit kepada pengguna terlebih dahulu sebelum mengintegrasikannya ke aplikasi.

