"use client";

import { getPolygonscanUrl } from "@/lib/blockchain";

interface BlockchainProofProps {
  txHash: string | null;
  status: "pending" | "confirmed" | "failed";
  verificationId: string;
  contentHash: string;
}

export default function BlockchainProof({
  txHash,
  status,
  verificationId,
  contentHash,
}: BlockchainProofProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90">Blockchain Verification</h3>
          <p className="text-xs text-white/40">Polygon Amoy Testnet</p>
        </div>

        {/* Status badge */}
        <div className="ml-auto">
          {status === "confirmed" ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Verified
            </span>
          ) : status === "pending" ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Pending
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              Failed
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <ProofRow label="Verification ID" value={verificationId} />
        <ProofRow label="Content Hash" value={contentHash} isMono />
        {txHash && (
          <div>
            <p className="text-xs text-white/40 mb-1">Transaction Hash</p>
            <a
              href={getPolygonscanUrl(txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2 break-all"
            >
              {txHash}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ProofRow({
  label,
  value,
  isMono = false,
}: {
  label: string;
  value: string;
  isMono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className={`text-sm text-white/70 break-all ${isMono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}
