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
    /* Outer Neumorphic Sunken Rim / Well */
    <div className="w-[96px] h-[96px] rounded-full neu-inset p-1.5 flex items-center justify-center flex-shrink-0">
      {/* 3D Convex Emerald Button that sinks on tap */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className="w-full h-full rounded-full neu-btn-primary flex flex-col items-center justify-center select-none touch-manipulation cursor-pointer disabled:opacity-40 disabled:pointer-events-none group"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
        aria-label="Hitung dzikir"
      >
        <span className="text-[14px] font-black tracking-wider text-white drop-shadow-sm group-active:scale-95 transition-transform">
          HITUNG
        </span>
        <span className="text-[8px] font-bold tracking-widest text-white/75 uppercase mt-0.5">
          KETUK
        </span>
      </button>
    </div>
  );
};
