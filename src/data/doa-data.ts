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
    id: 'before',
    icon: '◉',
    title: 'Sebelum dan Sesudah Berdoa',
    subtitle: 'Bacaan pembuka dan penutup saat berdoa',
    countLabel: '3 BACAAN',
    items: [
      {
        title: 'Doa Sebelum Berdoa',
        subtitle: 'Memohon pengabulan doa dengan mengingat janji Allah',
        arabic: 'يَا رَبِّ،\nأَنْتَ قُلْتَ وَقَوْلُكَ الْحَقُّ،\nاُدْعُونِي أَسْتَجِبْ لَكُمْ،\nوَأَنْتَ لَا تُخْلِفُ الْمِيعَادَ.',
        latin: "Ya Rabb, Anta qulta wa qawlukal haq. 'Ud'uni astajib lakum, wa anta la tukhliful mi'ad.",
        meaning: 'Wahai Tuhanku, Engkau telah berfirman dan firman-Mu adalah benar: “Berdoalah kepada-Ku, niscaya akan Aku perkenankan bagimu”, dan Engkau tidak pernah mengingkari janji.',
      },
      {
        title: 'Doa Memohon Pengabulan',
        subtitle: 'Bacaan lanjutan sebelum memanjatkan doa',
        arabic: 'اللَّهُمَّ اسْتَجِبْ كَمَا وَعَدْتَ.',
        latin: 'Allāhumma-stajib kamā wa‘adta.',
        meaning: 'Ya Allah, kabulkanlah sebagaimana Engkau telah berjanji.',
      },
      {
        title: 'Doa Sesudah Berdoa',
        subtitle: 'Memohon agar doa diterima dan dikabulkan',
        arabic: 'اللَّهُمَّ تَقَبَّلْ دَعْوَانَا كَمَا أَمَرْتَنَا،\nفَاسْتَجِبْ كَمَا وَعَدْتَنَا،\nفَأَنْتَ يَا رَبِّ لَا تُخْلِفُ الْمِيعَادَ.',
        latin: "Allāhumma taqabbal da'awnāka kamā amartanā, fastajib kamā wa‘adtanā, fa anta yā rabbī lā tukhliful mi‘ād.",
        meaning: 'Ya Allah, terimalah doa kami sebagaimana Engkau telah perintahkan kami. Dan kabulkanlah doa kami sebagaimana Engkau telah menjanjikan kepada kami. Sesungguhnya Engkau, wahai Rabb, tidak pernah mengingkari janji.',
      },
    ],
  },
  {
    id: 'forgiveness',
    icon: '♡',
    title: 'Doa Meminta Ampunan dan Rezeki',
    subtitle: 'Memohon ampunan, kelapangan rumah, dan keberkahan rezeki',
    countLabel: '1 DOA',
    items: [
      {
        title: 'Doa Meminta Ampunan dan Rezeki',
        subtitle: 'Ampunan dosa, kelapangan rumah, dan keberkahan rezeki',
        arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي،\nوَوَسِّعْ لِي فِي دَارِي،\nوَبَارِكْ لِي فِي رِزْقِي.',
        latin: 'Allahumma ighfir lī dhanbi, wa wassi‘ lī fī dārī, wa bārik lī fī rizqī.',
        meaning: 'Ya Allah, ampunilah dosa-dosaku, luaskanlah rumahku untukku, dan berkahilah rezekiku.',
      },
    ],
  },
  {
    id: 'help',
    icon: '✧',
    title: 'Doa Memohon Pertolongan',
    subtitle: 'Memohon kekuatan, bantuan, kemenangan, dan petunjuk Allah',
    countLabel: '1 DOA',
    items: [
      {
        title: 'Doa Memohon Pertolongan',
        subtitle: 'Bersandar kepada daya dan kekuatan Allah',
        arabic: 'اللَّهُمَّ إِنِّي أَتَبَرَّأُ مِنْ حَوْلِي وَقُوَّتِي،\nوَأَلْتَجِئُ إِلَى حَوْلِكَ وَقُوَّتِكَ.\nاللَّهُمَّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ،\nوَانْصُرْنِي وَلَا تَنْصُرْ عَلَيَّ،\nوَاهْدِنِي وَيَسِّرِ الْهُدَى لِي.',
        latin: "Allāhumma innī atabarra'u min hawlī wa quwwatī, wa alta-ji'u ilā hawlika wa quwwatika. Allāhumma a'innī wa lā tu'in 'alayya, wanshurnī wa lā tanshur 'alayya, wahdinī wa yassiril hudā lī.",
        meaning: 'Ya Allah, aku berlepas diri dari daya dan kekuatanku, dan aku bersandar kepada daya dan kekuatan-Mu. Ya Allah, bantulah aku dan jangan biarkan aku, tolonglah aku dan jangan Engkau lemahkan aku. Berilah aku petunjuk dan mudahkan petunjuk itu bagiku.',
      },
    ],
  },
  {
    id: 'umrah',
    icon: '☾',
    title: 'Doa Umroh',
    subtitle: 'Rangkaian doa perjalanan, tawaf, dan sa’i sesuai urutan',
    countLabel: '21 DOA / BACAAN',
    items: [
      {
        title: 'Doa Keluar Rumah',
        arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ،\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.',
        meaning: 'Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan (pertolongan) Allah.',
      },
      {
        title: 'Doa Setelah Duduk dalam Kendaraan',
        arabic: 'بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا،\nإِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ.',
        meaning: 'Dengan (menyebut) nama Allah pada waktu berlayar dan berlabuhnya. Sesungguhnya Tuhanku Maha Pengampun, Maha Penyayang.',
        note: 'QS Hud: 41.',
      },
      {
        title: 'Doa Ketika Kendaraan Mulai Bergerak',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ.\nسُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا\nوَمَا كُنَّا لَهُ مُقْرِنِينَ،\nوَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ.',
        meaning: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Allah Mahabesar. Allah Mahabesar. Allah Mahabesar. Mahasuci Allah yang telah menggerakkan untuk kami kendaraan ini, padahal kami tidak kuasa menggerakkannya. Dan sesungguhnya kepada Tuhan kami pasti akan kembali.',
      },
      {
        title: 'Niat Umroh',
        arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً.',
        meaning: 'Aku penuhi panggilan-Mu, ya Allah, untuk menunaikan ibadah umrah.',
      },
      {
        title: 'Bacaan Talbiyah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ،\nلَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ،\nإِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ،\nلَا شَرِيكَ لَكَ.',
        meaning: 'Aku datang memenuhi panggilan-Mu, ya Allah. Aku datang memenuhi panggilan-Mu. Tiada sekutu bagi-Mu. Aku datang memenuhi panggilan-Mu. Sungguh, segala puji, nikmat, dan segala kekuasaan adalah milik-Mu. Tiada sekutu bagi-Mu.',
      },
      {
        title: 'Doa Masuk Masjid',
        arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.',
        meaning: 'Ya Allah, bukakanlah bagiku segala pintu rahmat-Mu.',
      },
      {
        title: 'Doa Keluar Masjid',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ.',
        meaning: 'Ya Allah, sesungguhnya aku memohon fadilah kepada-Mu.',
      },
      {
        title: 'Doa Ketika Melihat Ka’bah',
        arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا\nوَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً،\nوَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ\nأَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا\nوَتَعْظِيمًا وَبِرًّا.',
        meaning: 'Ya Allah, tambahkanlah kemuliaan, kehormatan, keagungan, dan kehebatan pada Baitullah ini; dan tambahkanlah pula kepada orang-orang yang memuliakan, menghormati, dan mengagungkannya di antara mereka yang berhaji atau yang berumrah kemuliaan, kehormatan, kebesaran, dan kebaikan.',
      },
      {
        title: 'Doa Ketika Akan Memulai Tawaf',
        arabic: 'اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ،\nوَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ\nمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ.',
        meaning: 'Ya Allah, seraya iman kepada-Mu, membenarkan kitab-Mu, menepati janji kepada-Mu, serta mengikuti sunah Nabi-Mu, Muhammad ﷺ.',
      },
      {
        title: 'Doa Tawaf di Setiap Posisi Hajar Aswad',
        arabic: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ.',
        meaning: 'Dengan nama Allah, Allah Mahabesar.',
      },
      {
        title: 'Doa Tawaf dari Hajar Aswad ke Maqam Ibrahim',
        arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ،\nوَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ.\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ.',
        meaning: 'Mahasuci Allah. Segala pujian hanya pantas disanjungkan kepada Allah. Tiada Tuhan selain Allah. Allah Mahabesar. Tidak ada daya dan kekuatan kecuali (pertolongan) dari Allah Yang Mahaluhur lagi Mahaagung.',
      },
      {
        title: 'Doa Tawaf dari Maqam Ibrahim ke Rukun Yamani',
        arabic: '',
        meaning: 'Berdo’a Bebas',
        note: 'Lampiran tidak mencantumkan lafaz khusus untuk bagian ini.',
      },
      {
        title: 'Doa Tawaf dari Rukun Yamani ke Hajar Aswad',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً،\nوَفِي الْآخِرَةِ حَسَنَةً،\nوَقِنَا عَذَابَ النَّارِ.',
        meaning: 'Wahai Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan hindarkanlah kami dari siksa neraka.',
      },
      {
        title: 'Doa Menuju Maqam Ibrahim',
        arabic: 'وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى.',
        meaning: 'Dan jadikanlah bagian dari maqam Ibrahim itu sebagai tempat salat.',
        note: 'QS Al-Baqarah: 125.',
      },
      {
        title: 'Doa Minum Air Zamzam',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا،\nوَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ\nوَسَقَمٍ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ.',
        meaning: 'Ya Allah, sesungguhnya aku bermohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan penawar bagi segala penyakit; dengan rahmat-Mu, wahai Tuhan Yang Maha Pengasih lagi Maha Penyayang.',
      },
      {
        title: 'Doa Menuju Bukit Shafa',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ.',
        meaning: 'Sesungguhnya Shafa dan Marwah merupakan sebagian syiar (agama) Allah.',
      },
      {
        title: 'Doa Menaiki Bukit Shafa',
        arabic: 'أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ.',
        meaning: 'Aku memulai sa’i dengan apa yang didahulukan oleh Allah.',
      },
      {
        title: 'Doa Ketika Berada di Bukit Shafa dan Marwah',
        arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ.\nلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ،\nلَهُ الْمُلْكُ وَلَهُ الْحَمْدُ،\nوَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.\nلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ،\nأَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ،\nوَهَزَمَ الْأَحْزَابَ وَحْدَهُ.',
        meaning: 'Allah Mahabesar (3 kali). Tiada Tuhan yang berhak disembah selain Allah, Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Tiada Tuhan yang berhak disembah selain Allah Yang Maha Esa, yang melaksanakan janji-Nya, membela hamba-Nya (Muhammad), dan mengalahkan golongan musuh sendirian.',
      },
      {
        title: 'Doa Sa’i dari Bukit Shafa ke Marwah',
        arabic: '',
        meaning: 'Berdo’a Bebas',
        note: 'Lampiran tidak mencantumkan lafaz khusus untuk bagian ini.',
      },
      {
        title: 'Doa Sa’i di Pilar Lampu Hijau',
        arabic: 'اللَّهُمَّ اغْفِرْ وَارْحَمْ،\nوَأَنْتَ الْأَعَزُّ الْأَكْرَمُ.',
        meaning: 'Ya Rabbku, ampuni dan rahmatilah aku. Sesungguhnya Engkaulah Yang Maha Perkasa dan Maha Pemurah.',
      },
      {
        title: 'Salam Rasulullah, Abu Bakar & Umar',
        subtitle: 'Salam ketika berziarah ke makam Rasulullah ﷺ, Abu Bakar, dan Umar',
        arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. صَلَّى اللَّهُ وَسَلَّمَ وَبَارَكَ عَلَيْكَ، وَجَزَاكَ أَفْضَلَ مَا جَزَى نَبِيًّا عَنْ أُمَّتِهِ.\n\nالسَّلَامُ عَلَيْكَ يَا أَبَا بَكْرٍ، وَجَزَاكَ اللَّهُ عَنْ أُمَّةِ الْإِسْلَامِ خَيْرَ الْجَزَاءِ.\n\nالسَّلَامُ عَلَيْكَ يَا عُمَرُ، وَجَزَاكَ اللَّهُ عَنْ أُمَّةِ الْإِسْلَامِ خَيْرَ الْجَزَاءِ.',
        meaning: '1. Salam kepada Rasulullah ﷺ:\n“Salam sejahtera ke atasmu, wahai Rasulullah, serta rahmat Allah dan keberkatan-Nya. Semoga Allah melimpahkan selawat, salam, dan keberkahan ke atasmu, serta membalasmu dengan sebaik-baik ganjaran yang diberikan kepada seorang nabi atas jasanya kepada umatnya.”\n\n2. Salam kepada Abu Bakar رضي الله عنه:\n“Salam sejahtera ke atasmu, wahai Abu Bakar. Semoga Allah membalasmu bagi pihak umat Islam dengan sebaik-baik balasan.”\n\n3. Salam kepada Umar رضي الله عنه:\n“Salam sejahtera ke atasmu, wahai Umar. Semoga Allah membalasmu bagi pihak umat Islam dengan sebaik-baik balasan.”',
        note: 'Dibaca ketika berziarah ke makam Rasulullah ﷺ, Abu Bakar Ash-Shiddiq, dan Umar bin Al-Khattab di Madinah Munawwarah.',
      },
    ],
  },
  {
    id: 'janazah',
    icon: '☼',
    title: 'Sholat Jenazah',
    subtitle: 'Bacaan pada empat takbir dan salam',
    countLabel: '4 TAKBIR + SALAM',
    items: [
      {
        title: 'Takbir Pertama — Al-Fatihah',
        subtitle: 'Membaca Surah Al-Fatihah',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.\nالرَّحْمَٰنِ الرَّحِيمِ.\nمَالِكِ يَوْمِ الدِّينِ.\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ.\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ.',
        meaning: 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Maha Pemurah lagi Maha Penyayang. Yang Menguasai Hari Pembalasan. Hanya Engkaulah yang kami sembah dan hanya kepada Engkaulah kami meminta pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula) mereka yang sesat.',
        note: 'QS Al-Fatihah: 1–7.',
      },
      {
        title: 'Takbir Kedua — Sholawat',
        subtitle: 'Sholawat kepada Nabi Muhammad ﷺ',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ،\nكَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ،\nإِنَّكَ حَمِيدٌ مَجِيدٌ.\nاللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ،\nكَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ،\nإِنَّكَ حَمِيدٌ مَجِيدٌ.',
        meaning: 'Ya Allah, berilah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberikan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berilah keberkahan kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberikan keberkahan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
      },
      {
        title: 'Takbir Ketiga — Doa untuk Jenazah',
        subtitle: 'Memohon ampunan dan rahmat bagi jenazah',
        arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ،\nوَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ،\nوَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ،\nوَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ،\nوَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ،\nوَأَهْلًا خَيْرًا مِنْ أَهْلِهِ،\nوَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ،\nوَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ أَوْ مِنْ عَذَابِ النَّارِ.',
        meaning: 'Ya Allah, ampunilah dan rahmatilah dia. Bebaskanlah dan maafkanlah dia. Luaskanlah kuburnya dan mandikanlah ia dengan air, salju, dan embun. Sucikan ia dari seluruh kesalahan seperti dibersihkannya kain putih dari kotoran. Berikan ia rumah yang lebih baik dari rumahnya (di dunia), keluarga yang lebih baik dari keluarganya, pasangan yang lebih baik dari pasangannya. Lalu masukkanlah ia ke dalam surga dan lindungilah ia dari cobaan kubur dan azab neraka.',
      },
      {
        title: 'Takbir Keempat — Doa',
        subtitle: 'Memohon pahala dan ampunan',
        arabic: 'اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ،\nوَلَا تَفْتِنَّا بَعْدَهُ،\nوَاغْفِرْ لَنَا وَلَهُ.',
        meaning: 'Ya Allah, jangan haramkan kami dari pahalanya dan jangan cobai kami sepeninggalnya. Ampunilah kami dan ampunilah dia.',
      },
      {
        title: 'Salam',
        subtitle: 'Penutup sholat jenazah',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ.',
        meaning: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya dilimpahkan kepada kalian.',
      },
    ],
  },
  {
    id: 'doa-nabi-muhammad',
    icon: '۞',
    title: 'Doa yang diminta Nabi Muhammad',
    subtitle: 'Memohon kebaikan yang diminta Nabi Muhammad ﷺ dan perlindungan dari keburukan',
    countLabel: '1 DOA',
    items: [
      {
        title: 'Doa yang diminta Nabi Muhammad',
        subtitle: 'Memohon kebaikan dan perlindungan dari segala keburukan',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ،\nوَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ،\nوَأَنْتَ الْمُسْتَعَانُ، وَعَلَيْكَ الْبَلَاغُ،\nوَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.',
        latin: 'Allāhumma innī as-aluka min khayri mā sa-alaka minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam, wa a‘ūdzu bika min syarri masta‘ādza minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam, wa antal-musta‘ān, wa ‘alaykal-balāgh, wa lā ḥawla wa lā quwwata illā billāh.',
        meaning: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan apa saja yang pernah diminta oleh Nabi-Mu Muhammad shallallahu \'alaihi wa sallam. Dan aku berlindung kepada-Mu dari keburukan apa saja yang Nabi-Mu Muhammad shallallahu \'alaihi wa sallam pernah berlindung darinya. Dan Engkaulah tempat meminta pertolongan, dan di tangan-Mulah penyampaian (keberhasilan), serta tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.',
        note: 'HR. At-Tirmidzi no. 3521.',
      },
    ],
  },
];

