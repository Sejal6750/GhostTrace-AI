import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextTheme, getAuditReportMeta } from './theme.ts';

test('getNextTheme toggles between dark and light modes', () => {
  assert.equal(getNextTheme('dark'), 'light');
  assert.equal(getNextTheme('light'), 'dark');
});

test('getAuditReportMeta returns proper labels and print optimization for light mode', () => {
  const darkMeta = getAuditReportMeta('dark');
  assert.equal(darkMeta.modeLabel, 'Forensic High-Contrast Dark');
  assert.equal(darkMeta.isPrintingOptimized, false);

  const lightMeta = getAuditReportMeta('light');
  assert.equal(lightMeta.modeLabel, 'Professional Audit Report Light');
  assert.equal(lightMeta.isPrintingOptimized, true);
  assert.equal(lightMeta.statusBadge, 'AUDIT_EXPORT_READY');
});
