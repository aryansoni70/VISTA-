-- ──────────────────────────────────────────────
-- Proof-of-Reality Network — Supabase Schema
-- Run this in your Supabase SQL Editor to create the verifications table.
-- ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS verifications (
  id BIGSERIAL PRIMARY KEY,
  verification_id TEXT UNIQUE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  content_hash TEXT NOT NULL,
  file_url TEXT,                          -- Vercel Blob URL
  status TEXT DEFAULT 'pending',
  reality_score REAL,
  verdict TEXT,
  verdict_label TEXT,
  analysis_results JSONB,
  blockchain_tx_hash TEXT,
  blockchain_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by verification_id
CREATE INDEX IF NOT EXISTS idx_verifications_verification_id
  ON verifications (verification_id);

-- Index for listing by creation time
CREATE INDEX IF NOT EXISTS idx_verifications_created_at
  ON verifications (created_at DESC);

-- Row Level Security (optional but recommended)
-- For now, allow full access via service role key
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations via service role"
  ON verifications
  FOR ALL
  USING (true)
  WITH CHECK (true);
