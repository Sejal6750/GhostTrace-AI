import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { AuditCase } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface RequestsViewProps {
  cases: AuditCase[];
  onSelectCase: (caseId: string) => void;
  onNavigateInspect: () => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({
  cases,
  onSelectCase,
  onNavigateInspect,
}) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [subFilter, setSubFilter] = useState<'all' | 'active' | 'restore'>('all');

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subjectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.systems.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterTab === 'complete' && c.forensicProof !== 'VERIFIED COMPLETE') return false;
    if (filterTab === 'incomplete' && c.forensicProof !== 'INCOMPLETE') return false;

    if (subFilter === 'restore' && !c.hasRisk) return false;
    if (subFilter === 'active' && !c.hasGap) return false;

    return true;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111713] dark:text-[#FFFFFF]">
            Requests Explorer
          </h1>
          <p className="text-sm text-[#58645D] dark:text-[#BBCABF] mt-0.5">
            Audit queue, subject identity footprints, and cryptographic verification statuses.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#58645D] dark:text-[#86948A]">
          <span>SHA-256 Synchronized</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#138443] dark:text-[#4EDE78] font-semibold">142 Cases Indexed</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Case ID, Subject identifier, or system name..."
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm transition focus:outline-none ${
            isDark
              ? 'bg-[#0B0F14] border-[#223042] text-[#E0E2EA] placeholder-[#86948A] focus:border-[#4EDE78]'
              : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#111713] placeholder-[#8E9C92] focus:border-[#138443]'
          }`}
        />
      </div>

      {/* Segmented Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Main Tabs */}
        <div
          className={`flex items-center p-1 rounded-xl border ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
          }`}
        >
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'all'
                ? 'bg-[#138443] text-white shadow-xs'
                : isDark
                ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
                : 'text-[#58645D] hover:text-[#111713]'
            }`}
          >
            <span>All Requests</span>
            <span className="opacity-80 font-mono text-[11px]">142</span>
          </button>

          <button
            onClick={() => setFilterTab('complete')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'complete'
                ? 'bg-[#138443] text-white shadow-xs'
                : isDark
                ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
                : 'text-[#58645D] hover:text-[#111713]'
            }`}
          >
            <span>Verified Complete</span>
            <span className="opacity-80 font-mono text-[11px]">88</span>
          </button>

          <button
            onClick={() => setFilterTab('incomplete')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'incomplete'
                ? 'bg-[#B45309] text-white shadow-xs'
                : isDark
                ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
                : 'text-[#58645D] hover:text-[#111713]'
            }`}
          >
            <span>Incomplete Gaps</span>
            <span className="opacity-80 font-mono text-[11px]">38</span>
          </button>
        </div>

        {/* Sub-Filters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#58645D] dark:text-[#86948A]">Focus:</span>
          <button
            onClick={() => setSubFilter(subFilter === 'active' ? 'all' : 'active')}
            className={`px-3 py-1 rounded-lg border text-xs font-medium transition cursor-pointer ${
              subFilter === 'active'
                ? 'bg-[#EAF8EE] border-[#D5EBD9] text-[#138443] font-semibold'
                : isDark
                ? 'bg-[#121820] border-[#223042] text-[#BBCABF]'
                : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#58645D] hover:border-[#138443]'
            }`}
          >
            Active Gaps
          </button>
          <button
            onClick={() => setSubFilter(subFilter === 'restore' ? 'all' : 'restore')}
            className={`px-3 py-1 rounded-lg border text-xs font-medium transition cursor-pointer ${
              subFilter === 'restore'
                ? 'bg-[#FFF5F5] border-[#FED7D7] text-[#B91C1C] font-semibold'
                : isDark
                ? 'bg-[#121820] border-[#223042] text-[#BBCABF]'
                : 'bg-[#FFFFFF] border-[#E2EAE3] text-[#58645D] hover:border-[#B91C1C]'
            }`}
          >
            Restore Risks
          </button>
          {subFilter !== 'all' && (
            <button
              onClick={() => setSubFilter('all')}
              className="text-xs text-[#58645D] hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-3 pt-2">
        {filteredCases.map((caseItem) => {
          const isComplete = caseItem.forensicProof === 'VERIFIED COMPLETE';
          return (
            <div
              key={caseItem.id}
              className={`border rounded-xl p-5 space-y-4 transition card-depth-subtle card-depth-hover ${
                isDark
                  ? 'bg-[#121820] border-[#223042]'
                  : 'bg-[#FFFFFF] border-[#E2EAE3]'
              }`}
            >
              {/* Card Header: Case ID, Subject, Regulation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#111713] dark:text-[#FFFFFF]">
                      {caseItem.id}
                    </span>
                    <span className="text-xs font-mono text-[#58645D] dark:text-[#BBCABF]">
                      {caseItem.subjectId}
                    </span>
                    <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                    <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
                      {caseItem.regulation}
                    </span>
                  </div>
                  <div className="text-xs text-[#58645D] dark:text-[#BBCABF]">
                    <span>{caseItem.title}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{caseItem.region}</span>
                  </div>
                </div>

                {/* Right Flags */}
                <div className="flex items-center gap-2 text-xs">
                  {caseItem.hasGap && (
                    <span className="text-xs font-semibold text-[#B45309]">
                      Evidence Gap
                    </span>
                  )}
                  {caseItem.hasRisk && (
                    <span className="text-xs font-semibold text-[#B91C1C]">
                      Restore Threat
                    </span>
                  )}
                  {caseItem.isLocked && (
                    <span className="text-xs text-[#58645D]">
                      Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Vendor Claimed vs Forensic Proof Two-Column Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className={`border rounded-xl p-3.5 ${
                    isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#58645D] block mb-1">
                    Vendor Reported Status
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <span
                      className={
                        caseItem.vendorReported === 'COMPLETE'
                          ? 'text-[#138443] dark:text-[#4EDE78]'
                          : 'text-[#B45309]'
                      }
                    >
                      {caseItem.vendorReported}
                    </span>
                  </div>
                </div>

                <div
                  className={`border rounded-xl p-3.5 ${
                    isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F2FBF4] border-[#E2EAE3]'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#58645D] block mb-1">
                    Forensic Proof Status
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <span
                      className={
                        isComplete
                          ? 'text-[#138443] dark:text-[#4EDE78]'
                          : 'text-[#B45309]'
                      }
                    >
                      {caseItem.forensicProof}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress and Systems */}
              {isComplete && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#58645D] dark:text-[#BBCABF]">
                      Evidence Indicators: {caseItem.evidenceRatio}
                    </span>
                    <span className="font-semibold text-[#138443] dark:text-[#4EDE78] font-mono">
                      {caseItem.provenPercent}% Proven
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#0B0F14]' : 'bg-[#E2EAE3]'}`}>
                    <div
                      className="h-full rounded-full bg-[#138443]"
                      style={{ width: `${caseItem.provenPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-[#58645D] dark:text-[#86948A] pt-1">
                    Monitored systems: {caseItem.systems.join(', ')}
                  </div>
                </div>
              )}

              {/* Action Buttons & Timestamp */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2EAE3] dark:border-[#223042] text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {caseItem.actions.map((act) => (
                    <button
                      key={act}
                      onClick={() => {
                        onSelectCase(caseItem.id);
                        onNavigateInspect();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-secondary cursor-pointer"
                    >
                      {act}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onSelectCase(caseItem.id);
                      onNavigateInspect();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-primary-green flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-mono text-[#58645D] dark:text-[#86948A]">
                  {caseItem.timeAgo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
