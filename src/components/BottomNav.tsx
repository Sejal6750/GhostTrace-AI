import React from 'react';
import { LayoutDashboard, Inbox, SearchCode, FileCheck2, Scale } from 'lucide-react';
import { TabType } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { isDark } = useTheme();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: Inbox },
    { id: 'inspect', label: 'Inspect', icon: SearchCode },
    { id: 'evidence', label: 'Evidence', icon: FileCheck2 },
    { id: 'policies', label: 'Policies', icon: Scale },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md px-3 py-2 transition-colors border-t ${
        isDark
          ? 'bg-[#101419]/95 border-[#223042]'
          : 'bg-[#FFFFFF]/95 border-[#E2EAE3] shadow-md'
      }`}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-150 border cursor-pointer ${
                isActive
                  ? isDark
                    ? 'text-[#4EDE78] bg-[#182230] border-[#223042]'
                    : 'text-[#138443] bg-[#EAF8EE] border-[#D5EBD9] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#86948A] border-transparent hover:text-[#E0E2EA]'
                  : 'text-[#58645D] border-transparent hover:text-[#111713] hover:bg-[#F7FAF7]'
              }`}
            >
              <Icon
                className={`w-4 h-4 mb-1 ${
                  isActive
                    ? isDark
                      ? 'text-[#4EDE78]'
                      : 'text-[#138443]'
                    : 'text-current'
                }`}
              />
              <span className="text-xs font-medium tracking-tight leading-none whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
