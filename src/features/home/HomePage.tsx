import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Minus, Target, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { ProgressRing } from '../../components/counter/ProgressRing';
import { CountButton } from '../../components/counter/CountButton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import {
  incrementCount,
  decrementCount,
  getProgress,
  getRemaining,
  isTargetReached,
  formatCount,
} from '../../lib/counter';
import { validateTarget } from '../../lib/validation';
import { triggerHaptic, playClickSound } from '../../lib/haptics';
import type { Dhikr, ActiveSession, AppSettings } from '../../types';

interface HomePageProps {
  activeSession: ActiveSession | null;
  activeDhikr: Dhikr | null;
  settings: AppSettings;
  onUpdateSession: (session: ActiveSession) => void;
  onNavigateToDhikr: () => void;
  onNavigateToDailyDhikr?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeSession,
  activeDhikr,
  settings,
  onUpdateSession,
  onNavigateToDhikr,
  onNavigateToDailyDhikr,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetInput, setTargetInput] = useState('');
  const [targetError, setTargetError] = useState('');
  const [justReachedTarget, setJustReachedTarget] = useState(false);
  const prevCountRef = useRef(activeSession?.count ?? 0);

  useEffect(() => {
    if (activeSession && activeDhikr) {
      const wasNotReached = !isTargetReached(prevCountRef.current, activeSession.target);
      const isNowReached = isTargetReached(activeSession.count, activeSession.target);
      if (wasNotReached && isNowReached) {
        setJustReachedTarget(true);
        setTimeout(() => setJustReachedTarget(false), 1500);
      }
      prevCountRef.current = activeSession.count;
    }
  }, [activeSession, activeDhikr]);

  const handleCount = useCallback(() => {
    if (!activeSession) return;

    if (settings.hapticsEnabled) triggerHaptic();
    if (settings.soundEnabled) playClickSound();

    const newCount = incrementCount(activeSession.count);
    onUpdateSession({
      ...activeSession,
      count: newCount,
      updatedAt: new Date().toISOString(),
    });
  }, [activeSession, settings, onUpdateSession]);

  const handleUndo = useCallback(() => {
    if (!activeSession || activeSession.count === 0) return;

    const newCount = decrementCount(activeSession.count);
    onUpdateSession({
      ...activeSession,
      count: newCount,
      updatedAt: new Date().toISOString(),
    });
  }, [activeSession, onUpdateSession]);

  const handleReset = useCallback(() => {
    if (!activeSession) return;
    onUpdateSession({
      ...activeSession,
      count: 0,
      updatedAt: new Date().toISOString(),
    });
    setShowResetConfirm(false);
  }, [activeSession, onUpdateSession]);

  const handleTargetSubmit = useCallback(() => {
    const result = validateTarget(targetInput);
    if (!result.valid) {
      setTargetError(result.error || '');
      return;
    }

    if (!activeSession) return;

    onUpdateSession({
      ...activeSession,
      target: Number(targetInput),
      updatedAt: new Date().toISOString(),
    });
    setShowTargetModal(false);
    setTargetError('');
  }, [targetInput, activeSession, onUpdateSession]);

  const openTargetModal = () => {
    setTargetInput(String(activeSession?.target || 33));
    setTargetError('');
    setShowTargetModal(true);
  };

  if (!activeDhikr || !activeSession) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center px-5 pt-20">
          <p className="text-muted text-center mb-4">Belum ada dzikir yang dipilih</p>
          <button
            onClick={onNavigateToDhikr}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium"
          >
            Pilih Dzikir
          </button>
        </div>
      </div>
    );
  }

  const progress = getProgress(activeSession.count, activeSession.target);
  const remaining = getRemaining(activeSession.count, activeSession.target);
  const reached = isTargetReached(activeSession.count, activeSession.target);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-lg mx-auto px-5">
        {/* Dhikr Selector */}
        <button
          onClick={onNavigateToDhikr}
          className="w-full mt-3 p-4 bg-surface rounded-2xl border border-border flex items-center justify-between shadow-sm"
        >
          <div className="text-left">
            {activeDhikr.arabicText && (
              <p className="arabic-text text-2xl text-primary-dark mb-1 leading-relaxed">
                {activeDhikr.arabicText}
              </p>
            )}
            <p className="text-sm font-semibold text-text">{activeDhikr.name || activeDhikr.transliteration}</p>
            {activeDhikr.transliteration && activeDhikr.transliteration !== activeDhikr.name && (
              <p className="text-xs italic text-muted mt-0.5">{activeDhikr.transliteration}</p>
            )}
            {activeDhikr.meaning && (
              <p className="text-xs text-muted mt-0.5">{activeDhikr.meaning}</p>
            )}
          </div>
          <ChevronDown size={20} className="text-muted flex-shrink-0 ml-3" />
        </button>

        {/* Daily Dhikr Quick Link */}
        {onNavigateToDailyDhikr && (
          <button
            type="button"
            onClick={onNavigateToDailyDhikr}
            className="w-full mt-2.5 px-4 py-2 bg-primary-soft/60 hover:bg-primary-soft border border-primary/20 rounded-xl flex items-center justify-between text-left active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">☀️🌙</span>
              <div>
                <p className="text-xs font-bold text-primary-dark">Dzikir Pagi & Petang</p>
                <p className="text-[10px] text-muted">Bacaan dzikir harian sesuai sunnah berlembar</p>
              </div>
            </div>
            <ChevronDown size={16} className="text-primary -rotate-90" />
          </button>
        )}

        {/* Counter Area */}
        <div className="flex flex-col items-center mt-6">
          <ProgressRing progress={progress} size={250} strokeWidth={10}>
            <div className={`flex flex-col items-center ${justReachedTarget ? 'target-reached-animation' : ''}`}>
              <span className="text-6xl font-bold text-primary-dark tabular-nums leading-none">
                {formatCount(activeSession.count)}
              </span>
              <span className="text-sm text-muted mt-2">
                {reached ? (
                  <span className="text-gold font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Target tercapai!
                  </span>
                ) : (
                  `Sisa ${formatCount(remaining)} lagi`
                )}
              </span>
              <span className="text-xs text-muted mt-1">
                {formatCount(activeSession.count)} dari {formatCount(activeSession.target)}
              </span>
            </div>
          </ProgressRing>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-6 mt-6 w-full">
            {/* Reset */}
            <button
              onClick={() => activeSession.count > 0 && setShowResetConfirm(true)}
              className="flex flex-col items-center gap-1 text-muted hover:text-danger transition-colors"
              aria-label="Reset hitungan"
              disabled={activeSession.count === 0}
            >
              <div className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center">
                <RotateCcw size={18} />
              </div>
              <span className="text-[10px] font-medium">Reset</span>
            </button>

            {/* Count Button */}
            <CountButton onCount={handleCount} />

            {/* Target */}
            <button
              onClick={openTargetModal}
              className="flex flex-col items-center gap-1 text-muted hover:text-primary transition-colors"
              aria-label="Ubah target"
            >
              <div className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center">
                <Target size={18} />
              </div>
              <span className="text-[10px] font-medium">Target</span>
            </button>
          </div>

          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={activeSession.count === 0}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 text-sm text-muted hover:text-text disabled:opacity-30 transition-colors"
            aria-label="Undo satu hitungan"
          >
            <Minus size={14} />
            <span>Undo</span>
          </button>
        </div>
      </div>

      {/* Reset Confirm Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Hitungan"
        message="Reset hitungan sesi ini? Hitungan saat ini akan dihapus dari sesi aktif."
        confirmLabel="Reset"
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
        danger
      />

      {/* Target Modal */}
      <Modal
        isOpen={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        title="Ubah Target"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">
              Target hitungan
            </label>
            <input
              type="number"
              value={targetInput}
              onChange={(e) => {
                setTargetInput(e.target.value);
                setTargetError('');
              }}
              min={1}
              max={100000}
              className="w-full px-4 py-3 border border-border rounded-xl bg-background text-text text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Masukkan target"
              inputMode="numeric"
            />
            {targetError && (
              <p className="text-danger text-xs mt-1.5">{targetError}</p>
            )}
          </div>
          <button
            onClick={handleTargetSubmit}
            className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Simpan Target
          </button>
        </div>
      </Modal>
    </div>
  );
};
