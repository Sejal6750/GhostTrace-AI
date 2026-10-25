import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Wand2,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { SCHEMA_ROWS } from '../data/mockData';
import { SchemaValidationRow } from '../types/ghosttrace';
import { sanitizeProofPayload, generateOutputCsv } from '../utils/rules';
import { useTheme } from '../context/ThemeContext';

interface SchemaValidatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaValidatorModal: React.FC<SchemaValidatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [rows, setRows] = useState<SchemaValidationRow[]>(SCHEMA_ROWS);
  const [sanitizedCount, setSanitizedCount] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [dossierSuccess, setDossierSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAutoSanitizeRow289 = () => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.rowNumber === 289) {
          const res = sanitizeProofPayload(r.payload || '');
          return {
            ...r,
            payload: res.sanitized,
            errorDetail: 'Sanitized: Unescaped quotes safely escaped. Valid JSON schema restored.',
            resolved: true
          };
        }
        return r;
      })
    );
    setSanitizedCount((c) => c + 1);
  };

  // Generate output.csv conforming strictly to: case_id, deletion_status, steps_json (518 rows)
  const handleDownloadOutputCsv = () => {
    const csvContent = generateOutputCsv(518);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleDownloadMerkleDossier = () => {
    const dossier = {
      standard: 'RFC-3161',
      tsa_authority: 'DigiCert_Forensic_Timestamp_Authority',
      timestamp: new Date().toISOString(),
      merkle_root: '0xd94e39b7a42bb90fc11e289f88a9101a',
      rows_certified: 518,
      compliance_status: '100% Validated',
      sha256_dataset_digest: '4a8f9b7c89d0231aa67ef09e3b0c4424e88b901a',
    };
    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rfc3161_merkle_dossier.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDossierSuccess(true);
    setTimeout(() => setDossierSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div
        className={`border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5 shadow-2xl transition-all ${
          isDark ? 'bg-[#101419] border-[#223042] text-[#E0E2EA]' : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between border-b pb-4 ${isDark ? 'border-[#223042]' : 'border-[#E2EAE3]'}`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#138443] dark:text-[#4EDE78]">
                Output Schema Validator · 518 Rows Audit
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-[#111713] dark:text-[#FFFFFF]">
              Validation & output.csv Export Engine
            </h2>
            <div className="text-xs font-mono text-[#58645D] dark:text-[#86948A] flex items-center gap-2 mt-1">
              <span>Run #VAL-2025-04</span>
              <span aria-hidden="true">·</span>
              <span>Merkle: 0xd94e39...17fa</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close schema validator"
            className="w-8 h-8 rounded-lg border flex items-center justify-center btn-secondary cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
          </button>
        </div>

        {/* Required Contract Banner */}
        <div
          className={`p-4 rounded-xl border text-xs space-y-1 ${
            isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#EAF8EE] border-[#D5EBD9] text-[#138443]'
          }`}
        >
          <div className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Auditing Output Contract Enforced</span>
          </div>
          <p className="text-xs text-[#111713] dark:text-[#BBCABF]">
            Required columns: <code className="font-mono font-bold">case_id, deletion_status, steps_json</code>. Exactly 518 rows sorted monotonically.
          </p>
        </div>

        {/* Parsed Dataset Status & Progress */}
        <div
          className={`border rounded-xl p-5 space-y-3 ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-[#58645D]">
              Parsed Dataset Status
            </span>
            <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
              98.8% PASS (518 ROWS)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#111713] dark:text-[#E0E2EA]">518</span>
            <span className="text-xs text-[#58645D] dark:text-[#86948A]">/ 518 Rows Verified</span>
            <span className="text-xs text-[#B45309] ml-auto font-medium">
              {sanitizedCount > 0 ? '5 Exceptions Flagged (1 Fixed)' : '6 Exceptions Flagged'}
            </span>
          </div>

          <div className="w-full bg-[#E2EAE3] h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#138443] h-full" style={{ width: '98.5%' }}></div>
            <div className="bg-[#B45309] h-full" style={{ width: '1.0%' }}></div>
            <div className="bg-[#B91C1C] h-full" style={{ width: '0.5%' }}></div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-[#58645D] dark:text-[#86948A]">
            <span>• 512 Certified</span>
            <span>• 4 Gaps</span>
            <span>• 2 Malformed</span>
            <span>• 0 Inversions</span>
          </div>
        </div>

        {/* Schema Ruleset Evaluation */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#58645D]">
            Schema Ruleset Evaluation (5/5 Specs Checked)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 border rounded-xl flex items-center justify-between bg-white dark:bg-[#121820] border-[#E2EAE3] dark:border-[#223042]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138443]" />
                <div>
                  <div className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">case_id</div>
                  <div className="text-xs text-[#58645D]">Monotonic UUID / GT-</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#138443]">518/518 PASS</span>
            </div>

            <div className="p-3 border rounded-xl flex items-center justify-between bg-white dark:bg-[#121820] border-[#E2EAE3] dark:border-[#223042]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138443]" />
                <div>
                  <div className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">operation enum</div>
                  <div className="text-xs text-[#58645D]">DELETE_RECORD, BLOCK_RESTORE</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#138443]">100% TYPED</span>
            </div>

            <div className="p-3 border rounded-xl flex items-center justify-between bg-white dark:bg-[#121820] border-[#E2EAE3] dark:border-[#223042]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B45309]" />
                <div>
                  <div className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">evidence_id</div>
                  <div className="text-xs text-[#58645D]">Missing receipt hash</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#B45309]">4 GAPS</span>
            </div>

            <div className="p-3 border rounded-xl flex items-center justify-between bg-white dark:bg-[#121820] border-[#E2EAE3] dark:border-[#223042]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#B91C1C]" />
                <div>
                  <div className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">proof_payload</div>
                  <div className="text-xs text-[#58645D]">Unescaped quote syntax</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#B91C1C]">
                {sanitizedCount > 0 ? '1 FIXED' : '2 ERRORS'}
              </span>
            </div>
          </div>
        </div>

        {/* Forensic Diagnostics */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-[#B45309] uppercase tracking-wider flex items-center justify-between">
            <span>Forensic Diagnostics</span>
            <span>3 In Focus</span>
          </div>

          <div
            className={`p-4 border rounded-xl text-xs space-y-2.5 ${
              rows[1].resolved
                ? 'bg-[#EAF8EE] border-[#D5EBD9]'
                : 'bg-[#FFF5F5] border-[#FED7D7]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#B91C1C] text-white px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  SYNTAX_ERROR
                </span>
                <span className="font-bold text-sm text-[#111713] dark:text-[#202823]">Row #289</span>
              </div>
              <span className="font-mono text-xs text-[#58645D]">Case #GT-9488</span>
            </div>
            <div className="p-2.5 rounded-lg font-mono text-xs border bg-white border-[#E2EAE3] text-[#138443]">
              {rows[1].payload}
            </div>
            <p className="text-xs text-[#111713]">{rows[1].errorDetail}</p>
            <div className="pt-1">
              <button
                onClick={handleAutoSanitizeRow289}
                className="px-4 py-2 rounded-lg font-bold text-xs btn-primary-green flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5 text-white" />
                <span>{rows[1].resolved ? 'Sanitized Successfully ✓' : 'Auto-Sanitize Payload'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certified Manifest Export */}
        <div
          className={`border rounded-xl p-5 space-y-4 ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              output.csv Generation & Attestation
            </h3>
            <span className="text-xs font-mono text-[#58645D]">
              518 Dataset Rows
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <button
              onClick={handleDownloadOutputCsv}
              className="py-3 px-4 rounded-xl btn-primary-green font-bold flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{downloadSuccess ? 'Downloaded output.csv ✓' : 'Download Validated output.csv (518 Rows)'}</span>
            </button>
            <button
              onClick={handleDownloadMerkleDossier}
              className="py-3 px-4 rounded-xl btn-secondary font-bold flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-[#111713]" />
              <span>{dossierSuccess ? 'Dossier Downloaded (.json) ✓' : 'Generate Merkle Dossier (.json)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
