export interface VerificationRecord {
  id?: number;
  verification_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  content_hash: string;
  status?: string;
  reality_score?: number | null;
  verdict?: string | null;
  verdict_label?: string | null;
  analysis_results?: string | null;
  blockchain_tx_hash?: string | null;
  blockchain_status?: string | null;
  created_at?: string;
}

// Global in-memory store for Vercel Serverless environment
const db = new Map<string, VerificationRecord>();

export function createVerification(data: VerificationRecord) {
  const record = {
    ...data,
    status: data.status || "pending",
    reality_score: data.reality_score || null,
    verdict: data.verdict || null,
    verdict_label: data.verdict_label || null,
    analysis_results: data.analysis_results || null,
    blockchain_tx_hash: data.blockchain_tx_hash || null,
    blockchain_status: data.blockchain_status || null,
    created_at: new Date().toISOString()
  };
  db.set(data.verification_id, record);
  return { lastInsertRowid: data.verification_id };
}

export function getVerificationByVerificationId(verificationId: string): VerificationRecord | undefined {
  return db.get(verificationId);
}

export function updateVerificationAnalysis(verificationId: string, data: Partial<VerificationRecord>) {
  const record = db.get(verificationId);
  if (record) {
    db.set(verificationId, { ...record, ...data });
  }
}

export function updateBlockchainStatus(verificationId: string, txHash: string, status: string) {
  const record = db.get(verificationId);
  if (record) {
    db.set(verificationId, { ...record, blockchain_tx_hash: txHash, blockchain_status: status });
  }
}

export function getAllVerifications(limit: number = 50): VerificationRecord[] {
  const all = Array.from(db.values()).sort((a, b) => {
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });
  return all.slice(0, limit);
}
