// DzikirKu Type Definitions

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

export interface ActiveSession {
  id: string;
  dhikrId: string;
  count: number;
  target: number;
  startedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

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
  status: 'completed';
}

export interface AppSettings {
  id: 'app-settings';
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'system';
  defaultTarget: number;
  language: 'id';
  updatedAt: string;
}

export type TabId = 'home' | 'daily-dhikr' | 'dhikr' | 'doa' | 'settings';

export type DailyDhikrType = 'pagi' | 'petang';

export interface DailyDhikrItem {
  id: string;
  number: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  virtue?: string;
  repeatCount: number;
}

export type HistoryPeriod = 'daily' | 'weekly' | 'monthly';

export interface ChartDataPoint {
  label: string;
  value: number;
  date: string;
}

