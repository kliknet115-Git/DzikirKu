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
          <div className="w-16 h-16 rounded-3xl neu-card flex items-center justify-center text-2xl text-primary mb-4 font-serif">
            ۞
          </div>
          <p className="text-muted text-center mb-5 font-medium">Belum ada dzikir yang dipilih</p>
          <button
            onClick={onNavigateToDhikr}
            className="px-6 py-3 neu-btn-primary rounded-2xl font-bold text-sm"
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
      style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <Header />

      <div className="max-w-lg mx-auto px-4 sm:px-5">
        {/* Dhikr Content Card - Neumorphic Extruded Surface with Arabic Well */}
        <button
          type="button"
          onClick={onNavigateToDhikr}
          className="w-full mt-2 h-[155px] px-5 py-4 neu-card rounded-3xl text-left cursor-pointer active:scale-[0.985] transition-all flex flex-col justify-between relative group"
          aria-label="Pilih dari daftar dzikir"
          title="Klik untuk memilih dzikir lain"
        >
          {activeDhikr.arabicText && (
            <div className="flex-1 flex items-center justify-end w-full min-h-0 pt-0.5">
              <p
                className="arabic-text text-right text-primary-dark text-[22px] sm:text-2xl leading-[1.8] line-clamp-2 w-full"
                dir="rtl"
                lang="ar"
              >
                {activeDhikr.arabicText}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between w-full pt-1 border-t border-black/[0.04]">
            <p className="text-xs font-bold text-text truncate">
              {activeDhikr.name || activeDhikr.transliteration}
            </p>
            <span className="text-[10px] font-bold text-primary tracking-wide neu-inset-sm px-2 py-0.5 rounded-full">
              Pilih Dzikir ▾
            </span>
          </div>
        </button>

        {/* Navigation Buttons Row: Reverse (<<) & Forward (>>) */}
        <div className="flex items-center justify-between mt-3 px-1">
          <button
            type="button"
            onClick={() => {
              if (settings.hapticsEnabled) triggerHaptic();
              if (settings.soundEnabled) playClickSound();
              onPrevDhikr();
            }}
            className="w-12 h-10 rounded-2xl neu-btn text-primary flex items-center justify-center transition-all"
            aria-label="Bacaan sebelumnya (<<)"
            title="Bacaan Sebelumnya"
          >
            <ChevronsLeft size={20} className="stroke-[2.5]" />
          </button>

          <div className="neu-inset-sm px-4 py-1.5 rounded-full text-[11px] font-bold text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            <span>Geser / Ganti Dzikir</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (settings.hapticsEnabled) triggerHaptic();
              if (settings.soundEnabled) playClickSound();
              onNextDhikr();
            }}
            className="w-12 h-10 rounded-2xl neu-btn text-primary flex items-center justify-center transition-all"
            aria-label="Bacaan berikutnya (>>)"
            title="Bacaan Berikutnya"
          >
            <ChevronsRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Counter Area with Neumorphic Progress Dial */}
        <div className="flex flex-col items-center mt-3">
          <ProgressRing progress={progress} size={210} strokeWidth={8}>
            <div className={`flex flex-col items-center ${justReachedTarget ? 'target-reached-animation' : ''}`}>
              <span className="text-5xl font-black text-primary-dark tabular-nums leading-none tracking-tight">
                {formatCount(activeSession.count)}
              </span>
              <span className="text-xs text-muted mt-2 font-semibold">
                {reached ? (
                  <span className="text-gold font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    Target tercapai!
                  </span>
                ) : (
                  `Sisa ${formatCount(remaining)} lagi`
                )}
              </span>
              <span className="text-[11px] text-muted/80 mt-0.5 font-medium tabular-nums">
                {formatCount(activeSession.count)} / {formatCount(activeSession.target)}
              </span>
            </div>
          </ProgressRing>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-6 mt-4 w-full">
            {/* Reset */}
            <button
              onClick={() => activeSession.count > 0 && setShowResetConfirm(true)}
              className="flex flex-col items-center gap-1.5 text-muted hover:text-danger active:scale-95 transition-all disabled:opacity-40"
              aria-label="Reset hitungan"
              disabled={activeSession.count === 0}
            >
              <div className="w-11 h-11 rounded-full neu-btn-circle flex items-center justify-center">
                <RotateCcw size={17} />
              </div>
              <span className="text-[10px] font-bold">Reset</span>
            </button>

            {/* Tactile Neumorphic Count Button */}
            <CountButton onCount={handleCount} />

            {/* Target */}
            <button
              onClick={openTargetModal}
              className="flex flex-col items-center gap-1.5 text-muted hover:text-primary active:scale-95 transition-all"
              aria-label="Ubah target"
            >
              <div className="w-11 h-11 rounded-full neu-btn-circle flex items-center justify-center">
                <Target size={17} />
              </div>
              <span className="text-[10px] font-bold">Target</span>
            </button>
          </div>

          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={activeSession.count === 0}
            className="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full neu-btn text-xs text-muted hover:text-text disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Undo satu hitungan"
          >
            <Minus size={13} strokeWidth={2.5} />
            <span className="font-semibold">Undo</span>
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
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
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
              className="w-full px-4 py-3 rounded-2xl neu-input text-text text-lg font-bold"
              placeholder="Masukkan target"
              inputMode="numeric"
            />
            {targetError && (
              <p className="text-danger text-xs font-semibold mt-1.5">{targetError}</p>
            )}
          </div>
          <button
            onClick={handleTargetSubmit}
            className="w-full py-3 neu-btn-primary font-bold rounded-2xl transition-all"
          >
            Simpan Target
          </button>
        </div>
      </Modal>
    </div>
  );
};
