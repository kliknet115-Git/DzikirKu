import React, { useState, useRef } from 'react';
import {
  Vibrate,
  Volume2,
  Target,
  Info,
  Trash2,
  Download,
  Upload,
  Smartphone,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { isHapticsSupported } from '../../lib/haptics';
import { validateTarget } from '../../lib/validation';
import type { AppSettings, Dhikr } from '../../types';

interface SettingsPageProps {
  settings: AppSettings;
  dhikrList: Dhikr[];
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onClearData: () => void;
  onImportData: (data: { dhikr?: Dhikr[]; settings?: Partial<AppSettings> }) => Promise<void>;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  dhikrList,
  onUpdateSettings,
  onClearData,
  onImportData,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showClearFinalConfirm, setShowClearFinalConfirm] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetInput, setTargetInput] = useState(String(settings.defaultTarget));
  const [targetError, setTargetError] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hapticsSupported = isHapticsSupported();

  const handleTargetSave = () => {
    const result = validateTarget(targetInput);
    if (!result.valid) {
      setTargetError(result.error || '');
      return;
    }
    onUpdateSettings({ defaultTarget: Number(targetInput) });
    setShowTargetModal(false);
  };

  const handleFirstClear = () => {
    setShowClearConfirm(false);
    setShowClearFinalConfirm(true);
  };

  const handleFinalClear = () => {
    onClearData();
    setShowClearFinalConfirm(false);
  };

  // Export JSON
  const handleExportData = () => {
    const backupData = {
      app: 'DzikirKu',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings,
      dhikr: dhikrList,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dzikirku-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data || typeof data !== 'object') {
        throw new Error('Format file tidak valid.');
      }

      await onImportData(data);
      setImportStatus('Data berhasil diimpor!');
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal membaca berkas cadangan.';
      setImportStatus(`Error: ${msg}`);
      setTimeout(() => setImportStatus(null), 4000);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <header
        className="px-5 pt-3 pb-4 bg-background sticky top-0 z-10 backdrop-blur-md bg-background/90 border-b border-border/40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
      >
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-primary-dark">Pengaturan</h1>
          <p className="text-xs text-muted mt-0.5">
            Preferensi aplikasi & pengelolaan data
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-3 space-y-5">
        {/* iOS Install Prompt Banner */}
        <button
          type="button"
          onClick={() => setShowIosGuide(true)}
          className="w-full p-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl shadow-sm text-left flex items-center justify-between gap-3 active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Smartphone size={22} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Install di iPhone / iOS</p>
              <p className="text-xs text-white/80">
                Jadikan aplikasi penuh tanpa browser bar
              </p>
            </div>
          </div>
          <ExternalLink size={16} className="text-white/70 flex-shrink-0" />
        </button>

        {/* Haptics & Sound */}
        <section>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-1">
            Umpan Balik Hitungan
          </h2>
          <div className="bg-surface rounded-2xl border border-border/60 shadow-xs divide-y divide-border/60">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Vibrate size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Getaran (Haptic)</p>
                  {!hapticsSupported && (
                    <p className="text-[11px] text-muted">
                      Tidak didukung browser ini (iOS Safari menggunakan audio klik)
                    </p>
                  )}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.hapticsEnabled}
                  onChange={(e) =>
                    onUpdateSettings({ hapticsEnabled: e.target.checked })
                  }
                  disabled={!hapticsSupported}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-50" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Volume2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Suara Ketukan</p>
                  <p className="text-[11px] text-muted">Klik lembut setiap ketukan hitung</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) =>
                    onUpdateSettings({ soundEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-1">
            Target Standar
          </h2>
          <div className="bg-surface rounded-2xl border border-border/60 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setTargetInput(String(settings.defaultTarget));
                setTargetError('');
                setShowTargetModal(true);
              }}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Target size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Target default dzikir baru
                  </p>
                  <p className="text-xs text-muted">Nilai awal saat membuat dzikir custom</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-primary bg-primary-soft px-2.5 py-1 rounded-lg">
                  {settings.defaultTarget}x
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Backup & Restore JSON */}
        <section>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-1">
            Cadangan & Pemulihan (JSON)
          </h2>
          <div className="bg-surface rounded-2xl border border-border/60 shadow-xs divide-y divide-border/60">
            <button
              type="button"
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Download size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Ekspor Cadangan Data</p>
                  <p className="text-xs text-muted">Unduh seluruh dzikir custom dan pengaturan</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Upload size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Impor Cadangan Data</p>
                  <p className="text-xs text-muted">Pulihkan data dari berkas JSON sebelumnya</p>
                </div>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>

          {importStatus && (
            <p className={`text-xs mt-2 px-1 font-medium ${
              importStatus.startsWith('Error') ? 'text-danger' : 'text-primary'
            }`}>
              {importStatus}
            </p>
          )}
        </section>

        {/* Data Reset */}
        <section>
          <h2 className="text-xs font-semibold text-danger uppercase tracking-wider mb-2 px-1">
            Zona Berbahaya
          </h2>
          <div className="bg-surface rounded-2xl border border-danger/30 shadow-xs">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-red-50/50 rounded-2xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-danger">
                <Trash2 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-danger">
                  Hapus Seluruh Data
                </p>
                <p className="text-xs text-muted">
                  Hapus dzikir custom dan kembalikan pengaturan ke kondisi awal
                </p>
              </div>
            </button>
          </div>
          <p className="text-[11px] text-muted mt-2 px-1 leading-relaxed">
            Data tersimpan secara lokal di browser/iPhone Anda (IndexedDB). Tidak ada data yang dikirim ke server.
          </p>
        </section>

        {/* Information */}
        <section>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-1">
            Informasi
          </h2>
          <div className="bg-surface rounded-2xl border border-border/60 shadow-xs">
            <button
              type="button"
              onClick={() => setShowAbout(true)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft/60 flex items-center justify-center text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Tentang DzikirKu</p>
                  <p className="text-xs text-muted">Versi 1.0.0 (MVP iOS PWA)</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted">v1.0.0</span>
            </button>
          </div>
        </section>
      </div>

      {/* Target Modal */}
      <Modal
        isOpen={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        title="Target Default Dzikir Baru"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1.5">
              Target Default
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
              className="w-full px-4 py-3 border border-border rounded-xl bg-background text-text text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              inputMode="numeric"
            />
            {targetError && (
              <p className="text-danger text-xs mt-1.5">{targetError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleTargetSave}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
          >
            Simpan Target
          </button>
        </div>
      </Modal>

      {/* Clear Data Confirm 1 */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Hapus Seluruh Data?"
        message="Anda yakin ingin menghapus seluruh data? Dzikir custom dan preferensi pengaturan akan direset ke kondisi awal."
        confirmLabel="Lanjutkan"
        onConfirm={handleFirstClear}
        onCancel={() => setShowClearConfirm(false)}
        danger
      />

      {/* Clear Data Confirm 2 */}
      <ConfirmDialog
        isOpen={showClearFinalConfirm}
        title="Konfirmasi Terakhir"
        message="Tindakan ini tidak dapat dibatalkan. Semua data akan dibersihkan dan dzikir bawaan akan direset."
        confirmLabel="Hapus Semua Data Sekarang"
        onConfirm={handleFinalClear}
        onCancel={() => setShowClearFinalConfirm(false)}
        danger
      />

      {/* About Modal */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="Tentang DzikirKu"
      >
        <div className="text-center space-y-4 pt-1">
          <div className="w-16 h-16 rounded-2xl bg-primary text-white mx-auto flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold font-serif">ذ</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-dark">DzikirKu</h3>
            <p className="text-xs text-muted">Aplikasi Tasbih Digital Modern</p>
            <span className="inline-block text-[11px] font-semibold text-primary bg-primary-soft px-2.5 py-0.5 rounded-full mt-1.5">
              Versi 1.0.0 (MVP)
            </span>
          </div>

          <div className="bg-background rounded-xl p-3.5 text-left text-xs text-muted space-y-2 border border-border/60">
            <div className="flex items-center gap-2 text-text font-medium">
              <ShieldCheck size={16} className="text-primary" />
              <span>Privasi & Keamanan:</span>
            </div>
            <p>
              • 100% Offline-First: Semua data disimpan secara lokal di ponsel Anda melalui IndexedDB.
            </p>
            <p>
              • Tidak ada login, analitik, pelacakan pihak ketiga, atau pengiriman data ke server eksternal.
            </p>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Dibuat untuk membantu menghitung dzikir harian dengan antarmuka yang bersih, tenang, dan mudah digunakan dengan satu tangan di ponsel iPhone.
          </p>
        </div>
      </Modal>

      {/* iOS Install Guide Modal */}
      <Modal
        isOpen={showIosGuide}
        onClose={() => setShowIosGuide(false)}
        title="Panduan Install di iPhone (iOS)"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-muted leading-relaxed">
            Aplikasi DzikirKu dirancang khusus sebagai <strong>Progressive Web App (PWA)</strong> untuk iPhone/iOS Safari. Anda dapat menginstalnya langsung ke Layar Utama (Home Screen) tanpa App Store.
          </p>

          <ol className="space-y-3 text-xs text-text">
            <li className="flex items-start gap-2.5 bg-background p-3 rounded-xl border border-border/60">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-semibold">Buka di Safari iPhone</p>
                <p className="text-muted text-[11px] mt-0.5">
                  Buka tautan website aplikasi ini menggunakan browser bawaan Safari.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5 bg-background p-3 rounded-xl border border-border/60">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-semibold">Tekan Tombol 'Share' (Bagikan)</p>
                <p className="text-muted text-[11px] mt-0.5">
                  Ketuk ikon kotak dengan panah ke atas di bilah menu bawah Safari.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5 bg-background p-3 rounded-xl border border-border/60">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-semibold">Pilih 'Tambah ke Layar Utama'</p>
                <p className="text-muted text-[11px] mt-0.5">
                  Gulir ke bawah pada menu bagikan dan pilih <em>"Add to Home Screen"</em> (Tambah ke Layar Utama).
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5 bg-background p-3 rounded-xl border border-border/60">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                4
              </span>
              <div>
                <p className="font-semibold">Ketuk 'Tambah' (Add)</p>
                <p className="text-muted text-[11px] mt-0.5">
                  Ikon aplikasi DzikirKu akan langsung muncul di Layar Utama iPhone Anda dan siap dibuka layaknya aplikasi native iOS.
                </p>
              </div>
            </li>
          </ol>

          <button
            type="button"
            onClick={() => setShowIosGuide(false)}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
          >
            Mengerti
          </button>
        </div>
      </Modal>
    </div>
  );
};
