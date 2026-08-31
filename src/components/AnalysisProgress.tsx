"use client";

import type { AnalysisStep } from "@/lib/types";

interface AnalysisProgressProps {
  steps: AnalysisStep[];
}

export default function AnalysisProgress({ steps }: AnalysisProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4">
            {/* Step indicator */}
            <div className="relative flex items-center justify-center">
              {step.status === "completed" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4EA] text-[#0F7642] border border-[#0F7642]/30 shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : step.status === "running" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0F7642]/50">
                  <div className="h-4 w-4 rounded-full border-2 border-[#0F7642]/30 border-t-[#0F7642] animate-spin" />
                </div>
              ) : step.status === "error" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-200 shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 text-xs font-bold bg-gray-50">
                  {index + 1}
                </div>
              )}

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-8 left-1/2 w-px h-3 -translate-x-1/2 ${
                    step.status === "completed"
                      ? "bg-[#0F7642]/30"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Step label */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-bold ${
                  step.status === "completed"
                    ? "text-gray-900"
                    : step.status === "running"
                    ? "text-[#0F7642]"
                    : step.status === "error"
                    ? "text-red-600"
                    : "text-gray-400 font-medium"
                }`}
              >
                {step.label}
              </p>
              {step.detail && (
                <p className="text-xs text-gray-500 mt-0.5 truncate font-medium">{step.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
