import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Dhikr, ActiveSession, DhikrSession, AppSettings } from '../types';
import { DEFAULT_DHIKR } from '../data/default-dhikr';
import { v4 as uuidv4 } from 'uuid';

interface DzikirKuDB extends DBSchema {
  dhikr: {
    key: string;
    value: Dhikr;
    indexes: { 'by-sort-order': number };
  };
  activeSessions: {
    key: string;
    value: ActiveSession;
  };
  dhikrSessions: {
    key: string;
    value: DhikrSession;
    indexes: { 'by-completed-at': string; 'by-dhikr-id': string };
  };
  appSettings: {
    key: string;
    value: AppSettings;
  };
}

const DB_NAME = 'dzikirku-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<DzikirKuDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<DzikirKuDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DzikirKuDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Dhikr store
      const dhikrStore = db.createObjectStore('dhikr', { keyPath: 'id' });
      dhikrStore.createIndex('by-sort-order', 'sortOrder');

      // Active sessions store
      db.createObjectStore('activeSessions', { keyPath: 'id' });

      // Dhikr sessions (history) store
      const sessionsStore = db.createObjectStore('dhikrSessions', { keyPath: 'id' });
      sessionsStore.createIndex('by-completed-at', 'completedAt');
      sessionsStore.createIndex('by-dhikr-id', 'dhikrId');

      // App settings store
      db.createObjectStore('appSettings', { keyPath: 'id' });
    },
  });

  return dbInstance;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDB();

  // Check if dhikr data exists
  const existingDhikr = await db.getAll('dhikr');
  if (existingDhikr.length === 0) {
    // Seed default dhikr
    const tx = db.transaction('dhikr', 'readwrite');
    for (const dhikr of DEFAULT_DHIKR) {
      await tx.store.put(dhikr);
    }
    await tx.done;
  } else {
    // Preserve custom dhikrs created by user
    const customDhikrs = existingDhikr.filter((d) => !d.isBuiltIn);

    // Sync built-in dhikrs so the list and order are exactly what is in DEFAULT_DHIKR
    const tx = db.transaction('dhikr', 'readwrite');
    for (const d of existingDhikr) {
      if (d.isBuiltIn) {
        await tx.store.delete(d.id);
      }
    }
    for (const d of DEFAULT_DHIKR) {
      await tx.store.put(d);
    }
    let nextOrder = DEFAULT_DHIKR.length + 1;
    for (const cd of customDhikrs) {
      await tx.store.put({
        ...cd,
        sortOrder: nextOrder++,
      });
    }
    await tx.done;
  }

  // Ensure active session points to a valid dhikr and target
  const active = await getActiveSession();
  if (active) {
    const all = await db.getAll('dhikr');
    const matched = all.find((d) => d.id === active.dhikrId);
    if (!matched && all.length > 0) {
      await db.put('activeSessions', {
        ...active,
        dhikrId: all[0].id,
        target: all[0].defaultTarget,
        updatedAt: new Date().toISOString(),
      });
    } else if (matched && matched.id === 'builtin-subhanallahi-wabihamdihi' && active.target === 33) {
      await db.put('activeSessions', {
        ...active,
        target: 100,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Initialize settings if not exist
  const settings = await db.get('appSettings', 'app-settings');
  if (!settings) {
    await db.put('appSettings', {
      id: 'app-settings',
      hapticsEnabled: false,
      soundEnabled: false,
      theme: 'light',
      defaultTarget: 33,
      language: 'id',
      updatedAt: new Date().toISOString(),
    });
  }
}

// ===== Dhikr CRUD =====

export async function getAllDhikr(): Promise<Dhikr[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('dhikr', 'by-sort-order');
  return all;
}

export async function getDhikrById(id: string): Promise<Dhikr | undefined> {
  const db = await getDB();
  return db.get('dhikr', id);
}

export async function addDhikr(dhikr: Omit<Dhikr, 'id' | 'createdAt' | 'updatedAt' | 'isBuiltIn' | 'sortOrder'>): Promise<Dhikr> {
  const db = await getDB();
  const allDhikr = await db.getAll('dhikr');
  const maxSortOrder = allDhikr.reduce((max, d) => Math.max(max, d.sortOrder), 0);

  const now = new Date().toISOString();
  const newDhikr: Dhikr = {
    ...dhikr,
    id: uuidv4(),
    isBuiltIn: false,
    sortOrder: maxSortOrder + 1,
    createdAt: now,
    updatedAt: now,
  };

  await db.put('dhikr', newDhikr);
  return newDhikr;
}

export async function updateDhikr(id: string, updates: Partial<Dhikr>): Promise<Dhikr | undefined> {
  const db = await getDB();
  const existing = await db.get('dhikr', id);
  if (!existing) return undefined;

  const updated: Dhikr = {
    ...existing,
    ...updates,
    id: existing.id,
    isBuiltIn: existing.isBuiltIn,
    updatedAt: new Date().toISOString(),
  };

  await db.put('dhikr', updated);
  return updated;
}

export async function deleteDhikr(id: string): Promise<boolean> {
  const db = await getDB();
  const existing = await db.get('dhikr', id);
  if (!existing || existing.isBuiltIn) return false;

  await db.delete('dhikr', id);
  return true;
}

// ===== Active Session =====

export async function getActiveSession(): Promise<ActiveSession | undefined> {
  const db = await getDB();
  const all = await db.getAll('activeSessions');
  return all[0];
}

export async function saveActiveSession(session: ActiveSession): Promise<void> {
  const db = await getDB();
  await db.put('activeSessions', session);
}

export async function deleteActiveSession(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('activeSessions', id);
}

export async function clearActiveSessions(): Promise<void> {
  const db = await getDB();
  await db.clear('activeSessions');
}

// ===== Dhikr Sessions (History) =====

export async function saveDhikrSession(session: DhikrSession): Promise<void> {
  const db = await getDB();
  await db.put('dhikrSessions', session);
}

export async function getAllDhikrSessions(): Promise<DhikrSession[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('dhikrSessions', 'by-completed-at');
  return all.reverse(); // newest first
}

export async function getDhikrSessionsByDateRange(start: string, end: string): Promise<DhikrSession[]> {
  const db = await getDB();
  const range = IDBKeyRange.bound(start, end);
  return db.getAllFromIndex('dhikrSessions', 'by-completed-at', range);
}

// ===== App Settings =====

export async function getAppSettings(): Promise<AppSettings> {
  const db = await getDB();
  const settings = await db.get('appSettings', 'app-settings');
  return settings || {
    id: 'app-settings',
    hapticsEnabled: false,
    soundEnabled: false,
    theme: 'light',
    defaultTarget: 33,
    language: 'id',
    updatedAt: new Date().toISOString(),
  };
}

export async function updateAppSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
  const db = await getDB();
  const current = await getAppSettings();
  const updated: AppSettings = {
    ...current,
    ...updates,
    id: 'app-settings',
    updatedAt: new Date().toISOString(),
  };
  await db.put('appSettings', updated);
  return updated;
}

// ===== Data Management =====

export async function clearAllData(): Promise<void> {
  const db = await getDB();
  await db.clear('dhikr');
  await db.clear('activeSessions');
  await db.clear('dhikrSessions');
  await db.clear('appSettings');
  await initializeDatabase();
}
