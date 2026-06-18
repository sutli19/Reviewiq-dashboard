import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function KPICard({
  icon: Icon,
  label,
  value,
  delta,
  deltaPositive = true,
  sparklineData = [],
  accent = "primary",
}) {
  const chartData = sparklineData.map((v, i) => ({ i, v }));
  const trendColor = deltaPositive ? "#34D399" : "#F87171";
  const gradientId = `spark-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const accentClasses = {
    primary: "bg-primary/10 text-primary-glow",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl glass shadow-card p-6 min-h-[150px] transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-border-strong">
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accentClasses[accent] || accentClasses.primary
          }`}
        >
          {Icon && <Icon size={20} />}
        </div>

        {delta !== undefined && (
          <div className="flex items-center gap-1 text-xs font-mono" style={{ color: trendColor }}>
            {deltaPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{delta}</span>
          </div>
        )}
      </div>

      <p className="relative z-10 text-textSecondary text-sm mb-1">{label}</p>
      <p className="relative z-10 font-mono text-3xl font-semibold text-textPrimary tracking-tight">
        {value}
      </p>

      {chartData.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-12 opacity-30">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={trendColor} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={trendColor}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}