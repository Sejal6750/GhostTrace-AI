import React from 'react';
import { Shield, Bell, Moon, Sun, Layers, Cpu, FileCheck } from 'lucide-react';
import { TabType } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentTab: TabType;
  onOpenTelemetry: () => void;
  onOpenSchema: () => void;
  onOpenThreeVault: () => void;
  isThreeVaultOpen: boolean;
  onSelectTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenTelemetry,
  onOpenSchema,
  onOpenThreeVault,
  isThreeVaultOpen,
  onSelectTab,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const [notificationCount] = React.useState(3);

  const getTabBreadcrumb = (tab: TabType) => {
    switch (tab) {
      case 'dash': return 'Executive Dashboard';
      case 'requests': return 'Requests Explorer';
      case 'inspect': return 'Forensic Investigation';
      case 'evidence': return 'Evidence Vault';
      case 'policies': return 'Policy Matrix';
      default: return 'Console';
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 px-4 sm:px-6 py-3 transition-colors border-b ${
        isDark
          ? 'bg-[#101419] border-[#223042] text-[#E0E2EA]'
          : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone: Clean Wordmark + Typographic Breadcrumb */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${
              isDark
                ? 'bg-[#182230] border-[#223042] text-[#4EDE78]'
                : 'bg-[#EAF8EE] border-[#D5EBD9] text-[#138443]'
            }`}
          >
            <Shield className="w-4 h-4 text-current" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-base tracking-tight ${isDark ? 'text-[#E0E2EA]' : 'text-[#111713]'}`}>
                GhostTrace AI
              </span>
              <span className={`text-xs ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`} aria-hidden="true">·</span>
              <span className={`text-xs font-medium ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`}>
                Forensic Data Auditor
              </span>
            </div>
            <div className={`text-xs font-normal ${isDark ? 'text-[#A0AEC0]' : 'text-[#58645D]'}`}>
              Workspace / {getTabBreadcrumb(currentTab)}
            </div>
          </div>
        </div>

        {/* Action Tools & Theme Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* USER-ACCESSIBLE THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-button"
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-[#182230] text-[#FFB95F] border-[#223042] hover:border-[#FFB95F] hover:bg-[#1C2736]'
                : 'bg-[#F7FAF7] text-[#111713] border-[#E2EAE3] hover:border-[#138443] hover:bg-[#FFFFFF]'
            }`}
            title={`Switch to ${isDark ? 'Professional Light Audit Report' : 'High-Contrast Dark Mode'}`}
            aria-label={`Toggle theme: currently ${isDark ? 'Dark Mode' : 'Light Audit Report Mode'}`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FFB95F]" />
                <span className="hidden sm:inline">Light Theme</span>
                <span className="sm:hidden">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#111713]" />
                <span className="hidden sm:inline">Dark Mode</span>
                <span className="sm:hidden">Dark</span>
              </>
            )}
          </button>

          {/* 3D Merkle Cryptographic Cluster Topology Button */}
          <button
            onClick={onOpenThreeVault}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              isThreeVaultOpen
                ? isDark
                  ? 'bg-[#10B981] text-[#003824] border-[#10B981] font-bold'
                  : 'bg-[#138443] text-[#FFFFFF] border-[#138443] font-bold'
                : isDark
                ? 'bg-[#182230] text-[#E0E2EA] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#FFFFFF] text-[#111713] border-[#E2EAE3] hover:border-[#138443] hover:bg-[#F7FAF7]'
            }`}
            title="Inspect 3D Merkle Cluster Topology with subtle depth"
          >
            <Layers className="w-3.5 h-3.5 text-[#111713] dark:text-[#4EDE78]" />
            <span className="hidden md:inline">3D Topology</span>
          </button>

          {/* Schema Validator Button */}
          <button
            onClick={onOpenSchema}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-[#182230] text-[#E0E2EA] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#FFFFFF] text-[#111713] border-[#E2EAE3] hover:border-[#138443] hover:bg-[#F7FAF7]'
            }`}
            title="Open Schema Validator & 518 Output Dataset Engine"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#111713] dark:text-[#FFB95F]" />
            <span className="hidden md:inline">Schema (518)</span>
          </button>

          {/* Model Telemetry Button */}
          <button
            onClick={onOpenTelemetry}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-[#182230] text-[#E0E2EA] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#FFFFFF] text-[#111713] border-[#E2EAE3] hover:border-[#138443] hover:bg-[#F7FAF7]'
            }`}
            title="Open Model Telemetry & Token Cost Attribution"
          >
            <Cpu className="w-3.5 h-3.5 text-[#111713] dark:text-[#4EDE78]" />
            <span className="hidden md:inline">Eval $142.85</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => onSelectTab('inspect')}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-150 cursor-pointer ${
                isDark
                  ? 'bg-[#182230] border-[#223042] text-[#BBCABF] hover:text-[#E0E2EA] hover:border-[#4EDE78]'
                  : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713] hover:border-[#138443]'
              }`}
              title="Recent audit alerts"
              aria-label="Recent audit alerts"
            >
              <Bell className="w-3.5 h-3.5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0D6332] text-[#FFFFFF] font-bold text-[10px] rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Cryptographic Node Status Shield */}
          <div
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-150 ${
              isDark
                ? 'bg-[#182230] border-[#223042] text-[#4EDE78]'
                : 'bg-[#EAF8EE] border-[#D5EBD9] text-[#138443]'
            }`}
            title="Consensus Node Active: validator-us-west-ca-09 (SHA-256 Synchronized)"
          >
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
