import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { alerts } from "../../data/alerts.js";
import { recommendations } from "../../data/recommendations.js";

const insights = [
  `${alerts.filter((a) => a.severity === "high").length} high-severity alerts need attention — starting with "${alerts[0]?.title}".`,
  `${recommendations[0]?.title}. ${recommendations[0]?.suggestedAction}.`,
  `${recommendations[1]?.title}. ${recommendations[1]?.suggestedAction}.`,
  `Packaging complaints are trending up — review the latest Amazon shipments.`,
];

export default function FloatingInsightsPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full">
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary via-accent to-primary opacity-40 blur-[2px]" />

      <div className="relative h-full flex flex-col justify-between rounded-3xl bg-panel/90 backdrop-blur-xl p-6 shadow-glow-accent">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-display text-sm font-semibold text-textPrimary">
                AI Insights
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] font-mono text-textSecondary">Live</span>
            </div>
          </div>

          <div key={index} className="animate-fadeUp min-h-[80px]">
            <p className="text-textPrimary text-sm leading-relaxed">{insights[index]}</p>
          </div>

          <div className="flex gap-1.5 mt-4">
            {insights.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        <Link
          to="/insights"
          className="group flex items-center gap-1.5 text-sm font-medium text-primary-glow hover:text-accent transition-colors mt-6"
        >
          View full insights
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}