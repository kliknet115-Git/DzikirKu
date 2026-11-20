import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-xs z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        className="modal-content neu-card rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[88vh] overflow-y-auto border border-white/70"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 8px)' }}
      >
        <div className="flex items-center justify-between p-5 pb-3 border-b border-border/60">
          <h2 className="text-lg font-bold text-primary-dark">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full neu-btn-circle flex items-center justify-center text-muted hover:text-text transition-colors"
              aria-label="Tutup"
            >
              <X size={17} />
            </button>
          )}
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
