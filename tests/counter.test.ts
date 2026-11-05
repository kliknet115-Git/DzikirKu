import { describe, it, expect } from 'vitest';
import {
  incrementCount,
  decrementCount,
  getProgress,
  getRemaining,
  isTargetReached,
  formatCount,
} from '../src/lib/counter';

describe('Counter Business Rules (PRD 9.1 & 15.1)', () => {
  it('increments correctly from 0 to 1, and 12 to 13', () => {
    expect(incrementCount(0)).toBe(1);
    expect(incrementCount(12)).toBe(13);
  });

  it('decrements correctly and never goes below zero', () => {
    expect(decrementCount(1)).toBe(0);
    expect(decrementCount(0)).toBe(0);
    expect(decrementCount(-1)).toBe(0);
  });

  it('calculates progress accurately and caps at 1.0 (100%)', () => {
    expect(getProgress(0, 33)).toBe(0);
    expect(getProgress(12, 33)).toBeCloseTo(12 / 33, 4);
    expect(getProgress(33, 33)).toBe(1);
    expect(getProgress(40, 33)).toBe(1); // capped at 100%
  });

  it('handles progress with zero or negative target safely', () => {
    expect(getProgress(10, 0)).toBe(0);
    expect(getProgress(10, -5)).toBe(0);
  });

  it('calculates remaining counts accurately and floors at 0', () => {
    expect(getRemaining(0, 33)).toBe(33);
    expect(getRemaining(12, 33)).toBe(21);
    expect(getRemaining(33, 33)).toBe(0);
    expect(getRemaining(40, 33)).toBe(0); // target exceeded
  });

  it('detects when target is reached or surpassed', () => {
    expect(isTargetReached(32, 33)).toBe(false);
    expect(isTargetReached(33, 33)).toBe(true);
    expect(isTargetReached(34, 33)).toBe(true);
  });

  it('formats counts with id-ID locale number formatting', () => {
    expect(formatCount(0)).toBe('0');
    expect(formatCount(1000)).toBe('1.000');
    expect(formatCount(33333)).toBe('33.333');
  });
});

