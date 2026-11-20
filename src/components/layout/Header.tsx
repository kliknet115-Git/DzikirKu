import React, { useState } from 'react';
import { getGreeting, formatDate } from '../../lib/date-utils';

export const Header: React.FC = () => {
  const [today] = useState(() => new Date());

  return (
    <header
      className="px-5 pt-3 pb-2 bg-background"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-7 h-7 rounded-lg neu-card-sm flex items-center justify-center text-primary font-serif font-bold text-sm">
              ۞
            </div>
            <h1 className="text-xl font-extrabold text-primary-dark tracking-tight">
              DzikirKu
            </h1>
          </div>
          <p className="text-xs text-muted font-medium">
            {getGreeting()} · {formatDate(today)}
          </p>
        </div>

        {/* Subtle Neumorphic Pill Status */}
        <div className="neu-inset-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Tasbih Digital</span>
        </div>
      </div>
    </header>
  );
};
