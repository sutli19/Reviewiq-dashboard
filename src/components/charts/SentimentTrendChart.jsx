import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { sentimentTrend } from "../../data/sentimentTrend.js";

function GlassTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-card text-xs">
      <p className="text-textPrimary font-medium mb-1.5">{label}</p>
      <p className="text-textSecondary font-mono">
        Score: <span className="text-accent">{d.score}</span>
      </p>
      <div className="flex gap-3 mt-1.5 font-mono text-[11px]">
        <span className="text-success">+{d.positive}</span>
        <span className="text-warning">~{d.neutral}</span>
        <span className="text-danger">-{d.negative}</span>
      </div>
    </div>
  );
}

export default function SentimentTrendChart({ data = sentimentTrend }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="sentimentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

        <XAxis
          dataKey="date"
          tick={{ fill: "#8D96AC", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#8D96AC", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={32}
        />

        <Tooltip content={<GlassTooltip />} cursor={{ stroke: "rgba(255,255,255,0.12)" }} />

        <Area
          type="monotone"
          dataKey="score"
          stroke="#22D3EE"
          strokeWidth={2.5}
          fill="url(#sentimentFill)"
          isAnimationActive={true}
          animationDuration={900}
          activeDot={{ r: 5, fill: "#22D3EE", stroke: "#0D111B", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}