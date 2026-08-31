"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import RealityScore from "@/components/RealityScore";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import BlockchainProof from "@/components/BlockchainProof";
import type { Verification, VerdictCode } from "@/lib/types";
import { formatFileSize } from "@/lib/types";

export default function AnalysisPage() {
  const params = useParams();
  const id = params.id as string;
  const [verification, setVerification] = useState<Verification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/certificate/${id}`);
        if (!res.ok) {
          throw new Error("Verification not found");
        }
        const data = await res.json();
        setVerification(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <p className="text-white/40">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 text-center max-w-md">
          <p className="text-red-400 text-lg mb-2">Verification Not Found</p>
          <p className="text-white/40 text-sm mb-6">{error || "The requested verification could not be found."}</p>
          <Link href="/upload" className="text-cyan-400 text-sm underline underline-offset-2 hover:text-cyan-300">
            Upload new content
          </Link>
        </div>
      </div>
    );
  }

  const analysisResults = JSON.parse(verification.analysis_results || "{}");
  const metrics = analysisResults.metrics || {};

  return (
    <div className="page-enter bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#0F7642] tracking-wider uppercase mb-1">Analysis Results</p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{verification.file_name}</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {verification.file_type.toUpperCase()} • {formatFileSize(verification.file_size)} • {verification.verification_id}
            </p>
          </div>
          <Link
            href={`/certificate/${verification.verification_id}`}
            className="flex items-center gap-2 rounded-lg bg-[#0F7642] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b5e34] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View Certificate
          </Link>
        </div>

        {/* Reality Score */}
        <div className="bg-white rounded-2xl p-10 mb-8 text-center border border-gray-200 shadow-sm">
          <RealityScore
            score={verification.reality_score}
            verdict={verification.verdict as VerdictCode}
            verdictLabel={verification.verdict_label}
          />
        </div>

        {/* Score Breakdown */}
        <div className="mb-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Forensic Analysis Breakdown</h2>
          <ScoreBreakdown metrics={metrics} />
        </div>

        {/* Content Hash */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Content Fingerprint (SHA-256)</h2>
          <p className="font-mono text-sm text-gray-600 break-all bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
            {verification.content_hash}
          </p>
        </div>

        {/* Blockchain Proof */}
        <div className="mb-8">
          <BlockchainProof
            txHash={verification.blockchain_tx_hash}
            status={verification.blockchain_status as "pending" | "confirmed" | "failed"}
            verificationId={verification.verification_id}
            contentHash={verification.content_hash}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/certificate/${verification.verification_id}`}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            📜 View Certificate
          </Link>
          <Link
            href="/upload"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            📤 Verify Another File
          </Link>
          <Link
            href="/history"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            📋 View History
          </Link>
        </div>
      </div>
    </div>
  );
}
