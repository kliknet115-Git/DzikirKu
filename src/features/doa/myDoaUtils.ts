import type { DoaItem } from '../../data/doa-data';
import { doaCategories } from '../../data/doa-data';
import { PAGI_ENTRIES, PETANG_ENTRIES } from '../../data/daily-dhikr-data';

export interface MyDoaItem extends DoaItem {
  id: string;
  originalTitle?: string;
  sourceCategory?: string;
}

export interface AvailableDoaSource {
  id: string;
  title: string;
  subtitle?: string;
  arabic?: string;
  latin?: string;
  meaning?: string;
  note?: string;
  sourceCategory: string;
}

const STORAGE_KEY = 'dzikirku_custom_doa_list_v1';

export const DEFAULT_MY_DOA: MyDoaItem[] = [
  {
    id: 'my-doa-default-1',
    title: '1. Memuji Allah dengan Ismul A\'zhom',
    originalTitle: '1. Memuji dan Mengagungkan Allah (Tahmid)',
    subtitle: 'Memohon kepada Allah dengan mengagungkan pujian, nama, dan sifat-Nya (Ismul A\'zhom)',
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.\nاللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ لَا إِلَهَ إِلَّا أَنْتَ الْمَنَّانُ بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ.',
    latin: 'Alḥamdu lillāhi rabbil-‘ālamīn, ḥamdan kaṡīran ṭayyiban mubārakan fīh. Allāhumma innī as-aluka bi-anna lakal-ḥamda lā ilāha illā antal-mannānu badī‘us-samāwāti wal-arḍi, yā dzal-jalāli wal-ikrām, yā ḥayyu yā qayyūm.',
    meaning: 'Segala puji bagi Allah, Tuhan semesta alam, pujian yang banyak, baik, lagi penuh berkah. Ya Allah, sesungguhnya aku memohon kepada-Mu karena segala puji hanya milik-Mu. Tidak ada sesembahan yang berhak disembah selain Engkau. Engkaulah Yang Maha Pemberi karunia, Pencipta langit dan bumi. Wahai Tuhan yang memiliki keagungan dan kemuliaan. Wahai Yang Mahahidup, wahai Yang Maha Mengurus seluruh makhluk.',
    note: 'HR. Abu Dawud no. 1495 & HR. Bukhari no. 799 · Sumber: https://hadits.in/',
    sourceCategory: 'Sebelum dan Sesudah Berdoa',
  },
  {
    id: 'my-doa-default-2',
    title: '2. Doa Kebaikan Dunia dan Akhirat (Sapujagat)',
    originalTitle: 'Kebaikan dunia dan akhirat',
    subtitle: 'QS Al-Baqarah [2]: 201',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    meaning: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari azab neraka.',
    note: 'QS Al-Baqarah [2]: 201 · Sumber: https://quran.kemenag.go.id/',
    sourceCategory: 'Doa-doa Pilihan',
  },
  {
    id: 'my-doa-default-3',
    title: '3. Doa Keberkahan Harta, Kebaikan Amal, dan Ampunan',
    originalTitle: 'Doa Keberkahan Harta, Kebaikan Amal, dan Ampunan',
    subtitle: 'Berdasarkan doa Nabi ﷺ untuk Anas bin Malik & HR. At-Tirmidzi no. 2329',
    arabic: 'اللَّهُمَّ أَكْثِرْ مَالِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي، وَأَحْسِنْ عَمَلِي، وَاغْفِرْ لِي',
    latin: 'Allāhumma aktsir mālī, wa bārik lī fīmā a‘ṭaytanī, wa aḥsin ‘amalī, waghfir lī.',
    meaning: '“Ya Allah, perbanyaklah hartaku, berkahilah apa yang telah Engkau anugerahkan kepadaku, perbaikilah amal perbuatanku, dan ampunilah (dosa-dosa)ku.”',
    note: 'HR. Bukhari no. 6378, Muslim no. 2480 & At-Tirmidzi no. 2329 · Sumber: https://hadits.in/bukhari/6378',
    sourceCategory: 'Doa-doa Pilihan',
  },
];

export function loadMyDoaList(): MyDoaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Failed to load My Doa from localStorage', err);
  }
  return DEFAULT_MY_DOA;
}

export function saveMyDoaList(items: MyDoaItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save My Doa to localStorage', err);
  }
}

export function getAllAppDoa(): AvailableDoaSource[] {
  const result: AvailableDoaSource[] = [];
  const seenKeys = new Set<string>();

  // 1. From doaCategories
  doaCategories.forEach((cat) => {
    if (cat.id === 'my-doa') return;
    cat.items.forEach((item, idx) => {
      const key = `${cat.id}-${idx}`;
      result.push({
        id: key,
        title: item.title,
        subtitle: item.subtitle,
        arabic: item.arabic,
        latin: item.latin,
        meaning: item.meaning,
        note: item.note,
        sourceCategory: cat.title,
      });
      seenKeys.add(item.title.toLowerCase().trim());
    });
  });

  // 2. From PAGI_ENTRIES (Dzikir Pagi)
  PAGI_ENTRIES.forEach((entry) => {
    const titleKey = entry.title.toLowerCase().trim();
    if (!seenKeys.has(titleKey)) {
      result.push({
        id: `pagi-${entry.id}`,
        title: entry.title,
        subtitle: `Dzikir Pagi (${entry.frequency})`,
        arabic: entry.arabic,
        meaning: entry.meaning,
        note: entry.note || `Dibaca ${entry.frequency} pada waktu pagi`,
        sourceCategory: 'Dzikir Pagi',
      });
      seenKeys.add(titleKey);
    }
  });

  // 3. From PETANG_ENTRIES (Dzikir Petang)
  PETANG_ENTRIES.forEach((entry) => {
    const titleKey = entry.title.toLowerCase().trim();
    if (!seenKeys.has(titleKey)) {
      result.push({
        id: `petang-${entry.id}`,
        title: entry.title,
        subtitle: `Dzikir Petang (${entry.frequency})`,
        arabic: entry.arabic,
        meaning: entry.meaning,
        note: entry.note || `Dibaca ${entry.frequency} pada waktu petang`,
        sourceCategory: 'Dzikir Petang',
      });
      seenKeys.add(titleKey);
    }
  });

  return result;
}
