import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Clock,
  Type,
  CheckCircle2,
  RotateCcw,
  X,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  PAGI_ENTRIES,
  PETANG_ENTRIES,
} from '../../data/daily-dhikr-data';
import type { DailyDhikrEntry } from '../../data/daily-dhikr-data';
import { triggerHaptic, playClickSound } from '../../lib/haptics';
import type { AppSettings } from '../../types';

interface DailyDhikrPageProps {
  settings: AppSettings;
  onBackToHome?: () => void;
}

export const DailyDhikrPage: React.FC<DailyDhikrPageProps> = ({
  settings,
  onBackToHome,
}) => {
  const [mode, setMode] = useState<'pagi' | 'petang'>('pagi');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [tapCounts, setTapCounts] = useState<{ [key: string]: number }>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const entries: DailyDhikrEntry[] = mode === 'pagi' ? PAGI_ENTRIES : PETANG_ENTRIES;
  const currentEntry: DailyDhikrEntry = entries[currentIndex] || entries[0];
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Reset page when mode changes
  const handleModeChange = (newMode: 'pagi' | 'petang') => {
    if (newMode === mode) return;
    setMode(newMode);
    setCurrentIndex(0);
    setTapCounts({});
    setShowCompletionModal(false);
  };

  const handleNext = () => {
    if (currentIndex < entries.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowCompletionModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectFromList = (idx: number) => {
    setCurrentIndex(idx);
    setIsSheetOpen(false);
  };

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, mode]);

  const handleTap = (id: string, targetCount: number) => {
    if (settings.hapticsEnabled) triggerHaptic();
    if (settings.soundEnabled) playClickSound();

    setTapCounts((prev) => {
      const current = prev[id] || 0;
      if (current < targetCount) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const handleResetTap = (id: string) => {
    setTapCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const toggleFontSize = () => {
    setFontSizeLevel((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  const arabicFontSizeClass =
    fontSizeLevel === 'normal'
      ? 'text-[28px]'
      : fontSizeLevel === 'large'
      ? 'text-3xl'
      : 'text-[32px]';

  const currentTaps = tapCounts[currentEntry.id] || 0;
  const isTargetMet = currentTaps >= currentEntry.targetCount;

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{
        paddingBottom: 'calc(14rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Top Bar */}
      <header
        className="px-5 pt-3 pb-2.5 bg-background/95 backdrop-blur-md sticky top-0 z-20 border-b border-white/50"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-text mr-1"
                aria-label="Kembali ke Beranda"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl neu-card-sm flex items-center justify-center text-primary">
              <span className="font-serif text-lg font-bold">۞</span>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-primary-dark leading-tight">
                Dzikir Pagi & Petang
              </h1>
              <p className="text-[10px] font-bold text-primary tracking-wider uppercase">
                Al-Ma'tsurat & Sunnah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleFontSize}
              className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-text text-xs font-bold"
              title="Ubah Ukuran Huruf"
              aria-label="Ubah Ukuran Huruf"
            >
              <Type size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-primary-dark"
              title="Daftar Bacaan Dzikir"
              aria-label="Daftar Bacaan Dzikir"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mode Switcher Segmented Control: Pagi | Petang */}
      <div className="max-w-lg mx-auto w-full px-5 pt-3">
        <div className="neu-inset p-1.5 rounded-2xl flex gap-1.5">
          <button
            type="button"
            onClick={() => handleModeChange('pagi')}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-150 select-none ${
              mode === 'pagi'
                ? 'neu-btn text-primary-dark'
                : 'text-muted hover:text-text'
            }`}
          >
            ☀️ Pagi (19)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('petang')}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-150 select-none ${
              mode === 'petang'
                ? 'neu-btn text-primary-dark'
                : 'text-muted hover:text-text'
            }`}
          >
            🌙 Petang (18)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={scrollAreaRef} className="max-w-lg mx-auto w-full px-5 pt-4 space-y-4 flex-1">
        {/* Progress Header Row */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-primary tracking-widest uppercase text-[11px] neu-inset-sm px-3 py-1 rounded-full">
            {mode === 'pagi' ? 'DZIKIR PAGI' : 'DZIKIR PETANG'}
          </span>
          <span className="font-bold text-muted tabular-nums neu-inset-sm px-3 py-1 rounded-full">
            {String(currentEntry.no).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </span>
        </div>

        {/* Title Block */}
        <div className="px-1">
          <h2 className="text-xl font-black text-primary-dark leading-snug tracking-tight break-words">
            {currentEntry.title}
          </h2>
        </div>

        {/* Card 1: Arabic Text Card */}
        <div className="neu-card rounded-3xl relative overflow-hidden p-5 sm:p-6">
          {/* Arabic Paragraph */}
          <div className="py-2">
            <p
              className={`arabic-text text-primary-dark text-right leading-[2.1] tracking-wide whitespace-pre-line font-medium ${arabicFontSizeClass}`}
              lang="ar"
              dir="rtl"
            >
              {currentEntry.arabic}
            </p>
          </div>
        </div>

        {/* Card 2: Frequency & Interactive Repeat Counter Card */}
        <div className="neu-card-sm rounded-3xl p-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl neu-inset-sm flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
              <Clock size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-0.5">
                JUMLAH / WAKTU
              </p>
              <p className="text-xs text-text leading-relaxed font-semibold">
                {currentEntry.frequency}
              </p>
            </div>
          </div>

          {/* Interactive Tap Counter Button */}
          <div className="flex items-center gap-2 flex-shrink-0 self-center">
            {currentTaps > 0 && (
              <button
                type="button"
                onClick={() => handleResetTap(currentEntry.id)}
                className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-muted hover:text-danger"
                title="Reset hitungan bacaan ini"
              >
                <RotateCcw size={13} />
              </button>
            )}

            <button
              type="button"
              onClick={() => handleTap(currentEntry.id, currentEntry.targetCount)}
              className={`py-2 px-3.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all select-none ${
                isTargetMet
                  ? 'neu-btn-primary'
                  : 'neu-btn text-primary'
              }`}
            >
              {isTargetMet ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>Selesai ({currentTaps}/{currentEntry.targetCount})</span>
                </>
              ) : (
                <span>
                  Hitung ({currentTaps}/{currentEntry.targetCount})
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Meaning Card */}
        <div className="neu-card rounded-3xl p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-primary font-bold text-[11px] tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-primary rounded-full" />
            <span>MAKNA</span>
          </div>
          <p className="text-sm text-text leading-relaxed font-normal">
            {currentEntry.meaning}
          </p>
        </div>

        {/* Card 4: Catatan / Note Card */}
        {currentEntry.note && (
          <div className="neu-card-sm rounded-2xl p-4 flex gap-3 items-start">
            <div className="w-7 h-7 rounded-lg neu-inset-sm text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black text-primary tracking-wider uppercase mb-0.5">
                CATATAN
              </div>
              <p className="text-xs text-muted font-medium leading-relaxed">
                {currentEntry.note.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
                  part.match(/^https?:\/\//) ? (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary hover:text-primary-dark font-bold break-all"
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Pager Navigation Bar */}
      <nav
        className="fixed left-0 right-0 neu-dock z-40 px-5 py-3 border-t border-white/60"
        style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
        aria-label="Navigasi bacaan"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-13 h-12 rounded-2xl neu-btn text-primary-dark font-bold flex items-center justify-center disabled:opacity-35 disabled:pointer-events-none transition-all"
            aria-label="Bacaan sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>

          {/* List Drawer Button */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="w-13 h-12 rounded-2xl neu-btn text-primary font-bold flex items-center justify-center transition-all"
            aria-label="Daftar bacaan"
          >
            <List size={20} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 h-12 rounded-2xl neu-btn-primary font-bold text-sm flex items-center justify-center gap-2 select-none"
          >
            <span>
              {currentIndex === entries.length - 1 ? 'Selesai' : 'Bacaan berikutnya'}
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Modal: Daftar Dzikir */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end justify-center transition-opacity"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="neu-card rounded-t-3xl max-w-lg w-full max-h-[82dvh] flex flex-col p-4 border border-white/70"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="w-10 h-1.5 rounded-full neu-inset mx-auto mb-3" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-border/60">
              <div>
                <h3 className="text-base font-extrabold text-primary-dark">
                  Daftar Dzikir {mode === 'pagi' ? 'Pagi' : 'Petang'}
                </h3>
                <span className="text-xs text-muted font-medium">
                  {entries.length} bacaan dzikir
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-8 h-8 rounded-full neu-btn-circle flex items-center justify-center text-muted hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            {/* List Items */}
            <div className="overflow-y-auto flex-1 pt-3 space-y-2 pr-0.5">
              {entries.map((item, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectFromList(idx)}
                    className={`w-full p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all select-none ${
                      isSelected
                        ? 'neu-inset text-primary'
                        : 'neu-btn text-text hover:text-primary-dark'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold tabular-nums flex-shrink-0 ${
                        isSelected
                          ? 'neu-btn-primary text-white'
                          : 'neu-inset-sm text-primary'
                      }`}
                    >
                      {String(item.no).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-sm font-bold leading-snug break-words">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed break-words">
                        {item.frequency}
                      </p>
                    </div>

                    <ChevronRight size={18} className="text-muted/60 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center px-6">
          <div className="neu-card rounded-3xl p-6 max-w-sm w-full text-center space-y-4 border border-white/70">
            <div className="w-16 h-16 rounded-full neu-card-sm text-gold mx-auto flex items-center justify-center">
              <Sparkles size={32} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-primary-dark">
                Alhamdulillah Selesai!
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Anda telah menyelesaikan seluruh rangkaian {mode === 'pagi' ? 'Dzikir Pagi' : 'Dzikir Petang'}. Semoga Allah menerima amal ibadah Anda dan melimpahkan keberkahan sepanjang hari.
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  setCurrentIndex(0);
                }}
                className="w-full py-3 neu-btn-primary font-bold text-xs rounded-2xl transition-all"
              >
                Ulangi dari Awal
              </button>
              {onBackToHome && (
                <button
                  type="button"
                  onClick={() => {
                    setShowCompletionModal(false);
                    onBackToHome();
                  }}
                  className="w-full py-2.5 neu-btn text-muted hover:text-text font-semibold text-xs rounded-2xl transition-all"
                >
                  Kembali ke Beranda
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
