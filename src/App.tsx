import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BottomNav } from './components/layout/BottomNav';
import { HomePage } from './features/home/HomePage';
import { DailyDhikrPage } from './features/daily-dhikr/DailyDhikrPage';
import { DhikrLibraryPage } from './features/dhikr-library/DhikrLibraryPage';
import { DoaPage } from './features/doa/DoaPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { Modal } from './components/ui/Modal';
import {
  initializeDatabase,
  getAllDhikr,
  addDhikr,
  updateDhikr,
  deleteDhikr,
  getActiveSession,
  saveActiveSession,
  getAppSettings,
  updateAppSettings,
  clearAllData,
  getDB,
} from './lib/database';
import type {
  TabId,
  Dhikr,
  ActiveSession,
  AppSettings,
} from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [dhikrList, setDhikrList] = useState<Dhikr[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [settings, setSettings] = useState<AppSettings>(() => ({
    id: 'app-settings',
    hapticsEnabled: false,
    soundEnabled: false,
    theme: 'light',
    defaultTarget: 33,
    language: 'id',
    updatedAt: '',
  }));

  // State for Switch Dhikr Confirmation (when count > 0)
  const [pendingDhikr, setPendingDhikr] = useState<Dhikr | null>(null);

  // Load Initial Data from IndexedDB
  const loadData = useCallback(async () => {
    try {
      await initializeDatabase();
      const [allDhikr, currentActive, currentSettings] =
        await Promise.all([
          getAllDhikr(),
          getActiveSession(),
          getAppSettings(),
        ]);

      setDhikrList(allDhikr);
      setSettings(currentSettings);

      if (currentActive && allDhikr.some((d) => d.id === currentActive.dhikrId)) {
        setActiveSession(currentActive);
      } else if (allDhikr.length > 0) {
        const first = allDhikr[0];
        const initialSession: ActiveSession = {
          id: uuidv4(),
          dhikrId: first.id,
          count: 0,
          target: first.defaultTarget,
          startedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await saveActiveSession(initialSession);
        setActiveSession(initialSession);
      }
    } catch (err) {
      console.error('Failed to load local database:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Active Dhikr entity resolved from activeSession
  const activeDhikr =
    dhikrList.find((d) => d.id === activeSession?.dhikrId) || dhikrList[0] || null;

  // Save session update to state & IndexedDB
  const handleUpdateSession = useCallback(
    (updated: ActiveSession) => {
      setActiveSession(updated);
      saveActiveSession(updated).catch((err) => {
        console.error('Error saving active session:', err);
      });
    },
    []
  );

  // Dhikr Selection Handler (with unsaved count detection)
  const handleSelectDhikr = useCallback(
    (dhikr: Dhikr) => {
      if (activeSession && activeSession.dhikrId === dhikr.id) {
        // Already selected
        setActiveTab('home');
        return;
      }

      if (activeSession && activeSession.count > 0) {
        // Prompt user confirmation to switch
        setPendingDhikr(dhikr);
        return;
      }

      // If count is 0, switch directly without dialog
      const newSession: ActiveSession = {
        id: uuidv4(),
        dhikrId: dhikr.id,
        count: 0,
        target: dhikr.defaultTarget,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      handleUpdateSession(newSession);
      setActiveTab('home');
    },
    [activeSession, handleUpdateSession]
  );

  // Switch Dhikr Confirmation
  const handleConfirmSwitch = () => {
    if (!pendingDhikr) return;

    const nextSession: ActiveSession = {
      id: uuidv4(),
      dhikrId: pendingDhikr.id,
      count: 0,
      target: pendingDhikr.defaultTarget,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleUpdateSession(nextSession);
    setPendingDhikr(null);
    setActiveTab('home');
  };

  // Dhikr Library Handlers
  const handleAddDhikr = async (data: {
    name: string;
    arabicText?: string;
    transliteration: string;
    meaning?: string;
    defaultTarget: number;
  }) => {
    try {
      const created = await addDhikr(data);
      setDhikrList((prev) => [...prev, created]);
    } catch (err) {
      console.error('Failed to add custom dhikr:', err);
    }
  };

  const handleUpdateDhikr = async (id: string, updates: Partial<Dhikr>) => {
    try {
      const updated = await updateDhikr(id, updates);
      if (updated) {
        setDhikrList((prev) => prev.map((d) => (d.id === id ? updated : d)));
        // If current active dhikr was updated, also update session target if changed
        if (activeSession && activeSession.dhikrId === id && updates.defaultTarget !== undefined) {
          handleUpdateSession({
            ...activeSession,
            target: updates.defaultTarget,
          });
        }
      }
    } catch (err) {
      console.error('Failed to update dhikr:', err);
    }
  };

  const handleDeleteDhikr = async (id: string) => {
    try {
      const ok = await deleteDhikr(id);
      if (ok) {
        setDhikrList((prev) => prev.filter((d) => d.id !== id));
        // If active dhikr was deleted, revert to first available built-in
        if (activeSession && activeSession.dhikrId === id) {
          const remaining = dhikrList.filter((d) => d.id !== id);
          const fallback = remaining[0];
          if (fallback) {
            const fallbackSession: ActiveSession = {
              id: uuidv4(),
              dhikrId: fallback.id,
              count: 0,
              target: fallback.defaultTarget,
              startedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            handleUpdateSession(fallbackSession);
          }
        }
      }
    } catch (err) {
      console.error('Failed to delete dhikr:', err);
    }
  };

  // Settings Handlers
  const handleUpdateSettings = async (updates: Partial<AppSettings>) => {
    try {
      const updated = await updateAppSettings(updates);
      setSettings(updated);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  const handleClearData = async () => {
    try {
      await clearAllData();
      await loadData();
      setActiveTab('home');
    } catch (err) {
      console.error('Failed to clear data:', err);
    }
  };

  const handleImportData = async (data: {
    dhikr?: Dhikr[];
    settings?: Partial<AppSettings>;
  }) => {
    const db = await getDB();
    if (data.dhikr && Array.isArray(data.dhikr)) {
      const tx = db.transaction('dhikr', 'readwrite');
      for (const d of data.dhikr) {
        await tx.store.put(d);
      }
      await tx.done;
    }
    if (data.settings) {
      await updateAppSettings(data.settings);
    }
    await loadData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center animate-pulse">
          <span className="text-3xl font-bold font-serif">ذ</span>
        </div>
        <p className="text-sm font-semibold text-primary-dark mt-4">Memuat DzikirKu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary-soft selection:text-primary">
      <main className="tab-content">
        {activeTab === 'home' && (
          <HomePage
            activeSession={activeSession}
            activeDhikr={activeDhikr}
            settings={settings}
            onUpdateSession={handleUpdateSession}
            onNavigateToDhikr={() => setActiveTab('dhikr')}
          />
        )}

        {activeTab === 'daily-dhikr' && (
          <DailyDhikrPage
            settings={settings}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'dhikr' && (
          <DhikrLibraryPage
            dhikrList={dhikrList}
            activeDhikrId={activeSession?.dhikrId || null}
            onSelectDhikr={handleSelectDhikr}
            onAddDhikr={handleAddDhikr}
            onUpdateDhikr={handleUpdateDhikr}
            onDeleteDhikr={handleDeleteDhikr}
          />
        )}

        {activeTab === 'doa' && (
          <DoaPage
            settings={settings}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage
            settings={settings}
            dhikrList={dhikrList}
            onUpdateSettings={handleUpdateSettings}
            onClearData={handleClearData}
            onImportData={handleImportData}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Switch Dhikr Confirmation Modal */}
      <Modal
        isOpen={pendingDhikr !== null}
        onClose={() => setPendingDhikr(null)}
        title="Ganti Jenis Dzikir"
      >
        <div className="space-y-4">
          <p className="text-sm text-text leading-relaxed">
            Sesi saat ini untuk <strong>{activeDhikr?.name}</strong> memiliki{' '}
            <strong className="text-primary">{activeSession?.count || 0} hitungan</strong>. Apakah
            Anda yakin ingin beralih ke <strong>{pendingDhikr?.name}</strong>? Hitungan saat ini akan direset ke 0.
          </p>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleConfirmSwitch}
              className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm text-sm"
            >
              Ganti Dzikir & Reset Hitungan
            </button>

            <button
              type="button"
              onClick={() => setPendingDhikr(null)}
              className="w-full py-2.5 px-4 text-muted hover:text-text font-medium text-sm transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
