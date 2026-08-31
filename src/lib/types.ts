/**
 * Proof-of-Reality Network — TypeScript Interfaces
 */

// ──────────────────────────────────────────────
// Analysis Types
// ──────────────────────────────────────────────

export interface AnalysisMetric {
  score: number;
  label: string;
  description: string;
}

export interface AnalysisResponse {
  success: boolean;
  file_name: string;
  file_type: string;
  file_size: number;
  content_hash: string;
  reality_score: number;
  verdict: string;
  verdict_label: string;
  metrics: {
    source_authenticity: AnalysisMetric;
    device_authenticity: AnalysisMetric;
    temporal_consistency: AnalysisMetric;
    metadata_integrity: AnalysisMetric;
    ai_manipulation: AnalysisMetric;
    individual_scores: Record<string, {
      score: number;
      confidence: number;
      weight: number;
      label: string;
    }>;
  };
  analysis_details: Record<string, unknown>;
  analysis_id: string;
}

// ──────────────────────────────────────────────
// Verification Types
// ──────────────────────────────────────────────

export type VerdictCode =
  | "VERY_LIKELY_AUTHENTIC"
  | "PROBABLY_AUTHENTIC"
  | "SUSPICIOUS"
  | "LIKELY_MANIPULATED"
  | "HIGHLY_LIKELY_MANIPULATED"
  | "HIGHLY_LIKELY_AI_GENERATED"
  | "HIGH_CONFIDENCE_AUTHENTIC"; // Keep for backwards compatibility with old records

export interface Verification {
  id: number;
  verification_id: string;
  content_hash: string;
  file_name: string;
  file_type: string;
  file_size: number;
  reality_score: number;
  verdict: VerdictCode;
  verdict_label: string;
  analysis_results: string; // JSON string
  blockchain_tx_hash: string | null;
  blockchain_status: "pending" | "confirmed" | "failed";
  created_at: string;
}

// ──────────────────────────────────────────────
// Blockchain Types
// ──────────────────────────────────────────────

export interface BlockchainRecord {
  verificationId: string;
  contentHash: string;
  realityScore: number;
  verdict: string;
  timestamp: number;
  transactionHash: string;
}

export interface BlockchainRegistrationResult {
  success: boolean;
  transactionHash: string;
  blockNumber: number;
  verificationId: string;
}

// ──────────────────────────────────────────────
// Upload Types
// ──────────────────────────────────────────────

export interface UploadResponse {
  success: boolean;
  verification_id: string;
  content_hash: string;
  file_name: string;
  file_type: string;
  file_size: number;
}

// ──────────────────────────────────────────────
// Certificate Types
// ──────────────────────────────────────────────

export interface Certificate {
  verification_id: string;
  reality_score: number;
  verdict: VerdictCode;
  verdict_label: string;
  content_hash: string;
  file_name: string;
  file_type: string;
  blockchain_tx_hash: string | null;
  blockchain_verified: boolean;
  timestamp: string;
  metrics: Record<string, AnalysisMetric>;
}

// ──────────────────────────────────────────────
// Public Verification Types
// ──────────────────────────────────────────────

export interface VerificationResult {
  found: boolean;
  verification: Verification | null;
  blockchain_verified: boolean;
  hash_match?: boolean;
}

// ──────────────────────────────────────────────
// UI Helper Types
// ──────────────────────────────────────────────

export interface AnalysisStep {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "error";
  detail?: string;
}

export function getVerdictColor(verdict: VerdictCode | string): string {
  switch (verdict) {
    case "VERY_LIKELY_AUTHENTIC":
    case "HIGH_CONFIDENCE_AUTHENTIC":
      return "#0F7642"; // MagicPath Green
    case "PROBABLY_AUTHENTIC":
      return "#22c55e";
    case "SUSPICIOUS":
      return "#f59e0b";
    case "LIKELY_MANIPULATED":
      return "#f97316";
    case "HIGHLY_LIKELY_MANIPULATED":
    case "HIGHLY_LIKELY_AI_GENERATED":
      return "#ef4444";
    default:
      return "#64748b";
  }
}

export function getVerdictBgClass(verdict: VerdictCode | string): string {
  switch (verdict) {
    case "VERY_LIKELY_AUTHENTIC":
    case "HIGH_CONFIDENCE_AUTHENTIC":
      return "bg-[#E6F4EA] text-[#0F7642] border-[#0F7642]/30";
    case "PROBABLY_AUTHENTIC":
      return "bg-green-100 text-green-700 border-green-300";
    case "SUSPICIOUS":
      return "bg-amber-100 text-amber-700 border-amber-300";
    case "LIKELY_MANIPULATED":
      return "bg-orange-100 text-orange-700 border-orange-300";
    case "HIGHLY_LIKELY_MANIPULATED":
    case "HIGHLY_LIKELY_AI_GENERATED":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function generateVerificationId(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `POR-${year}-${seq}`;
}
