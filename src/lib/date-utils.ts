const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = BULAN[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDateShort(date: Date): string {
  const day = date.getDate();
  const month = BULAN[date.getMonth()];
  return `${day} ${month}`;
}

export function getDayName(date: Date): string {
  return HARI[date.getDay()];
}

export function getDayNameShort(date: Date): string {
  return HARI_SINGKAT[date.getDay()];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

export function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEndOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getStartOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getLast7Days(): { start: Date; end: Date; dates: Date[] } {
  const today = new Date();
  const dates: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(getStartOfDay(d));
  }
  return {
    start: getStartOfDay(dates[0]),
    end: getEndOfDay(today),
    dates,
  };
}

export function getLast8Weeks(): { start: Date; end: Date; weeks: { start: Date; end: Date }[] } {
  const today = new Date();
  const weeks: { start: Date; end: Date }[] = [];
  
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (i * 7) - today.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weeks.push({
      start: getStartOfDay(weekStart),
      end: getEndOfDay(weekEnd),
    });
  }

  return {
    start: weeks[0].start,
    end: getEndOfDay(today),
    weeks,
  };
}

export function getLast12Months(): { start: Date; end: Date; months: { start: Date; end: Date; label: string }[] } {
  const today = new Date();
  const months: { start: Date; end: Date; label: string }[] = [];

  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999);
    months.push({
      start: monthStart,
      end: monthEnd,
      label: `${BULAN[monthStart.getMonth()].substring(0, 3)} ${monthStart.getFullYear()}`,
    });
  }

  return {
    start: months[0].start,
    end: getEndOfDay(today),
    months,
  };
}

export function isDateInRange(dateStr: string, start: Date, end: Date): boolean {
  const date = new Date(dateStr);
  return date >= start && date <= end;
}

export function formatWeekRange(start: Date, end: Date): string {
  return `${formatDateShort(start)} - ${formatDateShort(end)}`;
}
