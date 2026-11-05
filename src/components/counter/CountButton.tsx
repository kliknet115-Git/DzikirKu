import React, { useRef, useCallback } from 'react';

interface CountButtonProps {
  onCount: () => void;
  disabled?: boolean;
}

export const CountButton: React.FC<CountButtonProps> = ({ onCount, disabled }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isProcessing = useRef(false);

  const handleClick = useCallback(() => {
    if (disabled || isProcessing.current) return;
    isProcessing.current = true;

    // Add press animation
    if (buttonRef.current) {
      buttonRef.current.classList.remove('count-press');
      void buttonRef.current.offsetWidth; // Force reflow
      buttonRef.current.classList.add('count-press');
    }

    onCount();

    // Allow next tap immediately - no debounce
    requestAnimationFrame(() => {
      isProcessing.current = false;
    });
  }, [onCount, disabled]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className="w-[120px] h-[120px] rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:shadow-md transition-shadow duration-100 select-none touch-manipulation"
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
      aria-label="Hitung dzikir"
    >
      <span className="text-lg font-bold tracking-wide">HITUNG</span>
    </button>
  );
};
