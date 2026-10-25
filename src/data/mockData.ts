import { AuditCase, EvidenceArtifact, TargetSystem, DAGStep, PolicyRule, SchemaValidationRow } from '../types/ghosttrace';

export const INITIAL_CASES: AuditCase[] = [
  {
    id: '#GT-9482',
    subjectId: 'usr_8829_eu',
    regulation: 'GDPR ART. 17',
    title: 'Comprehensive Erasure Protocol',
    region: 'EU-Central',
    vendorReported: 'COMPLETE',
    forensicProof: 'VERIFIED COMPLETE',
    evidenceRatio: '5/5',
    provenPercent: 100,
    systems: ['Postgres', 'Stripe', 'BigQuery', 'Zendesk', 'Segment'],
    actions: ['VERIFY_RECORD_ABSENT', 'VERIFY_DATA_FLOW_DISABLED'],
    timeAgo: '2m ago',
    details: {
      email: 'a.***@berlin-telecom.de',
      accountCreated: '2020-03-11',
      timestamp: '2025-02-18 14:28:10Z',
      slaRemaining: 'Done (44h under SLA)',
    }
  },
  {
    id: '#GT-9483',
    subjectId: 'usr_3910_ca',
    regulation: 'CCPA OPT-OUT',
    title: 'Opt-Out & Target Deletion',
    region: 'US-West',
    vendorReported: 'COMPLETE',
    forensicProof: 'INCOMPLETE',
    evidenceRatio: '4/5',
    provenPercent: 80,
    systems: ['Postgres', 'Stripe', 'Snowflake', 'Segment', 'Redis'],
    actions: ['REPORT_REMAINING_RECORD', 'REDACT_RECORD'],
    timeAgo: '14m ago',
    hasGap: true,
    details: {
      email: 'j.***@calif-tech.io',
      accountCreated: '2021-04-12',
      timestamp: '2025-02-18 14:22:04Z',
      slaRemaining: '03h 42m to Statutory Breach',
      gapDescription: 'Redis Session Store #04 returned 0 deletion tombstone. Active key: sess:usr_3910_ca:active with 42,100s TTL.',
    }
  },
  {
    id: '#GT-9484',
    subjectId: 'usr_1029_us',
    regulation: 'VOLUNTARY',
    title: 'Account Close & Snapshot Scrubbing',
    region: 'US-East',
    vendorReported: 'INCOMPLETE',
    forensicProof: 'INCOMPLETE',
    evidenceRatio: '2/5',
    provenPercent: 40,
    systems: ['Postgres', 'AWS Backup S3 Glacier', 'Kafka', 'Mixpanel'],
    actions: ['BLOCK_RESTORE', 'VERIFY_RESTORE_BLOCKED'],
    timeAgo: '1h ago',
    hasRisk: true,
    details: {
      email: 'm.***@ny-finance.com',
      accountCreated: '2019-08-22',
      timestamp: '2025-02-18 13:40:19Z',
      slaRemaining: '22h 10m remaining',
      gapDescription: 'AWS Backup Vault cold snapshot #snap-901b still contains unpruned user shards in Glacier vault.',
    }
  },
  {
    id: '#GT-9485',
    subjectId: 'usr_7712_us',
    regulation: 'EXEMPTION',
    title: 'Regulatory Retention Lock',
    region: 'FinCEN / SEC',
    vendorReported: 'NOT_APPLICABLE',
    forensicProof: 'NOT_APPLICABLE',
    evidenceRatio: '5/5',
    provenPercent: 100,
    systems: ['Stripe Billing Ledger', 'Snowflake Tax Warehouse', 'Custody Audit DB'],
    actions: ['IMMUTABLE_LEGAL_HOLD'],
    timeAgo: '3h ago',
    isLocked: true,
    details: {
      email: 'trade.exec***@brokerage.com',
      accountCreated: '2018-01-19',
      timestamp: '2025-02-18 11:15:00Z',
      slaRemaining: 'Exempt until 2029-Q4',
      statutoryOverride: 'AML / FinCEN 5-Year Financial Transaction Log Lock active until 2029-Q4 (31 U.S.C. 5318(g)).',
    }
  },
  {
    id: '#GT-9486',
    subjectId: 'usr_4402_uk',
    regulation: 'GDPR ART. 17',
    title: 'Right to Be Forgotten Standard',
    region: 'UK-London',
    vendorReported: 'COMPLETE',
    forensicProof: 'VERIFIED COMPLETE',
    evidenceRatio: '5/5',
    provenPercent: 100,
    systems: ['Postgres Primary', 'MongoDB Archival', 'Segment', 'Zendesk'],
    actions: ['VERIFY_RECORD_ABSENT', 'EMIT_TOMBSTONE_HASH'],
    timeAgo: '5h ago',
    details: {
      email: 'r.***@oxford-research.ac.uk',
      accountCreated: '2022-09-01',
      timestamp: '2025-02-18 09:30:00Z',
      slaRemaining: 'Done (68h under SLA)',
    }
  }
];

export const TARGET_SYSTEMS_CASE_9483: TargetSystem[] = [
  {
    id: 'sys-1',
    name: 'Postgres Primary DB',
    identifier: 'pg_user_records',
    status: 'COMPLETE',
    detail: 'Tombstone Verified • Zero-Hash Leaf Rooted'
  },
  {
    id: 'sys-2',
    name: 'Stripe Billing API',
    identifier: 'cus_8492019',
    status: 'COMPLETE',
    detail: 'Redacted & Detached • Customer Object Nullified'
  },
  {
    id: 'sys-3',
    name: 'Snowflake Analytics Lake',
    identifier: 'wh_lake_events',
    status: 'COMPLETE',
    detail: 'Partition Purged • Segment Markers Truncated'
  },
  {
    id: 'sys-4',
    name: 'Segment Tracking Stream',
    identifier: 'seg_trk_live',
    status: 'COMPLETE',
    detail: 'Ingestion Disabled • Device Token Detached'
  },
  {
    id: 'sys-5',
    name: 'Redis Session Store',
    identifier: 'redis_cache_cluster_04',
    status: 'GAP DETECTED',
    detail: 'Active key found: sess:usr_3910_ca:active',
    activeKey: 'sess:usr_3910_ca:active',
    ttl: '42,100s'
  }
];

export const ORCHESTRATION_DAG_STEPS: DAGStep[] = [
  {
    id: 'dag-1',
    phase: 1,
    stepNumber: '01',
    operation: 'VERIFY_RECORD_ABSENT',
    system: 'pg_user_records',
    status: 'VERIFIED_COMPLETE',
    proofId: '#EVD-8812 (Null-Hash)'
  },
  {
    id: 'dag-2',
    phase: 1,
    stepNumber: '02',
    operation: 'REPORT_REMAINING_RECORD',
    system: 'redis_cache_cluster_04',
    status: 'EVIDENCE_GAP',
    proofId: '#EVD-8819',
    description: 'Redis cluster returned live active token with unexpired TTL under key sess:usr_3910_ca:active.'
  },
  {
    id: 'dag-3',
    phase: 1,
    stepNumber: '03',
    operation: 'REPORT_ACTIVE_DATA_FLOW',
    system: 'kafka_user_events',
    status: 'RISK_RESOLVED',
    proofId: '#EVD-8820 (Stream Disconnect)'
  },
  {
    id: 'dag-4',
    phase: 2,
    stepNumber: '04',
    operation: 'DELETE_RECORD',
    system: 'redis_cache_cluster_04',
    status: 'PENDING_APPROVAL',
    description: 'Target Operation: ATOMIC_DEL_KEY_WITH_ZK_CONFIRM on redis_cache_cluster_04.'
  },
  {
    id: 'dag-5',
    phase: 2,
    stepNumber: '05',
    operation: 'BLOCK_RESTORE',
    system: 'aws_s3_audit_cold',
    status: 'EXECUTED',
    proofId: '#EVD-8824 (IAM Deny Policy)'
  },
  {
    id: 'dag-6',
    phase: 3,
    stepNumber: '06',
    operation: 'VERIFY_RECORD_ABSENT',
    system: 'redis_cache_cluster_04',
    status: 'BLOCKED',
    description: 'Awaiting Step 04 Execution'
  },
  {
    id: 'dag-7',
    phase: 3,
    stepNumber: '07',
    operation: 'VERIFY_DATA_FLOW_DISABLED',
    system: 'Merkle Ledger Consensus Anchor',
    status: 'QUEUED',
    description: 'Zk-Proof Generation & Root Anchor Commit'
  }
];

export const EVIDENCE_ARTIFACTS: EvidenceArtifact[] = [
  {
    id: '#EVD-8819',
    filename: 'redis_cluster_04_dump_sess3910.rdb',
    system: 'redis_cache_cluster_04',
    status: 'EVIDENCE_GAP',
    description: 'Memory Cache Snapshot // In-Memory Session Storage (us-west-2)',
    sha256: '3b0c4424e88b901a882914fb40183204791a82f09824c9',
    blake3: 'b3_9941a021ffae721...c8110b',
    size: '1.42 MB',
    parser: 'Redis-RDB-Forensic-v2.1',
    caseRef: '#GT-9483',
    caseSubject: 'usr_3910_ca',
    findingNotice: 'Live session token unexpired in key sess:usr_3910_ca:active. Tombstone null-check failed.',
    timestamp: '2025-02-18 14:22:15Z'
  },
  {
    id: '#EVD-8812',
    filename: 'pg_tombstone_receipt_d48f28.json',
    system: 'pg_user_records',
    status: 'VERIFIED_COMPLETE',
    description: 'Relational DB Tombstone Ledger // Cryptographic Zero-Record Receipt',
    sha256: 'e871a29f8c14d9b04d021f99401ab3817492c1094d021f',
    size: '18.4 KB',
    parser: 'PostgreSQL-WAL-Auditor-v3.0',
    caseRef: '#GT-9483 & #GT-9482',
    caseSubject: 'usr_3910_ca',
    findingNotice: 'Leaf #1,842 in Merkle Tree 0x7a82...d91c. Deletion attested by DB primary commit.',
    timestamp: '2025-02-18 14:25:11Z'
  },
  {
    id: '#EVD-8824',
    filename: 's3_deny_restore_policy_snap901b.json',
    system: 'aws_s3_audit_cold',
    status: 'VERIFIED_COMPLETE',
    description: 'Cloud IAM Governance & Snapshot Vault Immutable Policy Lock',
    sha256: '4f11bc09e992cc81142fa901238914bca8817290331980',
    size: '8.2 KB',
    parser: 'CloudTrail-IAM-Validator',
    caseRef: '#GT-9484',
    caseSubject: 'usr_1029_us',
    findingNotice: 'SCP Bucket Immutability applied. S3 Glacier restoration denied for subject identifier.',
    timestamp: '2025-02-18 13:42:00Z'
  },
  {
    id: '#EVD-8831',
    filename: 'snowflake_purged_partition_manifest.parquet',
    system: 'wh_lake_events',
    status: 'CHECKSUM_MISMATCH',
    description: 'Columnar Data Warehouse Partition Log // Raw Segment Header',
    sha256: 'a1b2c3d4e5f67890123456789abcdef012345678398201',
    size: '142.8 MB',
    parser: 'Parquet-Segment-Validator-v1.4',
    caseRef: '#GT-9480',
    caseSubject: 'usr_1102_sg',
    findingNotice: 'Validation Failure: Merkle node checksum diverged at block offset 0x480. Audit proof invalid.',
    timestamp: '2025-02-18 15:02:18Z'
  }
];

export const POLICY_RULES: PolicyRule[] = [
  {
    id: '#POL-101',
    name: 'GDPR Art. 17 - Direct PII Right to Erasure',
    category: 'STRICT ENFORCEMENT',
    targetCategory: 'Direct PII (First/Last, Email, Tax IDs)',
    treatment: 'DELETE_RECORD + Tombstone Anchor',
    maxSla: '72h Strict (30d Statutory)',
    requiredPrimitives: ['VERIFY_RECORD_ABSENT', 'BLOCK_RESTORE'],
    planes: 'Postgres Primary, Mongo Customer Lake, Redis Cluster',
  },
  {
    id: '#POL-204',
    name: 'Financial & Anti-Money Laundering Hold (FinCEN)',
    category: 'STATUTORY EXCEPTION',
    targetCategory: 'Wire Transfers, KYC Dockets, Ledger Journals',
    treatment: 'NOT_APPLICABLE + Cryptographic Freeze',
    maxSla: 'Hold: 1,825 Days (5 Years)',
    requiredPrimitives: ['VERIFY_RECORD_PRESENT', 'REPORT_RESTORE_RISK'],
    planes: 'Stripe Billing Ledger, Snowflake Tax Lake',
    statutoryBasis: '31 U.S.C. 5318(g) / Bank Secrecy Act (BSA)',
    holdPeriod: '1,825 Days'
  },
  {
    id: '#POL-310',
    name: 'Ephemeral Cache & Session State Scrubbing',
    category: 'VOLATILE STATE',
    targetCategory: 'Redis Clusters, Memcached, JWT Revocation',
    treatment: 'Immediate Eviction + TTL Zero-State',
    maxSla: '< 15 Minutes Strict',
    requiredPrimitives: ['REPORT_REMAINING_RECORD', 'VERIFY_RECORD_ABSENT'],
    planes: 'Redis In-Memory, Redis Replicas',
  },
  {
    id: '#POL-415',
    name: 'Live Event Stream Detachment & Tombstoning',
    category: 'STREAM CDC',
    targetCategory: 'Kafka Topics, AWS Kinesis, Segment Ingest',
    treatment: 'DISABLE_DATA_FLOW + Merkle Leaf Commit',
    maxSla: '< 180s Threshold',
    requiredPrimitives: ['REPORT_ACTIVE_DATA_FLOW', 'VERIFY_DATA_FLOW_DISABLED'],
    planes: 'Kafka Cluster, Kinesis Shards',
  }
];

export const SCHEMA_ROWS: SchemaValidationRow[] = [
  {
    rowNumber: 142,
    caseId: '#GT-9483',
    type: 'MISSING_EVIDENCE',
    field: 'evidence_id',
    errorDetail: 'Operation DELETE_RECORD marked EXECUTED without mandatory Merkle leaf receipt or tombstone hash. Attestation blocked.',
    resolved: false
  },
  {
    rowNumber: 289,
    caseId: '#GT-9488',
    type: 'SYNTAX_ERROR',
    field: 'proof_payload',
    errorDetail: 'JSON parse failure halts automated zk-verifier ingestion. Schema validator rejected payload signature extraction.',
    payload: '{"token": "sess:9938"id:481"}',
    resolved: false
  },
  {
    rowNumber: 405,
    caseId: '#GT-9485',
    type: 'STATUTORY_HOLD',
    field: 'Status: NOT_APPLICABLE',
    errorDetail: 'Statutory 31 U.S.C. § 5318(g) Bank Secrecy AML mandatory hold precedence verified. Record deletion safely exempted without non-compliance penalty.',
    resolved: true
  }
];
