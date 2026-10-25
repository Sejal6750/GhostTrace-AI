import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Terminal,
  FileDown,
  RefreshCw,
  Copy,
  Check,
  Layers,
  Zap,
  UserCheck
} from 'lucide-react';
import { TARGET_SYSTEMS_CASE_9483, ORCHESTRATION_DAG_STEPS } from '../data/mockData';
import { DAGStep, TargetSystem } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface InspectViewProps {
  caseId: string;
  onOpenEvidence: (evidenceId: string) => void;
}

export const InspectView: React.FC<InspectViewProps> = ({ caseId, onOpenEvidence }) => {
  const { isDark } = useTheme();
  const [systems, setSystems] = useState<TargetSystem[]>(TARGET_SYSTEMS_CASE_9483);
  const [dagSteps, setDagSteps] = useState<DAGStep[]>(ORCHESTRATION_DAG_STEPS);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'orchestration' | 'remediationEngine'>('orchestration');
  const [sreSigned, setSreSigned] = useState(false);
  const [actionExecuted, setActionExecuted] = useState(false);
  const [proverRunning, setProverRunning] = useState(false);
  const [dossierDownloaded, setDossierDownloaded] = useState(false);

  const handleCopyRedisOutput = () => {
    const raw = `> REDIS_HOST: redis-prod-04.internal:6379\n> QUERY: GET sess:usr_3910_ca:active\n> RESPONSE: {"token": "eyJhbGciOi...", "ttl": 42100, "status": "ALIVE"}\n> RESULT: REPORT_REMAINING_RECORD [FAIL: Zero tombstone hash returned]`;
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApproveDeleteRecord = () => {
    setActionExecuted(true);
    setDagSteps((prev) =>
      prev.map((step) => {
        if (step.stepNumber === '04') {
          return { ...step, status: 'EXECUTED', description: 'ATOMIC_DEL_KEY_WITH_ZK_CONFIRM Executed · Tombstone Emitted' };
        }
        if (step.stepNumber === '06') {
          return { ...step, status: 'VERIFIED_COMPLETE', description: 'Zero keys returned. Cryptographic tombstone verified.' };
        }
        if (step.stepNumber === '07') {
          return { ...step, status: 'VERIFIED_COMPLETE', description: 'Merkle root updated. Proof committed to block #19,842,902.' };
        }
        return step;
      })
    );
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === 'sys-5'
          ? { ...sys, status: 'COMPLETE', detail: 'Key Evicted · Cryptographic Tombstone Verified', ttl: '0s' }
          : sys
      )
    );
  };

  const handleRerunProver = () => {
    setProverRunning(true);
    setTimeout(() => {
      setProverRunning(false);
    }, 1200);
  };

  const handleExportDossier = () => {
    const dossier = {
      case_id: caseId,
      subject_id: 'usr_3910_ca',
      timestamp: new Date().toISOString(),
      statute: 'CCPA_CAL_CIV_1798_105',
      forensic_proof_status: actionExecuted ? 'VERIFIED_COMPLETE' : 'INCOMPLETE',
      merkle_root: '7a82f0991c42bb90f',
      systems_audited: systems,
      dag_workflow: dagSteps,
    };
    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `forensic_dossier_${caseId.replace('#', '')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDossierDownloaded(true);
    setTimeout(() => setDossierDownloaded(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111713] dark:text-[#FFFFFF]">
              Forensic Investigation
            </h1>
            <span className="text-xs font-mono font-bold text-[#138443] dark:text-[#4EDE78] bg-[#EAF8EE] dark:bg-[#182230] px-2 py-0.5 rounded border border-[#D5EBD9] dark:border-[#223042]">
              {caseId}
            </span>
          </div>
          <p className="text-sm text-[#58645D] dark:text-[#BBCABF] mt-0.5">
            Subject identity footprint, monitored systems, and cryptographic DAG orchestration.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div
          className={`flex items-center p-1 rounded-xl border ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
          }`}
        >
          <button
            onClick={() => setViewMode('orchestration')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'orchestration'
                ? 'bg-[#138443] text-white shadow-xs'
                : isDark
                ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
                : 'text-[#58645D] hover:text-[#111713]'
            }`}
          >
            Orchestration Flow
          </button>
          <button
            onClick={() => setViewMode('remediationEngine')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'remediationEngine'
                ? 'bg-[#138443] text-white shadow-xs'
                : isDark
                ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
                : 'text-[#58645D] hover:text-[#111713]'
            }`}
          >
            Dual-Sign DAG
          </button>
        </div>
      </div>

      {/* 1. Case Overview & Statutory SLA */}
      <div
        className={`border rounded-2xl p-6 space-y-5 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#111713] dark:text-[#FFFFFF]">
                Subject usr_3910_ca
              </span>
              <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
              <span className="text-xs font-semibold text-[#B91C1C]">
                High Priority SLA
              </span>
            </div>
            <div className="text-xs font-mono text-[#58645D] dark:text-[#BBCABF] mt-1 flex items-center gap-2">
              <span>UUID: d48f-28be-901a</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#138443] dark:text-[#4EDE78] font-semibold">
                CCPA Opt-Out / Right to be Forgotten
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#B45309] bg-[#FEF3C7] dark:bg-[#182230] px-3 py-1.5 rounded-lg border border-[#FDE68A] dark:border-[#223042]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold">03h 42m to Statutory Breach</span>
          </div>
        </div>

        {/* 2. Observed Identity Footprint */}
        <div
          className={`border rounded-xl p-4 text-xs space-y-3 ${
            isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#138443] dark:text-[#4EDE78]">
            <UserCheck className="w-4 h-4" />
            <span>Observed Identity Footprint</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#58645D] dark:text-[#86948A] block mb-0.5">Subject Email:</span>
              <span className="font-mono font-medium text-[#111713] dark:text-[#E0E2EA]">
                j.***@calif-tech.io
              </span>
            </div>
            <div>
              <span className="text-[#58645D] dark:text-[#86948A] block mb-0.5">Identity Anchor:</span>
              <span className="font-mono font-medium text-[#111713] dark:text-[#E0E2EA]">
                usr_3910_ca
              </span>
            </div>
            <div>
              <span className="text-[#58645D] dark:text-[#86948A] block mb-0.5">Account Created:</span>
              <span className="font-mono font-medium text-[#111713] dark:text-[#E0E2EA]">
                2021-04-12
              </span>
            </div>
            <div>
              <span className="text-[#58645D] dark:text-[#86948A] block mb-0.5">Request Timestamp:</span>
              <span className="font-mono font-medium text-[#111713] dark:text-[#E0E2EA]">
                2025-02-18 14:22:04Z
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Findings: Claimed vs Proven */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div
            className={`border rounded-xl p-4 ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
            }`}
          >
            <span className="text-xs font-semibold text-[#58645D] block mb-1">
              Vendor Claimed Audit Status
            </span>
            <div className="flex items-center gap-1.5 font-bold text-sm text-[#138443] dark:text-[#4EDE78]">
              <span>COMPLETE</span>
            </div>
            <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-1">
              Self-reported by data pipeline · Zero cryptographic receipt attached
            </div>
          </div>

          <div
            className={`border rounded-xl p-4 ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#58645D]">
                Forensic Proof Ratio: {actionExecuted ? '5/5 (100%)' : '4/5 (80%)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span className={actionExecuted ? 'text-[#138443] dark:text-[#4EDE78]' : 'text-[#B45309]'}>
                {actionExecuted ? 'VERIFIED COMPLETE ✓' : 'INCOMPLETE ⚠'}
              </span>
            </div>
            <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-1">
              {actionExecuted ? 'All ghost states purged. Zero-knowledge receipt verified.' : '1 Ghost State Residual detected in Redis Cluster #04'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Affected Systems and Data Stores */}
      <div
        className={`border rounded-2xl p-6 space-y-4 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Monitored Storage Planes (5 Systems)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#58645D] dark:text-[#86948A]">
            Active Shards Verified
          </span>
        </div>

        <div className="space-y-2.5">
          {systems.map((sys) => {
            const isGap = sys.status === 'GAP DETECTED';
            return (
              <div
                key={sys.id}
                className={`p-3.5 rounded-xl border transition-all card-depth-hover ${
                  isGap
                    ? isDark
                      ? 'bg-[#181C21] border-[#FFB95F]/50'
                      : 'bg-[#FFFBEB] border-[#FDE68A]'
                    : isDark
                    ? 'bg-[#0B0F14] border-[#223042]'
                    : 'bg-[#F2FBF4] border-[#E2EAE3]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">
                      {sys.name}
                    </span>
                    <span className="font-mono text-xs ml-2 text-[#58645D] dark:text-[#86948A]">
                      · {sys.identifier}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isGap ? 'text-[#B45309]' : 'text-[#138443] dark:text-[#4EDE78]'
                    }`}
                  >
                    {sys.status}
                  </span>
                </div>
                <div className="text-xs mt-1.5 flex items-center justify-between text-[#58645D] dark:text-[#BBCABF]">
                  <span>{sys.detail}</span>
                  {sys.ttl && (
                    <span className="font-mono text-[#B45309] text-xs font-semibold">
                      TTL: {sys.ttl}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 & 6: Proposed Remediation & Ordered Workflow */}
      {viewMode === 'orchestration' ? (
        <div
          className={`border rounded-2xl p-6 space-y-5 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
              <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
                Forensic Orchestration: Finding → Remediation → Verification
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
              Phase 2 Active
            </span>
          </div>

          {/* Phase 1: Forensic Discovery */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#138443] dark:text-[#4EDE78]">
              Phase 1: Forensic Discovery & Findings
            </div>

            {dagSteps.filter((s) => s.phase === 1).map((step) => (
              <div
                key={step.id}
                className={`p-3.5 border rounded-xl text-xs space-y-1 ${
                  isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#138443] dark:text-[#4EDE78]">
                      {step.stepNumber}
                    </span>
                    <span className="font-bold text-[#111713] dark:text-[#E0E2EA]">
                      {step.operation}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      step.status === 'VERIFIED_COMPLETE'
                        ? 'text-[#138443] dark:text-[#4EDE78]'
                        : step.status === 'EVIDENCE_GAP'
                        ? 'text-[#B45309]'
                        : 'text-[#58645D]'
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <div className="text-xs flex items-center justify-between text-[#58645D] dark:text-[#86948A]">
                  <span>Target: {step.system}</span>
                  {step.proofId && (
                    <button
                      onClick={() => onOpenEvidence(step.proofId!.split(' ')[0])}
                      className="hover:underline cursor-pointer text-[#138443] dark:text-[#4EDE78] font-semibold"
                    >
                      {step.proofId}
                    </button>
                  )}
                </div>
                {step.description && (
                  <p className="text-xs text-[#B45309] pt-1 font-medium">{step.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Phase 2: Proposed Remediation */}
          <div className="space-y-3 pt-3 border-t border-[#E2EAE3] dark:border-[#223042]">
            <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider flex items-center justify-between">
              <span>Phase 2: Proposed Remediation (Awaiting Gate Execution)</span>
              <span className="text-xs font-normal">
                {actionExecuted ? '0 Actions Pending' : '1 Action Pending Approval'}
              </span>
            </div>

            {/* Step 04: Interactive DELETE_RECORD */}
            <div
              className={`p-4 border rounded-xl space-y-3 ${
                actionExecuted
                  ? 'bg-[#EAF8EE] border-[#D5EBD9]'
                  : 'bg-[#FFFBEB] border-[#FDE68A]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#B45309] font-mono font-bold">04</span>
                  <span className="font-bold text-sm text-[#111713] dark:text-[#202823]">
                    DELETE_RECORD
                  </span>
                </div>
                <span className="text-xs font-bold text-[#B45309]">
                  {actionExecuted ? 'Executed & Committed ✓' : 'Proposed (Pending Approval)'}
                </span>
              </div>

              <div className="text-xs space-y-1 text-[#58645D]">
                <div>Target System: <span className="font-mono font-semibold text-[#111713]">redis_cache_cluster_04</span></div>
                <div>Operation Protocol: <span className="font-mono font-medium">ATOMIC_DEL_KEY_WITH_ZK_CONFIRM</span></div>
              </div>

              {!actionExecuted ? (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleApproveDeleteRecord}
                    className="w-full py-2.5 px-4 rounded-lg font-bold text-xs btn-primary-green flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Trigger DELETE_RECORD</span>
                  </button>
                  <button
                    onClick={handleApproveDeleteRecord}
                    className="w-full py-2 px-4 rounded-lg border text-xs btn-secondary flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Alternative: REDACT_RECORD Payload Only</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-lg border text-xs text-[#138443] bg-white border-[#D5EBD9] flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Key purged with zero downtime. Merkle tombstone leaf committed to ledger.</span>
                </div>
              )}
            </div>

            {/* Step 05: BLOCK_RESTORE */}
            <div
              className={`p-3.5 border rounded-xl text-xs space-y-1 ${
                isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#138443] dark:text-[#4EDE78]">05</span>
                  <span className="font-bold text-[#111713] dark:text-[#E0E2EA]">BLOCK_RESTORE</span>
                </div>
                <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
                  Executed
                </span>
              </div>
              <div className="text-xs flex items-center justify-between text-[#58645D] dark:text-[#86948A]">
                <span>System: aws_s3_audit_cold</span>
                <span className="text-[#138443] font-medium">#EVD-8824 (IAM Deny Policy)</span>
              </div>
            </div>
          </div>

          {/* Phase 3: Verification Results */}
          <div className="space-y-2.5 pt-3 border-t border-[#E2EAE3] dark:border-[#223042]">
            <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-[#58645D] dark:text-[#86948A]">
              <span>Phase 3: Verification Results & Proof Log</span>
              <span>{actionExecuted ? 'Outcome Verified ✓' : 'Awaiting Remediation Gate 04'}</span>
            </div>

            {dagSteps.filter((s) => s.phase === 3).map((step) => (
              <div
                key={step.id}
                className={`p-3.5 border rounded-xl text-xs space-y-1 ${
                  isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#58645D]">{step.stepNumber}</span>
                    <span className="font-bold text-[#111713] dark:text-[#E0E2EA]">{step.operation}</span>
                  </div>
                  <span className={`text-xs font-semibold ${step.status === 'VERIFIED_COMPLETE' ? 'text-[#138443] dark:text-[#4EDE78]' : 'text-[#58645D]'}`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-[#58645D] dark:text-[#86948A]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Dual-Sign DAG View */
        <div
          className={`border rounded-2xl p-6 space-y-4 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
              <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
                Dual-Sign DAG Authorization
              </h2>
            </div>
            <span className="text-xs font-mono text-[#58645D] dark:text-[#86948A]">
              EXEC #RP-2025-09B
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs text-center font-bold">
            <div className="py-2 rounded-lg border bg-[#EAF8EE] text-[#138443] border-[#D5EBD9]">
              1. Preflight ✓
            </div>
            <div
              className={`py-2 rounded-lg border ${
                sreSigned
                  ? 'bg-[#EAF8EE] text-[#138443] border-[#D5EBD9]'
                  : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
              }`}
            >
              2. Dual-Sign
            </div>
            <div
              className={`py-2 rounded-lg border ${
                actionExecuted
                  ? 'bg-[#EAF8EE] text-[#138443] border-[#D5EBD9]'
                  : 'bg-[#F7FAF7] text-[#58645D] border-[#E2EAE3]'
              }`}
            >
              3. Execute
            </div>
            <div
              className={`py-2 rounded-lg border ${
                actionExecuted
                  ? 'bg-[#EAF8EE] text-[#138443] border-[#D5EBD9]'
                  : 'bg-[#F7FAF7] text-[#58645D] border-[#E2EAE3]'
              }`}
            >
              4. Re-Audit
            </div>
          </div>

          {/* SECP256K1 Signers */}
          <div
            className={`border rounded-xl p-4 space-y-3 text-xs ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="uppercase text-xs text-[#58645D]">
                SECP256K1 Cryptographic Signers
              </span>
              <span className="text-[#B45309] font-mono text-xs">
                {sreSigned ? '2/2 Endorsed' : '1/2 Endorsed'}
              </span>
            </div>

            <div className="p-3 rounded-lg border bg-white border-[#E2EAE3] flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#111713]">Sarah Vance, JD (DPO)</div>
                <div className="text-xs font-mono text-[#58645D]">sig:0x7f4a...92b0 · 14:28:10Z</div>
              </div>
              <span className="text-xs font-bold text-[#138443]">Signed ✓</span>
            </div>

            <div className="p-3 rounded-lg border bg-white border-[#E2EAE3] flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#111713]">Production SRE Lead</div>
                <div className="text-xs font-mono text-[#B45309]">
                  {sreSigned ? 'sig:0x91da...cc42 · 14:31:02Z' : 'Awaiting SecToken Signature...'}
                </div>
              </div>
              <button
                onClick={() => setSreSigned(!sreSigned)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  sreSigned
                    ? 'bg-[#EAF8EE] text-[#138443] border border-[#D5EBD9]'
                    : 'bg-[#B45309] text-white shadow-xs'
                }`}
              >
                {sreSigned ? 'SIGNED ✓' : 'SIGN NOW'}
              </button>
            </div>

            <button
              disabled={!sreSigned}
              onClick={handleApproveDeleteRecord}
              className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                sreSigned && !actionExecuted
                  ? 'btn-primary-green'
                  : 'bg-[#E2EAE3] text-[#8E9C92] cursor-not-allowed border border-[#CBD5CD]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionExecuted ? 'EXECUTION COMPLETED' : 'Sign & Authorize Execution'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Verification Results: Proof Inspector */}
      <div
        className={`border rounded-2xl p-6 space-y-4 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Proof Inspector: Raw Forensic Artifact
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#B45309]">
            #EVD-8819
          </span>
        </div>

        {/* Terminal Header */}
        <div className="bg-[#0B0F14] border border-[#223042] rounded-xl overflow-hidden shadow-inner">
          <div className="bg-[#182230] px-4 py-2.5 flex items-center justify-between border-b border-[#223042] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB4AB]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB95F]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4EDE78]"></span>
              <span className="ml-2 font-mono text-xs text-[#BBCABF]">redis-cli raw response</span>
            </div>
            <button
              onClick={handleCopyRedisOutput}
              className="text-[#BBCABF] hover:text-[#FFFFFF] flex items-center gap-1.5 text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4EDE78]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 text-xs text-[#4EDE78] font-mono leading-relaxed overflow-x-auto whitespace-pre bg-[#0B0F14]">
{`> REDIS_HOST: redis-prod-04.internal:6379
> QUERY: GET sess:usr_3910_ca:active
> RESPONSE: {"token": "eyJhbGciOi...", "ttl": 42100, "status": "ALIVE"}
> RESULT: REPORT_REMAINING_RECORD [FAIL: Zero tombstone hash returned]`}
          </pre>
        </div>

        {/* Cryptographic Hashes Details */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono p-4 rounded-xl border ${
            isDark ? 'bg-[#0B0F14] border-[#223042] text-[#BBCABF]' : 'bg-[#F2FBF4] border-[#E2EAE3] text-[#111713]'
          }`}
        >
          <div>
            <span className="text-[#58645D]">Merkle Root: </span>
            <span className="font-semibold text-[#138443] dark:text-[#4EDE78]">7a82f0...d91c</span>
          </div>
          <div>
            <span className="text-[#58645D]">SHA-256 Hash: </span>
            <span className="font-semibold text-[#138443] dark:text-[#4EDE78]">e3b0c442...9824</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-[#58645D]">Signer Node: </span>
            <span>validator-us-west-ca-09 (SECP256K1 Certified)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleExportDossier}
            className="py-2.5 px-4 rounded-lg btn-secondary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <FileDown className="w-4 h-4 text-[#111713]" />
            <span>{dossierDownloaded ? 'Dossier Exported (.json) ✓' : 'Export Forensic Dossier (.json)'}</span>
          </button>
          <button
            onClick={handleRerunProver}
            className="py-2.5 px-4 rounded-lg text-xs font-bold btn-primary-green flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${proverRunning ? 'animate-spin' : ''}`} />
            <span>{proverRunning ? 'Executing Prover...' : 'Re-Run Automated Prover'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
