/**
 * SQLite Database Layer
 * Stores verification records locally for the hackathon MVP.
 *
 * Uses better-sqlite3 for synchronous, zero-config SQLite.
 */
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { Verification, generateVerificationId } from "./types";

// Database file path
const DB_PATH = path.join(process.cwd(), "data", "proof-of-reality.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    // Ensure data directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      verification_id TEXT UNIQUE NOT NULL,
      content_hash TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL DEFAULT 0,
      reality_score REAL NOT NULL DEFAULT 0,
      verdict TEXT NOT NULL DEFAULT 'PENDING',
      verdict_label TEXT NOT NULL DEFAULT 'Pending',
      analysis_results TEXT DEFAULT '{}',
      blockchain_tx_hash TEXT,
      blockchain_status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_verification_id ON verifications(verification_id);
    CREATE INDEX IF NOT EXISTS idx_content_hash ON verifications(content_hash);
    CREATE INDEX IF NOT EXISTS idx_created_at ON verifications(created_at);
  `);
}

// ──────────────────────────────────────────────
// CRUD Operations
// ──────────────────────────────────────────────

export function createVerification(data: {
  verification_id?: string;
  content_hash: string;
  file_name: string;
  file_type: string;
  file_size: number;
}): Verification {
  const database = getDb();
  const verificationId = data.verification_id || generateVerificationId();

  const stmt = database.prepare(`
    INSERT INTO verifications (verification_id, content_hash, file_name, file_type, file_size)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    verificationId,
    data.content_hash,
    data.file_name,
    data.file_type,
    data.file_size
  );

  return getVerificationById(result.lastInsertRowid as number)!;
}

export function updateVerificationAnalysis(
  verificationId: string,
  analysisData: {
    reality_score: number;
    verdict: string;
    verdict_label: string;
    analysis_results: string;
  }
): void {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE verifications 
    SET reality_score = ?, verdict = ?, verdict_label = ?, analysis_results = ?
    WHERE verification_id = ?
  `);

  stmt.run(
    analysisData.reality_score,
    analysisData.verdict,
    analysisData.verdict_label,
    analysisData.analysis_results,
    verificationId
  );
}

export function updateBlockchainStatus(
  verificationId: string,
  txHash: string,
  status: "pending" | "confirmed" | "failed"
): void {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE verifications 
    SET blockchain_tx_hash = ?, blockchain_status = ?
    WHERE verification_id = ?
  `);

  stmt.run(txHash, status, verificationId);
}

export function getVerificationById(id: number): Verification | null {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM verifications WHERE id = ?");
  return (stmt.get(id) as Verification) || null;
}

export function getVerificationByVerificationId(
  verificationId: string
): Verification | null {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM verifications WHERE verification_id = ?"
  );
  return (stmt.get(verificationId) as Verification) || null;
}

export function getVerificationByHash(contentHash: string): Verification | null {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM verifications WHERE content_hash = ? ORDER BY created_at DESC LIMIT 1"
  );
  return (stmt.get(contentHash) as Verification) || null;
}

export function getAllVerifications(limit: number = 50): Verification[] {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT * FROM verifications ORDER BY created_at DESC LIMIT ?"
  );
  return stmt.all(limit) as Verification[];
}

export function getVerificationCount(): number {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT COUNT(*) as count FROM verifications"
  );
  const result = stmt.get() as { count: number };
  return result.count;
}
