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
    <div className="min-h-screen bg-background pb-28">
      <header
        className="px-5 pt-3 pb-4 bg-background sticky top-0 z-10 backdrop-blur-md bg-background/90 border-b border-border/40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
      >
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-primary-dark">Pilih Dzikir</h1>
          <p className="text-xs text-muted mt-0.5">
            Pilih dzikir yang ingin Anda hitung
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-3 space-y-3">
        {dhikrList.map((dhikr) => {
          const isActive = dhikr.id === activeDhikrId;
          return (
            <div
              key={dhikr.id}
              className={`p-4 bg-surface rounded-2xl border-2 transition-all ${
                isActive
                  ? 'border-primary shadow-sm bg-primary-soft/20'
                  : 'border-border/60 shadow-xs hover:border-border'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectDhikr(dhikr)}
                className="w-full text-left focus:outline-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {dhikr.arabicText && (
                      <p className="arabic-text text-xl text-primary-dark mb-1 leading-relaxed">
                        {dhikr.arabicText}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-text">
                        {dhikr.name || dhikr.transliteration}
                      </p>
                      {dhikr.isBuiltIn && (
                        <span className="text-[10px] font-medium bg-primary-soft text-primary px-2 py-0.5 rounded-full">
                          Bawaan
                        </span>
                      )}
                    </div>
                    {dhikr.transliteration && dhikr.transliteration !== dhikr.name && (
                      <p className="text-xs italic text-muted mt-0.5">{dhikr.transliteration}</p>
                    )}
                    {dhikr.meaning && (
                      <p className="text-xs text-muted mt-0.5 leading-snug">{dhikr.meaning}</p>
                    )}
                    <p className="text-xs font-medium text-primary mt-1.5">
                      Target: {dhikr.defaultTarget}x
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-3 pt-2.5 border-t border-border/50">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditForm(dhikr);
                  }}
                  className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-black/5"
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
                    className="flex items-center gap-1 text-xs text-muted hover:text-danger transition-colors py-1 px-2 rounded-md hover:bg-red-50"
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
          className="w-full p-4 bg-surface rounded-2xl border-2 border-dashed border-border flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:bg-primary-soft/50 transition-colors active:scale-[0.99]"
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
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">
              Nama dzikir {!editingDhikr?.isBuiltIn && <span className="text-danger">*</span>}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              placeholder="Contoh: Astaghfirullah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.name && (
              <p className="text-danger text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">
              Teks Arab <span className="text-muted font-normal text-[11px]">(opsional)</span>
            </label>
            <input
              type="text"
              value={formData.arabicText}
              onChange={(e) =>
                setFormData({ ...formData, arabicText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-text text-base arabic-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              placeholder="أَسْتَغْفِرُ اللَّهَ"
              dir="rtl"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">
              Transliterasi {!editingDhikr?.isBuiltIn && <span className="text-danger">*</span>}
            </label>
            <input
              type="text"
              value={formData.transliteration}
              onChange={(e) =>
                setFormData({ ...formData, transliteration: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              placeholder="Astaghfirullah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.transliteration && (
              <p className="text-danger text-xs mt-1">{formErrors.transliteration}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">
              Arti / Keterangan <span className="text-muted font-normal text-[11px]">(opsional)</span>
            </label>
            <input
              type="text"
              value={formData.meaning}
              onChange={(e) =>
                setFormData({ ...formData, meaning: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              placeholder="Aku memohon ampun kepada Allah"
              disabled={Boolean(editingDhikr?.isBuiltIn)}
            />
            {formErrors.meaning && (
              <p className="text-danger text-xs mt-1">{formErrors.meaning}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">
              Target default <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              value={formData.defaultTarget}
              onChange={(e) =>
                setFormData({ ...formData, defaultTarget: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="33"
              inputMode="numeric"
              min={1}
              max={100000}
            />
            {formErrors.defaultTarget && (
              <p className="text-danger text-xs mt-1">{formErrors.defaultTarget}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm active:scale-[0.99]"
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

