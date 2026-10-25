import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Binary,
  Download,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { EVIDENCE_ARTIFACTS } from '../data/mockData';
import { EvidenceArtifact } from '../types/ghosttrace';
import { useTheme } from '../context/ThemeContext';

interface EvidenceViewProps {
  onSelectCase: (caseId: string) => void;
  onNavigateInspect: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  onSelectCase,
  onNavigateInspect,
}) => {
  const { isDark } = useTheme();
  const [artifacts] = useState<EvidenceArtifact[]>(EVIDENCE_ARTIFACTS);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('#EVD-8819');
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'gap'>('all');
  const [search, setSearch] = useState('');
  const [hexCopied, setHexCopied] = useState(false);
  const [merkleVerified, setMerkleVerified] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const filteredArtifacts = artifacts.filter((a) => {
    const match =
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.filename.toLowerCase().includes(search.toLowerCase()) ||
      a.system.toLowerCase().includes(search.toLowerCase()) ||
      a.sha256.toLowerCase().includes(search.toLowerCase());
    if (!match) return false;
    if (filterType === 'verified' && a.status !== 'VERIFIED_COMPLETE') return false;
    if (filterType === 'gap' && a.status === 'VERIFIED_COMPLETE') return false;
    return true;
  });

  const selectedArtifact = artifacts.find((a) => a.id === selectedEvidenceId) || artifacts[0];

  const handleCopyHex = () => {
    setHexCopied(true);
    navigator.clipboard.writeText(`0000000: 52 45 44 49 53 30 30 31 31 fe 00 fb 01\n0000010: 73 65 73 73 3a 75 73 72 5f 33 39 31 30`);
    setTimeout(() => setHexCopied(false), 2000);
  };

  const handleVerifyMerkle = () => {
    setMerkleVerified(true);
    setTimeout(() => setMerkleVerified(false), 3000);
  };

  const handleDownloadSignedDossier = () => {
    const data = {
      artifact_id: selectedArtifact.id,
      filename: selectedArtifact.filename,
      system: selectedArtifact.system,
      sha256: selectedArtifact.sha256,
      blake3: selectedArtifact.blake3,
      size: selectedArtifact.size,
      status: selectedArtifact.status,
      rfc3161_timestamp: new Date().toISOString(),
      validator_node: 'validator-us-west-ca-09',
      secp256k1_signature: '3045022100e47f989...99a01f02'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `signed_dossier_${selectedArtifact.id.replace('#', '')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111713] dark:text-[#FFFFFF]">
            Immutable Evidence Vault
          </h1>
          <p className="text-sm text-[#58645D] dark:text-[#BBCABF] mt-0.5">
            Cryptographic storage plane receipts, binary hex dumps, and RFC-3161 audit proofs.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#58645D] dark:text-[#86948A]">
          <span>Block #19,842,901</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#138443] dark:text-[#4EDE78] font-semibold">Merkle Root Synced</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#86948A]' : 'text-[#58645D]'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by Evidence ID, SHA-256 hash, or storage plane..."
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
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#138443] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          All Objects (284)
        </button>
        <button
          onClick={() => setFilterType('verified')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filterType === 'verified'
              ? 'bg-[#138443] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          Verified (241)
        </button>
        <button
          onClick={() => setFilterType('gap')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            filterType === 'gap'
              ? 'bg-[#B45309] text-white shadow-xs'
              : isDark
              ? 'text-[#BBCABF] hover:text-[#FFFFFF]'
              : 'text-[#58645D] hover:text-[#111713]'
          }`}
        >
          Gaps / Pending (36)
        </button>
      </div>

      {/* Metrics: Evidence Vault & Parse Integrity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`border rounded-2xl p-5 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-[#58645D] mb-2">
            <span>Evidence Vault</span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#4EDE78]' : 'bg-[#EAF8EE] text-[#138443]'}`}>
              <Binary className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#111713] dark:text-[#E0E2EA]">284</div>
          <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-1">Objects indexed across storage planes</div>
          <div className={`mt-4 w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#0B0F14]' : 'bg-[#E2EAE3]'}`}>
            <div className="h-full bg-[#138443]" style={{ width: '84.8%' }}></div>
          </div>
        </div>

        <div
          className={`border rounded-2xl p-5 transition-all card-depth-subtle ${
            isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-[#58645D] mb-2">
            <span>Parse Integrity</span>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#182230] text-[#4EDE78]' : 'bg-[#EAF8EE] text-[#138443]'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#138443] dark:text-[#4EDE78]">96.2%</div>
          <div className="text-xs text-[#58645D] dark:text-[#86948A] mt-1">14,920 leaf nodes cryptographically sealed</div>
          <div className="mt-4 text-xs text-[#58645D] dark:text-[#86948A]">
            Zero divergence against master root
          </div>
        </div>
      </div>

      {/* Storage Planes List */}
      <div
        className={`border rounded-2xl p-5 space-y-3 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#58645D]">
            Indexed Storage Systems (5 Planes)
          </span>
          <span className="text-xs font-semibold text-[#138443] dark:text-[#4EDE78]">
            Active Audit Watch
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['AWS S3 Cold Archive', 'Redis In-Memory Dump', 'Postgres WAL Journal', 'Kafka Event Stream', 'Snowflake Partition'].map((plane) => (
            <span
              key={plane}
              className={`border px-3 py-1 rounded-lg text-xs font-medium transition ${
                isDark ? 'bg-[#0B0F14] border-[#223042] text-[#BBCABF]' : 'bg-[#F2FBF4] border-[#E2EAE3] text-[#111713]'
              }`}
            >
              {plane}
            </span>
          ))}
        </div>
      </div>

      {/* Artifact Stream Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#58645D]">
          <span>Artifact Stream · Forensic Logs</span>
          <span>Sort: Severity Descending</span>
        </div>

        {filteredArtifacts.map((art) => {
          const isGap = art.status === 'EVIDENCE_GAP';
          const isMismatch = art.status === 'CHECKSUM_MISMATCH';
          const isSelected = selectedEvidenceId === art.id;

          return (
            <div
              key={art.id}
              onClick={() => setSelectedEvidenceId(art.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 card-depth-subtle card-depth-hover ${
                isSelected
                  ? isDark
                    ? 'bg-[#182230] border-[#4EDE78]'
                    : 'bg-[#FFFFFF] border-[#138443] shadow-md ring-1 ring-[#138443]/30'
                  : isDark
                  ? 'bg-[#121820] border-[#223042]'
                  : 'bg-[#FFFFFF] border-[#E2EAE3]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#B45309]">{art.id}</span>
                    <span className="text-xs text-[#58645D]" aria-hidden="true">·</span>
                    <span className="text-xs font-medium text-[#58645D]">{art.system}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#111713] dark:text-[#FFFFFF] mt-1">
                    {art.filename}
                  </h3>
                  <p className="text-xs text-[#58645D] dark:text-[#BBCABF] mt-0.5">{art.description}</p>
                </div>

                <span
                  className={`text-xs font-semibold ${
                    isGap
                      ? 'text-[#B45309]'
                      : isMismatch
                      ? 'text-[#B91C1C]'
                      : 'text-[#138443] dark:text-[#4EDE78]'
                  }`}
                >
                  {art.status}
                </span>
              </div>

              {/* Hashes & Parser Specs */}
              <div
                className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                  isDark ? 'bg-[#0B0F14] border-[#223042]' : 'bg-[#F7FAF7] border-[#E2EAE3]'
                }`}
              >
                <div className="truncate text-[#58645D]">
                  SHA-256: <span className="text-[#111713] dark:text-[#E0E2EA] font-semibold">{art.sha256}</span>
                </div>
                {art.blake3 && (
                  <div className="truncate text-[#58645D]">
                    BLAKE3: <span className="text-[#111713] dark:text-[#E0E2EA] font-semibold">{art.blake3}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t border-[#E2EAE3] dark:border-[#223042] text-[11px] text-[#58645D]">
                  <span>Size: {art.size}</span>
                  <span>Parser: {art.parser}</span>
                </div>
              </div>

              {/* Finding Notice */}
              <div
                className={`p-3 rounded-xl text-xs border ${
                  isGap
                    ? 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                    : isMismatch
                    ? 'bg-[#FFF5F5] text-[#991B1B] border-[#FED7D7]'
                    : 'bg-[#F2FBF4] text-[#138443] border-[#D5EBD9]'
                }`}
              >
                {art.findingNotice}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvidenceId(art.id);
                  }}
                  className="px-3 py-1.5 rounded-lg btn-secondary text-xs font-semibold cursor-pointer"
                >
                  Inspect Hex / ASCII
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCase(art.caseRef.split(' ')[0]);
                    onNavigateInspect();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#138443] dark:text-[#4EDE78] hover:underline cursor-pointer"
                >
                  View Case →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crypto Inspector Component */}
      <div
        className={`border rounded-2xl p-6 space-y-4 transition-all card-depth-subtle ${
          isDark ? 'bg-[#121820] border-[#223042]' : 'bg-[#FFFFFF] border-[#E2EAE3]'
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Binary className="w-4 h-4 text-[#111713] dark:text-[#E0E2EA]" />
            <h2 className="text-base font-bold text-[#111713] dark:text-[#E0E2EA]">
              Cryptographic Inspector: {selectedArtifact.id}
            </h2>
          </div>
          <button
            onClick={handleCopyHex}
            className="text-xs flex items-center gap-1.5 text-[#58645D] hover:text-[#111713] font-medium cursor-pointer"
          >
            {hexCopied ? <Check className="w-3.5 h-3.5 text-[#138443]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{hexCopied ? 'Copied' : 'Copy Payload'}</span>
          </button>
        </div>

        {/* Hex and Signature View */}
        <div className="bg-[#0B0F14] border border-[#223042] rounded-xl p-4 font-mono text-xs text-[#4EDE78] space-y-1.5 overflow-x-auto shadow-inner">
          <div className="text-[#BBCABF]">0000000: 52 45 44 49 53 30 30 31 31 fe 00 fb 01</div>
          <div className="text-[#BBCABF]">0000010: 73 65 73 73 3a 75 73 72 5f 33 39 31 30</div>
          <div className="text-[#BBCABF]">0000020: 3a 61 63 74 69 76 65 09 31 37 33 39 33</div>
          <div className="text-[#86948A] pt-2">-- RFC-3161 TIME SEAL & SECP256K1 ATTESTATION --</div>
          <div className="text-[#4EDE78]">{`{`}</div>
          <div className="pl-4 text-[#BBCABF]">
            <span className="text-[#86948A]">"secp256k1_sig": </span>"3045022100e47f989...99a01f02",
          </div>
          <div className="pl-4 text-[#BBCABF]">
            <span className="text-[#86948A]">"validator_id": </span>"validator-us-west-ca-09",
          </div>
          <div className="pl-4 text-[#BBCABF]">
            <span className="text-[#86948A]">"public_key": </span>"04a89fb3c149021...510e",
          </div>
          <div className="pl-4 text-[#BBCABF]">
            <span className="text-[#86948A]">"rfc3161_tsa": </span>"DigiCert_Forensic_Timestamp_Auth",
          </div>
          <div className="pl-4 text-[#4EDE78]">
            <span className="text-[#86948A]">"valid": </span>true
          </div>
          <div className="text-[#4EDE78]">{`}`}</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleDownloadSignedDossier}
            className="py-2.5 px-4 rounded-lg btn-secondary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-[#111713]" />
            <span>{downloadNotice ? 'Dossier Downloaded (.json) ✓' : 'Download Signed Dossier (.json)'}</span>
          </button>
          <button
            onClick={handleVerifyMerkle}
            className="py-2.5 px-4 rounded-lg text-xs font-bold btn-primary-green flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <CheckCircle className="w-4 h-4 text-white" />
            <span>{merkleVerified ? 'Merkle Proof Verified ✓' : 'Verify Merkle Proof'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
