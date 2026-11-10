export interface DailyDhikrEntry {
  id: string;
  no: number;
  title: string;
  arabic: string;
  frequency: string;
  meaning: string;
  targetCount: number;
  note?: string;
}

export const PAGI_ENTRIES: DailyDhikrEntry[] = [
  {
    "id": "pagi-1",
    "no": 1,
    "title": "Ayat Kursi - Surah Al-Baqarah ayat 255",
    "arabic": "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
    "frequency": "1 kali pada pagi hari. Ayat ini adalah Al-Qur’an, Surah Al-Baqarah [2]:255.",
    "meaning": "Allah, tidak ada sesembahan yang berhak disembah selain Dia, Yang Maha Hidup dan terus-menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya segala yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya kecuali dengan izin-Nya. Dia mengetahui apa yang ada di hadapan dan di belakang mereka. Mereka tidak mengetahui apa pun dari ilmu-Nya kecuali apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dia Mahatinggi lagi Mahaagung.",
    "targetCount": 1,
    "note": "QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "pagi-2",
    "no": 2,
    "title": "Surah Al-Ikhlas",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Falaq dan An-Nas.",
    "meaning": "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Katakanlah: Dialah Allah Yang Maha Esa. Allah tempat bergantung segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Tidak ada sesuatu pun yang setara dengan-Nya.",
    "targetCount": 3,
    "note": "QS. Al-Ikhlas [112]: 1–4 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "pagi-3",
    "no": 3,
    "title": "Surah Al-Falaq",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Ikhlas dan An-Nas.",
    "meaning": "Katakanlah, “Aku berlindung kepada Rabb yang menguasai subuh, dari kejahatan makhluk yang Dia ciptakan, dari kejahatan malam apabila telah gelap, dari kejahatan para peniup pada buhul-buhul, dan dari kejahatan orang yang dengki ketika ia dengki.”",
    "targetCount": 3,
    "note": "QS. Al-Falaq [113]: 1–5 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "pagi-4",
    "no": 4,
    "title": "Surah An-Nas",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Ikhlas dan Al-Falaq.",
    "meaning": "Katakanlah, “Aku berlindung kepada Rabb manusia, Raja manusia, sesembahan manusia, dari kejahatan bisikan setan yang bersembunyi, yang membisikkan ke dalam dada manusia, dari golongan jin dan manusia.”",
    "targetCount": 3,
    "note": "QS. An-Nas [114]: 1–6 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "pagi-5",
    "no": 5,
    "title": "Allahumma bika asbahna wa bika amsayna",
    "arabic": "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.",
    "frequency": "1 kali pada pagi hari. Untuk petang, ubah susunan awal lafaz menjadi “بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا”.",
    "meaning": "Ya Allah, dengan pertolongan dan kehendak-Mu kami memasuki pagi dan petang. Dengan kehendak-Mu kami hidup dan mati, dan kepada-Mu kami dibangkitkan.",
    "targetCount": 1,
    "note": "HR. At-Tirmidzi no. 3391 & Abu Dawud no. 5068 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-6",
    "no": 6,
    "title": "Asbahna ‘ala fitratil-Islam",
    "arabic": "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ.",
    "frequency": "1 kali pada pagi hari. Lampiran mencantumkan lafaz “أَصْبَحْنَا”.",
    "meaning": "Kami memasuki pagi di atas fitrah Islam, kalimat keikhlasan, agama Nabi kami Muhammad ﷺ, dan millah ayah kami Ibrahim yang lurus serta berserah diri; beliau bukan termasuk orang-orang musyrik.",
    "targetCount": 1,
    "note": "HR. Ahmad no. 15360 & Ad-Darimi no. 2689 · Sumber: https://hadits.tazkia.ac.id/"
  },
  {
    "id": "pagi-7",
    "no": 7,
    "title": "Asbahna wa asbahal-mulku lillah",
    "arabic": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.",
    "frequency": "1 kali pada pagi hari. Untuk petang terdapat penggantian “أَصْبَحْنَا” menjadi “أَمْسَيْنَا” pada permulaan.",
    "meaning": "Kami memasuki pagi dan seluruh kerajaan adalah milik Allah. Segala puji bagi Allah. Tidak ada sesembahan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian, dan Dia Mahakuasa atas segala sesuatu. Rabbku, aku memohon kebaikan hari ini dan kebaikan setelahnya, serta berlindung dari keburukan hari ini dan setelahnya. Aku berlindung dari kemalasan, usia tua yang buruk, azab neraka, dan azab kubur.",
    "targetCount": 1,
    "note": "HR. Muslim no. 2723 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-8",
    "no": 8,
    "title": "Sayyidul Istighfar",
    "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Ya Allah, Engkaulah Rabbku. Tidak ada sesembahan yang berhak disembah selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu. Aku berpegang pada janji kepada-Mu semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui nikmat-Mu atasku dan mengakui dosaku. Maka ampunilah aku, karena tidak ada yang mengampuni dosa selain Engkau.",
    "targetCount": 1,
    "note": "HR. Bukhari no. 6306 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-9",
    "no": 9,
    "title": "Allahumma ‘afini fi badani",
    "arabic": "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang. Kedua bagian doa dibaca dalam rangkaian yang sama.",
    "meaning": "Ya Allah, karuniakanlah keselamatan pada tubuhku, pendengaranku, dan penglihatanku. Tidak ada sesembahan yang berhak disembah selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekufuran, kefakiran, dan azab kubur. Tidak ada sesembahan yang berhak disembah selain Engkau.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5090 & Ahmad no. 20430 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-10",
    "no": 10,
    "title": "Allahumma inni as’alukal-‘afwa wal-‘afiyah",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي. اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي. اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Ya Allah, aku memohon ampunan dan keselamatan di dunia dan akhirat. Aku memohon ampunan dan keselamatan dalam agama, urusan dunia, keluarga, dan hartaku. Tutupilah aibku dan tenteramkanlah rasa takutku. Lindungilah aku dari depan, belakang, kanan, kiri, dan atasku. Dengan keagungan-Mu, aku berlindung dari kebinasaan yang datang dari bawahku.",
    "targetCount": 1,
    "note": "HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-11",
    "no": 11,
    "title": "Allahumma ‘alimal-ghaibi wasy-syahadah",
    "arabic": "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.",
    "frequency": "1 kali pada pagi, petang, dan sebelum tidur.",
    "meaning": "Ya Allah, Yang mengetahui yang gaib dan yang nyata, Pencipta langit dan bumi, Rabb serta Penguasa segala sesuatu. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, setan dan ajakan kesyirikannya, serta dari melakukan keburukan terhadap diriku atau menyeret seorang Muslim ke dalamnya.",
    "targetCount": 1,
    "note": "HR. At-Tirmidzi no. 3392 & Abu Dawud no. 5067 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-12",
    "no": 12,
    "title": "Bismillahilladzi la yadurru",
    "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang.",
    "meaning": "Dengan nama Allah, yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat menimbulkan mudarat. Dia Maha Mendengar lagi Maha Mengetahui.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5088 & At-Tirmidzi no. 3388 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-13",
    "no": 13,
    "title": "Raditu billahi rabba",
    "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang.",
    "meaning": "Aku rela Allah sebagai Rabbku, Islam sebagai agamaku, dan Muhammad ﷺ sebagai Nabiku.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5072 & At-Tirmidzi no. 3389 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-14",
    "no": 14,
    "title": "Ya Hayyu ya Qayyum",
    "arabic": "يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Wahai Yang Maha Hidup dan terus-menerus mengurus seluruh makhluk, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan serahkan aku kepada diriku sendiri walau sekejap mata.",
    "targetCount": 1,
    "note": "HR. An-Nasa'i dalam As-Sunan Al-Kubra no. 10405 & Al-Hakim 1/545 · Sumber: https://hadits.arina.id/"
  },
  {
    "id": "pagi-15",
    "no": 15,
    "title": "La ilaha illallah wahdahu la syarika lah",
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    "frequency": "Beberapa riwayat menyebut 1 kali; riwayat lain 10 kali; dan riwayat Abu Hurairah menyebut 100 kali dalam sehari. Lihat rincian di catatan takhrij.",
    "meaning": "Tidak ada sesembahan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian, dan Dia Mahakuasa atas segala sesuatu.",
    "targetCount": 100,
    "note": "HR. Bukhari no. 3293 & Muslim no. 2691 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-16",
    "no": 16,
    "title": "Subhanallahi wa bihamdihi ‘adada khalqihi",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.",
    "frequency": "3 kali pada pagi hari.",
    "meaning": "Mahasuci Allah dan segala puji bagi-Nya sebanyak bilangan makhluk-Nya, sesuai keridaan-Nya, seberat timbangan Arasy-Nya, dan sebanyak tinta untuk menuliskan kalimat-kalimat-Nya.",
    "targetCount": 3,
    "note": "HR. Muslim no. 2726 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-17",
    "no": 17,
    "title": "Allahumma inni as’aluka ‘ilman nafi‘an",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.",
    "frequency": "1 kali setelah salam salat Subuh.",
    "meaning": "Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik dan halal, serta amal yang diterima.",
    "targetCount": 1,
    "note": "HR. Ibnu Majah no. 925 & Ahmad no. 26521 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-18",
    "no": 18,
    "title": "Subhanallahi wa bihamdihi",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
    "frequency": "100 kali dalam sehari. Lampiran menempatkannya dalam rangkaian dzikir pagi.",
    "meaning": "Mahasuci Allah dan segala puji bagi-Nya.",
    "targetCount": 100,
    "note": "HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/"
  },
  {
    "id": "pagi-19",
    "no": 19,
    "title": "Astaghfirullah wa atubu ilaih",
    "arabic": "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.",
    "frequency": "100 kali dalam sehari, berdasarkan riwayat Sahih Muslim. Lampiran menempatkannya pada rangkaian dzikir pagi/petang.",
    "meaning": "Aku memohon ampun kepada Allah dan bertobat kepada-Nya.",
    "targetCount": 100,
    "note": "HR. Bukhari no. 6307 & Muslim no. 2702 · Sumber: https://hadits.in/"
  }
];

export const PETANG_ENTRIES: DailyDhikrEntry[] = [
  {
    "id": "petang-1",
    "no": 1,
    "title": "Ayat Kursi - Surah Al-Baqarah ayat 255",
    "arabic": "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
    "frequency": "1 kali pada pagi hari. Ayat ini adalah Al-Qur’an, Surah Al-Baqarah [2]:255.",
    "meaning": "Allah, tidak ada sesembahan yang berhak disembah selain Dia, Yang Maha Hidup dan terus-menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya segala yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya kecuali dengan izin-Nya. Dia mengetahui apa yang ada di hadapan dan di belakang mereka. Mereka tidak mengetahui apa pun dari ilmu-Nya kecuali apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dia Mahatinggi lagi Mahaagung.",
    "targetCount": 1,
    "note": "QS. Al-Baqarah [2]: 255 · HR. An-Nasa'i dalam 'Amalul Yaum wal Lailah no. 100 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "petang-2",
    "no": 2,
    "title": "Surah Al-Ikhlas",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Falaq dan An-Nas.",
    "meaning": "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Katakanlah: Dialah Allah Yang Maha Esa. Allah tempat bergantung segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Tidak ada sesuatu pun yang setara dengan-Nya.",
    "targetCount": 3,
    "note": "QS. Al-Ikhlas [112]: 1–4 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "petang-3",
    "no": 3,
    "title": "Surah Al-Falaq",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Ikhlas dan An-Nas.",
    "meaning": "Katakanlah, “Aku berlindung kepada Rabb yang menguasai subuh, dari kejahatan makhluk yang Dia ciptakan, dari kejahatan malam apabila telah gelap, dari kejahatan para peniup pada buhul-buhul, dan dari kejahatan orang yang dengki ketika ia dengki.”",
    "targetCount": 3,
    "note": "QS. Al-Falaq [113]: 1–5 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "petang-4",
    "no": 4,
    "title": "Surah An-Nas",
    "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang, bersama Al-Ikhlas dan Al-Falaq.",
    "meaning": "Katakanlah, “Aku berlindung kepada Rabb manusia, Raja manusia, sesembahan manusia, dari kejahatan bisikan setan yang bersembunyi, yang membisikkan ke dalam dada manusia, dari golongan jin dan manusia.”",
    "targetCount": 3,
    "note": "QS. An-Nas [114]: 1–6 · HR. Abu Dawud no. 5082 & At-Tirmidzi no. 3575 · Sumber: https://quran.kemenag.go.id/ dan https://hadits.in/"
  },
  {
    "id": "petang-5",
    "no": 5,
    "title": "Allahumma bika amsayna wa bika asbahna",
    "arabic": "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.",
    "frequency": "1 kali pada petang hari.",
    "meaning": "Ya Allah, hanya dengan rahmat dan pertolongan-Mu kami memasuki sore, dan dengan rahmat dan pertolongan-Mu kami memasuki pagi. Hanya dengan rahmat dan kehendak-Mu kami hidup, dan dengan rahmat dan kehendak-Mu kami mati. Dan, hanya kepada-Mulah tempat kembali (semua makhluk).",
    "targetCount": 1,
    "note": "HR. At-Tirmidzi no. 3391 & Abu Dawud no. 5068 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-6",
    "no": 6,
    "title": "Amsaina ‘ala fitratil-Islam",
    "arabic": "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ.",
    "frequency": "1 kali pada petang hari. Lafaz awal dibaca “أَمْسَيْنَا”.",
    "meaning": "Pada waktu sore kami berada di atas fitrah Islam, kalimat ikhlas (dua kalimat syahadat), agama Nabi kami Muhammad ﷺ, dan agama ayah kami Ibrahim yang hanif (lurus), Muslim (tunduk patuh), dan beliau bukan termasuk orang-orang musyrik.",
    "targetCount": 1,
    "note": "HR. Ahmad no. 15360 & Ad-Darimi no. 2689 · Sumber: https://hadits.tazkia.ac.id/"
  },
  {
    "id": "petang-7",
    "no": 7,
    "title": "Amsaina wa Amsal Mulku Lillah",
    "arabic": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.\nرَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.",
    "frequency": "1 kali pada petang hari.",
    "meaning": "Kami telah memasuki waktu sore dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada ilah (yang berhak disembah) kecuali Allah semata, tiada sekutu bagi-Nya. Milik Allah kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Rabbku, aku mohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya. Aku berlindung kepada-Mu dari kejahatan malam ini dan kejahatan sesudahnya. Wahai Rabbku, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Rabbku, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di alam kubur.",
    "targetCount": 1,
    "note": "HR. Muslim no. 2723 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-8",
    "no": 8,
    "title": "Sayyidul Istighfar",
    "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Ya Allah, Engkaulah Rabbku. Tidak ada sesembahan yang berhak disembah selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu. Aku berpegang pada janji kepada-Mu semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui nikmat-Mu atasku dan mengakui dosaku. Maka ampunilah aku, karena tidak ada yang mengampuni dosa selain Engkau.",
    "targetCount": 1,
    "note": "HR. Bukhari no. 6306 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-9",
    "no": 9,
    "title": "Allahumma ‘afini fi badani",
    "arabic": "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang. Kedua bagian doa dibaca dalam rangkaian yang sama.",
    "meaning": "Ya Allah, karuniakanlah keselamatan pada tubuhku, pendengaranku, dan penglihatanku. Tidak ada sesembahan yang berhak disembah selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekufuran, kefakiran, dan azab kubur. Tidak ada sesembahan yang berhak disembah selain Engkau.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5090 & Ahmad no. 20430 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-10",
    "no": 10,
    "title": "Allahumma inni as’alukal-‘afwa wal-‘afiyah",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي. اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي. اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Ya Allah, aku memohon ampunan dan keselamatan di dunia dan akhirat. Aku memohon ampunan dan keselamatan dalam agama, urusan dunia, keluarga, dan hartaku. Tutupilah aibku dan tenteramkanlah rasa takutku. Lindungilah aku dari depan, belakang, kanan, kiri, dan atasku. Dengan keagungan-Mu, aku berlindung dari kebinasaan yang datang dari bawahku.",
    "targetCount": 1,
    "note": "HR. Abu Dawud no. 5074 & Ibnu Majah no. 3871 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-11",
    "no": 11,
    "title": "Allahumma ‘alimal-ghaibi wasy-syahadah",
    "arabic": "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.",
    "frequency": "1 kali pada pagi, petang, dan sebelum tidur.",
    "meaning": "Ya Allah, Yang mengetahui yang gaib dan yang nyata, Pencipta langit dan bumi, Rabb serta Penguasa segala sesuatu. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, setan dan ajakan kesyirikannya, serta dari melakukan keburukan terhadap diriku atau menyeret seorang Muslim ke dalamnya.",
    "targetCount": 1,
    "note": "HR. At-Tirmidzi no. 3392 & Abu Dawud no. 5067 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-12",
    "no": 12,
    "title": "Bismillahilladzi la yadurru",
    "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang.",
    "meaning": "Dengan nama Allah, yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat menimbulkan mudarat. Dia Maha Mendengar lagi Maha Mengetahui.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5088 & At-Tirmidzi no. 3388 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-13",
    "no": 13,
    "title": "Raditu billahi rabba",
    "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.",
    "frequency": "3 kali pada pagi dan 3 kali pada petang.",
    "meaning": "Aku rela Allah sebagai Rabbku, Islam sebagai agamaku, dan Muhammad ﷺ sebagai Nabiku.",
    "targetCount": 3,
    "note": "HR. Abu Dawud no. 5072 & At-Tirmidzi no. 3389 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-14",
    "no": 14,
    "title": "Ya Hayyu ya Qayyum",
    "arabic": "يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.",
    "frequency": "1 kali pada pagi dan 1 kali pada petang.",
    "meaning": "Wahai Yang Maha Hidup dan terus-menerus mengurus seluruh makhluk, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan serahkan aku kepada diriku sendiri walau sekejap mata.",
    "targetCount": 1,
    "note": "HR. An-Nasa'i dalam As-Sunan Al-Kubra no. 10405 & Al-Hakim 1/545 · Sumber: https://hadits.arina.id/"
  },
  {
    "id": "petang-15",
    "no": 15,
    "title": "La ilaha illallah wahdahu la syarika lah",
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    "frequency": "Beberapa riwayat menyebut 1 kali; riwayat lain 10 kali; dan riwayat Abu Hurairah menyebut 100 kali dalam sehari. Lihat rincian di catatan takhrij.",
    "meaning": "Tidak ada sesembahan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian, dan Dia Mahakuasa atas segala sesuatu.",
    "targetCount": 100,
    "note": "HR. Bukhari no. 3293 & Muslim no. 2691 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-16",
    "no": 16,
    "title": "A‘udzu bi kalimatillahi at-tammati",
    "arabic": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
    "frequency": "Dibaca 3 kali.",
    "meaning": "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan sesuatu yang diciptakan-Nya.",
    "targetCount": 3,
    "note": "HR. Muslim no. 2709 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-17",
    "no": 17,
    "title": "Subhanallahi wa bihamdihi",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
    "frequency": "100 kali dalam sehari. Lampiran menempatkannya dalam rangkaian dzikir pagi.",
    "meaning": "Mahasuci Allah dan segala puji bagi-Nya.",
    "targetCount": 100,
    "note": "HR. Muslim no. 2692 & Bukhari no. 6405 · Sumber: https://hadits.in/"
  },
  {
    "id": "petang-18",
    "no": 18,
    "title": "Astaghfirullah wa atubu ilaih",
    "arabic": "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.",
    "frequency": "100 kali dalam sehari, berdasarkan riwayat Sahih Muslim. Lampiran menempatkannya pada rangkaian dzikir pagi/petang.",
    "meaning": "Aku memohon ampun kepada Allah dan bertobat kepada-Nya.",
    "targetCount": 100,
    "note": "HR. Bukhari no. 6307 & Muslim no. 2702 · Sumber: https://hadits.in/"
  }
];
