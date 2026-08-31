"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Verification, VerdictCode } from "@/lib/types";
import { getVerdictBgClass, formatFileSize } from "@/lib/types";

export default function HistoryPage() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/verify?list=true");
        if (res.ok) {
          const data = await res.json();
          setVerifications(data.verifications || []);
        }
      } catch {
        // Silent error
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-enter bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verification History</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              {verifications.length} verification{verifications.length !== 1 ? "s" : ""} recorded
            </p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-2 rounded-lg bg-[#0F7642] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b5e34] transition-all"
          >
            + New Verification
          </Link>
        </div>

        {verifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-gray-600 mb-2 font-medium">No verifications yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Upload content to generate your first verification certificate
            </p>
            <Link
              href="/upload"
              className="text-[#0F7642] text-sm font-semibold hover:underline underline-offset-2"
            >
              Get started →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {verifications.map((v) => (
              <Link
                key={v.verification_id}
                href={`/analysis/${v.verification_id}`}
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-[#0F7642]/40 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-lg border border-gray-100 shrink-0">
                      {v.file_type === "video" ? "🎬" : v.file_type === "image" ? "🖼️" : v.file_type === "audio" ? "🎵" : "📄"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#0F7642] transition-colors">
                        {v.file_name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {v.verification_id} • {formatFileSize(v.file_size)} • {new Date(v.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold tabular-nums text-gray-900">
                        {v.reality_score}%
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full border text-[10px] font-bold whitespace-nowrap ${getVerdictBgClass(
                        v.verdict as VerdictCode
                      )}`}
                    >
                      {v.verdict_label}
                    </span>
                    {v.blockchain_tx_hash ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F7642] shrink-0" title="Blockchain verified" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" title="Not on blockchain" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
