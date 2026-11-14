export interface DoaItem {
  title: string;
  subtitle?: string;
  arabic?: string;
  latin?: string;
  meaning?: string;
  note?: string;
}

export interface DoaCategory {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  countLabel: string;
  items: DoaItem[];
}

export const doaCategories: DoaCategory[] = [
  {
    "id": "before",
    "icon": "◉",
    "title": "Sebelum dan Sesudah Berdoa",
    "subtitle": "Panduan urutan adab doa pembuka hingga penutup",
    "countLabel": "7 BACAAN",
    "items": [
      {
        "title": "1. Memuji dan Mengagungkan Allah (Tahmid)",
        "subtitle": "Memohon kepada Allah dengan mengagungkan pujian, nama, dan sifat-Nya (Ismul A'zhom)",
        "arabic": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.\nاللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ لَا إِلَهَ إِلَّا أَنْتَ الْمَنَّانُ بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ.",
        "latin": "Alḥamdu lillāhi rabbil-‘ālamīn, ḥamdan kaṡīran ṭayyiban mubārakan fīh. Allāhumma innī as-aluka bi-anna lakal-ḥamda lā ilāha illā antal-mannānu badī‘us-samāwāti wal-arḍi, yā dzal-jalāli wal-ikrām, yā ḥayyu yā qayyūm.",
        "meaning": "Segala puji bagi Allah, Tuhan semesta alam, pujian yang banyak, baik, lagi penuh berkah. Ya Allah, sesungguhnya aku memohon kepada-Mu karena segala puji hanya milik-Mu. Tidak ada sesembahan yang berhak disembah selain Engkau. Engkaulah Yang Maha Pemberi karunia, Pencipta langit dan bumi. Wahai Tuhan yang memiliki keagungan dan kemuliaan. Wahai Yang Mahahidup, wahai Yang Maha Mengurus seluruh makhluk.",
        "note": "HR. Abu Dawud no. 1495, At-Tirmidzi no. 3544 & An-Nasa'i no. 1300 dari Anas bin Malik (Doa dengan Ismul A'zhom sebelum berdoa · Shahih) · Tahmid: HR. Bukhari no. 799 · Sumber: https://hadits.in/"
      },
      {
        "title": "2. Bersholawat kepada Nabi Muhammad ﷺ",
        "subtitle": "Sholawat Ibrahimiyyah — Lafaz sholawat paling afdhal yang diajarkan Rasulullah ﷺ",
        "arabic": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.",
        "latin": "Allāhumma ṣalli ‘alā Muḥammadiw wa ‘alā āli Muḥammad, kamā ṣallaita ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka ḥamīdum majīd. Allāhumma bārik ‘alā Muḥammadiw wa ‘alā āli Muḥammad, kamā bārakta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka ḥamīdum majīd.",
        "meaning": "Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan sholawat kepada Nabi Ibrahim dan kepada keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, limpahkanlah keberkahan kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan keberkahan kepada Nabi Ibrahim dan kepada keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
        "note": "HR. Al-Bukhari no. 3370 & HR. Muslim no. 406 dari Ka'ab bin 'Ujrah radhiyallahu 'anhu (Derajat: Shahih) · Sumber: https://hadits.in/"
      },
      {
        "title": "3. Beristighfar dan Mengakui Dosa",
        "subtitle": "Sayyidul Istighfar & Doa Nabi Yunus — Membersihkan penghalang terkabulnya doa",
        "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.\n\nلَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.",
        "latin": "Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa anā ‘abduka, wa anā ‘alā ‘ahdika wa wa‘dika mastaṭa‘tu, a‘ūdzu bika min syarri mā ṣana‘tu, abū-u laka bini‘matika ‘alayya, wa abū-u laka bidzambī, faghfir lī fa-innahū lā yaghfirudz-dzunūba illā anta.\n\nLā ilāha illā anta subḥānaka innī kuntu minaẓ-ẓālimīn.",
        "meaning": "Ya Allah, Engkaulah Rabbku, tidak ada sesembahan yang berhak disembah selain Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu. Aku senantiasa memegang perjanjian-Mu dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang telah kuperbuat. Aku mengakui kenikmatan-Mu kepadaku dan aku mengakui dosaku kepada-Mu, maka ampunilah aku, karena sesungguhnya tidak ada yang mengampuni dosa-dosa selain Engkau.\n\nTidak ada sesembahan yang berhak disembah selain Engkau. Mahasuci Engkau, sesungguhnya aku adalah termasuk orang-orang yang zalim.",
        "note": "Sayyidul Istighfar: HR. Al-Bukhari no. 6306 dari Syaddad bin Aus (Shahih) · Doa Nabi Yunus: QS. Al-Anbiya' [21]: 87 & HR. At-Tirmidzi no. 3505 (Shahih) · Sumber: https://hadits.in/ dan https://quran.kemenag.go.id/"
      },
      {
        "title": "4. Mengingat Janji Allah & Memohon Pengabulan",
        "subtitle": "Memohon pengabulan doa dengan mengingat janji Allah dalam Al-Qur'an",
        "arabic": "يَا رَبِّ،\nأَنْتَ قُلْتَ وَقَوْلُكَ الْحَقُّ:\n«ادْعُونِي أَسْتَجِبْ لَكُمْ»\nوَأَنْتَ لَا تُخْلِفُ الْمِيعَادَ.\nاللَّهُمَّ اسْتَجِبْ كَمَا وَعَدْتَ.",
        "latin": "Yā Rabb, Anta qulta wa qawlukal-ḥaqq: 'Ud‘ūnī astajib lakum', wa Anta lā tukhliful-mī‘ād. Allāhummas-tajib kamā wa‘adta.",
        "meaning": "Wahai Tuhanku, Engkau telah berfirman dan firman-Mu adalah benar: 'Berdoalah kepada-Ku, niscaya akan Aku perkenankan bagimu', dan Engkau tidak pernah mengingkari janji. Ya Allah, kabulkanlah sebagaimana Engkau telah berjanji.",
        "note": "Berdasarkan firman Allah dalam QS. Ghafir [40]: 60 & QS. Ali ‘Imran [3]: 9 (Adab pembuka munajat) · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "5. Menyampaikan Inti Hajat & Doa Sapujagat",
        "subtitle": "Doa Sapujagat — Diikuti dengan permohonan hajat khusus masing-masing",
        "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
        "latin": "Rabbanā ātinā fid-dunyā ḥasanataw wa fil-ākhirati ḥasanataw wa qinā ‘adzāban-nār.",
        "meaning": "Wahai Tuhan kami, berikanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka.\n\n[Silakan lanjutkan dengan menyampaikan hajat pribadi Anda kepada Allah dengan penuh ketundukan dan keyakinan].",
        "note": "QS. Al-Baqarah [2]: 201 & HR. Al-Bukhari no. 6389, HR. Muslim no. 2690 dari Anas bin Malik (Doa yang paling sering dipanjatkan Nabi ﷺ) · Sumber: https://hadits.in/ dan https://quran.kemenag.go.id/"
      },
      {
        "title": "6. Menutup dengan Sholawat dan Hamdalah",
        "subtitle": "Adab penutup doa agar hajat diapit di antara dua sholawat yang maqbul",
        "arabic": "وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ،\nسُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ،\nوَسَلَامٌ عَلَى الْمُرْسَلِينَ،\nوَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.",
        "latin": "Wa ṣallallāhu ‘alā sayyidinā Muḥammadiw wa ‘alā ālihī wa ṣaḥbihī wa sallam. Subḥāna rabbika rabbil-‘izzati ‘ammā yaṣifūn, wa salāmun ‘alal-mursalīn, wal-ḥamdu lillāhi rabbil-‘ālamīn.",
        "meaning": "Dan semoga Allah melimpahkan sholawat serta salam kepada junjungan kami Nabi Muhammad, beserta keluarga dan para sahabatnya. Mahasuci Tuhanmu, Tuhan Yang Memiliki Keperkasaan dari apa yang mereka sifatkan. Dan salam sejahtera atas para rasul. Dan segala puji bagi Allah, Tuhan semesta alam.",
        "note": "QS. Ash-Shaffat [37]: 180–182 (Ayat penutup majelis dan doa) & QS. Yunus [10]: 10 (Penutup ucapan ahli surga) · Atsar Salafus Shalih dinukil oleh Imam An-Nawawi dalam Al-Adzkar · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "7. Doa Penerimaan dan Penutup Munajat",
        "subtitle": "Memohon agar seluruh rangkaian doa diterima dan dikabulkan oleh Allah",
        "arabic": "اللَّهُمَّ تَقَبَّلْ دَعْوَانَا كَمَا أَمَرْتَنَا، فَاسْتَجِبْ كَمَا وَعَدْتَنَا، فَأَنْتَ يَا رَبِّ لَا تُخْلِفُ الْمِيعَادَ.\n\nرَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ، وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.",
        "latin": "Allāhumma taqabbal da‘wānā kamā amartanā, fastajib kamā wa‘adtanā, fa anta yā rabbī lā tukhliful-mī‘ād.\n\nRabbanā taqabbal minnā innaka antas-samī‘ul-‘alīm, wa tub ‘alaynā innaka antat-tawwābur-raḥīm.",
        "meaning": "Ya Allah, terimalah doa kami sebagaimana Engkau telah perintahkan kami. Dan kabulkanlah doa kami sebagaimana Engkau telah menjanjikan kepada kami. Sesungguhnya Engkau, wahai Rabb, tidak pernah mengingkari janji.\n\nWahai Tuhan kami, terimalah (amal dan doa) dari kami, sungguh Engkaulah Yang Maha Mendengar lagi Maha Mengetahui, dan terimalah tobat kami, sungguh Engkaulah Yang Maha Penerima tobat lagi Maha Penyayang.",
        "note": "QS. Al-Baqarah [2]: 127–128 (Doa Nabi Ibrahim & Nabi Ismail memohon penerimaan) & Atsar Salafus Shalih · Sumber: https://quran.kemenag.go.id/"
      }
    ]
  },
  {
    "id": "doa-pilihan",
    "icon": "✦",
    "title": "Doa-doa Pilihan",
    "subtitle": "Kumpulan 37 doa pilihan dari Al-Qur’an dan hadis shahih",
    "countLabel": "37 DOA",
    "items": [
      {
        "title": "Mengakui kesalahan dan memohon ampunan",
        "subtitle": "QS Al-A'raf [7]: 23",
        "arabic": "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        "meaning": "Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan tidak merahmati kami, niscaya kami termasuk orang-orang yang rugi.",
        "note": "QS Al-A'raf [7]: 23 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Mengakui kesalahan dan memohon ampun",
        "subtitle": "QS Al-Qasas [28]: 16",
        "arabic": "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
        "meaning": "Wahai Tuhanku, sesungguhnya aku telah menzalimi diriku sendiri, maka ampunilah aku.",
        "note": "QS Al-Qasas [28]: 16 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Nabi Yunus dalam kegelapan",
        "subtitle": "QS Al-Anbiya' [21]: 87",
        "arabic": "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        "meaning": "Tidak ada tuhan selain Engkau. Mahasuci Engkau. Sesungguhnya aku termasuk orang-orang yang zalim.",
        "note": "QS Al-Anbiya' [21]: 87 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon ampunan dan rahmat",
        "subtitle": "QS Al-Mu'minun [23]: 109",
        "arabic": "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        "meaning": "Ya Tuhan kami, kami telah beriman. Ampunilah kami dan rahmatilah kami. Engkaulah sebaik-baik pemberi rahmat.",
        "note": "QS Al-Mu'minun [23]: 109 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon ampunan dan rahmat dengan ringkas",
        "subtitle": "QS Al-Mu'minun [23]: 118",
        "arabic": "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        "meaning": "Ya Tuhanku, ampunilah dan rahmatilah. Engkaulah sebaik-baik pemberi rahmat.",
        "note": "QS Al-Mu'minun [23]: 118 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Ampunan bagi generasi beriman terdahulu",
        "subtitle": "QS Al-Hasyr [59]: 10",
        "arabic": "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ",
        "meaning": "Ya Tuhan kami, ampunilah kami dan saudara-saudara kami yang telah beriman lebih dahulu daripada kami. Janganlah Engkau tanamkan kedengkian dalam hati kami terhadap orang-orang beriman. Sungguh Engkau Maha Penyantun lagi Maha Penyayang.",
        "note": "QS Al-Hasyr [59]: 10 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Ampunan bagi diri, orang tua, dan kaum beriman",
        "subtitle": "QS Ibrahim [14]: 41",
        "arabic": "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        "meaning": "Ya Tuhan kami, ampunilah aku, kedua orang tuaku, dan seluruh orang beriman pada hari berlangsungnya perhitungan. (Doa Nabi Ibrahim).",
        "note": "QS Ibrahim [14]: 41 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Ampunan bagi keluarga dan seluruh orang beriman",
        "subtitle": "QS Nuh [71]: 28",
        "arabic": "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا تَبَارًا",
        "meaning": "Ya Tuhanku, ampunilah aku, kedua orang tuaku, orang yang masuk ke rumahku dalam keadaan beriman, serta seluruh laki-laki dan perempuan yang beriman. Janganlah Engkau tambahkan bagi orang-orang zalim selain kebinasaan.",
        "note": "QS Nuh [71]: 28 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Ampunan bagi diri dan saudara",
        "subtitle": "QS Al-A'raf [7]: 151",
        "arabic": "رَبِّ اغْفِرْ لِي وَلِأَخِي وَأَدْخِلْنَا فِي رَحْمَتِكَ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ",
        "meaning": "Ya Tuhanku, ampunilah aku dan saudaraku, serta masukkanlah kami ke dalam rahmat-Mu. Engkaulah Yang Maha Penyayang di antara para penyayang.",
        "note": "QS Al-A'raf [7]: 151 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Memohon Rezeki kepada Allah",
        "subtitle": "Asmaul Husna — QS Az-Zariyat [51]: 58",
        "arabic": "يَا رَزَّاقُ، يَا ذَا الْقُوَّةِ الْمَتِينِ، ارْزُقْنِي",
        "latin": "Yā Razzāqu, yā dzal-quwwatil-matīn, urzuqnī.",
        "meaning": "“Wahai Allah Yang Maha Pemberi rezeki, wahai Pemilik kekuatan yang sangat kokoh, karuniakanlah rezeki kepadaku.”",
        "note": "Landasan Asmaul Husna dalam QS Az-Zariyat [51]: 58 (إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ) · Rezeki & Kecukupan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Mengakui Kebutuhan kepada Karunia Allah",
        "subtitle": "QS Al-Qasas [28]: 24",
        "arabic": "رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        "meaning": "“Ya Tuhanku, sesungguhnya aku sangat memerlukan suatu kebaikan (rezeki) yang Engkau turunkan kepadaku.”",
        "note": "QS Al-Qasas [28]: 24 · Rezeki & Kecukupan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon Dicukupkan dengan yang Halal",
        "subtitle": "HR At-Tirmidzi no. 3563",
        "arabic": "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        "meaning": "“Ya Allah, cukupkanlah aku dengan yang halal sehingga terhindar dari yang haram, dan cukupkanlah aku dengan karunia-Mu sehingga tidak bergantung kepada selain-Mu.”",
        "note": "HR At-Tirmidzi no. 3563 · Rezeki & Kecukupan · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Meminta Ampunan dan Rezeki",
        "subtitle": "HR. At-Tirmidzi no. 3500 & HR. Ahmad no. 16599",
        "arabic": "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي،\nوَوَسِّعْ لِي فِي دَارِي،\nوَبَارِكْ لِي فِي رِزْقِي.",
        "latin": "Allahumma ighfir lī dhanbi, wa wassi‘ lī fī dārī, wa bārik lī fī rizqī.",
        "meaning": "Ya Allah, ampunilah dosa-dosaku, luaskanlah rumahku untukku, dan berkahilah rezekiku.",
        "note": "HR. At-Tirmidzi no. 3500 & HR. Ahmad no. 16599 dari Abu Musa Al-Asy‘ari (Hasan) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Memohon Tempat yang Diberkahi",
        "subtitle": "QS Al-Mu’minun [23]: 29",
        "arabic": "رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ",
        "meaning": "“Ya Tuhanku, tempatkanlah aku pada tempat yang diberkahi, dan Engkau adalah sebaik-baik pemberi tempat.”",
        "note": "QS Al-Mu'minun [23]: 29 · Doa Nabi Nuh 'alaihis salam memohon tempat yang penuh keberkahan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Pelunas Utang dan Penghilang Kegelisahan",
        "subtitle": "Doa Abu Umamah radhiyallahu 'anhu · HR. Abu Dawud no. 1555",
        "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        "latin": "Allāhumma innī a‘ūdzu bika minal-hammi wal-ḥazan, wa a‘ūdzu bika minal-‘ajzi wal-kasal, wa a‘ūdzu bika minal-jubni wal-bukhl, wa a‘ūdzu bika min ghalabatid-daini wa qahrir-rijāl.",
        "meaning": "“Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rasa gelisah dan sedih, aku berlindung kepada-Mu dari kelemahan dan kemalasan, aku berlindung kepada-Mu dari sifat pengecut dan kikir, dan aku berlindung kepada-Mu dari lilitan utang serta tekanan orang lain.”",
        "note": "HR. Abu Dawud no. 1555 dari Abu Sa'id Al-Khudri radhiyallahu 'anhu. Diajarkan Rasulullah ﷺ kepada Abu Umamah radhiyallahu 'anhu untuk dibaca pada waktu pagi dan petang · Sumber: https://hadits.in/abu-daud/1555"
      },
      {
        "title": "Doa Keberkahan Harta, Kebaikan Amal, dan Ampunan",
        "subtitle": "Berdasarkan doa Nabi ﷺ untuk Anas bin Malik & HR. At-Tirmidzi no. 2329",
        "arabic": "اللَّهُمَّ أَكْثِرْ مَالِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي، وَأَحْسِنْ عَمَلِي، وَاغْفِرْ لِي",
        "latin": "Allāhumma aktsir mālī, wa bārik lī fīmā a‘ṭaytanī, wa aḥsin ‘amalī, waghfir lī.",
        "meaning": "“Ya Allah, perbanyaklah hartaku, berkahilah apa yang telah Engkau anugerahkan kepadaku, perbaikilah amal perbuatanku, dan ampunilah (dosa-dosa)ku.”",
        "note": "Doa Iqtibas / Ma'tsur Bi Al-Ma'na: Gabungan doa Nabi ﷺ untuk Anas bin Malik (HR. Al-Bukhari no. 6378, HR. Muslim no. 2480 & Al-Adab Al-Mufrad no. 653) dan hadits anjuran amal saleh (HR. At-Tirmidzi no. 2329) · Sumber: https://hadits.in/bukhari/6378"
      },
      {
        "title": "Kebaikan dunia dan akhirat",
        "subtitle": "QS Al-Baqarah [2]: 201",
        "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        "meaning": "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari azab neraka.",
        "note": "QS Al-Baqarah [2]: 201 · Iman, Taubat & Ampunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon Petunjuk, Ketakwaan dan Sifat Qanaah",
        "subtitle": "HR. Muslim no. 2721",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        "latin": "Allāhumma innī as-alukal-hudā, wat-tuqā, wal-‘afāfa, wal-ghinā.",
        "meaning": "“Ya Allah, aku memohon kepada-Mu petunjuk, ketakwaan, penjagaan kehormatan dan kesucian diri, serta kecukupan (hati yang merasa cukup dengan karunia Allah / qanaah).”",
        "note": "HR. Muslim no. 2721 · Ketakwaan & Qanaah · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Rahmat dan petunjuk dalam urusan",
        "subtitle": "QS Al-Kahf [18]: 10",
        "arabic": "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        "meaning": "Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.",
        "note": "QS Al-Kahf [18]: 10 · Ilmu & Kemudahan Urusan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Syukur dan amal saleh hingga akhir hayat",
        "subtitle": "QS Al-Ahqaf [46]: 15",
        "arabic": "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ",
        "meaning": "Ya Tuhanku, ilhamkanlah aku agar selalu mensyukuri nikmat-Mu yang Engkau anugerahkan kepadaku dan kepada kedua orang tuaku, serta agar aku mengerjakan amal saleh yang Engkau ridai. Perbaikilah keturunanku. Sesungguhnya aku bertaubat kepada-Mu dan termasuk orang-orang muslim.",
        "note": "QS Al-Ahqaf [46]: 15 · Syukur & Amal Saleh · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Ilham untuk bersyukur dan beramal saleh",
        "subtitle": "QS An-Naml [27]: 19",
        "arabic": "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
        "meaning": "Ya Tuhanku, ilhamkanlah aku untuk mensyukuri nikmat-Mu yang Engkau anugerahkan kepadaku dan kedua orang tuaku, mengerjakan amal saleh yang Engkau ridai, dan masukkanlah aku dengan rahmat-Mu ke dalam golongan hamba-hamba-Mu yang saleh. (Doa Nabi Sulaiman).",
        "note": "QS An-Naml [27]: 19 · Syukur & Amal Saleh · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Kasih sayang bagi kedua orang tua",
        "subtitle": "QS Al-Isra' [17]: 24",
        "arabic": "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        "meaning": "Ya Tuhanku, sayangilah keduanya sebagaimana mereka berdua telah mendidik aku pada waktu kecil.",
        "note": "QS Al-Isra' [17]: 24 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Menjadi orang yang menegakkan salat",
        "subtitle": "QS Ibrahim [14]: 40",
        "arabic": "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        "meaning": "Wahai Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap melaksanakan salat. Ya Tuhan kami, perkenankanlah doaku.",
        "note": "QS Ibrahim [14]: 40 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon anak yang saleh",
        "subtitle": "QS As-Saffat [37]: 100",
        "arabic": "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        "meaning": "Wahai Tuhanku, anugerahkanlah kepadaku seorang anak yang termasuk orang-orang saleh.",
        "note": "QS As-Saffat [37]: 100 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Pasangan dan keturunan penyejuk hati",
        "subtitle": "QS Al-Furqan [25]: 74",
        "arabic": "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        "meaning": "Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan sebagai penyejuk hati, dan jadikanlah kami teladan bagi orang-orang yang bertakwa.",
        "note": "QS Al-Furqan [25]: 74 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Keluarga yang berserah diri kepada Allah",
        "subtitle": "QS Al-Baqarah [2]: 128",
        "arabic": "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِنْ ذُرِّيَّتِنَا أُمَّةً مُسْلِمَةً لَكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        "meaning": "Ya Tuhan kami, jadikanlah kami orang yang berserah diri kepada-Mu, dan dari keturunan kami umat yang berserah diri kepada-Mu. Tunjukkanlah kepada kami tata cara ibadah kami dan terimalah taubat kami.",
        "note": "QS Al-Baqarah [2]: 128 · Keluarga & Keturunan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Memohon agar amal diterima",
        "subtitle": "QS Al-Baqarah [2]: 127",
        "arabic": "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        "meaning": "Ya Tuhan kami, terimalah amal dari kami. Sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.",
        "note": "QS Al-Baqarah [2]: 127 · Ibadah & Amal Diterima · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Tidak menjadi fitnah bagi kaum zalim",
        "subtitle": "QS Yunus [10]: 85–86",
        "arabic": "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلْقَوْمِ الظَّالِمِينَ ۝ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ",
        "meaning": "Ya Tuhan kami, janganlah Engkau jadikan kami sasaran fitnah bagi kaum yang zalim. Selamatkanlah kami dengan rahmat-Mu dari kaum yang kafir.",
        "note": "QS Yunus [10]: 85–86 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Tidak menjadi cobaan bagi orang kafir",
        "subtitle": "QS Al-Mumtahanah [60]: 5",
        "arabic": "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنْتَ الْعَزِيزُ الْحَكِيمُ",
        "meaning": "Ya Tuhan kami, janganlah Engkau jadikan kami sasaran fitnah bagi orang-orang kafir. Ampunilah kami. Sesungguhnya Engkau Mahaperkasa lagi Mahabijaksana.",
        "note": "QS Al-Mumtahanah [60]: 5 · Perlindungan & Keselamatan · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Ruqyah untuk Diri Sendiri",
        "subtitle": "HR. Muslim no. 2202",
        "arabic": "بِسْمِ اللَّهِ (3x)\n\nأَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (7x)",
        "latin": "Bismillāh (3x). A‘ūdzu billāhi wa qudratihī min syarri mā ajidu wa uḥādzir (7x).",
        "meaning": "“Dengan nama Allah” (dibaca 3 kali), lalu: “Aku berlindung kepada Allah dan kekuasaan-Nya dari keburukan yang aku rasakan dan yang aku khawatirkan” (dibaca 7 kali).",
        "note": "HR. Muslim no. 2202 dari Utsman bin Abil ‘Ash radhiyallahu ‘anhu. Tata cara: Letakkan tangan pada bagian tubuh yang terasa sakit, baca Bismillah 3 kali lalu baca doa perlindungan di atas 7 kali · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Memohon Mati Syahid dan Wafat di Madinah",
        "subtitle": "Atsar Sahabat · Doa Umar bin al-Khattab رضي الله عنه (HR. Bukhari no. 1890)",
        "arabic": "اللَّهُمَّ ارْزُقْنِي شَهَادَةً فِي سَبِيلِكَ، وَاجْعَلْ مَوْتِي فِي بَلَدِ رَسُولِكَ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
        "latin": "Allāhummar-zuqnī syahādatan fī sabīlik, waj‘al mawtī fī baladi rasūlika ṣallallāhu ‘alayhi wa sallam.",
        "meaning": "“Ya Allah, karuniakanlah kepadaku kesyahidan di jalan-Mu, dan jadikanlah wafatku di negeri Rasul-Mu (shallallahu ‘alaihi wa sallam).”",
        "note": "Atsar Sahabat (Doa Umar bin Al-Khattab radhiyallahu 'anhu) diriwayatkan dalam Shahih Al-Bukhari no. 1890 (Kitab Fadha'ilul Madinah) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Memohon Surga Firdaus",
        "subtitle": "Doa Susunan Ulama · Berdasarkan HR. Bukhari no. 7423",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ الْفِرْدَوْسَ الْأَعْلَى بِغَيْرِ حِسَابٍ وَلَا عَذَابٍ",
        "meaning": "“Ya Allah, sesungguhnya aku memohon kepada-Mu Surga Firdaus yang paling tinggi, tanpa dihisab dan tanpa diazab.”",
        "note": "Doa Susunan (Custom Dua) berdasarkan anjuran Nabi ﷺ dalam HR. Bukhari no. 7423 / 2790 · Doa Akhirat & Memohon Surga · Sumber: https://www.hadits.id/"
      },
      {
        "title": "Doa Menjenguk Orang Sakit — Memohon Kesembuhan",
        "subtitle": "Doa Rasulullah ﷺ saat menjenguk orang sakit (HR. Bukhari no. 5743 & HR. Muslim no. 2191)",
        "arabic": "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
        "latin": "Allāhumma rabban-nās, ażhibil-ba'sa, isyfi antasy-syāfī, lā syifā'a illā syifā'uk, syifā'an lā yughādiru saqamā.",
        "meaning": "“Ya Allah, Rabb seluruh manusia, hilangkanlah penyakit ini. Berikanlah kesembuhan, Engkaulah Maha Penyembuh. Tidak ada kesembuhan selain kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit sedikit pun.”",
        "note": "HR. Bukhari no. 5743 & HR. Muslim no. 2191 dari ‘Aisyah radhiyallahu ‘anha (Shahih / Muttafaq ‘Alaih) · Sumber: https://hadits.in/bukhari/5743"
      },
      {
        "title": "Doa Menjenguk Orang Sakit — Dibaca 7 Kali",
        "subtitle": "Dibaca 7 kali di dekat orang sakit (HR. Abu Dawud no. 3106 & HR. At-Tirmidzi no. 2083)",
        "arabic": "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        "latin": "As'alullāhal-‘azhīma rabbal-‘arsyil-‘azhīmi an yasyfiyak.",
        "meaning": "“Aku memohon kepada Allah Yang Maha Agung, Rabb Pemilik ‘Arsy yang agung, agar berkenan menyembuhkanmu.” (Dibaca 7 kali. Jika yang sakit perempuan, akhiran kata dibaca an yasyfiyaki / أَنْ يَشْفِيَكِ).",
        "note": "HR. Abu Dawud no. 3106 & HR. At-Tirmidzi no. 2083 dari Ibnu Abbas radhiyallahu ‘anhuma. Syaikh Al-Albani menyatakan hadits ini shahih (Shahih Sunan Abi Dawud no. 3106) · Sumber: https://hadits.in/abu-daud/3106"
      },
      {
        "title": "Doa ketika dalam Kesulitan Hidup (Doa Al-Karb)",
        "subtitle": "Dzikir kalimat tauhid saat menghadapi kesulitan berat (HR. Bukhari no. 6345 & Muslim no. 2730)",
        "arabic": "لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ،\nلَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ،\nلَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.",
        "latin": "Lā ilāha illallāhul-‘aẓīmul-ḥalīm, lā ilāha illallāhu rabbul-‘arsyil-‘aẓīm, lā ilāha illallāhu rabbus-samāwāti wa rabbul-arḍi wa rabbul-‘arsyil-karīm.",
        "meaning": "“Tidak ada sesembahan yang berhak disembah selain Allah Yang Maha Agung lagi Maha Penyantun; Tidak ada sesembahan yang berhak disembah selain Allah, Rabb pemilik ‘Arsy yang agung. Tidak ada sesembahan yang berhak disembah selain Allah, Rabb langit dan bumi serta Rabb pemilik ‘Arsy yang mulia.”",
        "note": "HR. Bukhari no. 6345 & HR. Muslim no. 2730 dari Ibnu Abbas radhiyallahu 'anhuma (Doa Al-Karb saat tertimpa kesulitan hidup) · Sumber: https://hadits.in/bukhari/6345"
      },
      {
        "title": "Doa Memohon Pertolongan dan Petunjuk",
        "subtitle": "Doa Nabi ﷺ memohon pertolongan, kemenangan, dan kemudahan petunjuk (HR. Abu Dawud no. 1510)",
        "arabic": "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ،\nوَانْصُرْنِي وَلَا تَنْصُرْ عَلَيَّ،\nوَامْكُرْ لِي وَلَا تَمْكُرْ عَلَيَّ،\nوَاهْدِنِي وَيَسِّرْ هُدَايَ إِلَيَّ،\nوَانْصُرْنِي عَلَى مَنْ بَغَى عَلَيَّ.",
        "latin": "Rabbi a‘innī wa lā tu‘in ‘alayya, wan-ṣurnī wa lā tan-ṣur ‘alayya, wam-kur lī wa lā tam-kur ‘alayya, wahdinī wa yassir hudāya ilayya, wan-ṣurnī ‘alā mam baghā ‘alayya.",
        "meaning": "“Wahai Tuhanku, tolonglah aku dan jangan tolong musuh atas diriku; menangkanlah aku dan jangan menangkan musuh atas diriku; buatlah tipu daya yang membelaku dan jangan buat tipu daya yang mencelakakanku; berilah aku petunjuk dan mudahkanlah petunjuk itu bagiku; serta tolonglah aku terhadap orang yang berbuat aniaya kepadaku.”",
        "note": "HR. Abu Dawud no. 1510, HR. At-Tirmidzi no. 3551 & HR. Ibnu Majah no. 3830 dari Abdullah bin Abbas radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/abu-daud/1510"
      },
      {
        "title": "Doa yang Diminta Nabi Muhammad ﷺ",
        "subtitle": "Memohon seluruh kebaikan yang pernah diminta Nabi ﷺ dan perlindungan dari keburukan (HR. At-Tirmidzi no. 3521)",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ،\nوَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ،\nوَأَنْتَ الْمُسْتَعَانُ، وَعَلَيْكَ الْبَلَاغُ،\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
        "latin": "Allāhumma innī as-aluka min khayri mā sa-alaka minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam, wa a‘ūdzu bika min syarri masta‘ādza minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam, wa antal-musta‘ān, wa ‘alaykal-balāgh, wa lā ḥawla wa lā quwwata illā billāh.",
        "meaning": "“Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan apa saja yang pernah diminta oleh Nabi-Mu Muhammad shallallahu 'alaihi wa sallam. Dan aku berlindung kepada-Mu dari keburukan apa saja yang Nabi-Mu Muhammad shallallahu 'alaihi wa sallam pernah berlindung darinya. Dan Engkaulah tempat meminta pertolongan, dan di tangan-Mulah penyampaian (keberhasilan), serta tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.”",
        "note": "HR. At-Tirmidzi no. 3521 dari Abu Umamah radhiyallahu 'anhu (Hasan Shahih) · Sumber: https://hadits.in/tirmidzi/3521"
      }
    ]
  },
  {
    "id": "umrah",
    "icon": "☾",
    "title": "Doa-doa Umroh",
    "subtitle": "Rangkaian doa perjalanan, tawaf, dan sa’i sesuai urutan",
    "countLabel": "22 DOA / BACAAN",
    "items": [
      {
        "title": "Doa Keluar Rumah",
        "arabic": "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ،\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
        "meaning": "Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan (pertolongan) Allah.",
        "note": "HR. Abu Dawud no. 5095 & HR. At-Tirmidzi no. 3426 dari Anas bin Malik radhiyallahu ‘anhu (Shahih) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Setelah Duduk dalam Kendaraan",
        "arabic": "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا،\nإِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ.",
        "meaning": "Dengan (menyebut) nama Allah pada waktu berlayar dan berlabuhnya. Sesungguhnya Tuhanku Maha Pengampun, Maha Penyayang.",
        "note": "QS Hud: 41 · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Ketika Kendaraan Mulai Bergerak",
        "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ.\nسُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا\nوَمَا كُنَّا لَهُ مُقْرِنِينَ،\nوَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ.",
        "meaning": "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Allah Mahabesar. Allah Mahabesar. Allah Mahabesar. Mahasuci Allah yang telah menggerakkan untuk kami kendaraan ini, padahal kami tidak kuasa menggerakkannya. Dan sesungguhnya kepada Tuhan kami pasti akan kembali.",
        "note": "QS Az-Zukhruf [43]: 13–14 & HR. Muslim no. 1342 dari Ibnu Umar radhiyallahu ‘anhuma · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Niat Umroh",
        "arabic": "لَبَّيْكَ اللَّهُمَّ عُمْرَةً.",
        "meaning": "Aku penuhi panggilan-Mu, ya Allah, untuk menunaikan ibadah umrah.",
        "note": "HR. Muslim no. 1251 & HR. Bukhari no. 1551 (Manasik Umroh Nabi ﷺ) · Sumber: https://www.hadits.id/"
      },
      {
        "title": "Bacaan Talbiyah",
        "arabic": "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ،\nلَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ،\nإِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ،\nلَا شَرِيكَ لَكَ.",
        "meaning": "Aku datang memenuhi panggilan-Mu, ya Allah. Aku datang memenuhi panggilan-Mu. Tiada sekutu bagi-Mu. Aku datang memenuhi panggilan-Mu. Sungguh, segala puji, nikmat, dan segala kekuasaan adalah milik-Mu. Tiada sekutu bagi-Mu.",
        "note": "HR. Bukhari no. 1549 & HR. Muslim no. 1184 dari Abdullah bin Umar radhiyallahu ‘anhuma (Shahih) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Masuk Masjid",
        "arabic": "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.",
        "meaning": "Ya Allah, bukakanlah bagiku segala pintu rahmat-Mu.",
        "note": "HR. Muslim no. 713 & HR. Abu Dawud no. 465 dari Abu Usaid radhiyallahu ‘anhu · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Keluar Masjid",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ.",
        "meaning": "Ya Allah, sesungguhnya aku memohon fadilah kepada-Mu.",
        "note": "HR. Muslim no. 713 & HR. Abu Dawud no. 465 dari Abu Usaid radhiyallahu ‘anhu · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Ketika Melihat Ka’bah",
        "arabic": "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا\nوَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً،\nوَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ\nأَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا\nوَتَعْظِيمًا وَبِرًّا.",
        "meaning": "Ya Allah, tambahkanlah kemuliaan, kehormatan, keagungan, dan kehebatan pada Baitullah ini; dan tambahkanlah pula kepada orang-orang yang memuliakan, menghormati, dan mengagungkannya di antara mereka yang berhaji atau yang berumrah kemuliaan, kehormatan, kebesaran, dan kebaikan.",
        "note": "Riwayat Imam Asy-Syafi‘i dalam Kitab Al-Umm 1/394 & Al-Bayhaqi dalam As-Sunan Al-Kubra 5/73 · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Ketika Akan Memulai Tawaf",
        "arabic": "اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ،\nوَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ\nمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ.",
        "meaning": "Ya Allah, seraya iman kepada-Mu, membenarkan kitab-Mu, menepati janji kepada-Mu, serta mengikuti sunah Nabi-Mu, Muhammad ﷺ.",
        "note": "Atsar Sahabat (Mauquf Shahih dari Ali bin Abi Thalib & Ibnu Umar, diriwayatkan Abdurrazzaq no. 8847; sanad marfu' Ath-Thabrani Al-Awsath no. 3254 dhaif) · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Tawaf di Setiap Posisi Hajar Aswad",
        "arabic": "بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ.",
        "meaning": "Dengan nama Allah, Allah Mahabesar.",
        "note": "HR. Bukhari no. 1612 & no. 1613 dari Ibnu Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Tawaf dari Hajar Aswad ke Maqam Ibrahim",
        "arabic": "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ،\nوَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ.\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ.",
        "meaning": "Mahasuci Allah. Segala pujian hanya pantas disanjungkan kepada Allah. Tiada Tuhan selain Allah. Allah Mahabesar. Tidak ada daya dan kekuatan kecuali (pertolongan) dari Allah Yang Mahaluhur lagi Mahaagung.",
        "note": "HR. Ibnu Majah no. 2957 & HR. Ahmad no. 15468 dari Abu Hurairah radhiyallahu ‘anhu (Derajat Hadits: Dhaif menurut Al-Bushiri & Al-Albani) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Tawaf dari Maqam Ibrahim ke Rukun Yamani",
        "arabic": "",
        "meaning": "Berdo’a Bebas",
        "note": "Lampiran tidak mencantumkan lafaz khusus untuk bagian ini · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Tawaf dari Rukun Yamani ke Hajar Aswad",
        "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً،\nوَفِي الْآخِرَةِ حَسَنَةً،\nوَقِنَا عَذَابَ النَّارِ.",
        "meaning": "Wahai Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan hindarkanlah kami dari siksa neraka.",
        "note": "QS Al-Baqarah [2]: 201 & HR. Abu Dawud no. 1892 dari Abdullah bin As-Sa’ib radhiyallahu ‘anhu (Shahih) · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Menuju Maqam Ibrahim",
        "arabic": "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى.",
        "meaning": "Dan jadikanlah bagian dari maqam Ibrahim itu sebagai tempat salat.",
        "note": "QS Al-Baqarah: 125 · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Minum Air Zamzam",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا،\nوَرِزْقًا وَاسِعًا،\nوَشِفَاءً مِنْ كُلِّ دَاءٍ.",
        "meaning": "“Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.”",
        "note": "Atsar Sahabat (Mauquf Hasan) riwayat Ad-Daraquthni 2/288 no. 238 & Al-Hakim no. 1739 dari Abdullah bin Abbas radhiyallahu ‘anhuma · Sumber: https://hadits.arina.id/"
      },
      {
        "title": "Doa Menuju Bukit Shafa",
        "arabic": "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ.",
        "meaning": "Sesungguhnya Shafa dan Marwah merupakan sebagian syiar (agama) Allah.",
        "note": "QS Al-Baqarah [2]: 158 & HR. Muslim no. 1218 (Sunnah Manasik Haji/Umroh Nabi ﷺ) · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Doa Menaiki Bukit Shafa",
        "arabic": "أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ.",
        "meaning": "Aku memulai sa’i dengan apa yang didahulukan oleh Allah.",
        "note": "HR. Muslim no. 1218 & HR. An-Nasa’i no. 2974 dari Jabir bin Abdillah radhiyallahu ‘anhu · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Ketika Berada di Bukit Shafa dan Marwah",
        "arabic": "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ.\nلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ،\nلَهُ الْمُلْكُ وَلَهُ الْحَمْدُ،\nوَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.\nلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ،\nأَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ،\nوَهَزَمَ الْأَحْزَابَ وَحْدَهُ.",
        "meaning": "Allah Mahabesar (3 kali). Tiada Tuhan yang berhak disembah selain Allah, Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Tiada Tuhan yang berhak disembah selain Allah Yang Maha Esa, yang melaksanakan janji-Nya, membela hamba-Nya (Muhammad), dan mengalahkan golongan musuh sendirian.",
        "note": "HR. Muslim no. 1218 dari Jabir bin Abdillah radhiyallahu ‘anhu (Dzikir Sunnah Nabi ﷺ di Bukit Shafa & Marwah) · Sumber: https://hadits.in/"
      },
      {
        "title": "Doa Sa’i dari Bukit Shafa ke Marwah",
        "arabic": "",
        "meaning": "Berdo’a Bebas",
        "note": "Lampiran tidak mencantumkan lafaz khusus untuk bagian ini · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Sa’i di Pilar Lampu Hijau",
        "arabic": "اللَّهُمَّ اغْفِرْ وَارْحَمْ،\nوَأَنْتَ الْأَعَزُّ الْأَكْرَمُ.",
        "meaning": "Ya Rabbku, ampuni dan rahmatilah aku. Sesungguhnya Engkaulah Yang Maha Perkasa dan Maha Pemurah.",
        "note": "Atsar riwayat Ibnu Abi Syaibah dalam Al-Mushannaf no. 13247 & Al-Bayhaqi 5/95 dari Ibnu Umar dan Ibnu Mas’ud radhiyallahu ‘anhum · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Salam Rasulullah, Abu Bakar & Umar",
        "subtitle": "Salam ketika berziarah ke makam Rasulullah ﷺ, Abu Bakar, dan Umar",
        "arabic": "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. صَلَّى اللَّهُ وَسَلَّمَ وَبَارَكَ عَلَيْكَ، وَجَزَاكَ أَفْضَلَ مَا جَزَى نَبِيًّا عَنْ أُمَّتِهِ.\n\nالسَّلَامُ عَلَيْكَ يَا أَبَا بَكْرٍ، وَجَزَاكَ اللَّهُ عَنْ أُمَّةِ الْإِسْلَامِ خَيْرَ الْجَزَاءِ.\n\nالسَّلَامُ عَلَيْكَ يَا عُمَرُ، وَجَزَاكَ اللَّهُ عَنْ أُمَّةِ الْإِسْلَامِ خَيْرَ الْجَزَاءِ.",
        "meaning": "1. Salam kepada Rasulullah ﷺ:\n“Salam sejahtera ke atasmu, wahai Rasulullah, serta rahmat Allah dan keberkatan-Nya. Semoga Allah melimpahkan selawat, salam, dan keberkahan ke atasmu, serta membalasmu dengan sebaik-baik ganjaran yang diberikan kepada seorang nabi atas jasanya kepada umatnya.”\n\n2. Salam kepada Abu Bakar رضي الله عنه:\n“Salam sejahtera ke atasmu, wahai Abu Bakar. Semoga Allah membalasmu bagi pihak umat Islam dengan sebaik-baik balasan.”\n\n3. Salam kepada Umar رضي الله عنه:\n“Salam sejahtera ke atasmu, wahai Umar. Semoga Allah membalasmu bagi pihak umat Islam dengan sebaik-baik balasan.”",
        "note": "Dibaca ketika berziarah ke makam Rasulullah ﷺ, Abu Bakar Ash-Shiddiq, dan Umar bin Al-Khattab di Madinah Munawwarah · Sumber: https://ilmuislam.id/"
      },
      {
        "title": "Doa Dziarah Kubur",
        "subtitle": "Doa salam dan permohonan keselamatan bagi penghuni kubur",
        "arabic": "السَّلَامُ عَلَيْكُمْ يَا أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ،\nوَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ،\nوَنَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ.",
        "meaning": "“Salam sejahtera ke atas kamu, wahai penghuni tempat tinggal dari kalangan orang yang beriman dan orang Islam.\n\nSesungguhnya kami, insyaAllah, akan menyusul kamu. Kami memohon kepada Allah kesejahteraan untuk kami dan untuk kamu.”",
        "note": "Doa ziarah kubur (salam kepada ahli kubur), HR. Muslim no. 975 · Sumber: https://hadits.in/"
      }
    ]
  },
  {
    "id": "janazah",
    "icon": "☼",
    "title": "Sholat Jenazah",
    "subtitle": "Bacaan pada empat takbir dan salam",
    "countLabel": "4 TAKBIR + SALAM",
    "items": [
      {
        "title": "Takbir Pertama — Al-Fatihah",
        "subtitle": "Membaca Surah Al-Fatihah",
        "arabic": "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.\nالرَّحْمَٰنِ الرَّحِيمِ.\nمَالِكِ يَوْمِ الدِّينِ.\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ.\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ.",
        "meaning": "Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Maha Pemurah lagi Maha Penyayang. Yang Menguasai Hari Pembalasan. Hanya Engkaulah yang kami sembah dan hanya kepada Engkaulah kami meminta pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula) mereka yang sesat.",
        "note": "QS Al-Fatihah: 1–7 · Sumber: https://quran.kemenag.go.id/"
      },
      {
        "title": "Takbir Kedua — Sholawat",
        "subtitle": "Sholawat kepada Nabi Muhammad ﷺ",
        "arabic": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ،\nكَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ،\nإِنَّكَ حَمِيدٌ مَجِيدٌ.\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ،\nكَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ،\nإِنَّكَ حَمِيدٌ مَجِيدٌ.",
        "meaning": "Ya Allah, berilah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberikan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berilah keberkahan kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberikan keberkahan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
        "note": "HR. Bukhari no. 3370 & HR. Muslim no. 406 (Sholawat Ibrahimiyah; Sunnah Sholat Jenazah HR. Al-Hakim 1/360) · Sumber: https://hadits.in/"
      },
      {
        "title": "Takbir Ketiga — Doa untuk Jenazah",
        "subtitle": "Memohon ampunan dan rahmat bagi jenazah",
        "arabic": "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ،\nوَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ،\nوَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ،\nوَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ،\nوَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ،\nوَأَهْلًا خَيْرًا مِنْ أَهْلِهِ،\nوَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ،\nوَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ أَوْ مِنْ عَذَابِ النَّارِ.",
        "meaning": "Ya Allah, ampunilah dan rahmatilah dia. Bebaskanlah dan maafkanlah dia. Luaskanlah kuburnya dan mandikanlah ia dengan air, salju, dan embun. Sucikan ia dari seluruh kesalahan seperti dibersihkannya kain putih dari kotoran. Berikan ia rumah yang lebih baik dari rumahnya (di dunia), keluarga yang lebih baik dari keluarganya, pasangan yang lebih baik dari pasangannya. Lalu masukkanlah ia ke dalam surga dan lindungilah ia dari cobaan kubur dan azab neraka.",
        "note": "HR. Muslim no. 963 dari ‘Auf bin Malik radhiyallahu ‘anhu (Shahih) · Sumber: https://hadits.in/"
      },
      {
        "title": "Takbir Keempat — Doa",
        "subtitle": "Memohon pahala dan ampunan",
        "arabic": "اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ،\nوَلَا تَفْتِنَّا بَعْدَهُ،\nوَاغْفِرْ لَنَا وَلَهُ.",
        "meaning": "Ya Allah, jangan haramkan kami dari pahalanya dan jangan cobai kami sepeninggalnya. Ampunilah kami dan ampunilah dia.",
        "note": "HR. Abu Dawud no. 3199, HR. Ibnu Majah no. 1498 & Al-Hakim 1/359 dari Abu Hurairah radhiyallahu ‘anhu (Hasan) · Sumber: https://www.hadits.id/"
      },
      {
        "title": "Salam",
        "subtitle": "Penutup sholat jenazah",
        "arabic": "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ.",
        "meaning": "Semoga keselamatan, rahmat Allah, dan berkah-Nya dilimpahkan kepada kalian.",
        "note": "HR. Al-Bayhaqi dalam As-Sunan Al-Kubra 4/43 & Al-Hakim 1/360 dari Abdullah bin Mas’ud radhiyallahu ‘anhu · Sumber: https://hadits.arina.id/"
      }
    ]
  },
  {
    "id": "my-doa",
    "icon": "★",
    "title": "Doa Saya",
    "subtitle": "Koleksi doa pilihan pribadi yang dapat disesuaikan urutan dan judulnya",
    "countLabel": "0 DOA",
    "items": []
  }
];
