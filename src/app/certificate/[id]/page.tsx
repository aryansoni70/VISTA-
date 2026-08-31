"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Certificate from "@/components/Certificate";
import type { Verification, VerdictCode } from "@/lib/types";

export default function CertificatePage() {
  const params = useParams();
  const id = params.id as string;
  const [verification, setVerification] = useState<Verification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/certificate/${id}`);
        if (res.ok) {
          const data = await res.json();
          setVerification(data);
        }
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 text-center">
          <p className="text-red-400 mb-4">Certificate not found</p>
          <Link href="/upload" className="text-cyan-400 text-sm underline">
            Upload content to verify
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">
            Authenticity Certificate
          </h1>
          <p className="text-white/40 text-sm">
            This certificate can be independently verified by anyone
          </p>
        </div>

        <Certificate
          verificationId={verification.verification_id}
          realityScore={verification.reality_score}
          verdict={verification.verdict as VerdictCode}
          verdictLabel={verification.verdict_label}
          contentHash={verification.content_hash}
          fileName={verification.file_name}
          fileType={verification.file_type}
          blockchainTxHash={verification.blockchain_tx_hash}
          timestamp={verification.created_at}
        />

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href={`/analysis/${verification.verification_id}`}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70 hover:bg-white/10 transition-all"
          >
            📊 View Full Analysis
          </Link>
          <Link
            href={`/verify?id=${verification.verification_id}`}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70 hover:bg-white/10 transition-all"
          >
            🔍 Public Verification
          </Link>
        </div>
      </div>
    </div>
  );
}
