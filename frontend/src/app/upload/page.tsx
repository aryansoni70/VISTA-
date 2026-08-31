"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";
import AnalysisProgress from "@/components/AnalysisProgress";
import type { AnalysisStep } from "@/lib/types";

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<AnalysisStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateStep = (stepId: string, updates: Partial<AnalysisStep>) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, ...updates } : s))
    );
  };

  const handleFileSelected = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    const analysisSteps: AnalysisStep[] = [
      { id: "upload", label: "Uploading file", status: "pending" },
      { id: "hash", label: "Generating SHA-256 hash", status: "pending" },
      { id: "analyze", label: "Running AI forensic analysis", status: "pending" },
      { id: "score", label: "Computing Reality Score", status: "pending" },
      { id: "blockchain", label: "Recording on blockchain", status: "pending" },
      { id: "certificate", label: "Generating certificate", status: "pending" },
    ];
    setSteps(analysisSteps);

    try {
      // Step 1: Upload file
      updateStep("upload", { status: "running" });
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const uploadData = await uploadRes.json();
      updateStep("upload", { status: "completed", detail: file.name });
      updateStep("hash", { status: "completed", detail: uploadData.content_hash.slice(0, 16) + "..." });

      // Step 2: Run AI analysis
      updateStep("analyze", { status: "running" });
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verification_id: uploadData.verification_id }),
      });

      if (!analyzeRes.ok) {
        const err = await analyzeRes.json();
        throw new Error(err.error || "Analysis failed");
      }

      const analysisData = await analyzeRes.json();
      updateStep("analyze", { status: "completed" });
      updateStep("score", { status: "completed", detail: `Score: ${analysisData.reality_score}%` });

      // Step 3: Record on blockchain
      updateStep("blockchain", { status: "running" });
      const blockchainRes = await fetch("/api/blockchain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verification_id: uploadData.verification_id,
        }),
      });

      const blockchainData = await blockchainRes.json();
      if (blockchainData.success) {
        updateStep("blockchain", { status: "completed", detail: "Tx confirmed" });
      } else {
        updateStep("blockchain", { status: "completed", detail: "Simulated (no wallet configured)" });
      }

      // Step 4: Certificate ready
      updateStep("certificate", { status: "completed" });

      // Navigate to analysis results
      setTimeout(() => {
        router.push(`/analysis/${uploadData.verification_id}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      // Mark current running step as error
      setSteps((prev) =>
        prev.map((s) =>
          s.status === "running" ? { ...s, status: "error" } : s
        )
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-enter bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Verify Digital Content
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Upload a video, image, or audio file. Our AI forensic engine will
            analyze it and generate a blockchain-backed authenticity certificate.
          </p>
        </div>

        {/* Upload Area */}
        {!isProcessing && (
          <FileUploader
            onFileSelected={handleFileSelected}
            isUploading={isProcessing}
          />
        )}

        {/* Analysis Progress */}
        {isProcessing && steps.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
                Verification in Progress
              </h2>
              <AnalysisProgress steps={steps} />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsProcessing(false);
                setSteps([]);
              }}
              className="mt-2 text-xs text-red-500 underline underline-offset-2 hover:text-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Info cards - Layers */}
        {!isProcessing && (
          <div className="mt-12 border-t border-gray-200 pt-10">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">How verification works</h3>
              <p className="text-sm text-gray-500 mt-1">Our 6-layer architecture ensures true authenticity.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/learn-more" className="group bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-[#0F7642] hover:shadow-md transition-all text-left">
                <p className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">🔍</p>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">1. Multimodal AI</h4>
                <p className="text-xs text-gray-500">Analyzes video, audio, and metadata simultaneously.</p>
              </Link>
              <Link href="/learn-more" className="group bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-[#0F7642] hover:shadow-md transition-all text-left">
                <p className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">🧠</p>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">2. Forensic Core</h4>
                <p className="text-xs text-gray-500">Combines signals into a single Reality Score.</p>
              </Link>
              <Link href="/learn-more" className="group bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-[#0F7642] hover:shadow-md transition-all text-left">
                <p className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">🔐</p>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">3. Hash Fingerprint</h4>
                <p className="text-xs text-gray-500">Creates a strict digital fingerprint of the exact file.</p>
              </Link>
              <Link href="/learn-more" className="group bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-[#0F7642] hover:shadow-md transition-all text-left">
                <p className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">⛓️</p>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">4. Blockchain</h4>
                <p className="text-xs text-gray-500">Preserves the tamper-resistant verification proof forever.</p>
              </Link>
            </div>
            <div className="text-center mt-6">
              <Link href="/learn-more" className="inline-flex items-center gap-2 text-sm text-[#0F7642] font-semibold hover:underline bg-[#E6F4EA] px-4 py-2 rounded-full transition-colors hover:bg-green-100">
                View all 6 layers in detail
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
