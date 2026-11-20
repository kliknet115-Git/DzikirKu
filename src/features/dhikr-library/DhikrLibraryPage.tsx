import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import {
  validateDhikrName,
  validateTransliteration,
  validateTarget,
  validateMeaning,
} from '../../lib/validation';
import type { Dhikr } from '../../types';

interface DhikrLibraryPageProps {
  dhikrList: Dhikr[];
  activeDhikrId: string | null;
  onSelectDhikr: (dhikr: Dhikr) => void;
  onAddDhikr: (dhikr: {
    name: string;
    arabicText?: string;
    transliteration: string;
    meaning?: string;
    defaultTarget: number;
  }) => void;
  onUpdateDhikr: (id: string, updates: Partial<Dhikr>) => void;
  onDeleteDhikr: (id: string) => void;
}

interface FormData {
  name: string;
  arabicText: string;
  transliteration: string;
  meaning: string;
  defaultTarget: string;
}

interface FormErrors {
  name?: string;
  transliteration?: string;
  meaning?: string;
  defaultTarget?: string;
}

const emptyForm: FormData = {
  name: '',
  arabicText: '',
  transliteration: '',
  meaning: '',
  defaultTarget: '33',
};

export const DhikrLibraryPage: React.FC<DhikrLibraryPageProps> = ({
  dhikrList,
  activeDhikrId,
  onSelectDhikr,
  onAddDhikr,
  onUpdateDhikr,
  onDeleteDhikr,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setFormErrors({});
    setShowForm(true);
  };

  const openEditForm = (dhikr: Dhikr) => {
    setEditingId(dhikr.id);
    setFormData({
      name: dhikr.name,
      arabicText: dhikr.arabicText || '',
      transliteration: dhikr.transliteration,
      meaning: dhikr.meaning || '',
      defaultTarget: String(dhikr.defaultTarget),
    });
    setFormErrors({});
    setShowForm(true);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const nameResult = validateDhikrName(formData.name);
    if (!nameResult.valid) errors.name = nameResult.error;

    const transResult = validateTransliteration(formData.transliteration);
    if (!transResult.valid) errors.transliteration = transResult.error;

    const meaningResult = validateMeaning(formData.meaning);
    if (!meaningResult.valid) errors.meaning = meaningResult.error;

    const targetResult = validateTarget(formData.defaultTarget);
    if (!targetResult.valid) errors.defaultTarget = targetResult.error;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId) {
      const isBuiltIn = dhikrList.find((d) => d.id === editingId)?.isBuiltIn;
      onUpdateDhikr(editingId, {
        ...(isBuiltIn ? {} : {
          name: formData.name.trim(),
          arabicText: formData.arabicText.trim() || undefined,
          transliteration: formData.transliteration.trim(),
          meaning: formData.meaning.trim() || undefined,
        }),
        defaultTarget: Number(formData.defaultTarget),
      });
    } else {
      onAddDhikr({
        name: formData.name.trim(),
        arabicText: formData.arabicText.trim() || undefined,
        transliteration: formData.transliteration.trim(),
        meaning: formData.meaning.trim() || undefined,
        defaultTarget: Number(formData.defaultTarget),
      });
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    onDeleteDhikr(id);
    setDeleteConfirm(null);
  };

  const deletingDhikr = dhikrList.find((d) => d.id === deleteConfirm);
  const editingDhikr = dhikrList.find((d) => d.id === editingId);

  return (
    <div
      className="min-h-screen bg-background"
      style={{ paddingBottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <header
        className="px-5 pt-3 pb-3 bg-background/95 sticky top-0 z-10 backdrop-blur-md border-b border-white/50"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-7 h-7 rounded-lg neu-card-sm flex items-center justify-center text-primary font-serif font-bold text-sm">
              ۞
            </div>
            <h1 className="text-xl font-extrabold text-primary-dark">Pilih Dzikir</h1>
          </div>
          <p className="text-xs text-muted font-medium">
            Pilih dzikir yang ingin Anda hitung di tasbih
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-4 space-y-3.5">
        {dhikrList.map((dhikr) => {
          const isActive = dhikr.id === activeDhikrId;
          return (
            <div
              key={dhikr.id}
              className={`p-4 rounded-3xl transition-all ${
                isActive
                  ? 'neu-inset'
                  : 'neu-card hover:translate-y-[-1px]'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectDhikr(dhikr)}
                className="w-full text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {dhikr.arabicText && (
                      <p
                        className="arabic-text text-right text-3xl text-primary-dark mb-2 leading-[2.1] tracking-wide"
                        dir="rtl"
                        lang="ar"
                      >
                        {dhikr.arabicText}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-base font-bold text-text leading-snug break-words">
                        {dhikr.name || dhikr.transliteration}
                      </p>
                      {dhikr.isBuiltIn ? (
                        <span className="text-[10px] font-bold neu-inset-sm text-primary px-2 py-0.5 rounded-full flex-shrink-0">
                          Bawaan
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold neu-inset-sm text-gold px-2 py-0.5 rounded-full flex-shrink-0">
                          Custom
                        </span>
                      )}
                    </div>
                    {dhikr.transliteration && dhikr.transliteration !== dhikr.name && (
                      <p className="text-xs italic text-muted mt-0.5 leading-relaxed break-words">{dhikr.transliteration}</p>
                    )}
                    {dhikr.meaning && (
                      <p className="text-xs text-muted mt-0.5 leading-relaxed break-words">{dhikr.meaning}</p>
                    )}
                    <p className="text-xs font-bold text-primary mt-2">
                      Target: {dhikr.defaultTarget}x
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-7 h-7 rounded-full neu-btn-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check size={14} className="text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-black/[0.04]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditForm(dhikr);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-all py-1.5 px-3 rounded-xl neu-btn"
                >
                  <Edit2 size={13} />
                  <span>{dhikr.isBuiltIn ? 'Ubah Target' : 'Edit'}</span>
                </button>
                {!dhikr.isBuiltIn && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(dhikr.id);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-danger hover:text-red-700 transition-all py-1.5 px-3 rounded-xl neu-btn"
                  >
                    <Trash2 size={13} />
                    <span>Hapus</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Custom Dhikr Button */}
        <button
          type="button"
          onClick={openAddForm}
          className="w-full p-4 neu-btn rounded-3xl border-2 border-dashed border-primary/30 flex items-center justify-center gap-2 text-sm font-bold text-primary transition-all active:scale-[0.99] cursor-pointer"
        >
          <Plus size={18} />
          Tambah Dzikir Custom
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? (editingDhikr?.isBuiltIn ? 'Ubah Target Dzikir' : 'Edit Dzikir') : 'Tambah Dzikir Custom'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
              Nama dzikir {!editingDhikr?.isBuiltIn && <span className="text-danger">*</span>}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl neu-input text-text text-sm font-semibold disabled:opacity-60"
              placeholder="Contoh: Astaghfirullah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.name && (
              <p className="text-danger text-xs font-semibold mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
              Teks Arab <span className="text-muted/70 font-normal text-[11px]">(opsional)</span>
            </label>
            <input
              type="text"
              value={formData.arabicText}
              onChange={(e) =>
                setFormData({ ...formData, arabicText: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl neu-input text-text text-base arabic-text text-right disabled:opacity-60"
              placeholder="أَسْتَغْفِرُ اللَّهَ"
              dir="rtl"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
              Transliterasi {!editingDhikr?.isBuiltIn && <span className="text-danger">*</span>}
            </label>
            <input
              type="text"
              value={formData.transliteration}
              onChange={(e) =>
                setFormData({ ...formData, transliteration: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl neu-input text-text text-sm font-semibold disabled:opacity-60"
              placeholder="Astaghfirullah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.transliteration && (
              <p className="text-danger text-xs font-semibold mt-1">{formErrors.transliteration}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
              Arti / Keterangan <span className="text-muted/70 font-normal text-[11px]">(opsional)</span>
            </label>
            <input
              type="text"
              value={formData.meaning}
              onChange={(e) =>
                setFormData({ ...formData, meaning: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl neu-input text-text text-sm font-semibold disabled:opacity-60"
              placeholder="Aku memohon ampun kepada Allah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.meaning && (
              <p className="text-danger text-xs font-semibold mt-1">{formErrors.meaning}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">
              Target default <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              value={formData.defaultTarget}
              onChange={(e) =>
                setFormData({ ...formData, defaultTarget: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl neu-input text-text text-sm font-bold"
              placeholder="33"
              inputMode="numeric"
              min={1}
              max={100000}
            />
            {formErrors.defaultTarget && (
              <p className="text-danger text-xs font-semibold mt-1">{formErrors.defaultTarget}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 neu-btn-primary font-bold rounded-2xl transition-all"
            >
              {editingId ? 'Simpan Perubahan' : 'Tambah Dzikir'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        title="Hapus Dzikir"
        message={`Hapus dzikir "${deletingDhikr?.name || ''}"? Riwayat sesi sebelumnya tetap tersimpan.`}
        confirmLabel="Hapus"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        danger
      />
    </div>
  );
};

