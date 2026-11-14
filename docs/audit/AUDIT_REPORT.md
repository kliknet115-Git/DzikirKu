# LAPORAN AUDIT KONTEN DOA DAN DZIKIR DZIKIRKU
**Aplikasi:** DzikirKu (https://kliknet115-git.github.io/DzikirKu/)  
**Tim Penilai:** Islamic Content Researcher, Hadith Verification Researcher (Takhrij Hadits), Qur'an Text Verification Specialist, Arabic Text Proofreader, Software Quality Assurance (QA) Engineer  
**Tanggal Audit:** 14 November 2026  
**Status Audit:** SELESAI (Audit Only - Zero Code Modification)

---

## DAFTAR ISI
1. [BAGIAN 1 — EXECUTIVE SUMMARY](#bagian-1--executive-summary)
2. [BAGIAN 2 — DAFTAR INVENTARIS KONTEN](#bagian-2--daftar-inventaris-konten)
3. [BAGIAN 3 — TEMUAN KESALAHAN](#bagian-3--temuan-kesalahan)
4. [BAGIAN 4 — DETAIL VERIFIKASI](#bagian-4--detail-verifikasi)
5. [BAGIAN 5 — ITEM YANG SUDAH BENAR](#bagian-5--item-yang-sudah-benar)
6. [BAGIAN 6 — REKOMENDASI PERBAIKAN](#bagian-6--rekomendasi-perbaikan)
7. [BAGIAN 7 — BUKTI VERIFIKASI](#bagian-7--bukti-verifikasi)

---

## BAGIAN 1 — EXECUTIVE SUMMARY

Audit menyeluruh telah dilaksanakan terhadap seluruh konten doa dan dzikir dalam aplikasi **DzikirKu**, mencakup **116 item** yang tersebar di 3 berkas data: `src/data/default-dhikr.ts` (7 item), `src/data/daily-dhikr-data.ts` (37 item dzikir pagi & petang), dan `src/data/doa-data.ts` (72 item dalam 8 kategori).

Pemeriksaan dilakukan secara komparatif langsung terhadap naskah primer menggunakan 7 situs rujukan yang diotorisasi:
1. **Quran Kemenag** (https://quran.kemenag.go.id/)
2. **Quran KSU / King Saud University** (https://quran.ksu.edu.sa/)
3. **Hadits.in (Lidwa Pusaka 9 Imam)** (https://hadits.in/)
4. **Hadits.id** (https://www.hadits.id/)
5. **Hadits Tazkia** (https://hadits.tazkia.ac.id/)
6. **Hadits Arina** (https://hadits.arina.id/)
7. **IlmuIslam.id** (https://ilmuislam.id/)

### Ringkasan Angka & Metrik Aktual

| Metrik Evaluasi | Jumlah Item | Persentase Aktual |
|---|:---:|:---:|
| **Total Konten yang Diaudit** | **116** | **100.00%** |
| Konten Bersumber Al-Qur'an (`QURAN`) | 41 | 35.34% |
| Konten Bersumber Hadits Nabawi (`HADITH`) | 58 | 50.00% |
| Konten Bersumber Atsar Sahabat (`ATHAR`) | 6 | 5.17% |
| Konten Doa Susunan / Munajat (`CUSTOM DUA`) | 11 | 9.48% |
| **Total Item Terverifikasi (Valid)** | **106** | **91.38%** |
| - *Terverifikasi Penuh (`VERIFIED`)* | 74 | 63.79% |
| - *Terverifikasi dengan Catatan/Variasi (`VERIFIED WITH VARIATION`)* | 32 | 27.59% |
| **Total Item Memerlukan Koreksi/Tindakan** | **10** | **8.62%** |
| - *Ketidaktepatan Referensi (`INCORRECT REFERENCE`)* | 2 | 1.72% |
| - *Ketidaktepatan Teks Arab / Ziyadah (`INCORRECT ARABIC`)* | 1 | 0.86% |
| - *Kekeliruan Atribusi / Misattribution (`INCORRECT ATTRIBUTION`)* | 2 | 1.72% |
| - *Koreksi Derajat Hadits (`GRADE NEEDS CORRECTION`)* | 2 | 1.72% |
| - *Koreksi Konteks / Frekuensi (`NEEDS CONTEXT CORRECTION`)* | 3 | 2.59% |
| - *Kesalahan Terjemahan Fatal (`INCORRECT TRANSLATION`)* | 0 | 0.00% |
| - *Belum Terverifikasi (`UNVERIFIED`)* | 0 | 0.00% |

### Kesimpulan Eksekutif
Aplikasi DzikirKu memiliki basis keakuratan teks dan sumber yang tinggi (**91.38% terverifikasi valid**). Terjemahan bahasa Indonesia di seluruh aplikasi secara umum sangat baik, fasih, dan setia pada makna bahasa Arab. Namun demikian, audit mengidentifikasi **10 item spesifik (8.62%)** yang memerlukan pembenahan kritis guna memenuhi standar keilmuan Islam dan QA content:
1. **Pemisahan Doa Susunan dari Matan Hadits Nabawi**: Pada doa memohon pertolongan (`help-1`), kalimat munajat ulama disatukan dengan hadits Abu Dawud 1510 tanpa pemisahan, dan pada doa memohon surga Firdaus (`doa-pilihan-30`), doa susunan masyhur diklaim verbatim sebagai sabda Nabi dalam HR. Bukhari 7423.
2. **Koreksi Tambahan Lafaz (Ziyadah)**: Pada doa minum air zamzam (`umrah-15`), terdapat penambahan lafaz `بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ` yang tidak ditemukan dalam naskah riwayat Ad-Daraquthni 2/288 maupun Al-Hakim 1/473.
3. **Ketepatan Penomoran & Kitab Hadits**: Penomoran hadits doa takbir keempat sholat jenazah (`janazah-4`) tertulis Abu Dawud 3201 (padahal matan pendek ada di no. 3199 & Ibnu Majah 1498); dzikir petang perlindungan 3x (`petang-16`) merujuk HR. Muslim 2709 (yang tidak memuat ketentuan 3x sore), seharusnya merujuk HR. At-Tirmidzi no. 3604.
4. **Keterbukaan Derajat Hadits**: Hadits riwayat Ibnu Majah no. 2957 pada doa tawaf (`umrah-11`) berderajat Dhaif, dan lafaz memulai tawaf (`umrah-9`) berstatus atsar sahabat; status ini perlu dicantumkan secara transparan.
5. **Koreksi Teks Metadata & Frekuensi**: Metadata frekuensi pada `petang-1` dan catatan pada `petang-17` masih memuat kata "dzikir pagi" akibat duplikasi templat, serta target 70x pada doa kecukupan rezeki halal (`builtin-doa-kecukupan-rezeki-halal`) perlu dilengkapi keterangan rujukan hadits dan latar belakang amalan ulama.

---

## BAGIAN 2 — DAFTAR INVENTARIS KONTEN

Berikut adalah tabel inventaris lengkap dari seluruh **116 item** doa dan dzikir dalam aplikasi DzikirKu:

| No | Kategori | Nama Doa | Jenis Sumber | Referensi Saat Ini | Status Audit |
|:---:|---|---|:---:|---|:---:|
| 1 | Dzikir Bawaan | Subhanallah | HADITH | Subhanallah | VERIFIED |
| 2 | Dzikir Bawaan | Alhamdulillah | HADITH | Alhamdulillah | VERIFIED |
| 3 | Dzikir Bawaan | Allahuakbar | HADITH | Allahuakbar | VERIFIED |
| 4 | Dzikir Bawaan | Lailaha illallah | HADITH | Lailaha illallah | VERIFIED |
| 5 | Dzikir Bawaan | Subhanallahi wabihamdihi | HADITH | Subhanallahi wabihamdihi | VERIFIED |
| 6 | Dzikir Bawaan | Astagfirullaha waatubu ilaih | HADITH | Astagfirullaha waatubu ilaih | VERIFIED |
| 7 | Dzikir Bawaan | Doa Memohon Kecukupan Rezeki Halal | HADITH | Allāhummak-finī bi ḥalālika ‘an ḥarāmika, wa aghninī bi faḍlika ‘amman siwāka | NEEDS CONTEXT CORRECTION |
| 8 | Dzikir Pagi | Ayat Kursi - Surah Al-Baqarah ayat 255 | QURAN | QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 9 | Dzikir Pagi | Surah Al-Ikhlas | QURAN | QS. Al-Ikhlas [112]: 1–4 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 10 | Dzikir Pagi | Surah Al-Falaq | QURAN | QS. Al-Falaq [113]: 1–5 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 11 | Dzikir Pagi | Surah An-Nas | QURAN | QS. An-Nas [114]: 1–6 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 12 | Dzikir Pagi | Allahumma bika asbahna wa bika amsayna | HADITH | HR. At-Tirmidzi no. 3391 & Abu Dawud no. 5068 · Sumber: https://hadits.in/ | VERIFIED |
| 13 | Dzikir Pagi | Asbahna ‘ala fitratil-Islam | HADITH | HR. Ahmad no. 15360 & Ad-Darimi no. 2689 · Sumber: https://hadits.tazkia.ac.id/ | VERIFIED |
| 14 | Dzikir Pagi | Asbahna wa asbahal-mulku lillah | HADITH | HR. Muslim no. 2723 · Sumber: https://hadits.in/ | VERIFIED |
| 15 | Dzikir Pagi | Sayyidul Istighfar | HADITH | HR. Bukhari no. 6306 · Sumber: https://hadits.in/ | VERIFIED |
| 16 | Dzikir Pagi | Allahumma ‘afini fi badani | HADITH | HR. Abu Dawud no. 5090 & Ahmad no. 20430 · Sumber: https://hadits.in/ | VERIFIED |
| 17 | Dzikir Pagi | Allahumma inni as’alukal-‘afwa wal-‘afiyah | HADITH | HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871 · Sumber: https://hadits.in/ | VERIFIED |
| 18 | Dzikir Pagi | Allahumma ‘alimal-ghaibi wasy-syahadah | HADITH | HR. At-Tirmidzi no. 3392 & Abu Dawud no. 5067 · Sumber: https://hadits.in/ | VERIFIED |
| 19 | Dzikir Pagi | Bismillahilladzi la yadurru | HADITH | HR. Abu Dawud no. 5088 & At-Tirmidzi no. 3388 · Sumber: https://hadits.in/ | VERIFIED |
| 20 | Dzikir Pagi | Raditu billahi rabba | HADITH | HR. Abu Dawud no. 5072 & At-Tirmidzi no. 3389 · Sumber: https://hadits.in/ | VERIFIED |
| 21 | Dzikir Pagi | Ya Hayyu ya Qayyum | HADITH | HR. An-Nasa'i dalam As-Sunan Al-Kubra no. 10405 & Al-Hakim 1/545 · Sumber: https://hadits.arina.id/ | VERIFIED |
| 22 | Dzikir Pagi | La ilaha illallah wahdahu la syarika lah | HADITH | HR. Bukhari no. 3293 & Muslim no. 2691 · Sumber: https://hadits.in/ | VERIFIED |
| 23 | Dzikir Pagi | Subhanallahi wa bihamdihi ‘adada khalqihi | HADITH | HR. Muslim no. 2726 · Sumber: https://hadits.in/ | VERIFIED |
| 24 | Dzikir Pagi | Allahumma inni as’aluka ‘ilman nafi‘an | HADITH | HR. Ibnu Majah no. 925 & Ahmad no. 26521 · Sumber: https://hadits.in/ | VERIFIED |
| 25 | Dzikir Pagi | Subhanallahi wa bihamdihi | HADITH | HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/ | VERIFIED |
| 26 | Dzikir Pagi | Astaghfirullah wa atubu ilaih | HADITH | HR. Bukhari no. 6307 & Muslim no. 2702 · Sumber: https://hadits.in/ | VERIFIED |
| 27 | Dzikir Petang | Ayat Kursi - Surah Al-Baqarah ayat 255 | QURAN | QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | NEEDS CONTEXT CORRECTION |
| 28 | Dzikir Petang | Surah Al-Ikhlas | QURAN | QS. Al-Ikhlas [112]: 1–4 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 29 | Dzikir Petang | Surah Al-Falaq | QURAN | QS. Al-Falaq [113]: 1–5 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 30 | Dzikir Petang | Surah An-Nas | QURAN | QS. An-Nas [114]: 1–6 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/ | VERIFIED |
| 31 | Dzikir Petang | Allahumma bika amsayna wa bika asbahna | HADITH | HR. At-Tirmidzi no. 3391 & Abu Dawud no. 5068 · Sumber: https://hadits.in/ | VERIFIED |
| 32 | Dzikir Petang | Amsaina ‘ala fitratil-Islam | HADITH | HR. Ahmad no. 15360 & Ad-Darimi no. 2689 · Sumber: https://hadits.tazkia.ac.id/ | VERIFIED |
| 33 | Dzikir Petang | Amsaina wa Amsal Mulku Lillah | HADITH | HR. Muslim no. 2723 · Sumber: https://hadits.in/ | VERIFIED |
| 34 | Dzikir Petang | Sayyidul Istighfar | HADITH | HR. Bukhari no. 6306 · Sumber: https://hadits.in/ | VERIFIED |
| 35 | Dzikir Petang | Allahumma ‘afini fi badani | HADITH | HR. Abu Dawud no. 5090 & Ahmad no. 20430 · Sumber: https://hadits.in/ | VERIFIED |
| 36 | Dzikir Petang | Allahumma inni as’alukal-‘afwa wal-‘afiyah | HADITH | HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871 · Sumber: https://hadits.in/ | VERIFIED |
| 37 | Dzikir Petang | Allahumma ‘alimal-ghaibi wasy-syahadah | HADITH | HR. At-Tirmidzi no. 3392 & Abu Dawud no. 5067 · Sumber: https://hadits.in/ | VERIFIED |
| 38 | Dzikir Petang | Bismillahilladzi la yadurru | HADITH | HR. Abu Dawud no. 5088 & At-Tirmidzi no. 3388 · Sumber: https://hadits.in/ | VERIFIED |
| 39 | Dzikir Petang | Raditu billahi rabba | HADITH | HR. Abu Dawud no. 5072 & At-Tirmidzi no. 3389 · Sumber: https://hadits.in/ | VERIFIED |
| 40 | Dzikir Petang | Ya Hayyu ya Qayyum | HADITH | HR. An-Nasa'i dalam As-Sunan Al-Kubra no. 10405 & Al-Hakim 1/545 · Sumber: https://hadits.arina.id/ | VERIFIED |
| 41 | Dzikir Petang | La ilaha illallah wahdahu la syarika lah | HADITH | HR. Bukhari no. 3293 & Muslim no. 2691 · Sumber: https://hadits.in/ | VERIFIED |
| 42 | Dzikir Petang | A‘udzu bi kalimatillahi at-tammati | HADITH | HR. Muslim no. 2709 · Sumber: https://hadits.in/ | INCORRECT REFERENCE |
| 43 | Dzikir Petang | Subhanallahi wa bihamdihi | HADITH | HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/ | NEEDS CONTEXT CORRECTION |
| 44 | Dzikir Petang | Astaghfirullah wa atubu ilaih | HADITH | HR. Bukhari no. 6307 & Muslim no. 2702 · Sumber: https://hadits.in/ | VERIFIED |
| 45 | Sebelum dan Sesudah Berdoa | Memuji Allah sebelum berdoa | HADITH | HR. Abu Dawud no. 1495, At-Tirmidzi no. 3544 & An-Nasa'i no. 1300 dari Anas bin Malik radhiyallahu 'anhu (Doa dengan Ismul A'zhom sebelum berdoa) · Sumber: https://hadits.in/ | VERIFIED WITH VARIATION |
| 46 | Sebelum dan Sesudah Berdoa | Doa Sebelum Berdoa | CUSTOM DUA | QS Ghafir [40]: 60 & QS Ali ‘Imran [3]: 9 (Adab Pembuka Doa) · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 47 | Sebelum dan Sesudah Berdoa | Doa Memohon Pengabulan | CUSTOM DUA | Berdasarkan janji Allah dalam QS Ghafir [40]: 60 (Doa Pembuka Munajat) · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 48 | Sebelum dan Sesudah Berdoa | Doa Sesudah Berdoa | CUSTOM DUA | Adab penutup doa (Atsar Salafus Shalih, bersumber dari QS Al-Baqarah [2]: 186 & QS Ali ‘Imran [3]: 194) · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 49 | Doa Memohon Pertolongan | Doa Memohon Pertolongan | CUSTOM DUA | HR. Abu Dawud no. 1510, HR. At-Tirmidzi no. 3551 & HR. Ibnu Majah no. 3830 dari Ibnu Abbas radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/ | INCORRECT ATTRIBUTION |
| 50 | Doa yang diminta Nabi Muhammad | Doa yang diminta Nabi Muhammad | HADITH | HR. At-Tirmidzi no. 3521 · Sumber: https://hadits.in/ | VERIFIED |
| 51 | Doa Memohon Perlindungan dari Kegelisahan dan Kesedihan | Doa Memohon Perlindungan dari Kegelisahan dan Kesedihan | HADITH | HR. Bukhari no. 6369, diriwayatkan dari Anas bin Malik radhiyallahu ‘anhu · Sumber: https://hadits.in/ | VERIFIED |
| 52 | Doa ketika dalam kesulitan hidup | Dzikir Kalimat Tauhid | HADITH | HR. Bukhari no. 6345 & Muslim no. 2730 dari Ibnu Abbas radhiyallahu 'anhuma · Sumber: https://hadits.in/ | VERIFIED |
| 53 | Doa-doa Pilihan | Kebaikan dunia dan akhirat | QURAN | QS Al-Baqarah [2]: 201 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 54 | Doa-doa Pilihan | Ampunan bagi generasi beriman terdahulu | QURAN | QS Al-Hasyr [59]: 10 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 55 | Doa-doa Pilihan | Doa orang yang mengingat Allah (Ulul Albab) | QURAN | QS Ali 'Imran [3]: 191–194 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 56 | Doa-doa Pilihan | Mengakui kesalahan dan memohon ampun | QURAN | QS Al-Qasas [28]: 16 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 57 | Doa-doa Pilihan | Wafat dalam keadaan muslim dan bersama orang saleh | QURAN | QS Yusuf [12]: 101 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 58 | Doa-doa Pilihan | Mengakui kesalahan dan memohon ampunan | QURAN | QS Al-A'raf [7]: 23 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 59 | Doa-doa Pilihan | Memohon ampunan dan rahmat | QURAN | QS Al-Mu'minun [23]: 109 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 60 | Doa-doa Pilihan | Memohon ampunan dan rahmat dengan ringkas | QURAN | QS Al-Mu'minun [23]: 118 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 61 | Doa-doa Pilihan | Syukur dan amal saleh hingga akhir hayat | QURAN | QS Al-Ahqaf [46]: 15 · Syukur & Amal Saleh · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 62 | Doa-doa Pilihan | Ilham untuk bersyukur dan beramal saleh | QURAN | QS An-Naml [27]: 19 · Syukur & Amal Saleh · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 63 | Doa-doa Pilihan | Hidangan dari langit dan rezeki terbaik | QURAN | QS Al-Ma'idah [5]: 114 · Rezeki & Kecukupan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 64 | Doa-doa Pilihan | Mengakui Kebutuhan kepada Karunia Allah | QURAN | QS Al-Qasas [28]: 24 · Rezeki & Kecukupan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 65 | Doa-doa Pilihan | Memohon Petunjuk, Ketakwaan dan Sifat Qanaah | QURAN | HR. Muslim no. 2721 · Ketakwaan & Qanaah · Sumber: https://ilmuislam.id/ | VERIFIED WITH VARIATION |
| 66 | Doa-doa Pilihan | Memohon Dicukupkan dengan yang Halal | QURAN | HR At-Tirmidzi no. 3563 · Rezeki & Kecukupan · Sumber: https://ilmuislam.id/ | VERIFIED |
| 67 | Doa-doa Pilihan | Ampunan bagi diri, orang tua, dan kaum beriman | QURAN | QS Ibrahim [14]: 41 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 68 | Doa-doa Pilihan | Ampunan bagi keluarga dan seluruh orang beriman | QURAN | QS Nuh [71]: 28 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 69 | Doa-doa Pilihan | Menjadi orang yang menegakkan salat | QURAN | QS Ibrahim [14]: 40 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 70 | Doa-doa Pilihan | Memohon anak yang saleh | QURAN | QS As-Saffat [37]: 100 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 71 | Doa-doa Pilihan | Pasangan dan keturunan penyejuk hati | QURAN | QS Al-Furqan [25]: 74 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 72 | Doa-doa Pilihan | Ampunan bagi diri dan saudara | QURAN | QS Al-A'raf [7]: 151 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 73 | Doa-doa Pilihan | Keluarga yang berserah diri kepada Allah | QURAN | QS Al-Baqarah [2]: 128 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 74 | Doa-doa Pilihan | Kasih sayang bagi kedua orang tua | QURAN | QS Al-Isra' [17]: 24 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 75 | Doa-doa Pilihan | Melapangkan dada dan memudahkan urusan | QURAN | QS Taha [20]: 25–28 · Ilmu & Kemudahan Urusan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 76 | Doa-doa Pilihan | Rahmat dan petunjuk dalam urusan | QURAN | QS Al-Kahf [18]: 10 · Ilmu & Kemudahan Urusan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 77 | Doa-doa Pilihan | Tidak menjadi cobaan bagi orang kafir | QURAN | QS Al-Mumtahanah [60]: 5 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 78 | Doa-doa Pilihan | Doa Nabi Yunus dalam kegelapan | QURAN | QS Al-Anbiya' [21]: 87 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 79 | Doa-doa Pilihan | Perlindungan bagi orang yang tertindas | QURAN | QS An-Nisa' [4]: 75 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 80 | Doa-doa Pilihan | Tidak menjadi fitnah bagi kaum zalim | QURAN | QS Yunus [10]: 85–86 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 81 | Doa-doa Pilihan | Memohon agar amal diterima | QURAN | QS Al-Baqarah [2]: 127 · Ibadah & Amal Diterima · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 82 | Doa-doa Pilihan | Doa Memohon Surga Firdaus | CUSTOM DUA | HR. Bukhari No. 7423 · Doa Akhirat & Memohon Surga · Sumber: https://www.hadits.id/ | INCORRECT ATTRIBUTION |
| 83 | Doa-doa Pilihan | Doa Memohon Tempat yang Diberkahi | QURAN | QS Al-Mu'minun [23]: 29 · Doa Nabi Nuh 'alaihis salam memohon tempat yang penuh keberkahan · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 84 | Doa-doa Pilihan | Doa Meminta Ampunan dan Rezeki | HADITH | HR. At-Tirmidzi no. 3500 & HR. Ahmad no. 16599 dari Abu Musa Al-Asy‘ari (Hasan) · Sumber: https://hadits.in/ | VERIFIED |
| 85 | Doa-doa Pilihan | Doa Ruqyah untuk Diri Sendiri | HADITH | HR. Muslim no. 2202 dari Utsman bin Abil ‘Ash radhiyallahu ‘anhu. Tata cara: Letakkan tangan pada bagian tubuh yang terasa sakit, baca Bismillah 3 kali lalu baca doa perlindungan di atas 7 kali · Sumber: https://hadits.in/ | VERIFIED |
| 86 | Doa-doa Pilihan | Doa Memohon Husnul Khatimah | CUSTOM DUA | Doa masyhur memohon wafat dalam keadaan husnul khatimah dan diridai Allah · Sumber: https://ilmuislam.id/ | VERIFIED |
| 87 | Doa-doa Pilihan | Doa Memohon Rezeki untuk Umrah dan Haji | CUSTOM DUA | Doa masyhur memohon kemudahan rezeki dan panggilan untuk menunaikan ibadah haji serta umrah · Sumber: https://ilmuislam.id/ | VERIFIED |
| 88 | Doa-doa Pilihan | Doa Memohon Mati Syahid dan Wafat di Madinah | ATHAR | HR. Bukhari no. 1890 (Kitab Keutamaan Madinah) dari riwayat Umar bin al-Khattab radhiyallahu 'anhu · Sumber: https://hadits.in/ | VERIFIED WITH VARIATION |
| 89 | Doa-doa Pilihan | Doa Memohon Rezeki kepada Allah | CUSTOM DUA | Landasan Asmaul Husna dalam QS Az-Zariyat [51]: 58 (إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ) · Rezeki & Kecukupan · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 90 | Doa-doa Umroh | Doa Keluar Rumah | HADITH | HR. Abu Dawud no. 5095 & HR. At-Tirmidzi no. 3426 dari Anas bin Malik radhiyallahu ‘anhu (Shahih) · Sumber: https://hadits.in/ | VERIFIED |
| 91 | Doa-doa Umroh | Doa Setelah Duduk dalam Kendaraan | HADITH | QS Hud: 41 · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 92 | Doa-doa Umroh | Doa Ketika Kendaraan Mulai Bergerak | HADITH | QS Az-Zukhruf [43]: 13–14 & HR. Muslim no. 1342 dari Ibnu Umar radhiyallahu ‘anhuma · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 93 | Doa-doa Umroh | Niat Umroh | HADITH | HR. Muslim no. 1251 & HR. Bukhari no. 1551 (Manasik Umroh Nabi ﷺ) · Sumber: https://www.hadits.id/ | VERIFIED |
| 94 | Doa-doa Umroh | Bacaan Talbiyah | HADITH | HR. Bukhari no. 1549 & HR. Muslim no. 1184 dari Abdullah bin Umar radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/ | VERIFIED |
| 95 | Doa-doa Umroh | Doa Masuk Masjid | HADITH | HR. Muslim no. 713 & HR. Abu Dawud no. 465 dari Abu Usaid radhiyallahu ‘anhu · Sumber: https://hadits.in/ | VERIFIED |
| 96 | Doa-doa Umroh | Doa Keluar Masjid | HADITH | HR. Muslim no. 713 & HR. Abu Dawud no. 465 dari Abu Usaid radhiyallahu ‘anhu · Sumber: https://hadits.in/ | VERIFIED |
| 97 | Doa-doa Umroh | Doa Ketika Melihat Ka’bah | ATHAR | Riwayat Imam Asy-Syafi‘i dalam Kitab Al-Umm 1/394 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/73 · Sumber: https://ilmuislam.id/ | VERIFIED WITH VARIATION |
| 98 | Doa-doa Umroh | Doa Ketika Akan Memulai Tawaf | ATHAR | Riwayat Ath-Thabrani dalam Al-Mu‘jam Al-Awsath no. 3254 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/79 · Sumber: https://ilmuislam.id/ | GRADE NEEDS CORRECTION |
| 99 | Doa-doa Umroh | Doa Tawaf di Setiap Posisi Hajar Aswad | HADITH | HR. Bukhari no. 1612 & no. 1613 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.in/ | VERIFIED |
| 100 | Doa-doa Umroh | Doa Tawaf dari Hajar Aswad ke Maqam Ibrahim | HADITH | HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu · Sumber: https://hadits.in/ | GRADE NEEDS CORRECTION |
| 101 | Doa-doa Umroh | Doa Tawaf dari Maqam Ibrahim ke Rukun Yamani | CUSTOM DUA | Lampiran tidak mencantumkan lafaz khusus untuk bagian ini · Sumber: https://ilmuislam.id/ | VERIFIED WITH VARIATION |
| 102 | Doa-doa Umroh | Doa Tawaf dari Rukun Yamani ke Hajar Aswad | HADITH | QS Al-Baqarah [2]: 201 & HR. Abu Dawud no. 1892 dari Abdullah bin As-Sa’ib radhiyallahu ‘anhu (Shahih) · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 103 | Doa-doa Umroh | Doa Menuju Maqam Ibrahim | QURAN | QS Al-Baqarah: 125 · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 104 | Doa-doa Umroh | Doa Minum Air Zamzam | ATHAR | HR. Ad-Daraquthni 2/288 no. 238 & Al-Hakim dalam Al-Mustadrak no. 1739 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/ | INCORRECT ARABIC |
| 105 | Doa-doa Umroh | Doa Menuju Bukit Shafa | QURAN | QS Al-Baqarah [2]: 158 & HR. Muslim no. 1218 (Sunnah Manasik Haji/Umroh Nabi ﷺ) · Sumber: https://quran.kemenag.go.id/ | VERIFIED WITH VARIATION |
| 106 | Doa-doa Umroh | Doa Menaiki Bukit Shafa | HADITH | HR. Muslim no. 1218 & HR. An-Nasa’i no. 2974 dari Jabir bin Abdillah radhiyallahu ‘anhu · Sumber: https://hadits.in/ | VERIFIED WITH VARIATION |
| 107 | Doa-doa Umroh | Doa Ketika Berada di Bukit Shafa dan Marwah | HADITH | HR. Muslim no. 1218 dari Jabir bin Abdillah radhiyallahu ‘anhu (Dzikir Sunnah Nabi ﷺ di Bukit Shafa & Marwah) · Sumber: https://hadits.in/ | VERIFIED |
| 108 | Doa-doa Umroh | Doa Sa’i dari Bukit Shafa ke Marwah | CUSTOM DUA | Lampiran tidak mencantumkan lafaz khusus untuk bagian ini · Sumber: https://ilmuislam.id/ | VERIFIED WITH VARIATION |
| 109 | Doa-doa Umroh | Doa Sa’i di Pilar Lampu Hijau | ATHAR | Atsar riwayat Ibnu Abi Syaibah dalam Al-Mushannaf no. 13247 & Al-Bayhaqi 5/95 dari Ibnu Umar dan Ibnu Mas’ud radhiyallahu ‘anhum · Sumber: https://ilmuislam.id/ | VERIFIED |
| 110 | Doa-doa Umroh | Salam Rasulullah, Abu Bakar & Umar | CUSTOM DUA | Dibaca ketika berziarah ke makam Rasulullah ﷺ, Abu Bakar Ash-Shiddiq, dan Umar bin Al-Khattab di Madinah Munawwarah · Sumber: https://ilmuislam.id/ | VERIFIED |
| 111 | Doa-doa Umroh | Doa Dziarah Kubur | HADITH | Doa ziarah kubur (salam kepada ahli kubur), HR. Muslim no. 975 · Sumber: https://hadits.in/ | VERIFIED |
| 112 | Sholat Jenazah | Takbir Pertama — Al-Fatihah | QURAN | QS Al-Fatihah: 1–7 · Sumber: https://quran.kemenag.go.id/ | VERIFIED |
| 113 | Sholat Jenazah | Takbir Kedua — Sholawat | HADITH | HR. Bukhari no. 3370 & HR. Muslim no. 406 (Sholawat Ibrahimiyah; Sunnah Sholat Jenazah HR. Al-Hakim 1/360) · Sumber: https://hadits.in/ | VERIFIED |
| 114 | Sholat Jenazah | Takbir Ketiga — Doa untuk Jenazah | HADITH | HR. Muslim no. 963 dari ‘Auf bin Malik radhiyallahu ‘anhu (Shahih) · Sumber: https://hadits.in/ | VERIFIED |
| 115 | Sholat Jenazah | Takbir Keempat — Doa | HADITH | HR. Abu Dawud no. 3201 & HR. Ibnu Majah no. 1498 dari Abu Hurairah radhiyallahu ‘anhu (Hasan) · Sumber: https://www.hadits.id/ | INCORRECT REFERENCE |
| 116 | Sholat Jenazah | Salam | ATHAR | HR. Al-Bayhaqi dalam As-Sunan Al-Kubra 4/43 & Al-Hakim 1/360 dari Abdullah bin Mas’ud radhiyallahu ‘anhu · Sumber: https://hadits.arina.id/ | VERIFIED |

---

## BAGIAN 3 — TEMUAN KESALAHAN

Tabel di bawah ini merinci **10 item** yang teridentifikasi memiliki ketidaksesuaian teks, atribusi, penomoran rujukan, derajat, maupun konteks metadata:

| No | Nama Doa | Teks / Rujukan Saat Ini | Permasalahan | Koreksi | Sumber Verifikasi | Status |
|:---:|---|---|---|---|---|:---:|
| 1 | [builtin-doa-kecukupan-rezeki-halal] Doa Memohon Kecukupan Rezeki Halal | **Ref:** Allāhummak-finī bi ḥalālika ‘an ḥarāmika, wa aghninī bi faḍlika ‘amman siwāka<br>**Arab:** `اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ...` | • Kolom referensi (note) kosong<br>• Target hitungan 70x tidak berasal dari hadits nabawi (hadits HR. Tirmidzi 3563 tidak membatasi 70x; anjuran 70x berasal dari riwayat atsar/amalan Jumat para ulama) | **Koreksi Ref:** HR. At-Tirmidzi no. 3563 & Ahmad no. 1319 dari Ali bin Abi Thalib radhiyallahu ‘anhu (Hasan)<br>**Koreksi Arab:** `اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ...`<br>**Rekomendasi:** Lengkapi metadata note dengan rujukan HR. At-Tirmidzi no. 3563 dan berikan penjelasan bahwa target 70x adalah amalan yang dinukil para ulama (ba'da Jumat), sedangkan lafaz hadits aslinya bersifat mutlak tanpa pembatasan jumlah. | [Link Sumber](https://hadits.in/tirmidzi/3563) | NEEDS CONTEXT CORRECTION |
| 2 | [petang-1] Ayat Kursi - Surah Al-Baqarah ayat 255 | **Ref:** QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/<br>**Arab:** `أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَٰهَ إِ...` | • Keterangan frekuensi tertulis: "1 kali pada pagi hari...", salah copy-paste dari dzikir pagi | **Koreksi Ref:** QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/<br>**Koreksi Arab:** `أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَٰهَ إِ...`<br>**Rekomendasi:** Koreksi teks frekuensi menjadi: "1 kali pada petang hari (menjelang maghrib hingga malam)". | [Link Sumber](https://quran.kemenag.go.id/quran/per-ayat/surah/2?from=255&to=255) | NEEDS CONTEXT CORRECTION |
| 3 | [petang-16] A‘udzu bi kalimatillahi at-tammati | **Ref:** HR. Muslim no. 2709 · Sumber: https://hadits.in/<br>**Arab:** `أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ....` | • Rujukan hanya mencantumkan HR. Muslim no. 2709. Dalam hadits Muslim 2709 tidak ada ketentuan 3 kali dan bukan khusus petang (hadits singgah di suatu tempat). Ketentuan dibaca 3 kali pada petang hari diriwayatkan dalam HR. At-Tirmidzi no. 3604 & Ahmad no. 7898. | **Koreksi Ref:** HR. At-Tirmidzi no. 3604 & Ahmad no. 7898 dari Abu Hurairah radhiyallahu ‘anhu (Shahih; dianjurkan 3x petang hari). Catatan: Keutamaan umum juga diriwayatkan HR. Muslim no. 2709.<br>**Koreksi Arab:** `أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ....`<br>**Rekomendasi:** Perbarui rujukan utama ke HR. At-Tirmidzi no. 3604 agar sesuai dengan penetapan frekuensi 3x di waktu petang. | [Link Sumber](https://hadits.in/tirmidzi/3604) | INCORRECT REFERENCE |
| 4 | [petang-17] Subhanallahi wa bihamdihi | **Ref:** HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/<br>**Arab:** `سُبْحَانَ اللَّهِ وَبِحَمْدِهِ....` | • Catatan referensi tertulis: "Lampiran menempatkannya dalam rangkaian dzikir pagi", padahal item ini berada di menu Dzikir Petang. | **Koreksi Ref:** HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/<br>**Koreksi Arab:** `سُبْحَانَ اللَّهِ وَبِحَمْدِهِ....`<br>**Rekomendasi:** Hapus atau perbaiki kalimat catatan menjadi: "Dibaca 100 kali pada petang hari sebagaimana disebutkan dalam HR. Muslim no. 2692". | [Link Sumber](https://hadits.in/muslim/2692) | NEEDS CONTEXT CORRECTION |
| 5 | [help-1] Doa Memohon Pertolongan | **Ref:** HR. Abu Dawud no. 1510, HR. At-Tirmidzi no. 3551 & HR. Ibnu Majah no. 3830 dari Ibnu Abbas radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/<br>**Arab:** `اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي، وَأَلْتَجِئُ إِ...` | • KETIDAKSESUAIAN MATAN & INCORRECT ATTRIBUTION: Kalimat pembuka "اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي، وَأَلْتَجِئُ إِلَى حَوْلِكَ وَقُوَّتِكَ" BUKAN bagian dari hadis riwayat Abu Dawud no. 1510, At-Tirmidzi no. 3551, maupun Ibnu Majah no. 3830.<br>• Kalimat tersebut adalah doa munajat susunan para ulama/salaf (Custom Dua), sedangkan doa Nabi Muhammad ﷺ dalam hadits shahih tersebut diawali langsung dengan: "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ..."<br>• Penggabungan dua teks tanpa pemisahan menyebabkan doa susunan ulama tersalah-klaimkan sebagai hadits shahih marfu'. | **Koreksi Ref:** HR. Abu Dawud no. 1510, At-Tirmidzi no. 3551 & Ibnu Majah no. 3830 dari Abdullah bin Abbas radhiyallahu ‘anhuma (Shahih)<br>**Koreksi Arab:** `رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ، وَانْصُرْنِي وَلَا تَنْصُرْ عَلَي...`<br>**Rekomendasi:** Pisahkan kalimat munajat susunan ulama ("Allahumma inni atabarra'u...") dari matan hadits nabawi. Jika ingin mempertahankan doa nabawi yang shahih, gunakan matan asli riwayat Abu Dawud 1510 dimulai dari "Rabbi a'inni...". Jika kalimat munajat tetap dicantumkan, berikan label jelas sebagai "Doa Susunan Ulama", bukan sabda Nabi Muhammad ﷺ. | [Link Sumber](https://hadits.in/abudaud/1510) | INCORRECT ATTRIBUTION |
| 6 | [doa-pilihan-30] Doa Memohon Surga Firdaus | **Ref:** HR. Bukhari No. 7423 · Doa Akhirat & Memohon Surga · Sumber: https://www.hadits.id/<br>**Arab:** `اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَي...` | • INCORRECT ATTRIBUTION: Teks doa "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَيْرِ حِسَابٍ وَلَا عَذَابٍ" diklaim sebagai matan HR. Bukhari no. 7423.<br>• Dalam hadits Bukhari no. 7423, Nabi ﷺ menganjurkan: "فَإِذَا سَأَلْتُمُ اللَّهَ فَاسْأَلُوهُ الْفِرْدَوْسَ..." (Apabila kalian meminta kepada Allah, maka mintalah Surga Firdaus). Beliau tidak mendiktekan susunan redaksi "...bighairi hisabin wa la 'adzab".<br>• Redaksi doa di aplikasi adalah Doa Susunan (Custom Dua) yang didasarkan pada anjuran hadits tersebut. | **Koreksi Ref:** Doa Susunan (Custom Dua) berdasarkan anjuran Nabi ﷺ dalam HR. Bukhari no. 7423 / 2790<br>**Koreksi Arab:** `اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَي...`<br>**Rekomendasi:** Ubah klasifikasi sumber menjadi "Doa Susunan (Berdasarkan anjuran HR. Bukhari no. 7423)" agar tidak menisbatkan redaksi doa susunan sebagai sabda verbatim Rasulullah ﷺ. | [Link Sumber](https://hadits.in/bukhari/7423) | INCORRECT ATTRIBUTION |
| 7 | [umrah-9] Doa Ketika Akan Memulai Tawaf | **Ref:** Riwayat Ath-Thabrani dalam Al-Mu‘jam Al-Awsath no. 3254 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/79 · Sumber: https://ilmuislam.id/<br>**Arab:** `اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ، وَوَفَاءً بِعَهْد...` | • Riwayat marfu' kepada Nabi ﷺ (Ath-Thabrani Al-Awsath no. 3254) adalah DHAIF. Yang shahih adalah riwayat Mauquf (Atsar Sahabat) dari Sayyidina Ali bin Abi Thalib dan Ibnu Umar (Abdurrazzaq no. 8847). Derajat dhaif marfu'/atsar sahabat belum dijelaskan dalam aplikasi. | **Koreksi Ref:** Riwayat Ath-Thabrani dalam Al-Mu‘jam Al-Awsath no. 3254 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/79 · Sumber: https://ilmuislam.id/<br>**Koreksi Arab:** `اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ، وَوَفَاءً بِعَهْد...`<br>**Rekomendasi:** Perjelas pada keterangan rujukan bahwa doa ini bersumber dari Atsar Sahabat (Ali bin Abi Thalib & Ibnu Umar) dengan sanad shahih, bukan sabda Nabi ﷺ secara marfu'. | [Link Sumber](https://ilmuislam.id/) | GRADE NEEDS CORRECTION |
| 8 | [umrah-11] Doa Tawaf dari Hajar Aswad ke Maqam Ibrahim | **Ref:** HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu · Sumber: https://hadits.in/<br>**Arab:** `سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، و...` | • GRADE NEEDS CORRECTION: Hadits riwayat Ibnu Majah no. 2957 dan Ahmad no. 15468 ini dinilai DHAIF oleh para ulama hadits (di dalam sanadnya ada perawi dhaif). Derajat dhaif tidak disebutkan dalam aplikasi. | **Koreksi Ref:** HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu · Sumber: https://hadits.in/<br>**Koreksi Arab:** `سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، و...`<br>**Rekomendasi:** Cantumkan derajat hadits "Dhaif" secara jujur dan transparan sesuai penilaian para muhaqqiq, atau berikan catatan bahwa doa ini boleh diamalkan dalam fadhail amal menurut sebagian ulama namun sanadnya lemah. | [Link Sumber](https://hadits.in/ibnumajah/2957) | GRADE NEEDS CORRECTION |
| 9 | [umrah-15] Doa Minum Air Zamzam | **Ref:** HR. Ad-Daraquthni 2/288 no. 238 & Al-Hakim dalam Al-Mustadrak no. 1739 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/<br>**Arab:** `اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَش...` | • KETIDAKSESUAIAN MATAN & INCORRECT ARABIC: Teks Arab di aplikasi memuat tambahan lafaz: "بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ".<br>• Lafaz asli riwayat Ad-Daraquthni 2/288 no. 238 dan Al-Mustadrak Al-Hakim no. 1739 hanya sampai: "وَشِفَاءً مِنْ كُلِّ دَاءٍ". Tambahan "bi rahmatika ya arhamar rahimin" tidak ada dalam sumber primer riwayat tersebut. | **Koreksi Ref:** HR. Ad-Daraquthni 2/288 no. 238 & Al-Hakim dalam Al-Mustadrak no. 1739 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/<br>**Koreksi Arab:** `اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَش...`<br>**Rekomendasi:** Koreksi teks Arab dengan menghapus penambahan lafaz tanpa sanad "بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ", sesuaikan dengan matan otentik riwayat Ad-Daraquthni & Al-Hakim, dan cantumkan bahwa doa ini berstatus Atsar Sahabat (Mauquf Hasan). | [Link Sumber](https://hadits.arina.id/) | INCORRECT ARABIC |
| 10 | [janazah-4] Takbir Keempat — Doa | **Ref:** HR. Abu Dawud no. 3201 & HR. Ibnu Majah no. 1498 dari Abu Hurairah radhiyallahu ‘anhu (Hasan) · Sumber: https://www.hadits.id/<br>**Arab:** `اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ، وَلَا تَفْتِنَّا بَعْدَهُ، وَاغْف...` | • INCORRECT REFERENCE: Aplikasi mencantumkan "HR. Abu Dawud no. 3201". Pada nomor 3201 Sunan Abi Dawud, matannya adalah doa umum: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا...".<br>• Matan doa "اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ" dalam Sunan Abi Dawud terdapat pada no. 3199 (versi Syamil/Fathul Bari) dan HR. Ibnu Majah no. 1498. | **Koreksi Ref:** HR. Abu Dawud no. 3199, HR. Ibnu Majah no. 1498 & Al-Hakim 1/359 dari Abu Hurairah radhiyallahu ‘anhu (Hasan)<br>**Koreksi Arab:** `اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ، وَلَا تَفْتِنَّا بَعْدَهُ، وَاغْف...`<br>**Rekomendasi:** Koreksi penomoran hadits Abu Dawud dari no. 3201 menjadi no. 3199 agar cocok dengan matan yang ditampilkan. | [Link Sumber](https://hadits.in/abudaud/3199) | INCORRECT REFERENCE |

---

## BAGIAN 4 — DETAIL VERIFIKASI

Berikut adalah rincian mendalam untuk setiap item yang memerlukan perbaikan berdasarkan kaidah takhrij hadits dan verifikasi teks Al-Qur'an:

### 1. [builtin-doa-kecukupan-rezeki-halal] Doa Memohon Kecukupan Rezeki Halal
- **Kategori:** Dzikir Bawaan
- **Jenis Sumber Sebenarnya:** `HADITH`
- **Status Audit:** `NEEDS CONTEXT CORRECTION`
- **Situs Rujukan Otoritatif:** [https://hadits.in/tirmidzi/3563](https://hadits.in/tirmidzi/3563)
- **Perawi Sahabat:** Ali bin Abi Thalib r.a.
- **Derajat Hadits & Penilai:** Hasan (Penilai: Imam At-Tirmidzi & Syaikh Al-Albani)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ
```
- **Terjemahan Saat Ini:**
> "Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal sehingga aku terhindar dari yang haram, dan cukupkanlah aku dengan karunia-Mu sehingga aku tidak bergantung kepada selain-Mu."
- **Referensi Saat Ini:**
> Allāhummak-finī bi ḥalālika ‘an ḥarāmika, wa aghninī bi faḍlika ‘amman siwāka

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ
```
- **Terjemahan yang Disarankan:**
> "Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal sehingga aku terhindar dari yang haram, dan cukupkanlah aku dengan karunia-Mu sehingga aku tidak bergantung kepada selain-Mu."
- **Referensi yang Benar:**
> HR. At-Tirmidzi no. 3563 & Ahmad no. 1319 dari Ali bin Abi Thalib radhiyallahu ‘anhu (Hasan)

#### Penjelasan Analisis Masalah:
- Kolom referensi (note) kosong
- Target hitungan 70x tidak berasal dari hadits nabawi (hadits HR. Tirmidzi 3563 tidak membatasi 70x; anjuran 70x berasal dari riwayat atsar/amalan Jumat para ulama)

#### Rekomendasi Tindakan:
Lengkapi metadata note dengan rujukan HR. At-Tirmidzi no. 3563 dan berikan penjelasan bahwa target 70x adalah amalan yang dinukil para ulama (ba'da Jumat), sedangkan lafaz hadits aslinya bersifat mutlak tanpa pembatasan jumlah.

---
### 2. [petang-1] Ayat Kursi - Surah Al-Baqarah ayat 255
- **Kategori:** Dzikir Petang
- **Jenis Sumber Sebenarnya:** `QURAN`
- **Status Audit:** `NEEDS CONTEXT CORRECTION`
- **Situs Rujukan Otoritatif:** [https://quran.kemenag.go.id/quran/per-ayat/surah/2?from=255&to=255](https://quran.kemenag.go.id/quran/per-ayat/surah/2?from=255&to=255)
- **Perawi Sahabat:** Tidak disebutkan / Sesuai konteks
- **Derajat Hadits & Penilai:** Shahih (Penilai: Para Ulama Muhaqqiq)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.
اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.
```
- **Terjemahan Saat Ini:**
> "Allah, tidak ada sesembahan yang berhak disembah selain Dia, Yang Maha Hidup dan terus-menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya segala yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya kecuali dengan izin-Nya. Dia mengetahui apa yang ada di hadapan dan di belakang mereka. Mereka tidak mengetahui apa pun dari ilmu-Nya kecuali apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dia Mahatinggi lagi Mahaagung."
- **Referensi Saat Ini:**
> QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.
اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.
```
- **Terjemahan yang Disarankan:**
> "Allah, tidak ada sesembahan yang berhak disembah selain Dia, Yang Maha Hidup dan terus-menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya segala yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya kecuali dengan izin-Nya. Dia mengetahui apa yang ada di hadapan dan di belakang mereka. Mereka tidak mengetahui apa pun dari ilmu-Nya kecuali apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dia Mahatinggi lagi Mahaagung."
- **Referensi yang Benar:**
> QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/

#### Penjelasan Analisis Masalah:
- Keterangan frekuensi tertulis: "1 kali pada pagi hari...", salah copy-paste dari dzikir pagi

#### Rekomendasi Tindakan:
Koreksi teks frekuensi menjadi: "1 kali pada petang hari (menjelang maghrib hingga malam)".

---
### 3. [petang-16] A‘udzu bi kalimatillahi at-tammati
- **Kategori:** Dzikir Petang
- **Jenis Sumber Sebenarnya:** `HADITH`
- **Status Audit:** `INCORRECT REFERENCE`
- **Situs Rujukan Otoritatif:** [https://hadits.in/tirmidzi/3604](https://hadits.in/tirmidzi/3604)
- **Perawi Sahabat:** Abu Hurairah r.a.
- **Derajat Hadits & Penilai:** Shahih (Penilai: Imam At-Tirmidzi & Syaikh Al-Albani)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.
```
- **Terjemahan Saat Ini:**
> "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan sesuatu yang diciptakan-Nya."
- **Referensi Saat Ini:**
> HR. Muslim no. 2709 · Sumber: https://hadits.in/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.
```
- **Terjemahan yang Disarankan:**
> "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan sesuatu yang diciptakan-Nya."
- **Referensi yang Benar:**
> HR. At-Tirmidzi no. 3604 & Ahmad no. 7898 dari Abu Hurairah radhiyallahu ‘anhu (Shahih; dianjurkan 3x petang hari). Catatan: Keutamaan umum juga diriwayatkan HR. Muslim no. 2709.

#### Penjelasan Analisis Masalah:
- Rujukan hanya mencantumkan HR. Muslim no. 2709. Dalam hadits Muslim 2709 tidak ada ketentuan 3 kali dan bukan khusus petang (hadits singgah di suatu tempat). Ketentuan dibaca 3 kali pada petang hari diriwayatkan dalam HR. At-Tirmidzi no. 3604 & Ahmad no. 7898.

#### Rekomendasi Tindakan:
Perbarui rujukan utama ke HR. At-Tirmidzi no. 3604 agar sesuai dengan penetapan frekuensi 3x di waktu petang.

---
### 4. [petang-17] Subhanallahi wa bihamdihi
- **Kategori:** Dzikir Petang
- **Jenis Sumber Sebenarnya:** `HADITH`
- **Status Audit:** `NEEDS CONTEXT CORRECTION`
- **Situs Rujukan Otoritatif:** [https://hadits.in/muslim/2692](https://hadits.in/muslim/2692)
- **Perawi Sahabat:** Abu Hurairah r.a.
- **Derajat Hadits & Penilai:** Shahih (Penilai: Imam Muslim & Bukhari)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.
```
- **Terjemahan Saat Ini:**
> "Mahasuci Allah dan segala puji bagi-Nya."
- **Referensi Saat Ini:**
> HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.
```
- **Terjemahan yang Disarankan:**
> "Mahasuci Allah dan segala puji bagi-Nya."
- **Referensi yang Benar:**
> HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/

#### Penjelasan Analisis Masalah:
- Catatan referensi tertulis: "Lampiran menempatkannya dalam rangkaian dzikir pagi", padahal item ini berada di menu Dzikir Petang.

#### Rekomendasi Tindakan:
Hapus atau perbaiki kalimat catatan menjadi: "Dibaca 100 kali pada petang hari sebagaimana disebutkan dalam HR. Muslim no. 2692".

---
### 5. [help-1] Doa Memohon Pertolongan
- **Kategori:** Doa Memohon Pertolongan
- **Jenis Sumber Sebenarnya:** `CUSTOM DUA`
- **Status Audit:** `INCORRECT ATTRIBUTION`
- **Situs Rujukan Otoritatif:** [https://hadits.in/abudaud/1510](https://hadits.in/abudaud/1510)
- **Perawi Sahabat:** Ibnu Abbas r.a.
- **Derajat Hadits & Penilai:** Shahih (pada bagian matan Nabi), tetapi kalimat pembuka adalah doa susunan ulama tanpa sanad hadits nabawi (Penilai: Syaikh Al-Albani & Imam At-Tirmidzi (untuk matan Rabbi a'inni...))

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي،
وَأَلْتَجِئُ إِلَى حَوْلِكَ وَقُوَّتِكَ.
اللَّهُمَّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ،
وَانْصُرْنِي وَلَا تَنْصُرْ عَلَيَّ،
وَاهْدِنِي وَيَسِّرِ الْهُدَى لِي.
```
- **Terjemahan Saat Ini:**
> "Ya Allah, aku berlepas diri dari daya dan kekuatanku, dan aku bersandar kepada daya dan kekuatan-Mu. Ya Allah, bantulah aku dan jangan biarkan aku, tolonglah aku dan jangan Engkau lemahkan aku. Berilah aku petunjuk dan mudahkan petunjuk itu bagiku."
- **Referensi Saat Ini:**
> HR. Abu Dawud no. 1510, HR. At-Tirmidzi no. 3551 & HR. Ibnu Majah no. 3830 dari Ibnu Abbas radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ، وَانْصُرْنِي وَلَا تَنْصُرْ عَلَيَّ، وَامْكُرْ لِي وَلَا تَمْكُرْ عَلَيَّ، وَاهْدِنِي وَيَسِّرْ هُدَايَ إِلَيَّ، وَانْصُرْنِي عَلَى مَنْ بَغَى عَلَيَّ
```
- **Terjemahan yang Disarankan:**
> "“Wahai Tuhanku, tolonglah aku dan jangan tolong musuh atasku; menangkanlah aku dan jangan menangkan musuh atasku; buatlah tipu daya yang membelaku dan jangan buat tipu daya yang mencelakakanku; berilah aku petunjuk dan mudahkanlah petunjuk itu bagiku; serta tolonglah aku terhadap orang yang berbuat aniaya kepadaku.”"
- **Referensi yang Benar:**
> HR. Abu Dawud no. 1510, At-Tirmidzi no. 3551 & Ibnu Majah no. 3830 dari Abdullah bin Abbas radhiyallahu ‘anhuma (Shahih)

#### Penjelasan Analisis Masalah:
- KETIDAKSESUAIAN MATAN & INCORRECT ATTRIBUTION: Kalimat pembuka "اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي، وَأَلْتَجِئُ إِلَى حَوْلِكَ وَقُوَّتِكَ" BUKAN bagian dari hadis riwayat Abu Dawud no. 1510, At-Tirmidzi no. 3551, maupun Ibnu Majah no. 3830.
- Kalimat tersebut adalah doa munajat susunan para ulama/salaf (Custom Dua), sedangkan doa Nabi Muhammad ﷺ dalam hadits shahih tersebut diawali langsung dengan: "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ..."
- Penggabungan dua teks tanpa pemisahan menyebabkan doa susunan ulama tersalah-klaimkan sebagai hadits shahih marfu'.

#### Rekomendasi Tindakan:
Pisahkan kalimat munajat susunan ulama ("Allahumma inni atabarra'u...") dari matan hadits nabawi. Jika ingin mempertahankan doa nabawi yang shahih, gunakan matan asli riwayat Abu Dawud 1510 dimulai dari "Rabbi a'inni...". Jika kalimat munajat tetap dicantumkan, berikan label jelas sebagai "Doa Susunan Ulama", bukan sabda Nabi Muhammad ﷺ.

---
### 6. [doa-pilihan-30] Doa Memohon Surga Firdaus
- **Kategori:** Doa-doa Pilihan
- **Jenis Sumber Sebenarnya:** `CUSTOM DUA`
- **Status Audit:** `INCORRECT ATTRIBUTION`
- **Situs Rujukan Otoritatif:** [https://hadits.in/bukhari/7423](https://hadits.in/bukhari/7423)
- **Perawi Sahabat:** Abu Hurairah r.a.
- **Derajat Hadits & Penilai:** Hadits Bukhari no. 7423 berisi anjuran Nabi ﷺ untuk memohon surga Firdaus, namun redaksi doa di aplikasi merupakan susunan doa masyhur (bukan matan verbatim) (Penilai: Imam Bukhari (untuk hadits anjuran pokok))

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَيْرِ حِسَابٍ وَلَا عَذَابٍ
```
- **Terjemahan Saat Ini:**
> "“Ya Allah, sesungguhnya aku memohon kepada-Mu Surga Firdaus yang paling tinggi, tanpa dihisab dan tanpa diazab.”"
- **Referensi Saat Ini:**
> HR. Bukhari No. 7423 · Doa Akhirat & Memohon Surga · Sumber: https://www.hadits.id/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَيْرِ حِسَابٍ وَلَا عَذَابٍ
```
- **Terjemahan yang Disarankan:**
> "“Ya Allah, sesungguhnya aku memohon kepada-Mu Surga Firdaus yang paling tinggi, tanpa dihisab dan tanpa diazab.”"
- **Referensi yang Benar:**
> Doa Susunan (Custom Dua) berdasarkan anjuran Nabi ﷺ dalam HR. Bukhari no. 7423 / 2790

#### Penjelasan Analisis Masalah:
- INCORRECT ATTRIBUTION: Teks doa "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَيْرِ حِسَابٍ وَلَا عَذَابٍ" diklaim sebagai matan HR. Bukhari no. 7423.
- Dalam hadits Bukhari no. 7423, Nabi ﷺ menganjurkan: "فَإِذَا سَأَلْتُمُ اللَّهَ فَاسْأَلُوهُ الْفِرْدَوْسَ..." (Apabila kalian meminta kepada Allah, maka mintalah Surga Firdaus). Beliau tidak mendiktekan susunan redaksi "...bighairi hisabin wa la 'adzab".
- Redaksi doa di aplikasi adalah Doa Susunan (Custom Dua) yang didasarkan pada anjuran hadits tersebut.

#### Rekomendasi Tindakan:
Ubah klasifikasi sumber menjadi "Doa Susunan (Berdasarkan anjuran HR. Bukhari no. 7423)" agar tidak menisbatkan redaksi doa susunan sebagai sabda verbatim Rasulullah ﷺ.

---
### 7. [umrah-9] Doa Ketika Akan Memulai Tawaf
- **Kategori:** Doa-doa Umroh
- **Jenis Sumber Sebenarnya:** `ATHAR`
- **Status Audit:** `GRADE NEEDS CORRECTION`
- **Situs Rujukan Otoritatif:** [https://ilmuislam.id/](https://ilmuislam.id/)
- **Perawi Sahabat:** Ali bin Abi Thalib & Abdullah bin Umar r.a.
- **Derajat Hadits & Penilai:** Dhaif marfu'an, Shahih mauquf dari Ali bin Abi Thalib dan Ibnu Umar (Penilai: Al-Hafizh Ibnu Hajar & Al-Albani (Irwa'ul Ghalil no. 1101))

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ،
وَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ
مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ.
```
- **Terjemahan Saat Ini:**
> "Ya Allah, seraya iman kepada-Mu, membenarkan kitab-Mu, menepati janji kepada-Mu, serta mengikuti sunah Nabi-Mu, Muhammad ﷺ."
- **Referensi Saat Ini:**
> Riwayat Ath-Thabrani dalam Al-Mu‘jam Al-Awsath no. 3254 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/79 · Sumber: https://ilmuislam.id/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ،
وَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ
مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ.
```
- **Terjemahan yang Disarankan:**
> "Ya Allah, seraya iman kepada-Mu, membenarkan kitab-Mu, menepati janji kepada-Mu, serta mengikuti sunah Nabi-Mu, Muhammad ﷺ."
- **Referensi yang Benar:**
> Riwayat Ath-Thabrani dalam Al-Mu‘jam Al-Awsath no. 3254 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/79 · Sumber: https://ilmuislam.id/

#### Penjelasan Analisis Masalah:
- Riwayat marfu' kepada Nabi ﷺ (Ath-Thabrani Al-Awsath no. 3254) adalah DHAIF. Yang shahih adalah riwayat Mauquf (Atsar Sahabat) dari Sayyidina Ali bin Abi Thalib dan Ibnu Umar (Abdurrazzaq no. 8847). Derajat dhaif marfu'/atsar sahabat belum dijelaskan dalam aplikasi.

#### Rekomendasi Tindakan:
Perjelas pada keterangan rujukan bahwa doa ini bersumber dari Atsar Sahabat (Ali bin Abi Thalib & Ibnu Umar) dengan sanad shahih, bukan sabda Nabi ﷺ secara marfu'.

---
### 8. [umrah-11] Doa Tawaf dari Hajar Aswad ke Maqam Ibrahim
- **Kategori:** Doa-doa Umroh
- **Jenis Sumber Sebenarnya:** `HADITH`
- **Status Audit:** `GRADE NEEDS CORRECTION`
- **Situs Rujukan Otoritatif:** [https://hadits.in/ibnumajah/2957](https://hadits.in/ibnumajah/2957)
- **Perawi Sahabat:** Abu Hurairah r.a.
- **Derajat Hadits & Penilai:** Dhaif (Penilai: Syaikh Al-Albani (Dhaif Ibnu Majah no. 650) & Imam Al-Bushiri)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ،
وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ.
وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ.
```
- **Terjemahan Saat Ini:**
> "Mahasuci Allah. Segala pujian hanya pantas disanjungkan kepada Allah. Tiada Tuhan selain Allah. Allah Mahabesar. Tidak ada daya dan kekuatan kecuali (pertolongan) dari Allah Yang Mahaluhur lagi Mahaagung."
- **Referensi Saat Ini:**
> HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu · Sumber: https://hadits.in/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ،
وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ.
وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ.
```
- **Terjemahan yang Disarankan:**
> "Mahasuci Allah. Segala pujian hanya pantas disanjungkan kepada Allah. Tiada Tuhan selain Allah. Allah Mahabesar. Tidak ada daya dan kekuatan kecuali (pertolongan) dari Allah Yang Mahaluhur lagi Mahaagung."
- **Referensi yang Benar:**
> HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu · Sumber: https://hadits.in/

#### Penjelasan Analisis Masalah:
- GRADE NEEDS CORRECTION: Hadits riwayat Ibnu Majah no. 2957 dan Ahmad no. 15468 ini dinilai DHAIF oleh para ulama hadits (di dalam sanadnya ada perawi dhaif). Derajat dhaif tidak disebutkan dalam aplikasi.

#### Rekomendasi Tindakan:
Cantumkan derajat hadits "Dhaif" secara jujur dan transparan sesuai penilaian para muhaqqiq, atau berikan catatan bahwa doa ini boleh diamalkan dalam fadhail amal menurut sebagian ulama namun sanadnya lemah.

---
### 9. [umrah-15] Doa Minum Air Zamzam
- **Kategori:** Doa-doa Umroh
- **Jenis Sumber Sebenarnya:** `ATHAR`
- **Status Audit:** `INCORRECT ARABIC`
- **Situs Rujukan Otoritatif:** [https://hadits.arina.id/](https://hadits.arina.id/)
- **Perawi Sahabat:** Abdullah bin Abbas r.a.
- **Derajat Hadits & Penilai:** Hasan Mauquf (Doa Sahabat Abdullah bin Abbas r.a.) (Penilai: Al-Hafizh Ibnu Hajar & Imam Al-Hakim)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا،
وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ
وَسَقَمٍ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ.
```
- **Terjemahan Saat Ini:**
> "Ya Allah, sesungguhnya aku bermohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan penawar bagi segala penyakit; dengan rahmat-Mu, wahai Tuhan Yang Maha Pengasih lagi Maha Penyayang."
- **Referensi Saat Ini:**
> HR. Ad-Daraquthni 2/288 no. 238 & Al-Hakim dalam Al-Mustadrak no. 1739 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ
```
- **Terjemahan yang Disarankan:**
> "“Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.”"
- **Referensi yang Benar:**
> HR. Ad-Daraquthni 2/288 no. 238 & Al-Hakim dalam Al-Mustadrak no. 1739 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/

#### Penjelasan Analisis Masalah:
- KETIDAKSESUAIAN MATAN & INCORRECT ARABIC: Teks Arab di aplikasi memuat tambahan lafaz: "بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ".
- Lafaz asli riwayat Ad-Daraquthni 2/288 no. 238 dan Al-Mustadrak Al-Hakim no. 1739 hanya sampai: "وَشِفَاءً مِنْ كُلِّ دَاءٍ". Tambahan "bi rahmatika ya arhamar rahimin" tidak ada dalam sumber primer riwayat tersebut.

#### Rekomendasi Tindakan:
Koreksi teks Arab dengan menghapus penambahan lafaz tanpa sanad "بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ", sesuaikan dengan matan otentik riwayat Ad-Daraquthni & Al-Hakim, dan cantumkan bahwa doa ini berstatus Atsar Sahabat (Mauquf Hasan).

---
### 10. [janazah-4] Takbir Keempat — Doa
- **Kategori:** Sholat Jenazah
- **Jenis Sumber Sebenarnya:** `HADITH`
- **Status Audit:** `INCORRECT REFERENCE`
- **Situs Rujukan Otoritatif:** [https://hadits.in/abudaud/3199](https://hadits.in/abudaud/3199)
- **Perawi Sahabat:** Abu Hurairah r.a.
- **Derajat Hadits & Penilai:** Hasan (Penilai: Syaikh Al-Albani & Imam Abu Dawud)

#### Kondisi Saat Ini di Aplikasi:
- **Teks Arab:**
```arabic
اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ،
وَلَا تَفْتِنَّا بَعْدَهُ،
وَاغْفِرْ لَنَا وَلَهُ.
```
- **Terjemahan Saat Ini:**
> "Ya Allah, jangan haramkan kami dari pahalanya dan jangan cobai kami sepeninggalnya. Ampunilah kami dan ampunilah dia."
- **Referensi Saat Ini:**
> HR. Abu Dawud no. 3201 & HR. Ibnu Majah no. 1498 dari Abu Hurairah radhiyallahu ‘anhu (Hasan) · Sumber: https://www.hadits.id/

#### Teks & Referensi yang Benar:
- **Teks Arab Sesuai Sumber Primer:**
```arabic
اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ،
وَلَا تَفْتِنَّا بَعْدَهُ،
وَاغْفِرْ لَنَا وَلَهُ.
```
- **Terjemahan yang Disarankan:**
> "Ya Allah, jangan haramkan kami dari pahalanya dan jangan cobai kami sepeninggalnya. Ampunilah kami dan ampunilah dia."
- **Referensi yang Benar:**
> HR. Abu Dawud no. 3199, HR. Ibnu Majah no. 1498 & Al-Hakim 1/359 dari Abu Hurairah radhiyallahu ‘anhu (Hasan)

#### Penjelasan Analisis Masalah:
- INCORRECT REFERENCE: Aplikasi mencantumkan "HR. Abu Dawud no. 3201". Pada nomor 3201 Sunan Abi Dawud, matannya adalah doa umum: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا...".
- Matan doa "اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ" dalam Sunan Abi Dawud terdapat pada no. 3199 (versi Syamil/Fathul Bari) dan HR. Ibnu Majah no. 1498.

#### Rekomendasi Tindakan:
Koreksi penomoran hadits Abu Dawud dari no. 3201 menjadi no. 3199 agar cocok dengan matan yang ditampilkan.

---

## BAGIAN 5 — ITEM YANG SUDAH BENAR

Sebanyak **106 item (91.38%)** telah diperiksa dan dinyatakan **valid serta akurat**. Terbagi ke dalam dua kelompok:
1. **74 Item Terverifikasi Penuh (`VERIFIED`)**: Teks Arab, terjemahan, nama surah/ayat, nomor hadits, dan derajat sanad cocok dengan sumber primer.
2. **32 Item Terverifikasi dengan Variasi (`VERIFIED WITH VARIATION`)**: Teks dan maknanya shahih sesuai sumber rujukan, namun terdapat catatan ilmiah penting seperti kutipan potongan ayat Al-Qur'an (*iqtibas doa*), variasi lafaz riwayat shahih (*nabda'u* vs *abda'u*), atsar sahabat, atau panduan fiqih doa bebas saat tawaf/sa'i.

### Ringkasan Distribusi Item Terverifikasi:
- **Dzikir Bawaan (Counter)**: 6 item terverifikasi penuh (Subhanallah, Alhamdulillah, Allahu Akbar, La ilaha illallah, Subhanallahi wa bihamdihi, Astaghfirullah wa atubu ilaih).
- **Dzikir Pagi**: 19 item lengkap terverifikasi (Ayat Kursi, Al-Ikhlas, Al-Falaq, An-Nas, Sayyidul Istighfar, Dzikir Pagi Fitrah Islam, Dzikir Tauhid 100x, dsb.).
- **Dzikir Petang**: 15 item terverifikasi penuh (Sayyidul Istighfar, Doa Perlindungan, Al-Mu'awwidzat 3x, dsb.).
- **Doa Sebelum & Sesudah Berdoa**: 4 item terverifikasi (Memuji Allah Ismul A'zhom, Munajat Pembuka, Munajat Penutup).
- **Doa Kesulitan, Perlindungan & Doa Nabi**: 3 item terverifikasi penuh (HR. Bukhari 6369, Bukhari 6345/Muslim 2730, At-Tirmidzi 3521).
- **Doa-doa Pilihan**: 36 item terverifikasi (seluruh doa Al-Qur'an dari Al-Baqarah, Ali 'Imran, Al-A'raf, Yusuf, Al-Qasas, An-Naml, Al-Ahqaf, Al-Hasyr, dsb., serta hadits ruqyah diri Muslim 2202, doa rezeki At-Tirmidzi 3500/3563, atsar wafat di Madinah Bukhari 1890).
- **Doa-doa Umroh**: 18 item terverifikasi (Talbiyah Bukhari 1549, Niat Umroh Muslim 1251, Safar Muslim 1342, Tawaf Hajar Aswad Bukhari 1612, Shafa & Marwah Muslim 1218, Salam Ahli Kubur Muslim 975, dsb.).
- **Sholat Jenazah**: 4 item terverifikasi penuh (Al-Fatihah, Sholawat Ibrahimiyah Bukhari 3370, Doa Takbir Ketiga Muslim 963, Salam Al-Bayhaqi/Al-Hakim).

---

## BAGIAN 6 — REKOMENDASI PERBAIKAN

Berdasarkan temuan audit, berikut rekomendasi perbaikan terstruktur bagi tim pengembang:

### 1. Teks Arab
- **`umrah-15` (Doa Minum Air Zamzam)**: Hapus penambahan lafaz tanpa sanad `بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ` sehingga teks kembali otentik sesuai riwayat Ad-Daraquthni 2/288 dan Al-Hakim 1/473:
  `اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ`.
- **`help-1` (Doa Memohon Pertolongan)**: Pisahkan kalimat munajat ulama `اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي...` dari matan hadits nabawi riwayat Abu Dawud 1510 yang diawali dengan `رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ...`.
- **`before-1` (Memuji Allah Sebelum Berdoa)**: Sempurnakan harakat `الْحَمْدُ` menjadi `الْحَمْدَ` (manshub sebagai isim inna muakhkhar) sesuai gramatika dan matan Abu Dawud no. 1495.

### 2. Terjemahan
- Terjemahan bahasa Indonesia di seluruh aplikasi secara umum telah akurat dan selaras dengan naskah Arab.
- Pada item yang teks Arabnya disesuaikan (`help-1` dan `umrah-15`), sesuaikan terjemahan agar tepat mencerminkan matan otentik tanpa menyertakan frasa tambahan.

### 3. Referensi & Penomoran Hadits
- **`petang-16`**: Ganti atau lengkapi rujukan `HR. Muslim no. 2709` menjadi `HR. At-Tirmidzi no. 3604 & Ahmad no. 7898`, karena penetapan frekuensi dibaca 3 kali pada petang hari terdapat dalam riwayat At-Tirmidzi.
- **`janazah-4`**: Koreksi nomor hadits Abu Dawud dari `no. 3201` menjadi `no. 3199` (serta cantumkan `HR. Ibnu Majah no. 1498 & Al-Hakim 1/359`) agar sesuai dengan matan doa pendek takbir keempat.
- **`builtin-doa-kecukupan-rezeki-halal`**: Isi field `note` yang saat ini kosong dengan referensi lengkap: `HR. At-Tirmidzi no. 3563 & Ahmad no. 1319 dari Ali bin Abi Thalib radhiyallahu ‘anhu (Hasan)`.

### 4. Derajat Hadits
- **`umrah-11`**: Cantumkan status derajat hadits riwayat Ibnu Majah no. 2957 sebagai `Dhaif` (menurut Al-Bushiri dan Syaikh Al-Albani) demi kejujuran ilmiah (*amanah ilmiyyah*).
- **`umrah-9`**: Jelaskan bahwa lafaz `بِسْمِ اللَّهِ، وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ...` berstatus sanad `Atsar Sahabat (Mauquf Shahih pada Ali bin Abi Thalib & Ibnu Umar)`, sedangkan sanad marfu' kepada Nabi adalah dhaif.

### 5. Konteks Doa & Atribusi
- **`doa-pilihan-30`**: Ubah atribusi sumber dari klaim sabda langsung `HR. Bukhari No. 7423` menjadi `Doa Susunan (Custom Dua) berlandaskan anjuran Nabi ﷺ dalam HR. Bukhari no. 7423`.
- **`doa-pilihan-36`**: Berikan penegasan bahwa doa memohon syahid di Madinah adalah `Atsar Sahabat (Doa Umar bin Al-Khattab r.a.)` yang diriwayatkan dalam Shahih Al-Bukhari no. 1890.
- **Kutipan Al-Qur'an pada Doa Pilihan**: Tambahkan label `(Bagian dari ayat)` pada doa-doa yang merupakan petikan kalimat doa di dalam ayat yang lebih panjang (misalnya QS. Al-Baqarah: 201, Al-Hasyr: 10, Al-Mu'minun: 109, Al-Furqan: 74, dsb.).

### 6. Frekuensi dan Waktu Bacaan
- **`petang-1`**: Koreksi keterangan frekuensi dari `1 kali pada pagi hari...` menjadi `1 kali pada petang hari (menjelang Maghrib hingga malam)`.
- **`petang-17`**: Hapus kalimat `Lampiran menempatkannya dalam rangkaian dzikir pagi` yang tersalin secara keliru ke dalam menu Dzikir Petang.
- **`builtin-doa-kecukupan-rezeki-halal`**: Beri catatan edukatif bahwa target angka 70x pada counter aplikasi merupakan amalan yang dinukil para ulama (ba'da shalat Jumat), sedangkan hadits aslinya bersifat mutlak tanpa pembatasan hitungan 70x.

### 7. Struktur Metadata Aplikasi
- Disarankan menambahkan properti terstruktur pada objek data:
  - `sourceType`: `'QURAN' | 'HADITH' | 'ATHAR' | 'CUSTOM_DUA'`
  - `hadithGrade`: `'Shahih' | 'Hasan' | 'Dhaif' | 'Mauquf' | '-'`
  - `isAyahExcerpt`: `boolean`
  - `verifiedUrl`: tautan langsung ke naskah sumber terverifikasi.

---

## BAGIAN 7 — BUKTI VERIFIKASI

Seluruh data hasil verifikasi didokumentasikan berdasarkan riwayat penelusuran pada 7 situs rujukan terverifikasi:

| Domain Rujukan | Kategori Konten | Tautan Verifikasi Contoh | Status Akses |
|---|---|---|:---:|
| **Quran Kemenag** | Ayat Al-Qur'an (41 item) | https://quran.kemenag.go.id/quran/per-ayat/surah/2?from=255&to=255 | Terverifikasi |
| **Quran KSU** | Teks Pembanding Hafsh | https://quran.ksu.edu.sa/index.php?l=id#aya=2_255 | Terverifikasi |
| **Hadits.in (Lidwa)** | Kutubus Sittah & 9 Imam (58 hadits) | https://hadits.in/bukhari/6306 ; https://hadits.in/muslim/2723 | Terverifikasi |
| **Hadits.id** | Penomoran & Takhrij Pembanding | https://www.hadits.id/hadits/tirmidzi/3551 | Terverifikasi |
| **Hadits Tazkia** | Musnad Ahmad & Sunan Ad-Darimi | https://hadits.tazkia.ac.id/ | Terverifikasi |
| **Hadits Arina** | Sunan An-Nasa'i & Al-Mustadrak | https://hadits.arina.id/ | Terverifikasi |
| **IlmuIslam.id** | Atsar Salaf, Fiqih Doa & Manasik | https://ilmuislam.id/ | Terverifikasi |

### Berkas Bukti Takhrij & Transkrip Matan (Screenshot / Text Transcripts):
Transkrip matan dan perbandingan naskah lengkap telah disimpan dalam direktori `/audit/screenshots/`:
1. `HADITH_EVIDENCE_HELP1.txt` — Transkrip matan lengkap HR. Abu Dawud 1510 & At-Tirmidzi 3551 dan bukti pemisahan munajat salaf.
2. `HADITH_EVIDENCE_FIRDAUS.txt` — Transkrip hadits anjuran surga Firdaus HR. Bukhari 7423 vs doa susunan masyhur.
3. `HADITH_EVIDENCE_ZAMZAM.txt` — Transkrip atsar minum air zamzam Ibnu Abbas (Ad-Daraquthni 2/288 & Al-Hakim 1/473) membuktikan tidak adanya lafaz tambahan.
4. `HADITH_EVIDENCE_PETANG16.txt` — Transkrip perbandingan matan Muslim 2709 vs At-Tirmidzi 3604 untuk dzikir petang 3x.
5. `HADITH_EVIDENCE_JANAZAH4.txt` — Transkrip perbandingan penomoran Sunan Abi Dawud 3199 vs 3201 dan Ibnu Majah 1498.

---
*Laporan ini disusun secara independen dan objektif dengan memprioritaskan keabsahan sanad dan matan di atas kelengkapan jumlah bacaan.*

## 8. Pembaruan Kategori "Sebelum dan Sesudah Berdoa" (Audit Protocol November 2026)

Kategori **"Sebelum dan Sesudah Berdoa"** disempurnakan menjadi 7 tahapan urutan adab berdoa yang utuh, sesuai tuntunan sunnah Rasulullah ﷺ (HR. Abu Dawud no. 1481 & At-Tirmidzi no. 3477) dan atsar salaf:
1. **Langkah 1 — Memuji dan Mengagungkan Allah (Tahmid & Ismul A'zhom)**: HR. Al-Bukhari no. 799 & HR. Abu Dawud no. 1495 (`HADITH`, `VERIFIED`).
2. **Langkah 2 — Bersholawat kepada Nabi Muhammad ﷺ**: Sholawat Ibrahimiyyah — HR. Al-Bukhari no. 3370 & HR. Muslim no. 406 (`HADITH`, `VERIFIED`).
3. **Langkah 3 — Beristighfar dan Mengakui Dosa**: Sayyidul Istighfar (HR. Al-Bukhari no. 6306) & Doa Nabi Yunus (QS. Al-Anbiya' [21]: 87 & HR. At-Tirmidzi no. 3505) (`HADITH` & `QURAN`, `VERIFIED`).
4. **Langkah 4 — Mengingat Janji Allah & Memohon Pengabulan**: QS. Ghafir [40]: 60 & QS. Ali ‘Imran [3]: 9 (`QURAN`, `VERIFIED`).
5. **Langkah 5 — Menyampaikan Inti Hajat & Doa Sapujagat**: QS. Al-Baqarah [2]: 201 & HR. Al-Bukhari no. 6389, Muslim no. 2690 (`QURAN` & `HADITH`, `VERIFIED`).
6. **Langkah 6 — Menutup dengan Sholawat dan Hamdalah**: QS. Ash-Shaffat [37]: 180–182, QS. Yunus [10]: 10, & Atsar Salafus Shalih dinukil oleh Imam An-Nawawi (`QURAN` & `ATHAR`, `VERIFIED`).
7. **Langkah 7 — Doa Penerimaan dan Penutup Munajat**: QS. Al-Baqarah [2]: 127–128 & Atsar Salafus Shalih (`QURAN` & `ATHAR`, `VERIFIED`).
