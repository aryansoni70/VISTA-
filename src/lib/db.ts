export interface VerificationRecord {
  id?: number;
  verification_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  content_hash: string;
  status: string;
  reality_score: number | null;
  verdict: string | null;
  verdict_label: string | null;
  analysis_results: string | null;
  blockchain_tx: string | null;
  created_at?: string;
}

// Global in-memory store for Vercel Serverless environment
const db = new Map<string, VerificationRecord>();

export function createVerification(data: VerificationRecord) {
  const record = {
    ...data,
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

export function updateVerificationBlockchain(verificationId: string, txHash: string) {
  const record = db.get(verificationId);
  if (record) {
    db.set(verificationId, { ...record, blockchain_tx: txHash, status: "completed" });
  }
}

export function getAllVerifications(): VerificationRecord[] {
  return Array.from(db.values()).sort((a, b) => {
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });
}
