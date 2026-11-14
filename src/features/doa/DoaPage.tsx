import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Type,
  Info,
  RotateCcw,
} from 'lucide-react';
import { doaCategories } from '../../data/doa-data';
import type { DoaCategory, DoaItem } from '../../data/doa-data';
import type { AppSettings } from '../../types';
import { triggerHaptic, playClickSound } from '../../lib/haptics';

interface DoaPageProps {
  settings?: AppSettings;
  onBackToHome?: () => void;
}

export const DoaPage: React.FC<DoaPageProps> = ({ settings }) => {
  const [view, setView] = useState<'home' | 'category' | 'detail'>('home');
  const [activeCatId, setActiveCatId] = useState<string>('before');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const activeCategory: DoaCategory =
    doaCategories.find((c) => c.id === activeCatId) || doaCategories[0];
  const activeItem: DoaItem | undefined = activeCategory.items[activeIndex];

  // Scroll to top on view or item change
  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, activeCatId, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSheetOpen(false);
      } else if (view === 'detail') {
        if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, activeIndex, activeCategory]);

  const handleOpenCategory = (catId: string) => {
    if (settings?.hapticsEnabled) triggerHaptic();
    setActiveCatId(catId);
    setActiveIndex(0);
    const cat = doaCategories.find((c) => c.id === catId);
    if (cat && cat.items.length === 1) {
      setView('detail');
    } else {
      setView('category');
    }
  };

  const handleOpenDetail = (index: number) => {
    if (settings?.hapticsEnabled) triggerHaptic();
    setActiveIndex(index);
    setView('detail');
  };

  const handleNext = () => {
    if (settings?.hapticsEnabled) triggerHaptic();
    if (settings?.soundEnabled) playClickSound();

    if (activeIndex < activeCategory.items.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      // Loop back to start
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      if (settings?.hapticsEnabled) triggerHaptic();
      if (settings?.soundEnabled) playClickSound();
      setActiveIndex((prev) => prev - 1);
    }
  };

  const cycleFontSize = () => {
    if (fontSizeLevel === 'normal') setFontSizeLevel('large');
    else if (fontSizeLevel === 'large') setFontSizeLevel('xlarge');
    else setFontSizeLevel('normal');
  };

  const getArabicFontSizeClass = (text: string) => {
    const len = text.length;
    if (fontSizeLevel === 'normal') {
      if (len > 360) return 'text-xl leading-[2.2]';
      if (len > 190) return 'text-2xl leading-[2.3]';
      return 'text-2xl leading-[2.4]';
    }
    if (fontSizeLevel === 'large') {
      if (len > 360) return 'text-2xl leading-[2.3]';
      if (len > 190) return 'text-3xl leading-[2.4]';
      return 'text-3xl leading-[2.5]';
    }
    // xlarge
    if (len > 360) return 'text-3xl leading-[2.4]';
    if (len > 190) return 'text-4xl leading-[2.5]';
    return 'text-4xl leading-[2.6]';
  };

  return (
    <div
      className="min-h-screen bg-[#F3F6F6] text-[#233444]"
      style={{
        paddingBottom:
          view === 'detail'
            ? 'calc(14rem + env(safe-area-inset-bottom, 0px))'
            : 'calc(6rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Sticky Header Topbar */}
      <header
        className="sticky top-0 z-30 bg-[#F3F6F6]/95 backdrop-blur-md border-b border-[#E6EBEB] px-5 py-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 10px)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#18344D] to-[#287A7B] text-white flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0">
              ۞
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-extrabold text-[#18344D] truncate leading-tight">
                {view === 'detail' ? activeCategory.title : 'Doa'}
              </h1>
              <p className="text-[10px] font-black tracking-[1.4px] text-[#287A7B] uppercase mt-0.5">
                {view === 'detail' ? 'BACAAN DOA' : 'KUMPULAN DOA'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {view === 'detail' && (
              <>
                <button
                  type="button"
                  onClick={cycleFontSize}
                  className="w-9 h-9 rounded-xl bg-white border border-[#E7EDED] text-[#18344D] flex items-center justify-center hover:bg-[#EAF2F3] transition-colors shadow-xs"
                  aria-label="Ubah ukuran teks"
                  title="Ukuran Font"
                >
                  <Type size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (settings?.hapticsEnabled) triggerHaptic();
                    if (activeCategory.items.length === 1) {
                      setView('home');
                    } else {
                      setIsSheetOpen(true);
                    }
                  }}
                  className="w-9 h-9 rounded-xl bg-white border border-[#E7EDED] text-[#287A7B] flex items-center justify-center hover:bg-[#EAF2F3] transition-colors shadow-xs"
                  aria-label={activeCategory.items.length === 1 ? 'Kembali ke semua kategori' : 'Buka daftar doa'}
                  title={activeCategory.items.length === 1 ? 'Semua Kategori' : 'Ukuran Font'}
                >
                  <List size={18} />
                </button>
              </>
            )}

            {view === 'category' && (
              <button
                type="button"
                onClick={() => setView('home')}
                className="w-9 h-9 rounded-xl bg-white border border-[#E7EDED] text-[#18344D] flex items-center justify-center hover:bg-[#EAF2F3] transition-colors shadow-xs"
                aria-label="Kembali ke semua kategori"
              >
                <List size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main ref={scrollAreaRef} className="max-w-lg mx-auto px-5 pt-4">
        {/* ================= VIEW 1: HOME / CATEGORY SELECTION ================= */}
        {view === 'home' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-black tracking-[1.6px] text-[#287A7B]">
                MENU DOA
              </span>
              <span className="text-xs font-bold text-[#81909A] tabular-nums">
                {String(doaCategories.length).padStart(2, '0')} KATEGORI
              </span>
            </div>

            <section className="px-1">
              <h2 className="text-2xl font-extrabold text-[#18344D] tracking-tight">
                Kumpulan Doa
              </h2>
              <p className="text-xs text-[#7B8992] leading-relaxed mt-1">
                Pilih kumpulan doa yang ingin dibaca. Setiap bacaan disusun mengikuti urutan dokumen sumber.
              </p>
            </section>

            {/* Category Cards List */}
            <div className="grid gap-3 pt-1">
              {doaCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleOpenCategory(c.id)}
                  className="w-full bg-white rounded-2xl p-4 border border-[#EDF0EF] shadow-[0_4px_16px_rgba(20,48,66,0.04)] flex items-center gap-3.5 hover:border-[#287A7B]/40 active:scale-[0.985] transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF2F3] text-[#287A7B] flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                    <span className="block text-[15px] font-bold text-[#18344D] leading-snug break-words">
                      {c.title}
                    </span>
                    <span className="block text-xs text-[#7C8A93] mt-0.5 leading-snug break-words">
                      {c.subtitle}
                    </span>
                    <span className="inline-block text-[10px] font-extrabold text-[#287A7B] tracking-wider mt-1.5 uppercase bg-[#EAF2F3] px-2 py-0.5 rounded-md">
                      {c.countLabel}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-[#9AA9B0] flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Tip Card */}
            <div className="bg-[#EAF2F3] border border-[#DCE9E9] rounded-2xl p-4 text-[#46606D] text-xs leading-relaxed mt-4">
              <div className="text-[10px] font-black tracking-wider text-[#287A7B] mb-1">
                PANDUAN
              </div>
              Ketuk salah satu kategori untuk melihat daftar bacaan. Gunakan tombol sebelumnya, berikutnya, atau daftar bacaan untuk berpindah halaman.
            </div>
          </div>
        )}

        {/* ================= VIEW 2: CATEGORY ITEM LIST ================= */}
        {view === 'category' && (
          <div className="space-y-4">
            {/* Back to Home Button */}
            <button
              type="button"
              onClick={() => setView('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B8992] hover:text-[#18344D] transition-colors py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-[#E7EDED] flex items-center justify-center text-[#18344D]">
                <ChevronLeft size={16} />
              </div>
              <span>Semua kategori doa</span>
            </button>

            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-black tracking-[1.6px] text-[#287A7B]">
                KATEGORI DOA
              </span>
              <span className="text-xs font-bold text-[#81909A] tabular-nums">
                {activeCategory.countLabel}
              </span>
            </div>

            <section className="px-1">
              <h2 className="text-2xl font-extrabold text-[#18344D] tracking-tight leading-tight break-words">
                {activeCategory.title}
              </h2>
              <p className="text-xs text-[#7B8992] leading-relaxed mt-1 break-words">
                {activeCategory.subtitle}
              </p>
            </section>

            {/* Item Rows */}
            <div className="grid gap-2.5 pt-1">
              {activeCategory.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {activeCategory.id === 'doa-pilihan' && (
                    idx === 0 ? (
                      <div className="flex items-center gap-2 pt-1 pb-0.5">
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                        <span className="text-[11px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-3 py-1 rounded-lg">
                          1. DOA PERMOHONAN AMPUNAN
                        </span>
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                      </div>
                    ) : idx === 9 ? (
                      <div className="flex items-center gap-2 pt-3 pb-0.5">
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                        <span className="text-[11px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-3 py-1 rounded-lg">
                          2. DOA PERMOHONAN REZEKI
                        </span>
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                      </div>
                    ) : idx === 16 ? (
                      <div className="flex items-center gap-2 pt-3 pb-0.5">
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                        <span className="text-[11px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-3 py-1 rounded-lg">
                          3. DOA LAINNYA
                        </span>
                        <div className="h-px bg-[#D6E3E3] flex-1" />
                      </div>
                    ) : null
                  )}
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(idx)}
                    className="w-full bg-white rounded-2xl p-3.5 border border-[#EDF0EF] shadow-[0_2px_10px_rgba(20,48,66,0.03)] flex items-center gap-3 hover:border-[#287A7B]/40 active:scale-[0.99] transition-all text-left overflow-hidden"
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#EDF3F3] text-[#287A7B] text-xs font-black flex items-center justify-center tabular-nums flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="block text-sm font-bold text-[#18344D] leading-snug break-words">
                        {item.title}
                      </span>
                      <span className="block text-xs text-[#829098] mt-1 leading-relaxed break-words">
                        {item.subtitle || 'Bacaan doa'}
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-[#A2AFB5] flex-shrink-0" />
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: DETAIL PRAYER VIEW ================= */}
        {view === 'detail' && activeItem && (
          <div className="space-y-4">
            {/* Back to Category / Home Button */}
            <button
              type="button"
              onClick={() => {
                if (settings?.hapticsEnabled) triggerHaptic();
                if (activeCategory.items.length === 1) {
                  setView('home');
                } else {
                  setView('category');
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B8992] hover:text-[#18344D] transition-colors py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-[#E7EDED] flex items-center justify-center text-[#18344D]">
                <ChevronLeft size={16} />
              </div>
              <span className="truncate max-w-[240px]">
                {activeCategory.items.length === 1 ? 'Semua kategori doa' : activeCategory.title}
              </span>
            </button>

            {/* Progress Row */}
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-black tracking-[1.4px] text-[#287A7B] uppercase truncate max-w-[220px]">
                {activeCategory.id === 'doa-pilihan'
                  ? (activeIndex < 9
                      ? '1. Doa Permohonan Ampunan'
                      : activeIndex < 16
                      ? '2. Doa Permohonan Rejeki'
                      : '3. Doa Lainnya')
                  : activeCategory.title}
              </span>
              <span className="text-xs font-bold text-[#81909A] tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(activeCategory.items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title Header */}
            <section className="px-1">
              <h2 className="text-xl font-bold text-[#18344D] leading-snug break-words">
                {activeItem.title}
              </h2>
              {activeItem.subtitle && (
                <p className="text-xs text-[#8A969D] mt-1 font-medium leading-relaxed break-words">
                  {activeItem.subtitle}
                </p>
              )}
            </section>

            {/* Arabic Card */}
            <div
              className={`relative overflow-hidden bg-white rounded-3xl p-5 border border-[#EDF0EF] shadow-[0_8px_24px_rgba(20,48,66,0.06)] ${
                !activeItem.arabic ? 'bg-[#FAFDFF] border-dashed border-[#D2E2E2]' : ''
              }`}
            >
              {/* Gold Top Accent Line */}
              {activeItem.arabic && (
                <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b bg-gradient-to-r from-[#C29A55] to-[#DFC58C]" />
              )}

              {!activeItem.arabic && (
                <div className="flex items-center gap-2 text-[#287A7B] text-[11px] font-black tracking-wider mb-3">
                  <span className="w-4 h-[1px] bg-[#C29A55]" />
                  <span>KETERANGAN</span>
                </div>
              )}

              {activeItem.arabic ? (
                <div
                  className={`arabic-text text-center direction-rtl text-[#1E3042] whitespace-pre-line py-1 font-medium ${getArabicFontSizeClass(
                    activeItem.arabic
                  )}`}
                  lang="ar"
                  dir="rtl"
                >
                  {activeItem.arabic}
                </div>
              ) : (
                <div className="text-center py-6 px-3">
                  <p className="text-lg font-bold text-[#287A7B]">
                    {activeItem.meaning || 'Berdo’a Bebas'}
                  </p>
                  <p className="text-xs text-[#7B8992] mt-1.5">
                    Dianjurkan memanjatkan doa-doa kebaikan sesuai hajat masing-masing
                  </p>
                </div>
              )}
            </div>

            {/* Arti / Makna Card */}
            {activeItem.meaning && activeItem.arabic && (
              <div className="bg-white rounded-3xl p-5 border border-[#EDF0EF] shadow-[0_4px_16px_rgba(20,48,66,0.04)]">
                <div className="flex items-center gap-2 text-[#287A7B] text-[11px] font-black tracking-wider mb-2">
                  <span className="w-4 h-[1px] bg-[#C29A55]" />
                  <span>ARTI / MAKNA</span>
                </div>
                <p className="text-[15px] text-[#263847] leading-relaxed font-normal whitespace-pre-line">
                  {activeItem.meaning}
                </p>
              </div>
            )}

            {/* Catatan / Note Card */}
            {activeItem.note && (
              <div className="bg-[#EAF2F3] border border-[#DBE8E9] rounded-2xl p-4 flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-[#D8E9E9] text-[#287A7B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-[#287477] tracking-wider uppercase mb-0.5">
                    CATATAN
                  </div>
                  <p className="text-xs text-[#2E4A59] font-medium leading-relaxed">
                    {activeItem.note.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
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
        )}
      </main>

      {/* ================= FIXED BOTTOM PAGER (FOR DETAIL VIEW) ================= */}
      {view === 'detail' && (
        <nav
          className="fixed left-0 right-0 bg-[#F3F6F6]/95 backdrop-blur-md border-t border-[#E6EBEB] z-40 px-5 py-3"
          style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
          aria-label="Navigasi bacaan doa"
        >
          <div className="max-w-lg mx-auto flex items-center justify-between gap-2.5">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-13 h-12 rounded-2xl bg-white border border-[#E7EDED] text-[#18344D] font-bold flex items-center justify-center disabled:opacity-35 disabled:pointer-events-none hover:bg-black/5 active:scale-95 transition-all shadow-xs"
              aria-label="Bacaan sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>

            {/* List Drawer / Back to Categories Button */}
            <button
              type="button"
              onClick={() => {
                if (settings?.hapticsEnabled) triggerHaptic();
                if (activeCategory.items.length === 1) {
                  setView('home');
                } else {
                  setIsSheetOpen(true);
                }
              }}
              className="w-13 h-12 rounded-2xl bg-white border border-[#E7EDED] text-[#287A7B] font-bold flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all shadow-xs"
              aria-label={activeCategory.items.length === 1 ? 'Kembali ke semua kategori' : 'Daftar bacaan'}
              title={activeCategory.items.length === 1 ? 'Semua Kategori' : 'Daftar Bacaan'}
            >
              <List size={20} />
            </button>

            {/* Next / Loop Button */}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 h-12 rounded-2xl bg-[#18344D] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#244B63] active:scale-[0.99] transition-all shadow-md"
            >
              <span>
                {activeIndex === activeCategory.items.length - 1
                  ? 'Kembali ke awal'
                  : 'Bacaan berikutnya'}
              </span>
              {activeIndex === activeCategory.items.length - 1 ? (
                <RotateCcw size={16} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>
        </nav>
      )}

      {/* ================= BOTTOM SHEET: LIST OF PRAYERS ================= */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 bg-[#142B3C]/50 z-50 flex items-end justify-center transition-opacity"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="bg-[#F8FAFA] rounded-t-3xl max-w-lg w-full max-h-[82dvh] flex flex-col p-4 shadow-2xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="w-10 h-1 rounded-full bg-[#CBD4D6] mx-auto mb-3" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-[#EDF0EF]">
              <div>
                <h3 className="text-base font-bold text-[#18344D]">
                  Daftar {activeCategory.title}
                </h3>
                <span className="text-xs text-[#7D8B94] font-medium">
                  {activeCategory.items.length} bacaan doa
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="bg-[#EAF1F1] text-[#18344D] rounded-xl px-3 py-1.5 text-xs font-bold hover:bg-[#DDE7E7] transition-colors"
              >
                Tutup
              </button>
            </div>

            {/* List Items */}
            <div className="overflow-y-auto flex-1 pt-3 space-y-2 pr-0.5">
              {activeCategory.items.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <React.Fragment key={idx}>
                    {activeCategory.id === 'doa-pilihan' && (
                      idx === 0 ? (
                        <div className="flex items-center gap-2 pt-1 pb-0.5">
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-2.5 py-0.5 rounded-md">
                            1. DOA PERMOHONAN AMPUNAN
                          </span>
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                        </div>
                      ) : idx === 9 ? (
                        <div className="flex items-center gap-2 pt-2.5 pb-0.5">
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-2.5 py-0.5 rounded-md">
                            2. DOA PERMOHONAN REZEKI
                          </span>
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                        </div>
                      ) : idx === 16 ? (
                        <div className="flex items-center gap-2 pt-2.5 pb-0.5">
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-[#287A7B] bg-[#EAF2F3] px-2.5 py-0.5 rounded-md">
                            3. DOA LAINNYA
                          </span>
                          <div className="h-px bg-[#D6E3E3] flex-1" />
                        </div>
                      ) : null
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsSheetOpen(false);
                        if (settings?.hapticsEnabled) triggerHaptic();
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-[#EDF6F4] border-[#8AB6B3] shadow-xs'
                          : 'bg-white border-[#EDF0EF] hover:border-[#DDE7E7]'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold tabular-nums flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#287A7B] text-white'
                            : 'bg-[#EDF3F3] text-[#287A7B]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="flex-1 min-w-0 pr-1">
                        <p className="text-sm font-bold text-[#18344D] leading-snug break-words">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#829098] mt-0.5 leading-relaxed break-words">
                          {item.subtitle || activeCategory.title}
                        </p>
                      </div>

                      <ChevronRight size={18} className="text-[#A2AFB5] flex-shrink-0" />
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
