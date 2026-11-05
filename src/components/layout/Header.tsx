import React, { useState } from 'react';
import { getGreeting, formatDate } from '../../lib/date-utils';

export const Header: React.FC = () => {
  const [today] = useState(() => new Date());

  return (
    <header
      className="px-5 pt-3 pb-2 bg-background"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
    >
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-primary-dark tracking-tight">
            DzikirKu
          </h1>
        </div>
        <p className="text-sm text-muted">
          {getGreeting()} · {formatDate(today)}
        </p>
      </div>
    </header>
  );
};
