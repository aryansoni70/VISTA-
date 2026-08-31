"use client";

import { useEffect, useState } from "react";
import { getVerdictColor } from "@/lib/types";
import type { VerdictCode } from "@/lib/types";

interface RealityScoreProps {
  score: number;
  verdict: VerdictCode;
  verdictLabel: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function RealityScore({
  score,
  verdict,
  verdictLabel,
  animate = true,
  size = "lg",
}: RealityScoreProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayScore(score);
      return;
    }

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * score);
      setDisplayScore(start);

      if (progress >= 1) {
        clearInterval(timer);
        setDisplayScore(score);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score, animate]);

  const color = getVerdictColor(verdict);
  const sizeConfig = {
    sm: { container: "w-32 h-32", text: "text-3xl", label: "text-xs", radius: 50, stroke: 6 },
    md: { container: "w-48 h-48", text: "text-5xl", label: "text-sm", radius: 75, stroke: 8 },
    lg: { container: "w-64 h-64", text: "text-6xl", label: "text-base", radius: 100, stroke: 10 },
  }[size];

  const circumference = 2 * Math.PI * sizeConfig.radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const svgSize = (sizeConfig.radius + sizeConfig.stroke) * 2;
  const center = sizeConfig.radius + sizeConfig.stroke;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeConfig.container} flex items-center justify-center`}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: color }}
        />

        {/* SVG Ring */}
        <svg
          width={svgSize}
          height={svgSize}
          className="absolute -rotate-90"
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        >
          {/* Background ring */}
          <circle
            cx={center}
            cy={center}
            r={sizeConfig.radius}
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth={sizeConfig.stroke}
          />
          {/* Progress ring */}
          <circle
            cx={center}
            cy={center}
            r={sizeConfig.radius}
            fill="none"
            stroke={color}
            strokeWidth={sizeConfig.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: animate ? "stroke-dashoffset 0.1s ease-out" : "none" }}
          />
        </svg>

        {/* Score text */}
        <div className="relative flex flex-col items-center z-10">
          <span className={`${sizeConfig.text} font-bold tabular-nums`} style={{ color }}>
            {displayScore}
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">
            Reality Score
          </span>
        </div>
      </div>

      {/* Verdict badge */}
      <div
        className="px-4 py-1.5 rounded-full border text-sm font-semibold"
        style={{
          borderColor: `${color}40`,
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {verdictLabel}
      </div>
    </div>
  );
}
