import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
  Check,
  X,
} from 'lucide-react';
import type { MyDoaItem, AvailableDoaSource } from './myDoaUtils';
import { getAllAppDoa } from './myDoaUtils';
import type { AppSettings } from '../../types';
import { triggerHaptic, playClickSound } from '../../lib/haptics';

interface MyDoaModalsProps {
  myDoaList: MyDoaItem[];
  onUpdateList: (newList: MyDoaItem[]) => void;
  isPickerOpen: boolean;
  onClosePicker: () => void;
  isManageOpen: boolean;
  onCloseManage: () => void;
  editingIndex: number | null;
  onCloseRename: () => void;
  onStartRename: (index: number) => void;
  settings?: AppSettings;
}

export const MyDoaModals: React.FC<MyDoaModalsProps> = ({
  myDoaList,
  onUpdateList,
  isPickerOpen,
  onClosePicker,
  isManageOpen,
  onCloseManage,
  editingIndex,
  onCloseRename,
  onStartRename,
  settings,
}) => {
  // Picker state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Rename state
  const [renameText, setRenameText] = useState('');

  // Sync renameText when editingIndex changes
  React.useEffect(() => {
    if (editingIndex !== null && myDoaList[editingIndex]) {
      setRenameText(myDoaList[editingIndex].title);
    }
  }, [editingIndex, myDoaList]);

  // All sources from app
  const allSources = useMemo(() => getAllAppDoa(), []);

  // Category filter list
  const categoryFilters = useMemo(() => {
    const cats = Array.from(new Set(allSources.map((s) => s.sourceCategory)));
    return ['Semua', ...cats];
  }, [allSources]);

  // Filtered sources
  const filteredSources = useMemo(() => {
    let list = allSources;
    if (selectedCategory !== 'Semua') {
      list = list.filter((s) => s.sourceCategory === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
          (s.meaning && s.meaning.toLowerCase().includes(q)) ||
          (s.arabic && s.arabic.includes(q))
      );
    }
    return list;
  }, [allSources, selectedCategory, searchQuery]);

  // Map of titles currently in myDoaList for quick check
  const addedTitles = useMemo(() => {
    const set = new Set<string>();
    myDoaList.forEach((it) => {
      set.add(it.title.toLowerCase().trim());
      if (it.originalTitle) set.add(it.originalTitle.toLowerCase().trim());
    });
    return set;
  }, [myDoaList]);

  // Handle add item to My Doa
  const handleAddItem = (source: AvailableDoaSource) => {
    if (settings?.hapticsEnabled) triggerHaptic();
    if (settings?.soundEnabled) playClickSound();

    const newItem: MyDoaItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: source.title,
      originalTitle: source.title,
      subtitle: source.subtitle,
      arabic: source.arabic,
      latin: source.latin,
      meaning: source.meaning,
      note: source.note,
      sourceCategory: source.sourceCategory,
    };

    onUpdateList([...myDoaList, newItem]);
  };

  // Reorder actions
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    if (settings?.hapticsEnabled) triggerHaptic();
    const copy = [...myDoaList];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    onUpdateList(copy);
  };

  const handleMoveDown = (index: number) => {
    if (index >= myDoaList.length - 1) return;
    if (settings?.hapticsEnabled) triggerHaptic();
    const copy = [...myDoaList];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    onUpdateList(copy);
  };

  const handleDelete = (index: number) => {
    if (settings?.hapticsEnabled) triggerHaptic();
    const copy = myDoaList.filter((_, idx) => idx !== index);
    onUpdateList(copy);
  };

  const handleSaveRename = () => {
    if (editingIndex === null || !myDoaList[editingIndex]) return;
    const trimmed = renameText.trim();
    if (!trimmed) return;
    if (settings?.hapticsEnabled) triggerHaptic();

    const copy = [...myDoaList];
    copy[editingIndex] = {
      ...copy[editingIndex],
      title: trimmed,
    };
    onUpdateList(copy);
    onCloseRename();
  };

  const handleResetToOriginal = () => {
    if (editingIndex === null || !myDoaList[editingIndex]) return;
    const orig = myDoaList[editingIndex].originalTitle || myDoaList[editingIndex].title;
    setRenameText(orig);
  };

  return (
    <>
      {/* ================= 1. PRAYER PICKER MODAL ================= */}
      {isPickerOpen && (
        <div
          className="fixed inset-0 bg-[#142B3C]/50 z-50 flex items-end justify-center transition-opacity"
          onClick={onClosePicker}
        >
          <div
            className="bg-[#F8FAFA] rounded-t-3xl max-w-lg w-full max-h-[88dvh] flex flex-col p-4 shadow-2xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="w-10 h-1 rounded-full bg-[#CBD4D6] mx-auto mb-3" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-[#EDF0EF]">
              <div>
                <h3 className="text-base font-bold text-[#18344D]">
                  Tambah Doa ke Doa Saya
                </h3>
                <span className="text-xs text-[#7D8B94]">
                  Pilih dari {allSources.length} doa & dzikir dalam aplikasi
                </span>
              </div>
              <button
                type="button"
                onClick={onClosePicker}
                className="w-8 h-8 rounded-xl bg-[#EAF1F1] text-[#18344D] flex items-center justify-center hover:bg-[#DDE7E7] transition-colors"
                aria-label="Tutup"
              >
                <X size={17} />
              </button>
            </div>

            {/* Search Box */}
            <div className="pt-3 pb-2 px-1">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3.5 text-[#86969E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari doa, arti, atau kata kunci..."
                  className="w-full bg-white border border-[#E0E8E8] rounded-xl pl-9 pr-9 py-2.5 text-xs text-[#18344D] placeholder-[#9AA9B0] focus:outline-none focus:border-[#287A7B] shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-[#9AA9B0] hover:text-[#18344D]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2.5 pt-1 px-1 no-scrollbar flex-shrink-0">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#18344D] text-white shadow-xs'
                      : 'bg-white text-[#526875] border border-[#E5EEEE] hover:bg-[#EAF2F3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Source Items List */}
            <div className="overflow-y-auto flex-1 pt-2 space-y-2.5 pr-0.5">
              {filteredSources.length === 0 ? (
                <div className="text-center py-10 text-[#82929B] text-xs">
                  Tidak ada doa yang cocok dengan pencarian "{searchQuery}"
                </div>
              ) : (
                filteredSources.map((source) => {
                  const isAlreadyAdded = addedTitles.has(source.title.toLowerCase().trim());
                  return (
                    <div
                      key={source.id}
                      className="bg-white rounded-2xl p-3.5 border border-[#EDF0EF] shadow-[0_2px_10px_rgba(20,48,66,0.02)] flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#287A7B] bg-[#EAF2F3] px-2 py-0.5 rounded mb-1">
                            {source.sourceCategory}
                          </span>
                          <h4 className="text-sm font-bold text-[#18344D] leading-snug">
                            {source.title}
                          </h4>
                          {source.subtitle && (
                            <p className="text-xs text-[#7D8B94] mt-0.5 line-clamp-1">
                              {source.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Add Button */}
                        <button
                          type="button"
                          onClick={() => handleAddItem(source)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                            isAlreadyAdded
                              ? 'bg-[#E7F3F1] text-[#246F70] hover:bg-[#D5ECE9]'
                              : 'bg-gradient-to-r from-[#18344D] to-[#287A7B] text-white shadow-2xs hover:opacity-90 active:scale-95'
                          }`}
                        >
                          {isAlreadyAdded ? (
                            <>
                              <Check size={14} />
                              <span>Ditambahkan</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>Tambah</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Arabic Preview */}
                      {source.arabic && (
                        <div
                          className="text-right text-base text-[#2E4252] font-arabic truncate pt-1 border-t border-[#F2F5F5]"
                          dir="rtl"
                          lang="ar"
                        >
                          {source.arabic}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#EDF0EF] flex justify-between items-center px-1">
              <span className="text-xs font-bold text-[#7D8B94]">
                {myDoaList.length} doa di "Doa Saya"
              </span>
              <button
                type="button"
                onClick={onClosePicker}
                className="bg-[#18344D] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-[#287A7B] transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. REORDER & MANAGE MODAL ================= */}
      {isManageOpen && (
        <div
          className="fixed inset-0 bg-[#142B3C]/50 z-50 flex items-end justify-center transition-opacity"
          onClick={onCloseManage}
        >
          <div
            className="bg-[#F8FAFA] rounded-t-3xl max-w-lg w-full max-h-[85dvh] flex flex-col p-4 shadow-2xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="w-10 h-1 rounded-full bg-[#CBD4D6] mx-auto mb-3" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-[#EDF0EF]">
              <div>
                <h3 className="text-base font-bold text-[#18344D]">
                  Atur Doa Saya
                </h3>
                <span className="text-xs text-[#7D8B94]">
                  Ubah urutan, ubah nama, atau hapus doa pilihan Anda
                </span>
              </div>
              <button
                type="button"
                onClick={onCloseManage}
                className="w-8 h-8 rounded-xl bg-[#EAF1F1] text-[#18344D] flex items-center justify-center hover:bg-[#DDE7E7] transition-colors"
                aria-label="Tutup"
              >
                <X size={17} />
              </button>
            </div>

            {/* Item List */}
            <div className="overflow-y-auto flex-1 pt-3 space-y-2 pr-0.5">
              {myDoaList.length === 0 ? (
                <div className="text-center py-10 text-[#82929B] text-xs">
                  Belum ada doa di Doa Saya. Tambahkan doa terlebih dahulu.
                </div>
              ) : (
                myDoaList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-2xl p-3 border border-[#EDF0EF] shadow-[0_2px_8px_rgba(20,48,66,0.02)] flex items-center gap-3"
                  >
                    {/* Index Number */}
                    <span className="w-7 h-7 rounded-lg bg-[#EAF2F3] text-[#287A7B] text-xs font-black flex items-center justify-center flex-shrink-0 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="text-xs font-bold text-[#18344D] truncate leading-tight">
                        {item.title}
                      </h4>
                      {item.sourceCategory && (
                        <span className="text-[10px] text-[#7C8B93] block truncate mt-0.5">
                          Sumber: {item.sourceCategory}
                        </span>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          idx === 0
                            ? 'text-[#C5D0D3] cursor-not-allowed bg-transparent'
                            : 'text-[#486370] bg-[#F1F5F5] hover:bg-[#E2EBEB] active:scale-95'
                        }`}
                        title="Geser ke atas"
                      >
                        <ArrowUp size={15} />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={idx === myDoaList.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          idx === myDoaList.length - 1
                            ? 'text-[#C5D0D3] cursor-not-allowed bg-transparent'
                            : 'text-[#486370] bg-[#F1F5F5] hover:bg-[#E2EBEB] active:scale-95'
                        }`}
                        title="Geser ke bawah"
                      >
                        <ArrowDown size={15} />
                      </button>

                      {/* Rename Button */}
                      <button
                        type="button"
                        onClick={() => onStartRename(idx)}
                        className="w-7 h-7 rounded-lg bg-[#EAF2F3] text-[#287A7B] flex items-center justify-center hover:bg-[#DBE9EA] active:scale-95 transition-colors"
                        title="Ubah nama doa"
                      >
                        <Pencil size={13} />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(idx)}
                        className="w-7 h-7 rounded-lg bg-[#FDF0ED] text-[#D9534F] flex items-center justify-center hover:bg-[#F9DDDA] active:scale-95 transition-colors"
                        title="Hapus dari Doa Saya"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#EDF0EF] flex justify-between items-center gap-2 px-1">
              <button
                type="button"
                onClick={() => {
                  onCloseManage();
                  setTimeout(() => {
                    // Trigger picker modal
                    const btn = document.getElementById('btn-open-picker-trigger');
                    if (btn) btn.click();
                  }, 100);
                }}
                className="bg-[#EAF2F3] text-[#287A7B] font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-[#DBE9EA] transition-all flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Tambah Doa</span>
              </button>

              <button
                type="button"
                onClick={onCloseManage}
                className="bg-[#18344D] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-[#287A7B] transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. RENAME MODAL ================= */}
      {editingIndex !== null && myDoaList[editingIndex] && (
        <div
          className="fixed inset-0 bg-[#142B3C]/50 z-50 flex items-center justify-center p-4 transition-opacity"
          onClick={onCloseRename}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF0EF]">
              <h3 className="text-base font-bold text-[#18344D]">
                Ubah Nama Doa
              </h3>
              <button
                type="button"
                onClick={onCloseRename}
                className="text-[#99A6AD] hover:text-[#18344D]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#556975] uppercase tracking-wider mb-1">
                  Judul Doa di "Doa Saya":
                </label>
                <input
                  type="text"
                  value={renameText}
                  onChange={(e) => setRenameText(e.target.value)}
                  placeholder="Masukkan nama judul doa..."
                  className="w-full bg-[#F6F8F8] border border-[#D5E1E1] rounded-xl px-3.5 py-2.5 text-xs text-[#18344D] focus:outline-none focus:border-[#287A7B] focus:bg-white"
                  autoFocus
                />
              </div>

              {myDoaList[editingIndex].originalTitle && (
                <div className="bg-[#EAF2F3] rounded-xl p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#287A7B] uppercase block">
                      Nama Asli Sumber:
                    </span>
                    <p className="text-xs text-[#395361] truncate mt-0.5">
                      {myDoaList[editingIndex].originalTitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToOriginal}
                    className="text-[10px] font-bold text-[#287A7B] underline hover:text-[#18344D] flex-shrink-0 pt-0.5"
                  >
                    Pakai Asli
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-[#EDF0EF]">
              <button
                type="button"
                onClick={onCloseRename}
                className="bg-[#EAF1F1] text-[#3B515E] font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-[#DEE7E7] transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveRename}
                className="bg-gradient-to-r from-[#18344D] to-[#287A7B] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:opacity-90 transition-all"
              >
                Simpan Nama
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
