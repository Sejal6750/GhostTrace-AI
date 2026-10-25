export type ThemeMode = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ghosttrace_theme_mode';

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function getAuditReportMeta(theme: ThemeMode) {
  return {
    modeLabel: theme === 'dark' ? 'Forensic High-Contrast Dark' : 'Professional Audit Report Light',
    statusBadge: theme === 'dark' ? 'TERMINAL_ACTIVE' : 'AUDIT_EXPORT_READY',
    isPrintingOptimized: theme === 'light'
  };
}
