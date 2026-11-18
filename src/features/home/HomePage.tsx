import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Minus, Target, ChevronsLeft, ChevronsRight, CheckCircle2 } from 'lucide-react';
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
  onNextDhikr: () => void;
  onPrevDhikr: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeSession,
  activeDhikr,
  settings,
  onUpdateSession,
  onNavigateToDhikr,
  onNextDhikr,
  onPrevDhikr,
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
    <div
      className="min-h-screen bg-background"
      style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <Header />

      <div className="max-w-lg mx-auto px-4 sm:px-5">
        {/* Dhikr Content Card - Generous Fixed Height & Intact Harakat */}
        <button
          type="button"
          onClick={onNavigateToDhikr}
          className="w-full mt-2 h-[150px] px-5 py-3.5 bg-surface rounded-2xl border border-border text-left shadow-2xs hover:border-primary/40 active:scale-[0.99] transition-all flex flex-col justify-between"
          aria-label="Pilih dari daftar dzikir"
          title="Klik untuk memilih dzikir lain"
        >
          {activeDhikr.arabicText && (
            <div className="flex-1 flex items-center justify-end w-full min-h-0 pt-1">
              <p
                className="arabic-text text-right text-primary-dark text-[22px] sm:text-2xl leading-[1.8] line-clamp-2 w-full"
                dir="rtl"
                lang="ar"
              >
                {activeDhikr.arabicText}
              </p>
            </div>
          )}
          <p className="text-xs font-semibold text-text truncate mt-1">
            {activeDhikr.name || activeDhikr.transliteration}
          </p>
        </button>

        {/* Navigation Buttons Row: Reverse (<<) & Forward (>>) */}
        <div className="flex items-center justify-between mt-2 px-0.5">
          <button
            type="button"
            onClick={() => {
              if (settings.hapticsEnabled) triggerHaptic();
              if (settings.soundEnabled) playClickSound();
              onPrevDhikr();
            }}
            className="w-11 h-9 rounded-xl bg-surface border border-border hover:border-primary/40 active:scale-90 text-primary flex items-center justify-center shadow-2xs transition-all"
            aria-label="Bacaan sebelumnya (<<)"
            title="Bacaan Sebelumnya"
          >
            <ChevronsLeft size={20} className="stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (settings.hapticsEnabled) triggerHaptic();
              if (settings.soundEnabled) playClickSound();
              onNextDhikr();
            }}
            className="w-11 h-9 rounded-xl bg-surface border border-border hover:border-primary/40 active:scale-90 text-primary flex items-center justify-center shadow-2xs transition-all"
            aria-label="Bacaan berikutnya (>>)"
            title="Bacaan Berikutnya"
          >
            <ChevronsRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Counter Area - Compact Spacing */}
        <div className="flex flex-col items-center mt-2.5">
          <ProgressRing progress={progress} size={210} strokeWidth={8}>
            <div className={`flex flex-col items-center ${justReachedTarget ? 'target-reached-animation' : ''}`}>
              <span className="text-5xl font-bold text-primary-dark tabular-nums leading-none">
                {formatCount(activeSession.count)}
              </span>
              <span className="text-xs text-muted mt-2 font-medium">
                {reached ? (
                  <span className="text-gold font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    Target tercapai!
                  </span>
                ) : (
                  `Sisa ${formatCount(remaining)} lagi`
                )}
              </span>
              <span className="text-[11px] text-muted mt-0.5">
                {formatCount(activeSession.count)} dari {formatCount(activeSession.target)}
              </span>
            </div>
          </ProgressRing>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-6 mt-3.5 w-full">
            {/* Reset */}
            <button
              onClick={() => activeSession.count > 0 && setShowResetConfirm(true)}
              className="flex flex-col items-center gap-1 text-muted hover:text-danger active:scale-95 transition-all"
              aria-label="Reset hitungan"
              disabled={activeSession.count === 0}
            >
              <div className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center shadow-2xs">
                <RotateCcw size={17} />
              </div>
              <span className="text-[10px] font-medium">Reset</span>
            </button>

            {/* Count Button */}
            <CountButton onCount={handleCount} />

            {/* Target */}
            <button
              onClick={openTargetModal}
              className="flex flex-col items-center gap-1 text-muted hover:text-primary active:scale-95 transition-all"
              aria-label="Ubah target"
            >
              <div className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center shadow-2xs">
                <Target size={17} />
              </div>
              <span className="text-[10px] font-medium">Target</span>
            </button>
          </div>

          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={activeSession.count === 0}
            className="mt-2 flex items-center gap-1.5 px-3 py-1 text-xs text-muted hover:text-text disabled:opacity-30 transition-colors"
            aria-label="Undo satu hitungan"
          >
            <Minus size={13} />
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
