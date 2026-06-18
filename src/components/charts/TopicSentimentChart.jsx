import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { topics } from "../../data/topics.js";

function GlassTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-card text-xs">
      <p className="text-textPrimary font-medium mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="font-mono" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function TopicSentimentChart({ data = topics }) {
  const chartData = data.map((t) => ({
    name: t.name,
    positive: t.sentiment.positive,
    neutral: t.sentiment.neutral,
    negative: t.sentiment.negative,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
        barCategoryGap={16}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#8D96AC", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="positive" name="Positive" stackId="sentiment" fill="#34D399" barSize={14} />
        <Bar dataKey="neutral" name="Neutral" stackId="sentiment" fill="#FBBF24" barSize={14} />
        <Bar
          dataKey="negative"
          name="Negative"
          stackId="sentiment"
          fill="#F87171"
          radius={[0, 8, 8, 0]}
          barSize={14}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}