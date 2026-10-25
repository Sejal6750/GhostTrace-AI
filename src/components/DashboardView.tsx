import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUpRight,
  ChevronRight,
  Lock,
  Radio,
  Clock,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Layers,
  Activity,
  HardDrive
} from 'lucide-react';
import { TabType } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface DashboardViewProps {
  onSelectTab: (tab: TabType) => void;
  onSelectCase: (caseId: string) => void;
  onOpenSchema: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectTab,
  onSelectCase,
  onOpenSchema,
}) => {
  const { isDark } = useTheme();
  const [streamHalted, setStreamHalted] = useState(false);
  const [expeditedRequested, setExpeditedRequested] = useState(false);
  const [batchValidating, setBatchValidating] = useState(false);

  const handleRunBatchValidation = () => {
    setBatchValidating(true);
    setTimeout(() => {
      setBatchValidating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Compliance Environment Sub-header */}
      <div
        className={`border rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs transition-all card-depth-subtle ${
          isDark
            ? 'bg-[#181C21] border-[#FFB95F]/30 text-[#FFB95F]'
            : 'bg-[#F2FBF4] border-[#E2EAE3] text-[#111713]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#138443] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-[#111713] dark:text-[#E0E2EA]">
              {isDark
                ? 'Forensic Audit Simulation Environment'
                : 'Official Auditing Report View · Compliance Sign-off Ready'}
            </span>
            <span className="hidden md:inline text-[#58645D] dark:text-[#86948A] ml-2">
              Cryptographic consensus attested across 5 distributed storage planes
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#58645D] dark:text-[#86948A]">
          <span>Cluster: US-West-09</span>
          <span aria-hidden="true">·</span>
          <span>Epoch 481</span>
        </div>
      </div>

      {/* Hero Section: 2026 Executive Forensic Dashboard */}
      <div
        className={`rounded-2xl p-6 sm:p-8 transition-all border ${
          isDark
            ? 'bg-[#121820] border-[#223042] text-[#E0E2EA]'
            : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713] shadow-xs'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#138443] dark:text-[#4EDE78]">
              <span>Consensus Engine Active</span>
              <span aria-hidden="true">/</span>
              <span>SHA-256 Merkle Invariant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111713] dark:text-[#FFFFFF] leading-tight text-balance">
              Evidence-Based Data Deletion Auditor
            </h1>

            <p className="text-base sm:text-[17px] text-[#58645D] dark:text-[#BBCABF] leading-relaxed max-w-2xl">
              Inspect cryptographic tombstone proofs across relational, cold archive, and cache layers.
              Automatically detect ghost records, statutory AML retention holds, and ongoing streaming pipeline leaks.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('requests')}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg btn-primary-green flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <FileSearch className="w-4 h-4 text-white" />
                <span>Continue Audit Investigation</span>
              </button>

              <button
                onClick={() => onSelectTab('inspect')}
                className="px-4 py-2.5 text-sm font-semibold rounded-lg btn-secondary flex items-center gap-2 cursor-pointer"
              >
                <span>Inspect Active Case #GT-9483</span>
                <ChevronRight className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Circular Meter & Forensic Flow Pipeline */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className={`w-full max-w-sm rounded-xl p-5 border transition-all ${
                isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#58645D] dark:text-[#86948A] mb-3">
                <span>Erasure Attestation Meter</span>
                <span className="font-mono text-[#138443] dark:text-[#4EDE78]">518 Case Invariants</span>
              </div>

              <div className="flex items-center justify-center gap-6 py-2">
                {/* 62% Circular Meter */}
                <div className="relative w-28 h-28 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className={isDark ? 'text-[#1C2025]' : 'text-[#E2EAE3]'}
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={isDark ? 'text-[#4EDE78]' : 'text-[#138443]'}
                      strokeDasharray="62, 100"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold font-mono text-[#111713] dark:text-[#4EDE78]">
                      62%
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#58645D] dark:text-[#86948A]">
                      Attested
                    </span>
                  </div>
                </div>

                {/* Meter Breakdown List */}
                <div className="space-y-1.5 text-xs text-[#58645D] dark:text-[#BBCABF]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#138443]"></div>
                    <span>Verified Complete: <strong className="font-mono text-[#111713] dark:text-[#E0E2EA]">321</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#B45309]"></div>
                    <span>Evidence Gaps: <strong className="font-mono text-[#111713] dark:text-[#E0E2EA]">142</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0D6332]"></div>
                    <span>Statutory Preserves: <strong className="font-mono text-[#111713] dark:text-[#E0E2EA]">55</strong></span>
                  </div>
                </div>
              </div>

              {/* Sub-label */}
              <div className="mt-3 pt-3 border-t border-[#E2EAE3] dark:border-[#223042] text-[11px] text-center text-[#58645D] dark:text-[#86948A]">
                Cryptographic Zero-Knowledge verification across 5 storage layers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI 4-Card Grid with Soft Light-Green Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Audited Cases */}
        <div
          className={`rounded-xl p-5 transition-all duration-200 border card-depth-subtle card-depth-hover ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#58645D] dark:text-[#BBCABF]">
              Audited Cases
            </span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#4EDE78]' : 'bg-[#EAF8EE] text-[#138443]'}`}>
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#111713] dark:text-[#E0E2EA]">14</span>
            <span className="text-xs text-[#58645D] dark:text-[#86948A]">in current sprint</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium">
            <div
              className={`px-2 py-1 rounded-md flex-1 text-center border ${
                isDark ? 'bg-[#182230] border-[#223042]' : 'bg-[#EAF8EE] border-[#D5EBD9]'
              }`}
            >
              <span className="font-bold text-[#138443] dark:text-[#4EDE78]">28</span>{' '}
              <span className="text-[#58645D] dark:text-[#86948A]">CMP</span>
            </div>
            <div
              className={`px-2 py-1 rounded-md flex-1 text-center border ${
                isDark ? 'bg-[#182230] border-[#223042]' : 'bg-[#FEF3C7] border-[#FDE68A]'
              }`}
            >
              <span className="font-bold text-[#B45309]">39</span>{' '}
              <span className="text-[#58645D] dark:text-[#86948A]">INC</span>
            </div>
            <div
              className={`px-2 py-1 rounded-md flex-1 text-center border ${
                isDark ? 'bg-[#182230] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
              }`}
            >
              <span className="font-bold text-[#58645D]">15</span>{' '}
              <span className="text-[#58645D] dark:text-[#86948A]">N/A</span>
            </div>
          </div>
        </div>

        {/* Card 2: Validation Rate */}
        <div
          className={`rounded-xl p-5 transition-all duration-200 border card-depth-subtle card-depth-hover ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#58645D] dark:text-[#BBCABF]">
              Validation Rate
            </span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#4EDE78]' : 'bg-[#EAF8EE] text-[#138443]'}`}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#138443] dark:text-[#4EDE78]">61.9%</span>
            <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
              ↑ +4.2%
            </span>
          </div>
          <div className={`mt-4 w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#182230]' : 'bg-[#E2EAE3]'}`}>
            <div className="h-full rounded-full bg-[#138443]" style={{ width: '61.9%' }}></div>
          </div>
        </div>

        {/* Card 3: Evidence Gaps */}
        <div
          className={`rounded-xl p-5 transition-all duration-200 border card-depth-subtle card-depth-hover ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#58645D] dark:text-[#BBCABF]">
              Evidence Gaps
            </span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#FFB95F]' : 'bg-[#FEF3C7] text-[#B45309]'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#B45309]">2</span>
            <span className="text-xs text-[#58645D] dark:text-[#BBCABF]">unverified nodes</span>
          </div>
          <p className="mt-4 text-xs text-[#58645D] dark:text-[#86948A] truncate">
            Pending tombstone hashes
          </p>
        </div>

        {/* Card 4: Data-Flow Risks */}
        <div
          className={`rounded-xl p-5 transition-all duration-200 border card-depth-subtle card-depth-hover ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#58645D] dark:text-[#BBCABF]">
              Data-Flow Risks
            </span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#FFB4AB]' : 'bg-[#FEE2E2] text-[#B91C1C]'}`}>
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#B91C1C]">7</span>
            <span className="text-xs text-[#58645D] dark:text-[#BBCABF]">active leaks</span>
          </div>
          <p className="mt-4 text-xs text-[#58645D] dark:text-[#86948A] truncate">
            Ongoing stream ingestion
          </p>
        </div>
      </div>

      {/* Critical Incident Alert: Kafka Streaming Pipeline Leak */}
      <div
        className={`rounded-2xl p-5 sm:p-6 space-y-4 transition-all border ${
          isDark
            ? 'bg-[#181C21] border-[#FFB4AB]/30'
            : 'bg-[#FFF5F5] border-[#FED7D7]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#B91C1C] shrink-0" />
            <span className="text-sm font-bold tracking-tight text-[#991B1B] uppercase">
              Critical Risk Finding: Continuous Ingestion Pipeline Active
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#991B1B]">
            STREAM-CDC-9 · Throughput: ~412 msgs/sec
          </span>
        </div>

        <div
          className={`rounded-xl p-4 text-sm space-y-2 border ${
            isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#FFFFFF] border-[#FED7D7]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-mono font-bold text-[#B45309]">
              REPORT_ACTIVE_DATA_FLOW:
            </span>
            <span className="font-mono text-[#111713] dark:text-[#E0E2EA]">
              CDC pipeline kafka.user_events.v2
            </span>
          </div>
          <p className="text-xs text-[#58645D] dark:text-[#BBCABF]">
            Actively streaming deleted subject UUID:{' '}
            <span className="font-mono font-bold text-[#111713] dark:text-[#FFFFFF] bg-[#EAF8EE] dark:bg-[#182230] px-1.5 py-0.5 rounded border border-[#D5EBD9] dark:border-[#223042]">
              8f9b-11c4
            </span>
          </p>
          <div className="text-xs pt-2 border-t border-[#E2EAE3] dark:border-[#223042] text-[#58645D] dark:text-[#86948A] flex flex-wrap items-center justify-between gap-2">
            <span>Ingestion Point: us-east-prod-kafka-04</span>
            <span>Target Sink: Snowflake Analytics Lake</span>
          </div>
        </div>

        <button
          onClick={() => setStreamHalted(!streamHalted)}
          className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            streamHalted
              ? isDark
                ? 'bg-[#182230] text-[#86948A] border border-[#223042]'
                : 'bg-[#F7FAF7] text-[#58645D] border border-[#E2EAE3]'
              : isDark
              ? 'bg-[#10B981] hover:bg-[#4EDE78] text-[#003824]'
              : 'btn-primary-green'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{streamHalted ? 'FLOW HALTED · AUDIT LOGGED' : 'Halt Data Flow & Commit Tombstone'}</span>
        </button>
      </div>

      {/* Evidence Gap Protocol Card */}
      <div
        className={`rounded-2xl p-5 sm:p-6 space-y-4 transition-all border card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#B45309]">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-bold tracking-wide uppercase">
              Evidence Gap Protocol
            </span>
          </div>
          <span className="text-xs font-semibold text-[#B45309] font-mono">
            3 Replicas Affected
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
            3 DB replicas lack deletion tombstone proofs
          </h3>
          <p className="text-xs text-[#58645D] dark:text-[#BBCABF] mt-1">
            Action required: REPORT_REMAINING_RECORD pending cryptographic proof from:
          </p>
          <ul className="text-xs mt-2 space-y-1 list-disc list-inside text-[#58645D] dark:text-[#BBCABF]">
            <li>
              Snowflake Analytics Warehouse{' '}
              <span className="font-mono text-[11px] text-[#58645D]">
                (DB_REPLICA_AP_SOUTHEAST)
              </span>
            </li>
            <li>
              AWS S3 Glacier Cold Archive{' '}
              <span className="font-mono text-[11px] text-[#58645D]">
                (BUCKET_VAULT_DELETION_2023)
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E2EAE3] dark:border-[#223042]">
          <div className="flex items-center gap-1.5 text-xs text-[#B45309]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold font-mono">SLA Timeout: 03h 42m</span>
          </div>
          <button
            onClick={() => setExpeditedRequested(true)}
            className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78] hover:underline cursor-pointer transition"
          >
            {expeditedRequested ? 'Sync Queued ✓' : 'Request Expedited Sync →'}
          </button>
        </div>
      </div>

      {/* Recent Case Investigations (Live Ledger Feed) */}
      <div
        className={`rounded-2xl p-5 sm:p-6 space-y-4 transition-all border card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Recent Case Investigations
            </h2>
          </div>
          <span className="text-xs text-[#58645D] dark:text-[#86948A]">
            Live Ledger Feed
          </span>
        </div>

        <div className="space-y-3">
          {/* Item 1: #GT-9482 */}
          <div
            onClick={() => {
              onSelectCase('#GT-9482');
              onSelectTab('inspect');
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 space-y-2 card-depth-hover ${
              isDark
                ? 'bg-[#182230]/60 border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#F2FBF4] border-[#E2EAE3] hover:border-[#138443]'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">#GT-9482</span>
                <span className="text-xs font-mono text-[#58645D] dark:text-[#BBCABF]">
                  usr_8829_eu
                </span>
                <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                <span className="text-xs text-[#58645D]">GDPR Article 17</span>
              </div>
              <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
                Complete
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#58645D] dark:text-[#BBCABF]">
              <span>14 cryptographic proofs valid</span>
              <span className="font-mono text-[11px]">Merkle: 7a82...d91c</span>
            </div>
          </div>

          {/* Item 2: #GT-9483 */}
          <div
            onClick={() => {
              onSelectCase('#GT-9483');
              onSelectTab('inspect');
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 space-y-2 card-depth-hover ${
              isDark
                ? 'bg-[#182230]/60 border-[#223042] hover:border-[#FFB95F]'
                : 'bg-[#FFFFFF] border-[#E2EAE3] hover:border-[#B45309]'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">#GT-9483</span>
                <span className="text-xs font-mono text-[#58645D] dark:text-[#BBCABF]">
                  usr_3910_ca
                </span>
                <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                <span className="text-xs text-[#58645D]">CCPA Opt-Out</span>
              </div>
              <span className="text-xs font-semibold text-[#B45309]">
                Incomplete
              </span>
            </div>
            <p className="text-xs text-[#B45309] font-medium">
              Missing Redis session cache deletion confirmation proof
            </p>
          </div>

          {/* Item 3: #GT-9484 */}
          <div
            onClick={() => {
              onSelectCase('#GT-9484');
              onSelectTab('inspect');
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 space-y-2 card-depth-hover ${
              isDark
                ? 'bg-[#182230]/60 border-[#223042] hover:border-[#FFB4AB]'
                : 'bg-[#FFFFFF] border-[#E2EAE3] hover:border-[#B91C1C]'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">#GT-9484</span>
                <span className="text-xs font-mono text-[#58645D] dark:text-[#BBCABF]">
                  usr_1029_us
                </span>
                <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                <span className="text-xs text-[#58645D]">FinCEN Hold</span>
              </div>
              <span className="text-xs font-semibold text-[#B91C1C]">
                Risk Detected
              </span>
            </div>
            <p className="text-xs text-[#B91C1C] font-medium">
              REPORT_RESTORE_RISK: daily WAL snapshots hold records
            </p>
          </div>
        </div>
      </div>

      {/* Platform Batch Operations */}
      <div
        className={`rounded-2xl p-5 sm:p-6 space-y-4 transition-all border card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Platform Operations
            </h2>
          </div>
          <span className="text-xs text-[#58645D] dark:text-[#86948A]">
            Batch Audit Actions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onSelectTab('requests')}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all text-left card-depth-hover cursor-pointer ${
              isDark
                ? 'bg-[#182230] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#F2FBF4] border-[#E2EAE3] hover:border-[#138443]'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-[#111713] dark:text-[#E0E2EA]">
                Inspect Requests
              </div>
              <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-0.5">
                142 cases queued
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#58645D]" />
          </button>

          <button
            onClick={handleRunBatchValidation}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all text-left card-depth-hover cursor-pointer ${
              isDark
                ? 'bg-[#182230] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#F2FBF4] border-[#E2EAE3] hover:border-[#138443]'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-[#111713] dark:text-[#E0E2EA]">
                {batchValidating ? 'Validating 39 Nodes...' : 'Run Batch Validation'}
              </div>
              <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-0.5">
                Re-query 39 pending nodes
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#58645D]" />
          </button>

          <button
            onClick={onOpenSchema}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all text-left card-depth-hover cursor-pointer ${
              isDark
                ? 'bg-[#182230] border-[#223042] hover:border-[#4EDE78]'
                : 'bg-[#F2FBF4] border-[#E2EAE3] hover:border-[#138443]'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-[#111713] dark:text-[#E0E2EA]">
                View Schema Output
              </div>
              <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-0.5">
                518 verified rows
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#58645D]" />
          </button>
        </div>
      </div>

      {/* Anchor Bar: Block & Immutability */}
      <div
        className={`border rounded-xl p-3.5 flex items-center justify-between text-xs transition-all card-depth-subtle ${
          isDark
            ? 'bg-[#0B0F14] border-[#223042] text-[#BBCABF]'
            : 'bg-[#F7FAF7] border-[#E2EAE3] text-[#58645D]'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-xs">
          <Lock className="w-3.5 h-3.5 text-[#138443] dark:text-[#4EDE78]" />
          <span>Anchor: 0x4F92...B39E (Block #19,842,901)</span>
        </div>
        <span className="font-semibold text-xs text-[#138443] dark:text-[#4EDE78]">
          Immutable Ledger Attested
        </span>
      </div>
    </div>
  );
};
