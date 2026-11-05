import { describe, it, expect } from 'vitest';
import {
  validateTarget,
  validateDhikrName,
  validateTransliteration,
  validateMeaning,
} from '../src/lib/validation';

describe('Validation Rules (PRD 6.2 & 15.1)', () => {
  describe('validateTarget', () => {
    it('accepts valid integers between 1 and 100000', () => {
      expect(validateTarget(1).valid).toBe(true);
      expect(validateTarget(33).valid).toBe(true);
      expect(validateTarget(100).valid).toBe(true);
      expect(validateTarget(100000).valid).toBe(true);
      expect(validateTarget('33').valid).toBe(true);
    });

    it('rejects empty, null, and undefined values', () => {
      expect(validateTarget('').valid).toBe(false);
      expect(validateTarget(null).valid).toBe(false);
      expect(validateTarget(undefined).valid).toBe(false);
    });

    it('rejects values below 1 or non-integers', () => {
      expect(validateTarget(0).valid).toBe(false);
      expect(validateTarget(-5).valid).toBe(false);
      expect(validateTarget(3.14).valid).toBe(false);
      expect(validateTarget('abc').valid).toBe(false);
    });

    it('rejects values exceeding 100000', () => {
      expect(validateTarget(100001).valid).toBe(false);
      expect(validateTarget(9999999).valid).toBe(false);
    });
  });

  describe('validateDhikrName', () => {
    it('accepts names with 2 to 60 characters', () => {
      expect(validateDhikrName('Ya Allah').valid).toBe(true);
      expect(validateDhikrName('Subhanallah').valid).toBe(true);
    });

    it('rejects names shorter than 2 characters', () => {
      expect(validateDhikrName('').valid).toBe(false);
      expect(validateDhikrName('A').valid).toBe(false);
      expect(validateDhikrName('   ').valid).toBe(false);
    });

    it('rejects names longer than 60 characters', () => {
      expect(validateDhikrName('A'.repeat(61)).valid).toBe(false);
    });
  });

  describe('validateTransliteration', () => {
    it('accepts transliterations between 2 and 100 characters', () => {
      expect(validateTransliteration('Alhamdulillah').valid).toBe(true);
    });

    it('rejects transliterations shorter than 2 or longer than 100 chars', () => {
      expect(validateTransliteration('A').valid).toBe(false);
      expect(validateTransliteration('A'.repeat(101)).valid).toBe(false);
    });
  });

  describe('validateMeaning', () => {
    it('accepts empty or valid meanings up to 160 characters', () => {
      expect(validateMeaning('').valid).toBe(true);
      expect(validateMeaning('Segala puji bagi Allah').valid).toBe(true);
      expect(validateMeaning('A'.repeat(160)).valid).toBe(true);
    });

    it('rejects meanings exceeding 160 characters', () => {
      expect(validateMeaning('A'.repeat(161)).valid).toBe(false);
    });
  });
});

