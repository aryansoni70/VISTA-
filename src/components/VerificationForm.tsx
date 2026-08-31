"use client";

import { useState } from "react";

interface VerificationFormProps {
  onVerify: (verificationId: string, file?: File) => void;
  isVerifying?: boolean;
}

export default function VerificationForm({ onVerify, isVerifying = false }: VerificationFormProps) {
  const [verificationId, setVerificationId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationId.trim()) return;
    onVerify(verificationId.trim(), file || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
      {/* Verification ID Input */}
      <div>
        <label htmlFor="verification-id" className="block text-sm font-bold text-gray-700 mb-2">
          Verification ID
        </label>
        <div className="relative">
          <input
            id="verification-id"
            type="text"
            value={verificationId}
            onChange={(e) => setVerificationId(e.target.value)}
            placeholder="POR-2026-00124"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 font-mono placeholder:text-gray-400 focus:outline-none focus:border-[#0F7642] focus:ring-1 focus:ring-[#0F7642] transition-all shadow-sm"
            disabled={isVerifying}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      {/* Optional file upload for hash comparison */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Re-upload File <span className="text-gray-400 font-normal">(optional — for hash comparison)</span>
        </label>
        <label
          htmlFor="verify-file"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-pointer hover:bg-white hover:border-[#0F7642]/50 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {file ? (
            <span className="text-gray-900 font-medium">{file.name}</span>
          ) : (
            "Upload file to verify hash match"
          )}
          <input
            id="verify-file"
            type="file"
            className="hidden"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            disabled={isVerifying}
          />
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!verificationId.trim() || isVerifying}
        className="w-full rounded-xl bg-[#0F7642] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#0b5e34] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isVerifying ? (
          <span className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Verifying...
          </span>
        ) : (
          "Verify Authenticity"
        )}
      </button>
    </form>
  );
}
