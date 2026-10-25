export type TabType = 'dash' | 'requests' | 'inspect' | 'evidence' | 'policies';

export interface AuditCase {
  id: string; // e.g. '#GT-9482'
  subjectId: string; // e.g. 'usr_8829_eu'
  regulation: 'GDPR ART. 17' | 'CCPA OPT-OUT' | 'VOLUNTARY' | 'EXEMPTION';
  title: string;
  region: string;
  vendorReported: 'COMPLETE' | 'INCOMPLETE' | 'NOT_APPLICABLE';
  forensicProof: 'VERIFIED COMPLETE' | 'INCOMPLETE' | 'NOT_APPLICABLE';
  evidenceRatio: string; // '5/5'
  provenPercent: number; // 100
  systems: string[];
  actions: string[];
  timeAgo: string;
  hasGap?: boolean;
  hasRisk?: boolean;
  isLocked?: boolean;
  details?: {
    email: string;
    accountCreated: string;
    timestamp: string;
    slaRemaining: string;
    gapDescription?: string;
    statutoryOverride?: string;
  };
}

export interface TargetSystem {
  id: string;
  name: string;
  identifier: string;
  status: 'COMPLETE' | 'GAP DETECTED' | 'WARNING';
  detail: string;
  ttl?: string;
  activeKey?: string;
}

export interface DAGStep {
  id: string;
  phase: number;
  stepNumber: string;
  operation: string;
  system: string;
  status: 'VERIFIED_COMPLETE' | 'EVIDENCE_GAP' | 'RISK_RESOLVED' | 'PENDING_APPROVAL' | 'EXECUTED' | 'BLOCKED' | 'QUEUED';
  proofId?: string;
  description?: string;
}

export interface EvidenceArtifact {
  id: string;
  filename: string;
  system: string;
  status: 'EVIDENCE_GAP' | 'VERIFIED_COMPLETE' | 'CHECKSUM_MISMATCH';
  description: string;
  sha256: string;
  blake3?: string;
  size: string;
  parser: string;
  caseRef: string;
  caseSubject: string;
  findingNotice: string;
  timestamp: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  category: 'STRICT ENFORCEMENT' | 'STATUTORY EXCEPTION' | 'VOLATILE STATE' | 'STREAM CDC';
  targetCategory: string;
  treatment: string;
  maxSla: string;
  requiredPrimitives: string[];
  planes: string;
  statutoryBasis?: string;
  holdPeriod?: string;
}

export interface SchemaValidationRow {
  rowNumber: number;
  caseId: string;
  type: 'MISSING_EVIDENCE' | 'SYNTAX_ERROR' | 'STATUTORY_HOLD';
  field: string;
  errorDetail: string;
  payload?: string;
  resolved: boolean;
}
