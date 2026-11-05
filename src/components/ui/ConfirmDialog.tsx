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
    <div className="modal-backdrop fixed inset-0 bg-black/40 z-[70] flex items-center justify-center px-6">
      <div className="modal-content bg-surface rounded-2xl w-full max-w-sm shadow-xl">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
          <p className="text-sm text-muted leading-relaxed">{message}</p>
        </div>
        <div className="flex border-t border-border">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 text-sm font-medium text-muted hover:bg-gray-50 rounded-bl-2xl transition-colors"
          >
            {cancelLabel}
          </button>
          <div className="w-px bg-border" />
          <button
            onClick={onConfirm}
            className={`flex-1 py-3.5 text-sm font-semibold rounded-br-2xl transition-colors ${
              danger
                ? 'text-danger hover:bg-red-50'
                : 'text-primary hover:bg-primary-soft'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
