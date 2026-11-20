import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  danger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-xs z-[70] flex items-center justify-center px-5">
      <div className="modal-content neu-card rounded-3xl w-full max-w-sm p-5 border border-white/70 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-primary-dark mb-1.5">{title}</h3>
          <p className="text-xs text-muted leading-relaxed font-medium">{message}</p>
        </div>
        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl neu-btn text-xs font-semibold text-muted hover:text-text transition-all"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              danger
                ? 'bg-danger text-white shadow-md active:scale-95'
                : 'neu-btn-primary'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
