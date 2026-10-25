import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveStatutoryConflict,
  isValidSha256,
  sanitizeProofPayload,
  calculateValidationRate
} from './rules.ts';

test('resolveStatutoryConflict correctly prioritizes FinCEN AML 5-year hold over GDPR erasure', () => {
  const result = resolveStatutoryConflict(true, false, 365);
  assert.equal(result.allowedToPurge, false);
  assert.equal(result.statusCode, 'EXEMPTION_HOLD');
  assert.equal(result.retentionRequirementDays, 1825 - 365);
});

test('resolveStatutoryConflict allows purge when no statutory hold applies', () => {
  const result = resolveStatutoryConflict(false, false, 100);
  assert.equal(result.allowedToPurge, true);
  assert.equal(result.statusCode, 'PURGE_AUTHORIZED');
});

test('isValidSha256 validates 64-char hex strings', () => {
  assert.equal(isValidSha256('e871a29f8c14d9b04d021fe871a29f8c14d9b04d021fe871a29f8c14d9b04d02'), true);
  assert.equal(isValidSha256('invalid-hash'), false);
  assert.equal(isValidSha256(''), false);
});

test('sanitizeProofPayload repairs unescaped quotes', () => {
  const malformed = '{"token": "sess:9938"id:481"}';
  const result = sanitizeProofPayload(malformed);
  assert.equal(result.isValidJson, true);
  const parsed = JSON.parse(result.sanitized);
  assert.ok(parsed.token);
});

test('calculateValidationRate returns accurate percentage and compliance state', () => {
  const metrics = calculateValidationRate(619, 1000);
  assert.equal(metrics.formatted, '61.9%');
  assert.equal(metrics.isCompliant, false);

  const passed = calculateValidationRate(980, 1000);
  assert.equal(passed.formatted, '98.0%');
  assert.equal(passed.isCompliant, true);
});
