import React, { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, Minus, Send, Check } from "lucide-react";
import { topics } from "../data/topics.js";
import { recommendations } from "../data/recommendations.js";

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const priorityColor = {
  high: "text-danger bg-danger/10",
  medium: "text-warning bg-warning/10",
  low: "text-success bg-success/10",
};

export default function AIInsights() {
  const [sentIds, setSentIds] = useState([]);

  const topTopic = topics[0];
  const summary = `Across all platforms, "${topTopic.name}" is the most discussed topic this month, making up ${topTopic.percentage}% of flagged reviews. ${recommendations[0]?.title} is the top recommended action to address recurring complaints.`;

  const handleSend = (id) => {
    setSentIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <h2 className="font-display text-lg font-semibold text-textPrimary">What's happening</h2>
        </div>
        <p className="text-textSecondary text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Topic clusters */}
      <div>
        <h2 className="font-display text-lg font-semibold text-textPrimary mb-4">Topic Clusters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((t) => {
            const Trend = trendIcon[t.trend] || Minus;
            const total = t.sentiment.positive + t.sentiment.neutral + t.sentiment.negative;
            return (
              <div
                key={t.id}
                className="glass rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-textPrimary text-sm">{t.name}</p>
                  <Trend size={15} className="text-textSecondary" />
                </div>
                <p className="text-2xl font-mono font-semibold text-textPrimary mb-1">
                  {t.percentage}%
                </p>
                <p className="text-xs text-textMuted mb-3">{t.reviewCount} reviews</p>

                <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/5">
                  <div
                    className="bg-success"
                    style={{ width: `${(t.sentiment.positive / total) * 100}%` }}
                  />
                  <div
                    className="bg-warning"
                    style={{ width: `${(t.sentiment.neutral / total) * 100}%` }}
                  />
                  <div
                    className="bg-danger"
                    style={{ width: `${(t.sentiment.negative / total) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="font-display text-lg font-semibold text-textPrimary mb-4">
          Recommendations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const sent = sentIds.includes(rec.id);
            return (
              <div key={rec.id} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${priorityColor[rec.priority]}`}
                  >
                    {rec.priority} priority
                  </span>
                  <span className="text-xs text-textMuted capitalize">{rec.relatedTopic}</span>
                </div>
                <p className="font-medium text-textPrimary text-sm mb-1.5">{rec.title}</p>
                <p className="text-textSecondary text-sm leading-relaxed mb-3">{rec.description}</p>
                <div className="bg-white/5 border-l-2 border-accent rounded-lg px-3 py-2 mb-4">
                  <p className="text-xs text-textSecondary">
                    <span className="text-accent font-medium">Suggested: </span>
                    {rec.suggestedAction}
                  </p>
                </div>
                <button
                  onClick={() => handleSend(rec.id)}
                  disabled={sent}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl transition-colors ${
                    sent
                      ? "bg-success/10 text-success cursor-default"
                      : "bg-primary/10 text-primary-glow hover:bg-primary/20"
                  }`}
                >
                  {sent ? <Check size={14} /> : <Send size={14} />}
                  {sent ? "Sent to Action Center" : "Send to Action Center"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}