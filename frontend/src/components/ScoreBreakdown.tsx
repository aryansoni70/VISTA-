"use client";

interface ScoreMetric {
  score: number;
  label: string;
  description: string;
}

interface ScoreBreakdownProps {
  metrics: Record<string, ScoreMetric>;
}

export default function ScoreBreakdown({ metrics }: ScoreBreakdownProps) {
  const metricKeys = ["ai_manipulation", "editing_artifacts", "audio_consistency", "metadata_verification", "source_authentication"];

  const getBarColor = (score: number, isManipulation: boolean = false) => {
    const effectiveScore = isManipulation ? 100 - score : score;
    if (effectiveScore >= 90) return "from-[#0F7642] to-[#128a4d]"; // MagicPath Green
    if (effectiveScore >= 75) return "from-green-500 to-green-400";
    if (effectiveScore >= 50) return "from-amber-500 to-amber-400";
    if (effectiveScore >= 25) return "from-orange-500 to-orange-400";
    return "from-red-600 to-red-500";
  };

  const getScoreIcon = (key: string) => {
    switch (key) {
      case "source_authentication":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case "editing_artifacts":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        );
      case "audio_consistency":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        );
      case "metadata_verification":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
      case "ai_manipulation":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricKeys.map((key) => {
        const metric = metrics[key];
        if (!metric) return null;

        const isManipulation = key === "ai_manipulation";
        const displayScore = metric.score;
        const barColor = getBarColor(displayScore, isManipulation);

        return (
          <div
            key={key}
            className="group rounded-xl border border-gray-200 bg-gray-50 p-5 hover:bg-white hover:border-[#0F7642]/30 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-gray-400 group-hover:text-[#0F7642] transition-colors">
                {getScoreIcon(key)}
              </div>
              <h3 className="text-sm font-bold text-gray-900">{metric.label}</h3>
            </div>

            <div className="flex items-end justify-between mb-2">
              <span className={`text-2xl font-bold tabular-nums ${isManipulation ? (displayScore <= 10 ? "text-[#0F7642]" : displayScore <= 30 ? "text-amber-500" : "text-red-600") : (displayScore >= 90 ? "text-[#0F7642]" : displayScore >= 75 ? "text-green-500" : displayScore >= 50 ? "text-amber-500" : "text-red-600")}`}>
                {displayScore}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${displayScore}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed font-medium">
              {metric.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
