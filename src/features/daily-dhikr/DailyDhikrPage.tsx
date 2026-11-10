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
      ? 'text-2xl'
      : fontSizeLevel === 'large'
      ? 'text-3xl'
      : 'text-4xl';

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
        className="px-5 pt-3 pb-2.5 bg-background/95 backdrop-blur-md sticky top-0 z-20 border-b border-border/40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="w-9 h-9 rounded-xl border border-border/60 bg-surface flex items-center justify-center text-text active:scale-95 transition-all mr-1"
                aria-label="Kembali ke Beranda"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center text-white shadow-xs">
              <span className="font-serif text-lg font-bold">۞</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-primary-dark leading-tight">
                Dzikir Pagi & Petang
              </h1>
              <p className="text-[10px] font-bold text-primary tracking-wider uppercase">
                Dzikir Pagi & Petang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleFontSize}
              className="w-9 h-9 rounded-xl border border-border/60 bg-surface flex items-center justify-center text-text hover:bg-black/5 active:scale-95 transition-all text-xs font-bold"
              title="Ubah Ukuran Huruf"
              aria-label="Ubah Ukuran Huruf"
            >
              <Type size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className="w-9 h-9 rounded-xl border border-border/60 bg-surface flex items-center justify-center text-primary-dark hover:bg-black/5 active:scale-95 transition-all shadow-xs"
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
        <div className="bg-[#E7EDED] p-1 rounded-2xl flex gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => handleModeChange('pagi')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 ${
              mode === 'pagi'
                ? 'bg-surface text-primary-dark shadow-sm'
                : 'text-muted hover:text-text'
            }`}
          >
            ☀️ Pagi (19)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('petang')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 ${
              mode === 'petang'
                ? 'bg-surface text-primary-dark shadow-sm'
                : 'text-muted hover:text-text'
            }`}
          >
            🌙 Petang (18)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={scrollAreaRef} className="max-w-lg mx-auto w-full px-5 pt-3.5 space-y-4 flex-1">
        {/* Progress Header Row */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-primary tracking-widest uppercase text-[11px]">
            {mode === 'pagi' ? 'DZIKIR PAGI' : 'DZIKIR PETANG'}
          </span>
          <span className="font-bold text-muted tabular-nums">
            {String(currentEntry.no).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </span>
        </div>

        {/* Title Block */}
        <div className="px-1">
          <h2 className="text-xl font-extrabold text-primary-dark leading-snug tracking-tight break-words">
            {currentEntry.title}
          </h2>
        </div>

        {/* Card 1: Arabic Text Card with Golden Line */}
        <div className="bg-surface rounded-3xl border border-border/70 shadow-sm relative overflow-hidden p-5">
          {/* Top Golden Gradient Line */}
          <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-gold/60 via-gold to-gold/60 rounded-b-full" />

          {/* Arabic Label */}
          <div className="flex items-center gap-2 text-primary font-bold text-[11px] tracking-widest uppercase mb-3 pt-1">
            <span className="w-4 h-[2px] bg-gold rounded-full" />
            <span>BACAAN ARAB</span>
          </div>

          {/* Arabic Paragraph */}
          <div className="py-2">
            <p
              className={`arabic-text text-primary-dark text-center leading-[2.2] tracking-wide whitespace-pre-line font-medium ${arabicFontSizeClass}`}
              lang="ar"
              dir="rtl"
            >
              {currentEntry.arabic}
            </p>
          </div>
        </div>

        {/* Card 2: Frequency & Interactive Repeat Counter Card */}
        <div className="bg-[#EAF2F3] border border-[#DBE8E9] rounded-2xl p-4 flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#D8E9E9] flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
              <Clock size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-1">
                JUMLAH / WAKTU
              </p>
              <p className="text-xs text-text leading-relaxed font-medium">
                {currentEntry.frequency}
              </p>
            </div>
          </div>

          {/* Interactive Tap Counter Button */}
          <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
            {currentTaps > 0 && (
              <button
                type="button"
                onClick={() => handleResetTap(currentEntry.id)}
                className="w-8 h-8 rounded-lg bg-surface/80 border border-border/60 text-muted hover:text-danger flex items-center justify-center transition-colors"
                title="Reset hitungan bacaan ini"
              >
                <RotateCcw size={13} />
              </button>
            )}

            <button
              type="button"
              onClick={() => handleTap(currentEntry.id, currentEntry.targetCount)}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 ${
                isTargetMet
                  ? 'bg-primary text-white'
                  : 'bg-surface text-primary border border-primary/30 hover:bg-primary-soft'
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
        <div className="bg-surface rounded-3xl border border-border/70 shadow-sm p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-primary font-bold text-[11px] tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-gold rounded-full" />
            <span>MAKNA</span>
          </div>
          <p className="text-sm text-text leading-relaxed font-normal">
            {currentEntry.meaning}
          </p>
        </div>

        {/* Card 4: Catatan / Note Card */}
        {currentEntry.note && (
          <div className="bg-[#EAF2F3] border border-[#DBE8E9] rounded-2xl p-4 flex gap-3 items-start shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#D8E9E9] text-[#287A7B] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black text-[#287477] tracking-wider uppercase mb-0.5">
                CATATAN
              </div>
              <p className="text-xs text-[#2E4A59] font-medium leading-relaxed">
                {currentEntry.note.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
                  part.match(/^https?:\/\//) ? (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#1e5a5c] hover:text-[#18344D] font-bold break-all"
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
        className="fixed left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border z-40 px-5 py-3"
        style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
        aria-label="Navigasi bacaan"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2.5">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-13 h-12 rounded-2xl bg-surface border border-border text-primary-dark font-bold flex items-center justify-center disabled:opacity-35 disabled:pointer-events-none hover:bg-black/5 active:scale-95 transition-all shadow-xs"
            aria-label="Bacaan sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>

          {/* List Drawer Button */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="w-13 h-12 rounded-2xl bg-surface border border-border text-primary font-bold flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all shadow-xs"
            aria-label="Daftar bacaan"
          >
            <List size={20} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 h-12 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-[0.99] transition-all shadow-md"
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
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center transition-opacity"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="bg-[#F8FAFA] rounded-t-3xl max-w-lg w-full max-h-[82dvh] flex flex-col p-4 shadow-2xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="w-10 h-1 rounded-full bg-border/80 mx-auto mb-3" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-border/50">
              <div>
                <h3 className="text-lg font-bold text-primary-dark">
                  Daftar Dzikir {mode === 'pagi' ? 'Pagi' : 'Petang'}
                </h3>
                <span className="text-xs text-muted font-medium">
                  {entries.length} bacaan dzikir
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-surface border border-border/60 flex items-center justify-center text-muted hover:text-text"
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
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#EDF6F4] border-primary/50 shadow-xs'
                        : 'bg-surface border-border/60 hover:border-border'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold tabular-nums flex-shrink-0 ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-[#EDF3F3] text-primary'
                      }`}
                    >
                      {String(item.no).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-sm font-bold text-primary-dark leading-snug break-words">
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-surface rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-primary-soft text-primary mx-auto flex items-center justify-center shadow-inner">
              <Sparkles size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary-dark">
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
                className="w-full py-3 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
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
                  className="w-full py-2.5 text-muted hover:text-text font-medium text-xs transition-colors"
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
