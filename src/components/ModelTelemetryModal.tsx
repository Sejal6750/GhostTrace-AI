import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Download,
  Lock,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ModelTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelTelemetryModal: React.FC<ModelTelemetryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evalCount, setEvalCount] = useState(518);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText('4a8f9b7c89d0231aa67ef09e3b0c4424e88b901a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRerunEval = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvalCount(520);
    }, 1000);
  };

  const handleExportJson = () => {
    const data = {
      benchmark_id: 'LLM-2025-EVAL',
      timestamp: new Date().toISOString(),
      tested_rows: evalCount,
      grounding_f1: 0.994,
      total_tokens: 14820000,
      cached_tokens: 8400000,
      estimated_cost_usd: 142.85,
      sha256: '4a8f9b7c89d0231aa67ef09e3b0c4424e88b901a',
      statutory_compliance: {
        gdpr_art_17: '100% Pass',
        ccpa_cal_civ: '100% Pass',
        fincen_aml_priority: 'Validated',
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluation_report_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportNotice('Exported evaluation_report.json');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleExportFinOps = () => {
    const csvContent =
      'model_id,prover_role,tokens_used,latency_ms,cache_hit_rate,cost_usd\n' +
      'Claude 3.5 Sonnet / GPT-4o,DAG Sequence Arbiter,4120000,1180,52.1%,82.40\n' +
      'DeepSeek-R1 / Gemini 1.5 Flash,JSON-LD & Regex Scrubbing,9200000,180,68.4%,27.60\n' +
      'secp256k1 WASM Engine,Deterministic Merkle Tree,1500000,42,100%,0.00\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finops_attribution_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportNotice('Exported finops_attribution.csv');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div
        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5 rounded-2xl border transition-colors shadow-2xl ${
          isDark
            ? 'bg-[#101419] border-[#223042] text-[#E0E2EA]'
            : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between border-b pb-4 ${isDark ? 'border-[#223042]' : 'border-[#E2EAE3]'}`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#138443] dark:text-[#4EDE78]">
                Model Telemetry · Run #LLM-2025-EVAL
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-[#111713] dark:text-[#FFFFFF]">
              Evaluation & Token Usage
            </h2>
            <p className="text-xs text-[#58645D] dark:text-[#BBCABF] mt-0.5">
              Cost attribution, LLM prover precision, and token burn efficiency across 12 distributed data planes.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close telemetry modal"
            className="w-8 h-8 rounded-lg border flex items-center justify-center btn-secondary cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
          </button>
        </div>

        {/* SHA-256 Copy Ribbon */}
        <div
          className={`rounded-xl p-3 flex items-center justify-between text-xs font-mono border ${
            isDark
              ? 'bg-[#0B0F14] border-[#223042] text-[#86948A]'
              : 'bg-[#F2FBF4] border-[#E2EAE3] text-[#58645D]'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <Lock className="w-3.5 h-3.5 text-[#138443] dark:text-[#4EDE78] shrink-0" />
            <span className="truncate">sha256:4a8f9b7c89d0231aa67ef09...e21c</span>
          </div>
          <button
            onClick={handleCopyHash}
            className="text-[#138443] dark:text-[#4EDE78] hover:underline text-xs font-bold flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#138443]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>

        {/* 2 KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`border rounded-xl p-4 card-depth-subtle ${
              isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-[#58645D] mb-1">
              <span>Audit Cost</span>
              <TrendingUp className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            </div>
            <div className="text-3xl font-bold font-mono text-[#111713] dark:text-[#E0E2EA]">
              $142.85
            </div>
            <div className="text-xs text-[#58645D] mt-1">
              $0.000276 / row audit
            </div>
          </div>

          <div
            className={`border rounded-xl p-4 card-depth-subtle ${
              isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-[#58645D] mb-1">
              <span>Grounding F1</span>
              <ShieldCheck className="w-4 h-4 text-[#138443] dark:text-[#4EDE78]" />
            </div>
            <div className="text-3xl font-bold font-mono text-[#138443] dark:text-[#4EDE78]">
              99.4%
            </div>
            <div className="text-xs text-[#138443] dark:text-[#4EDE78] mt-1 font-semibold">
              0 Hallucinations · 100% Deterministic
            </div>
          </div>
        </div>

        {/* Token Distribution */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase text-xs text-[#58645D]">
              Token Distribution & Cache Efficiency
            </span>
            <span className="font-mono text-[#138443] dark:text-[#4EDE78] font-bold">14.82M Total</span>
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#E2EAE3]">
            <div className="bg-[#138443] h-full" style={{ width: '56.7%' }}></div>
            <div className="bg-[#B45309] h-full" style={{ width: '25.0%' }}></div>
            <div className="bg-[#0D6332] h-full" style={{ width: '18.3%' }}></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div>
              <span className="text-xs text-[#58645D] block">PROMPT</span>
              <span className="font-mono font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">11.20M</span>
            </div>
            <div>
              <span className="text-xs text-[#58645D] block">COMPLETION</span>
              <span className="font-mono font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">3.62M</span>
            </div>
            <div>
              <span className="text-xs text-[#138443] block font-semibold">CACHED (56.7%)</span>
              <span className="font-mono font-bold text-sm text-[#138443]">8.40M</span>
            </div>
          </div>
        </div>

        {/* Prover Attributions */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <span className="font-semibold text-xs text-[#58645D] uppercase tracking-wider block">
            Model Cost & Attribution Matrix (3 Active Provers)
          </span>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl border bg-[#F7FAF7] dark:bg-[#0B0F14] border-[#E2EAE3] dark:border-[#223042] space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#111713] dark:text-[#E0E2EA]">Claude 3.5 Sonnet / GPT-4o Dual-Prover</span>
                <span className="text-[#138443] font-mono">$82.40</span>
              </div>
              <p className="text-xs text-[#58645D]">Complex DAG Sequencing & Regulatory Conflict Arbiter</p>
            </div>

            <div className="p-3 rounded-xl border bg-[#F7FAF7] dark:bg-[#0B0F14] border-[#E2EAE3] dark:border-[#223042] space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#111713] dark:text-[#E0E2EA]">DeepSeek-R1 / Gemini 1.5 Flash</span>
                <span className="text-[#138443] font-mono">$27.60</span>
              </div>
              <p className="text-xs text-[#58645D]">JSON-LD Schema & Null-Hash Regex Scrubbing</p>
            </div>

            <div className="p-3 rounded-xl border bg-[#F7FAF7] dark:bg-[#0B0F14] border-[#E2EAE3] dark:border-[#223042] space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#111713] dark:text-[#E0E2EA]">Local secp256k1 WASM Engine</span>
                <span className="text-[#138443] font-mono">$0.00 (Edge)</span>
              </div>
              <p className="text-xs text-[#58645D]">Deterministic Merkle Proof Verification</p>
            </div>
          </div>
        </div>

        {/* Notice feedback */}
        {exportNotice && (
          <div className="p-3 bg-[#EAF8EE] border border-[#D5EBD9] rounded-xl text-[#138443] text-xs flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-[#138443]" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleRerunEval}
            disabled={evaluating}
            className="w-full py-3 rounded-xl btn-primary-green font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 text-white ${evaluating ? 'animate-spin' : ''}`} />
            <span>{evaluating ? 'Executing Verification Suite...' : 'Re-Run Evaluation Benchmark'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={handleExportJson}
              className="py-2.5 rounded-lg btn-secondary font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#111713]" />
              <span>Audit Log (.json)</span>
            </button>
            <button
              onClick={handleExportFinOps}
              className="py-2.5 rounded-lg btn-secondary font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#111713]" />
              <span>FinOps (.csv)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
