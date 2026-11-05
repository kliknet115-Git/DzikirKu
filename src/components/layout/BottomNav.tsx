import React from 'react';
import { Home, SunMoon, BookOpen, HandHeart, Settings } from 'lucide-react';
import type { TabId } from '../../types';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'daily-dhikr', label: 'Pagi Petang', icon: SunMoon },
  { id: 'dhikr', label: 'Dzikir', icon: BookOpen },
  { id: 'doa', label: 'Doa', icon: HandHeart },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-150 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-primary-dark'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[10px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
