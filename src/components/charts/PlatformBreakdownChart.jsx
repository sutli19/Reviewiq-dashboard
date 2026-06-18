import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { platforms } from "../../data/platforms.js";

function GlassTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-card text-xs">
      <p className="text-textPrimary font-medium mb-1">{d.name}</p>
      <p className="text-textSecondary font-mono">{d.totalReviews.toLocaleString()} reviews</p>
      <p className="text-textSecondary font-mono">
        Avg rating: <span className="text-warning">{d.avgRating}</span>
      </p>
    </div>
  );
}

export default function PlatformBreakdownChart({ data = platforms }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
        barCategoryGap={18}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#8D96AC", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={80}
        />
        <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="totalReviews" radius={[0, 8, 8, 0]} barSize={16} isAnimationActive={true}>
          {data.map((p) => (
            <Cell key={p.id} fill={p.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}