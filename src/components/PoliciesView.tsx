import React, { useState } from 'react';
import {
  Scale,
  Search,
  Lock,
  CheckCircle2,
  FileText,
  Play
} from 'lucide-react';
import { POLICY_RULES } from '../data/mockData';
import { PolicyRule } from '../types/ghosttrace';
import { resolveStatutoryConflict } from '../utils/rules';
import { useTheme } from '../context/ThemeContext';

export const PoliciesView: React.FC = () => {
  const { isDark } = useTheme();
  const [rules] = useState<PolicyRule[]>(POLICY_RULES);
  const [filter, setFilter] = useState<'all' | 'active' | 'holds'>('all');
  const [search, setSearch] = useState('');
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [matrixExported, setMatrixExported] = useState(false);

  const filteredRules = rules.filter((r) => {
    const match =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.targetCategory.toLowerCase().includes(search.toLowerCase());
    if (!match) return false;
    if (filter === 'holds' && r.category !== 'STATUTORY EXCEPTION') return false;
    return true;
  });

  const handleSimulateCollision = () => {
    const res = resolveStatutoryConflict(true, false, 400);
    setSimulationResult(
      `Conflict Resolved: ${res.activeOverride} enforces Priority 0 override. Record status set to NOT_APPLICABLE. Days remaining: ${res.retentionRequirementDays} days. Erasure safely deferred under statutory AML safe-harbor.`
    );
  };

  const handleExportMatrix = () => {
    const matrixData = {
      version: '4.2',
      merkle_anchor: '0x3f1a92e41c8e02',
      export_timestamp: new Date().toISOString(),
      policies: rules,
      conflict_precedence: [
        { priority: 0, rule: 'Statutory AML & Tax Preserves', override: 'NOT_APPLICABLE' },
        { priority: 1, rule: 'Active Judicial Litigation Holds', override: 'ESCROW_FREEZE' },
        { priority: 2, rule: 'Verifiable k-Anonymity', override: 'VERIFY_RECORD_ANONYMIZED' }
      ]
    };
    const blob = new Blob([JSON.stringify(matrixData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `regtech_policy_matrix_v4.2.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMatrixExported(true);
    setTimeout(() => setMatrixExported(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111713] dark:text-[#FFFFFF]">
            Statutory Policy Matrix
          </h1>
          <p className="text-sm text-[#58645D] dark:text-[#BBCABF] mt-0.5">
            Cross-jurisdictional compliance rules, AML preservation overrides, and deterministic collision resolutions.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#58645D] dark:text-[#86948A]">
          <span>Anchor: 0x3f1a...8e02</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#138443] dark:text-[#4EDE78] font-semibold">Matrix v4.2 Synchronized</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rules, statutory articles (GDPR Art. 17, CCPA, AML), or operations..."
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm transition focus:outline-none ${
            isDark
              ? 'bg-[#0B0F14] border-[#223042] text-[#E0E2EA] placeholder-[#86948A] focus:border-[#4EDE78]'
              : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713] placeholder-[#8E9C92] focus:border-[#138443]'
          }`}
        />
      </div>

      {/* Filter Tabs */}
      <div
        className={`inline-flex items-center p-1 rounded-xl border ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
        }`}
      >
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-[#138443] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          All Policies (28)
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filter === 'active'
              ? 'bg-[#138443] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          Active Enforced (24)
        </button>
        <button
          onClick={() => setFilter('holds')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filter === 'holds'
              ? 'bg-[#B45309] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          Statutory Holds (4)
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`border rounded-2xl p-5 space-y-2 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="text-xs font-semibold uppercase text-[#58645D]">
            Data Mappings
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111713] dark:text-[#E0E2EA]">
            4 Storage Planes <span className="text-sm text-[#138443] font-semibold">100% Bound</span>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-2 flex-1 bg-[#138443] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#138443] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#138443] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#138443] rounded-full"></div>
          </div>
        </div>

        <div
          className={`border rounded-2xl p-5 space-y-2 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="text-xs font-semibold uppercase text-[#58645D]">
            Statutory Invariants
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#138443] dark:text-[#4EDE78]">
            100.0% <span className="text-sm font-normal text-[#58645D]">Enforced</span>
          </div>
          <div className="text-xs text-[#58645D] dark:text-[#86948A]">
            Zero divergence across cross-border audits
          </div>
        </div>
      </div>

      {/* Legal Retention Banner */}
      <div
        className={`border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all card-depth-subtle ${
          isDark
            ? 'bg-[#181C21] border-[#FFB95F]/30'
            : 'bg-[#FFFBEB] border-[#FDE68A]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#B45309] shrink-0" />
          <div>
            <span className="font-bold text-sm block text-[#111713] dark:text-[#E0E2EA]">
              4 Legal Retention Escrow Holds Active
            </span>
            <span className="text-[#58645D] dark:text-[#BBCABF]">
              31 U.S.C. 5318(g) Bank Secrecy Act overrides deletion for financial journals.
            </span>
          </div>
        </div>
        <div className="bg-[#B45309] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs self-start sm:self-auto">
          AML / FinCEN Safe Harbor
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#58645D]">
          <span>Active Statutory Rules</span>
          <span>Prioritized by Precedence</span>
        </div>

        {filteredRules.map((rule) => {
          const isStrict = rule.category === 'STRICT ENFORCEMENT';
          const isException = rule.category === 'STATUTORY EXCEPTION';

          return (
            <div
              key={rule.id}
              className={`border rounded-2xl p-5 space-y-3 transition-all card-depth-subtle card-depth-hover ${
                isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#138443] dark:text-[#4EDE78]">{rule.id}</span>
                    <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                    <span
                      className={`text-xs font-semibold ${
                        isStrict
                          ? 'text-[#138443] dark:text-[#4EDE78]'
                          : isException
                          ? 'text-[#B45309]'
                          : 'text-[#58645D]'
                      }`}
                    >
                      {rule.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111713] dark:text-[#FFFFFF] mt-1">
                    {rule.name}
                  </h3>
                </div>
              </div>

              {/* Rule Specs */}
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
                }`}
              >
                {rule.statutoryBasis ? (
                  <div>
                    <span className="text-[#58645D]">Statutory Basis: </span>
                    <span className="text-[#B45309] font-mono font-bold">{rule.statutoryBasis}</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[#58645D]">Target Category: </span>
                    <span className="font-semibold text-[#111713] dark:text-[#E0E2EA]">
                      {rule.targetCategory}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E2EAE3] dark:border-[#223042]">
                  <div>
                    <span className="text-[#58645D]">Treatment: </span>
                    <span className="text-[#138443] dark:text-[#4EDE78] font-mono font-bold">{rule.treatment}</span>
                  </div>
                  <div>
                    <span className="text-[#58645D]">Max SLA: </span>
                    <span className="text-[#B45309] font-mono font-bold">{rule.maxSla}</span>
                  </div>
                </div>
              </div>

              {/* Primitives */}
              <div className="text-xs space-y-1.5">
                <span className="text-xs font-semibold text-[#58645D]">
                  Required Forensic Primitives:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {rule.requiredPrimitives.map((prim) => (
                    <span
                      key={prim}
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg border bg-[#F7FAF7] dark:bg-[#182230] text-[#111713] dark:text-[#E0E2EA] border-[#E2EAE3] dark:border-[#223042]"
                    >
                      {prim}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retention Conflict Hierarchy Engine */}
      <div
        className={`border rounded-2xl p-6 space-y-4 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Statutory Conflict Hierarchy Engine
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
            Deterministic Precedence
          </span>
        </div>

        <p className="text-xs text-[#58645D] dark:text-[#BBCABF]">
          Automated collision matrix applied when an individual right-to-erasure request directly contradicts statutory preservation orders.
        </p>

        <div className="space-y-2.5 text-xs">
          {/* Priority 0 */}
          <div
            className={`p-3.5 rounded-xl border space-y-1 ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">
                  1. Statutory AML & Tax Preserves
                </span>
              </div>
              <span className="font-mono font-bold text-xs text-[#B45309]">Priority 0</span>
            </div>
            <p className="text-xs text-[#58645D] dark:text-[#86948A]">
              Overrides erasure; enforces cryptographic freeze & sets status to NOT_APPLICABLE.
            </p>
          </div>

          {/* Priority 1 */}
          <div
            className={`p-3.5 rounded-xl border space-y-1 ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">
                2. Active Judicial Litigation Holds
              </span>
              <span className="font-mono font-bold text-xs text-[#58645D]">Priority 1</span>
            </div>
            <p className="text-xs text-[#58645D] dark:text-[#86948A]">
              Overrides deletion; seals records into asymmetric multi-key escrow vault.
            </p>
          </div>

          {/* Priority 2 */}
          <div
            className={`p-3.5 rounded-xl border space-y-1 ${
              isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#111713] dark:text-[#E0E2EA]">
                3. Verifiable k-Anonymity Research Set
              </span>
              <span className="font-mono font-bold text-xs text-[#58645D]">Priority 2</span>
            </div>
            <p className="text-xs text-[#58645D] dark:text-[#86948A]">
              Demands VERIFY_RECORD_ANONYMIZED with zero residual linkability.
            </p>
          </div>
        </div>

        {/* Conflict Simulation Feedback */}
        {simulationResult && (
          <div className="p-4 rounded-xl bg-[#EAF8EE] border border-[#D5EBD9] text-xs text-[#138443] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#138443]" />
              <span>Collision Engine Resolution Result</span>
            </div>
            <p className="text-xs text-[#111713] leading-relaxed">{simulationResult}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleSimulateCollision}
            className="py-2.5 px-4 rounded-lg btn-secondary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Play className="w-4 h-4 text-[#B45309]" />
            <span>Simulate Conflict Collision</span>
          </button>
          <button
            onClick={handleExportMatrix}
            className="py-2.5 px-4 rounded-lg text-xs font-bold btn-primary-green flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>{matrixExported ? 'Matrix Exported (.json) ✓' : 'Export RegTech Matrix (.json)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
