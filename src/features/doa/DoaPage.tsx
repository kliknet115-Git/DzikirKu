import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Type,
  Info,
  RotateCcw,
  Plus,
  SlidersHorizontal,
  Pencil,
  Sparkles,
  X,
} from 'lucide-react';
import { doaCategories } from '../../data/doa-data';
import type { DoaCategory, DoaItem } from '../../data/doa-data';
import type { AppSettings } from '../../types';
import { triggerHaptic, playClickSound } from '../../lib/haptics';
import {
  loadMyDoaList,
  saveMyDoaList,
  DEFAULT_MY_DOA,
  type MyDoaItem,
} from './myDoaUtils';
import { MyDoaModals } from './MyDoaModals';

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

  // My Doa state
  const [myDoaList, setMyDoaList] = useState<MyDoaItem[]>(() => loadMyDoaList());
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [isManageOpen, setIsManageOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isMyDoa = activeCatId === 'my-doa';

  const activeCategory: DoaCategory = isMyDoa
    ? {
        id: 'my-doa',
        icon: '★',
        title: 'Doa Saya',
        subtitle: 'Koleksi doa pilihan pribadi yang dapat disesuaikan urutan dan judulnya',
        countLabel: `${myDoaList.length} DOA`,
        items: myDoaList,
      }
    : (doaCategories.find((c) => c.id === activeCatId) || doaCategories[0]);
  const activeItem: DoaItem | undefined = activeCategory.items[activeIndex];

  const handleUpdateMyDoaList = (newList: MyDoaItem[]) => {
    setMyDoaList(newList);
    saveMyDoaList(newList);
    if (activeIndex >= newList.length) {
      setActiveIndex(Math.max(0, newList.length - 1));
    }
  };

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
      className="min-h-screen bg-background text-text"
      style={{
        paddingBottom:
          view === 'detail'
            ? 'calc(14rem + env(safe-area-inset-bottom, 0px))'
            : 'calc(6rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Sticky Header Topbar */}
      <header
        className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-white/50 px-5 py-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 10px)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl neu-card-sm text-primary flex items-center justify-center text-lg font-serif font-bold flex-shrink-0">
              ۞
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-extrabold text-primary-dark truncate leading-tight">
                {view === 'detail' ? activeCategory.title : 'Doa'}
              </h1>
              <p className="text-[10px] font-bold tracking-[1.4px] text-primary uppercase mt-0.5">
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
                  className="w-9 h-9 rounded-xl neu-btn text-primary-dark flex items-center justify-center text-xs font-bold"
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
                  className="w-9 h-9 rounded-xl neu-btn text-primary flex items-center justify-center"
                  aria-label={activeCategory.items.length === 1 ? 'Kembali ke semua kategori' : 'Buka daftar doa'}
                  title={activeCategory.items.length === 1 ? 'Semua Kategori' : 'Daftar Bacaan'}
                >
                  <List size={18} />
                </button>
              </>
            )}

            {view === 'category' && (
              <button
                type="button"
                onClick={() => setView('home')}
                className="w-9 h-9 rounded-xl neu-btn text-primary-dark flex items-center justify-center"
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
              <span className="text-[11px] font-extrabold tracking-[1.6px] text-primary neu-inset-sm px-3 py-1 rounded-full uppercase">
                MENU DOA
              </span>
              <span className="text-xs font-bold text-muted tabular-nums neu-inset-sm px-3 py-1 rounded-full">
                {String(doaCategories.length).padStart(2, '0')} KATEGORI
              </span>
            </div>

            <section className="px-1">
              <h2 className="text-2xl font-black text-primary-dark tracking-tight">
                Kumpulan Doa
              </h2>
              <p className="text-xs text-muted leading-relaxed mt-1 font-medium">
                Pilih kumpulan doa yang ingin dibaca. Setiap bacaan disusun mengikuti urutan rujukan shahih.
              </p>
            </section>

            {/* Category Cards List */}
            <div className="grid gap-3 pt-1">
              {doaCategories.map((c) => {
                const isCustom = c.id === 'my-doa';
                const countLabel = isCustom ? `${myDoaList.length} DOA` : c.countLabel;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleOpenCategory(c.id)}
                    className="w-full neu-card rounded-3xl p-4.5 flex items-center gap-4 active:scale-[0.985] transition-all text-left cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                        isCustom
                          ? 'neu-inset-sm text-gold'
                          : 'neu-inset-sm text-primary'
                      }`}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-2">
                        <span className="block text-[15px] font-bold text-primary-dark leading-snug break-words">
                          {c.title}
                        </span>
                        {isCustom && (
                          <span className="text-[9px] font-extrabold text-gold bg-gold/15 px-2 py-0.5 rounded-full tracking-wider uppercase">
                            Pribadi
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-muted mt-0.5 leading-snug break-words">
                        {c.subtitle}
                      </span>
                      <span
                        className={`inline-block text-[10px] font-bold tracking-wider mt-1.5 uppercase px-2 py-0.5 rounded-full ${
                          isCustom
                            ? 'neu-inset-sm text-gold'
                            : 'neu-inset-sm text-primary'
                        }`}
                      >
                        {countLabel}
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-muted/60 flex-shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Tip Card */}
            <div className="neu-card-sm rounded-2xl p-4 text-muted text-xs leading-relaxed mt-4">
              <div className="text-[10px] font-black tracking-wider text-primary mb-1 uppercase">
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
              className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-text transition-colors py-1 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-text">
                <ChevronLeft size={18} />
              </div>
              <span>Semua kategori doa</span>
            </button>

            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-extrabold tracking-[1.6px] text-primary neu-inset-sm px-3 py-1 rounded-full uppercase">
                KATEGORI DOA
              </span>
              <span className="text-xs font-bold text-muted tabular-nums neu-inset-sm px-3 py-1 rounded-full">
                {activeCategory.countLabel}
              </span>
            </div>

            <section className="px-1">
              <h2 className="text-2xl font-black text-primary-dark tracking-tight leading-tight break-words">
                {activeCategory.title}
              </h2>
              <p className="text-xs text-muted leading-relaxed mt-1 break-words font-medium">
                {activeCategory.subtitle}
              </p>
            </section>

            {/* Action Bar for My Doa */}
            {isMyDoa && (
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="flex-1 py-2.5 px-4 rounded-2xl neu-btn-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Tambah Doa</span>
                </button>
                {myDoaList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsManageOpen(true)}
                    className="py-2.5 px-4 rounded-2xl neu-btn text-primary-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <SlidersHorizontal size={15} />
                    <span>Atur & Urutkan</span>
                  </button>
                )}
              </div>
            )}

            {/* Empty State for My Doa */}
            {isMyDoa && myDoaList.length === 0 && (
              <div className="neu-card rounded-3xl p-6 text-center my-2 space-y-3">
                <div className="w-14 h-14 rounded-2xl neu-inset-sm text-gold flex items-center justify-center text-2xl mx-auto mb-2">
                  ★
                </div>
                <h3 className="text-base font-bold text-primary-dark">
                  Belum Ada Doa di Kategori Ini
                </h3>
                <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
                  Kumpulkan doa-doa pilihan Anda dari seluruh doa dalam aplikasi ini. Anda dapat mengatur urutan dan mengganti judul doa sesuai kenyamanan Anda.
                </p>
                <div className="flex flex-col gap-2 max-w-xs mx-auto pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(true)}
                    className="w-full py-3 px-4 rounded-2xl neu-btn-primary text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Pilih Doa Sekarang</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateMyDoaList(DEFAULT_MY_DOA)}
                    className="w-full py-2.5 px-4 rounded-2xl neu-btn text-primary text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} />
                    <span>Gunakan Doa Rekomendasi</span>
                  </button>
                </div>
              </div>
            )}

            {/* Item Rows */}
            {activeCategory.items.length > 0 && (
              <div className="grid gap-3 pt-1">
                {activeCategory.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {activeCategory.id === 'doa-pilihan' && (
                      idx === 0 ? (
                        <div className="flex items-center gap-2 pt-1 pb-0.5">
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-3 py-1 rounded-full uppercase">
                            1. DOA PERMOHONAN AMPUNAN
                          </span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                      ) : idx === 9 ? (
                        <div className="flex items-center gap-2 pt-3 pb-0.5">
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-3 py-1 rounded-full uppercase">
                            2. DOA PERMOHONAN REZEKI
                          </span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                      ) : idx === 16 ? (
                        <div className="flex items-center gap-2 pt-3 pb-0.5">
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-3 py-1 rounded-full uppercase">
                            3. DOA LAINNYA
                          </span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                      ) : null
                    )}
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(idx)}
                      className="w-full neu-card rounded-2xl p-4 flex items-center gap-3.5 active:scale-[0.99] transition-all text-left cursor-pointer overflow-hidden"
                    >
                      <span className="w-8 h-8 rounded-xl neu-inset-sm text-primary text-xs font-black flex items-center justify-center tabular-nums flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0 pr-1">
                        <span className="block text-sm font-bold text-primary-dark leading-snug break-words">
                          {item.title}
                        </span>
                        <span className="block text-xs text-muted mt-1 leading-relaxed break-words">
                          {item.subtitle || 'Bacaan doa'}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-muted/60 flex-shrink-0" />
                    </button>
                  </React.Fragment>
                ))}

                {isMyDoa && activeCategory.items.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(true)}
                    className="w-full py-3.5 px-4 rounded-2xl neu-btn border-2 border-dashed border-primary/30 text-primary text-xs font-bold flex items-center justify-center gap-2 transition-all mt-1 cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Tambah Doa Pilihan Lainnya</span>
                  </button>
                )}
              </div>
            )}
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
              className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-text transition-colors py-1 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-text">
                <ChevronLeft size={18} />
              </div>
              <span className="truncate max-w-[240px]">
                {activeCategory.items.length === 1 ? 'Semua kategori doa' : activeCategory.title}
              </span>
            </button>

            {/* Progress Row */}
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-black tracking-[1.4px] text-primary neu-inset-sm px-3 py-1 rounded-full uppercase truncate max-w-[220px]">
                {activeCategory.id === 'doa-pilihan'
                  ? (activeIndex < 9
                      ? '1. Doa Permohonan Ampunan'
                      : activeIndex < 16
                      ? '2. Doa Permohonan Rejeki'
                      : '3. Doa Lainnya')
                  : activeCategory.title}
              </span>
              <span className="text-xs font-bold text-muted tabular-nums neu-inset-sm px-3 py-1 rounded-full">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(activeCategory.items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title Header */}
            <section className="px-1 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-primary-dark leading-snug break-words">
                  {activeItem.title}
                </h2>
                {activeItem.subtitle && (
                  <p className="text-xs text-muted mt-1 font-semibold leading-relaxed break-words">
                    {activeItem.subtitle}
                  </p>
                )}
              </div>
              {isMyDoa && (
                <button
                  type="button"
                  onClick={() => setEditingIndex(activeIndex)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-btn text-primary text-xs font-bold flex-shrink-0 cursor-pointer"
                  title="Ubah judul doa ini"
                >
                  <Pencil size={13} />
                  <span>Ubah Nama</span>
                </button>
              )}
            </section>

            {/* Arabic Card */}
            <div className="relative overflow-hidden neu-card rounded-3xl p-5 sm:p-6">
              {!activeItem.arabic && (
                <div className="flex items-center gap-2 text-primary text-[11px] font-black tracking-wider mb-3">
                  <span className="w-4 h-[1px] bg-primary" />
                  <span>KETERANGAN</span>
                </div>
              )}

              {activeItem.arabic ? (
                <div
                  className={`arabic-text text-right direction-rtl text-primary-dark whitespace-pre-line py-1 font-medium ${getArabicFontSizeClass(
                    activeItem.arabic
                  )}`}
                  lang="ar"
                  dir="rtl"
                >
                  {activeItem.arabic}
                </div>
              ) : (
                <div className="text-center py-6 px-3">
                  <p className="text-lg font-bold text-primary">
                    {activeItem.meaning || 'Berdo’a Bebas'}
                  </p>
                  <p className="text-xs text-muted mt-1.5">
                    Dianjurkan memanjatkan doa-doa kebaikan sesuai hajat masing-masing
                  </p>
                </div>
              )}
            </div>

            {/* Arti / Makna Card */}
            {activeItem.meaning && activeItem.arabic && (
              <div className="neu-card rounded-3xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary text-[11px] font-bold tracking-widest uppercase">
                  <span className="w-4 h-[2px] bg-primary rounded-full" />
                  <span>ARTI / MAKNA</span>
                </div>
                <p className="text-sm text-text leading-relaxed font-normal whitespace-pre-line">
                  {activeItem.meaning}
                </p>
              </div>
            )}

            {/* Catatan / Note Card */}
            {activeItem.note && (
              <div className="neu-card-sm rounded-2xl p-4 flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg neu-inset-sm text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-primary tracking-wider uppercase mb-0.5">
                    CATATAN
                  </div>
                  <p className="text-xs text-muted font-medium leading-relaxed">
                    {activeItem.note.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
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
        )}
      </main>

      {/* ================= FIXED BOTTOM PAGER (FOR DETAIL VIEW) ================= */}
      {view === 'detail' && (
        <nav
          className="fixed left-0 right-0 neu-dock z-40 px-5 py-3 border-t border-white/60"
          style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}
          aria-label="Navigasi bacaan doa"
        >
          <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-13 h-12 rounded-2xl neu-btn text-primary-dark font-bold flex items-center justify-center disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer"
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
              className="w-13 h-12 rounded-2xl neu-btn text-primary font-bold flex items-center justify-center transition-all cursor-pointer"
              aria-label={activeCategory.items.length === 1 ? 'Kembali ke semua kategori' : 'Daftar bacaan'}
              title={activeCategory.items.length === 1 ? 'Semua Kategori' : 'Daftar Bacaan'}
            >
              <List size={20} />
            </button>

            {/* Next / Loop Button */}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 h-12 rounded-2xl neu-btn-primary font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
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
                  Daftar {activeCategory.title}
                </h3>
                <span className="text-xs text-muted font-medium">
                  {activeCategory.items.length} bacaan doa
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-8 h-8 rounded-full neu-btn-circle flex items-center justify-center text-muted hover:text-text"
              >
                <X size={17} />
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
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-2.5 py-0.5 rounded-md uppercase">
                            1. DOA PERMOHONAN AMPUNAN
                          </span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                      ) : idx === 9 ? (
                        <div className="flex items-center gap-2 pt-2.5 pb-0.5">
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-2.5 py-0.5 rounded-md uppercase">
                            2. DOA PERMOHONAN REZEKI
                          </span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                      ) : idx === 16 ? (
                        <div className="flex items-center gap-2 pt-2.5 pb-0.5">
                          <div className="h-px bg-border flex-1" />
                          <span className="text-[10px] font-black tracking-wider text-primary neu-inset-sm px-2.5 py-0.5 rounded-md uppercase">
                            3. DOA LAINNYA
                          </span>
                          <div className="h-px bg-border flex-1" />
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
                      className={`w-full p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all select-none cursor-pointer ${
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
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="flex-1 min-w-0 pr-1">
                        <p className="text-sm font-bold leading-snug break-words">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5 leading-relaxed break-words">
                          {item.subtitle || activeCategory.title}
                        </p>
                      </div>

                      <ChevronRight size={18} className="text-muted/60 flex-shrink-0" />
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* ================= MY DOA MODALS ================= */}
      <MyDoaModals
        myDoaList={myDoaList}
        onUpdateList={handleUpdateMyDoaList}
        isPickerOpen={isPickerOpen}
        onClosePicker={() => setIsPickerOpen(false)}
        isManageOpen={isManageOpen}
        onCloseManage={() => setIsManageOpen(false)}
        editingIndex={editingIndex}
        onCloseRename={() => setEditingIndex(null)}
        onStartRename={(idx) => setEditingIndex(idx)}
        settings={settings}
      />
    </div>
  );
};
