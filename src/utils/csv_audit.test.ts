import test from 'node:test';
import assert from 'node:assert';
import {
  generateOutputCsv,
  parseAndValidateOutputCsv,
  validateStepsJson,
  resolveStatutoryConflict,
  isValidSha256,
  sanitizeProofPayload
} from './rules';

test('CSV Header Contract: verifies required columns exist in exact format', () => {
  const csv = generateOutputCsv(10);
  const result = parseAndValidateOutputCsv(csv);
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.errors.length, 0);

  // Test invalid header
  const badHeaderCsv = "case_id,status,steps\nGT-9001,COMPLETE,\"[]\"";
  const badResult = parseAndValidateOutputCsv(badHeaderCsv);
  assert.strictEqual(badResult.isValid, false);
  assert.match(badResult.errors[0], /Invalid header: expected "case_id,deletion_status,steps_json"/);
});

test('CSV Missing Column Handling: rejects rows with missing fields', () => {
  const missingColCsv = `case_id,deletion_status,steps_json\nGT-9001,COMPLETE\nGT-9002,INCOMPLETE`;
  const result = parseAndValidateOutputCsv(missingColCsv);
  assert.strictEqual(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes('malformed: expected 3 columns')));
});

test('CSV Malformed Content Handling: catches invalid JSON in steps_json', () => {
  const malformedJsonCsv = `case_id,deletion_status,steps_json\nGT-9001,COMPLETE,"[{ unquoted: value }]"`;
  const result = parseAndValidateOutputCsv(malformedJsonCsv);
  assert.strictEqual(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes('invalid steps_json')));
});

test('CSV Duplicate Case ID Handling: identifies duplicated records', () => {
  const duplicateCsv = `case_id,deletion_status,steps_json\nGT-9001,COMPLETE,"[{\"step\":1,\"op\":\"VERIFY_RECORD_ABSENT\",\"status\":\"VERIFIED\"}]"\nGT-9001,COMPLETE,"[{\"step\":1,\"op\":\"VERIFY_RECORD_ABSENT\",\"status\":\"VERIFIED\"}]"`;
  const result = parseAndValidateOutputCsv(duplicateCsv);
  assert.strictEqual(result.hasDuplicateCaseIds, true);
  assert.ok(result.errors.some((e) => e.includes('Duplicate case_id found: GT-9001')));
});

test('Step Numbering & Phase Ordering: verifies sequential steps and valid ops', () => {
  // Correct sequence
  const validSteps = JSON.stringify([
    { step: 1, op: 'VERIFY_RECORD_ABSENT', status: 'VERIFIED' },
    { step: 2, op: 'EMIT_TOMBSTONE_HASH', status: 'COMMITTED' }
  ]);
  const validCheck = validateStepsJson(validSteps);
  assert.strictEqual(validCheck.isValid, true);

  // Out of sequence steps
  const outOfOrderSteps = JSON.stringify([
    { step: 2, op: 'VERIFY_RECORD_ABSENT', status: 'VERIFIED' },
    { step: 1, op: 'EMIT_TOMBSTONE_HASH', status: 'COMMITTED' }
  ]);
  const outOfOrderCheck = validateStepsJson(outOfOrderSteps);
  assert.strictEqual(outOfOrderCheck.isValid, false);
  assert.match(outOfOrderCheck.error || '', /Step numbering out of sequence/);

  // Missing operation name
  const missingOpSteps = JSON.stringify([
    { step: 1, status: 'VERIFIED' }
  ]);
  const missingOpCheck = validateStepsJson(missingOpSteps);
  assert.strictEqual(missingOpCheck.isValid, false);
  assert.match(missingOpCheck.error || '', /missing operation name/);
});

test('Full Challenge Dataset: verifies exactly 518 rows sorted monotonically by case_id', () => {
  const fullCsv = generateOutputCsv(518);
  const result = parseAndValidateOutputCsv(fullCsv);

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.rowCount, 518);
  assert.strictEqual(result.hasDuplicateCaseIds, false);

  // Verify monotonic sort
  for (let i = 0; i < result.parsedRows.length; i++) {
    const expectedId = `GT-${9001 + i}`;
    assert.strictEqual(result.parsedRows[i].case_id, expectedId);

    // Verify deletion_status enum
    const status = result.parsedRows[i].deletion_status;
    assert.ok(
      status === 'COMPLETE' || status === 'INCOMPLETE' || status === 'NOT_APPLICABLE',
      `Unexpected status enum: ${status}`
    );
  }
});

test('Round-Trip Export & Re-import: exported CSV re-parses with identical records', () => {
  const originalCsv = generateOutputCsv(518);
  const parsed1 = parseAndValidateOutputCsv(originalCsv);
  assert.strictEqual(parsed1.isValid, true);

  // Re-encode from parsed records
  let reEncoded = 'case_id,deletion_status,steps_json\n';
  for (const row of parsed1.parsedRows) {
    const escaped = row.steps_json.replace(/"/g, '""');
    reEncoded += `${row.case_id},${row.deletion_status},"${escaped}"\n`;
  }

  const parsed2 = parseAndValidateOutputCsv(reEncoded);
  assert.strictEqual(parsed2.isValid, true);
  assert.strictEqual(parsed2.rowCount, 518);
  assert.deepStrictEqual(parsed1.parsedRows[0], parsed2.parsedRows[0]);
  assert.deepStrictEqual(parsed1.parsedRows[517], parsed2.parsedRows[517]);
});
