export function validateTarget(value: unknown): { valid: boolean; error?: string } {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: 'Target tidak boleh kosong' };
  }

  const num = Number(value);

  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Target harus berupa bilangan bulat' };
  }

  if (num < 1) {
    return { valid: false, error: 'Target minimal 1' };
  }

  if (num > 100000) {
    return { valid: false, error: 'Target maksimal 100.000' };
  }

  return { valid: true };
}

export function validateDhikrName(value: string): { valid: boolean; error?: string } {
  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Nama dzikir minimal 2 karakter' };
  }
  if (trimmed.length > 60) {
    return { valid: false, error: 'Nama dzikir maksimal 60 karakter' };
  }
  return { valid: true };
}

export function validateTransliteration(value: string): { valid: boolean; error?: string } {
  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Transliterasi minimal 2 karakter' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Transliterasi maksimal 100 karakter' };
  }
  return { valid: true };
}

export function validateMeaning(value: string): { valid: boolean; error?: string } {
  if (value.trim().length > 160) {
    return { valid: false, error: 'Arti/keterangan maksimal 160 karakter' };
  }
  return { valid: true };
}
