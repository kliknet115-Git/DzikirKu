import { describe, it, expect } from 'vitest';
import {
  formatDate,
  getDayName,
  getDayNameShort,
  getGreeting,
  getLast7Days,
  getLast8Weeks,
  getLast12Months,
  isDateInRange,
} from '../src/lib/date-utils';

describe('Date & Aggregation Utilities (PRD 6.3 & 15.1)', () => {
  it('formats dates in Indonesian', () => {
    const testDate = new Date(2026, 10, 4); // Nov 4, 2026
    const formatted = formatDate(testDate);
    expect(formatted).toContain('4');
    expect(formatted).toContain('November');
    expect(formatted).toContain('2026');
  });

  it('provides Indonesian day names', () => {
    const testDate = new Date(2026, 10, 4); // Wednesday
    expect(getDayName(testDate)).toBe('Rabu');
    expect(getDayNameShort(testDate)).toBe('Rab');
  });

  it('generates appropriate Indonesian greetings based on hour', () => {
    const greeting = getGreeting();
    expect(['Selamat Pagi', 'Selamat Siang', 'Selamat Sore', 'Selamat Malam']).toContain(greeting);
  });

  it('generates 7 consecutive days for 7-day chart', () => {
    const { dates, start, end } = getLast7Days();
    expect(dates).toHaveLength(7);
    expect(start.getTime()).toBeLessThan(end.getTime());
  });

  it('generates 8 weeks for weekly chart', () => {
    const { weeks } = getLast8Weeks();
    expect(weeks).toHaveLength(8);
  });

  it('generates 12 months for monthly chart', () => {
    const { months } = getLast12Months();
    expect(months).toHaveLength(12);
  });

  it('checks if date falls correctly within range', () => {
    const start = new Date(2026, 10, 1);
    const end = new Date(2026, 10, 10);
    expect(isDateInRange(new Date(2026, 10, 5).toISOString(), start, end)).toBe(true);
    expect(isDateInRange(new Date(2026, 9, 28).toISOString(), start, end)).toBe(false);
  });
});

