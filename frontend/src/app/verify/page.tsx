"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VerificationForm from "@/components/VerificationForm";
import type { Verification, VerdictCode } from "@/lib/types";
import { getVerdictBgClass, formatFileSize, getVerdictColor } from "@/lib/types";

function VerifyContent() {
  const searchParams = useSearchParams();
  const prefillId = searchParams.get("id") || "";

  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    verification: Verification | null;
    hashMatch?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-verify if ID is in URL
  useEffect(() => {
    if (prefillId) {
      handleVerify(prefillId);
    }
  }, [prefillId]);

  const handleVerify = async (verificationId: string, file?: File) => {
    setIsVerifying(true);
    setError(null);
    setResult(null);

    try {
      let url = `/api/verify?id=${encodeURIComponent(verificationId)}`;

      if (file) {
        // If file provided, compute hash client-side and include it
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        url += `&hash=${hash}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="page-enter bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm text-green-700 font-medium mb-6 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Open Verification
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Public Verification
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Enter a Verification ID to independently verify a content authenticity record.
            Optionally re-upload the file to confirm the hash matches.
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
          <VerificationForm onVerify={handleVerify} isVerifying={isVerifying} />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 mb-8 shadow-sm">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {result.found && result.verification ? (
              <>
                {/* Hash Match/Mismatch Banner */}
                {result.hashMatch !== undefined && (
                  <div
                    className={`rounded-xl border p-5 text-center shadow-sm ${
                      result.hashMatch
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <p className={`text-2xl font-bold mb-2 ${result.hashMatch ? "text-green-700" : "text-red-700"}`}>
                      {result.hashMatch ? "✓ Content Matches" : "⚠ Content Modified"}
                    </p>
                    <p className={`text-sm font-medium ${result.hashMatch ? "text-green-600" : "text-red-600"}`}>
                      {result.hashMatch
                        ? "The uploaded file produces the same hash as the verified content."
                        : "The uploaded file produces a different hash — the content has been modified since verification."}
                    </p>
                  </div>
                )}

                {/* Verification Details */}
                <div className="bg-white rounded-2xl p-8 space-y-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-bold text-gray-900">Verification Record</h3>
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold ${getVerdictBgClass(
                        result.verification.verdict as VerdictCode
                      )}`}
                    >
                      {result.verification.verdict_label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Detail label="Verification ID" value={result.verification.verification_id} />
                    <Detail label="File Name" value={result.verification.file_name} />
                    <Detail
                      label="Reality Score"
                      value={
                        <span
                          className="text-xl font-bold"
                          style={{ color: getVerdictColor(result.verification.verdict as VerdictCode) }}
                        >
                          {result.verification.reality_score}%
                        </span>
                      }
                    />
                    <Detail label="File Type" value={result.verification.file_type.toUpperCase()} />
                    <Detail label="File Size" value={formatFileSize(result.verification.file_size)} />
                    <Detail
                      label="Verified At"
                      value={new Date(result.verification.created_at).toLocaleString()}
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Content Hash (SHA-256)</p>
                    <p className="font-mono text-xs text-gray-600 break-all bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                      {result.verification.content_hash}
                    </p>
                  </div>

                  {result.verification.blockchain_tx_hash && (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Blockchain Transaction</p>
                      <a
                         href={`https://amoy.polygonscan.com/tx/${result.verification.blockchain_tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#0F7642] hover:text-[#0b5e34] underline underline-offset-2 break-all"
                      >
                        {result.verification.blockchain_tx_hash}
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
                <p className="text-amber-500 font-bold text-lg mb-2">❌ Not Found</p>
                <p className="text-gray-500 text-sm">
                  No verification record found for this ID. Please check the ID and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-12 w-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
