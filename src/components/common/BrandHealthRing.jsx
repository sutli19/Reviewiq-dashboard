import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function BrandHealthRing({
  score = 0,
  delta = 0,
  deltaLabel = "vs last week",
  size = 200,
  label = "Brand Health",
}) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const clamped = Math.min(Math.max(score, 0), 100);
    const targetOffset = circumference - (circumference * clamped) / 100;
    const timeout = setTimeout(() => setAnimatedOffset(targetOffset), 150);
    return () => clearTimeout(timeout);
  }, [score, circumference]);

  const isPositive = delta >= 0;

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Glow halo */}
      <div
        className="absolute inset-0 m-auto rounded-full animate-drift"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Ring */}
      <svg width={size} height={size} className="relative -rotate-90">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="55%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-semibold text-textPrimary leading-none"
          style={{ fontSize: size * 0.26 }}
        >
          {Math.round(score)}
        </span>
        <span className="text-textMuted text-xs font-mono mt-1">/ 100</span>
        <span className="text-textSecondary text-xs mt-2 tracking-wide">
          {label}
        </span>

        <div
          className={`flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-mono ${
            isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>
            {isPositive ? "+" : ""}
            {delta} {deltaLabel}
          </span>
        </div>
      </div>
    </div>
  );
}