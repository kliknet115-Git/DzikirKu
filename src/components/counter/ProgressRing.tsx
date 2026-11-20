import React, { useMemo } from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 230,
  strokeWidth = 10,
  children,
}) => {
  const { radius, circumference, offset } = useMemo(() => {
    const r = (size - strokeWidth) / 2;
    const c = 2 * Math.PI * r;
    const o = c * (1 - Math.min(Math.max(progress, 0), 1));
    return { radius: r, circumference: c, offset: o };
  }, [size, strokeWidth, progress]);

  const isComplete = progress >= 1;

  return (
    <div
      className="relative inline-flex items-center justify-center rounded-full neu-card-lg p-2 transition-all"
      style={{ width: size + 16, height: size + 16 }}
    >
      {/* Inner dial recess */}
      <div className="w-full h-full rounded-full neu-inset flex items-center justify-center relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 absolute"
        >
          {/* Background track (inset groove feel) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
            fill="none"
            opacity="0.65"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isComplete ? 'var(--color-gold)' : 'var(--ring-progress)'}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center content disc */}
        <div className="w-[82%] h-[82%] rounded-full neu-card flex flex-col items-center justify-center z-10 p-1.5">
          {children}
        </div>
      </div>
    </div>
  );
};
