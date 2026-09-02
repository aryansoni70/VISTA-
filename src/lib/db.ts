/**
 * Database Layer — Supabase PostgreSQL
 * Replaces the previous in-memory Map() store that lost data
 * between Vercel serverless invocations.
 *
 * Uses NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 * with RLS policies that allow full access via the service role or
 * the "Allow all operations" policy set in supabase-schema.sql.
 */

import { createClient } from "@supabase/supabase-js";

// ──────────────────────────────────────────────
// Supabase Client
// ──────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️  NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY not set. Database operations will fail."
  );
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface VerificationRecord {
  id?: number;
  verification_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  content_hash: string;
  file_url?: string | null;
  status?: string;
  reality_score?: number | null;
  verdict?: string | null;
  verdict_label?: string | null;
  analysis_results?: string | null;
  blockchain_tx_hash?: string | null;
  blockchain_status?: string | null;
  created_at?: string;
}

// ──────────────────────────────────────────────
// CRUD Operations
// ──────────────────────────────────────────────

export async function createVerification(
  data: Omit<VerificationRecord, "id" | "created_at"> & { file_url?: string }
) {
  const { data: result, error } = await supabase
    .from("verifications")
    .insert({
      verification_id: data.verification_id,
      file_name: data.file_name,
      file_type: data.file_type,
      file_size: data.file_size,
      content_hash: data.content_hash,
      file_url: data.file_url || null,
      status: data.status || "pending",
      reality_score: data.reality_score || null,
      verdict: data.verdict || null,
      verdict_label: data.verdict_label || null,
      analysis_results: data.analysis_results || null,
      blockchain_tx_hash: data.blockchain_tx_hash || null,
      blockchain_status: data.blockchain_status || "pending",
    })
    .select("verification_id")
    .single();

  if (error) {
    console.error("DB createVerification error:", error);
    throw new Error(`Database insert failed: ${error.message}`);
  }

  return { lastInsertRowid: result?.verification_id };
}

export async function getVerificationByVerificationId(
  verificationId: string
): Promise<VerificationRecord | null> {
  const { data, error } = await supabase
    .from("verifications")
    .select("*")
    .eq("verification_id", verificationId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows found
      return null;
    }
    console.error("DB getVerification error:", error);
    return null;
  }

  return data as VerificationRecord;
}

export async function updateVerificationAnalysis(
  verificationId: string,
  updates: Partial<VerificationRecord>
) {
  const { error } = await supabase
    .from("verifications")
    .update({
      reality_score: updates.reality_score,
      verdict: updates.verdict,
      verdict_label: updates.verdict_label,
      analysis_results: updates.analysis_results,
      status: "completed",
    })
    .eq("verification_id", verificationId);

  if (error) {
    console.error("DB updateVerificationAnalysis error:", error);
    throw new Error(`Database update failed: ${error.message}`);
  }
}

export async function updateBlockchainStatus(
  verificationId: string,
  txHash: string,
  status: string
) {
  const { error } = await supabase
    .from("verifications")
    .update({
      blockchain_tx_hash: txHash,
      blockchain_status: status,
    })
    .eq("verification_id", verificationId);

  if (error) {
    console.error("DB updateBlockchainStatus error:", error);
    throw new Error(`Database update failed: ${error.message}`);
  }
}

export async function getAllVerifications(
  limit: number = 50
): Promise<VerificationRecord[]> {
  const { data, error } = await supabase
    .from("verifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("DB getAllVerifications error:", error);
    return [];
  }

  return (data as VerificationRecord[]) || [];
}
