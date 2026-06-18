import React from "react";
import { Star } from "lucide-react";
import { platforms } from "../../data/platforms.js";

const sentimentColor = {
  positive: "text-success bg-success/10",
  neutral: "text-warning bg-warning/10",
  negative: "text-danger bg-danger/10",
};

const statusColor = {
  open: "text-danger bg-danger/10",
  "in-progress": "text-warning bg-warning/10",
  resolved: "text-success bg-success/10",
};

export default function ReviewCard({ review }) {
  const platform = platforms.find((p) => p.id === review.platform);

  return (
    <div className="glass rounded-2xl p-5 transition-all duration-200 hover:border-border-strong hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platform?.color }} />
          <span className="text-sm font-medium text-textPrimary">{review.customerName}</span>
          <span className="text-xs text-textMuted">on {platform?.name}</span>
        </div>
        <span className="text-xs font-mono text-textMuted">{review.date}</span>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < review.rating ? "fill-warning text-warning" : "text-textMuted"}
          />
        ))}
      </div>

      <p className="text-sm text-textSecondary leading-relaxed mb-3">{review.reviewText}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${sentimentColor[review.sentiment]}`}
        >
          {review.sentiment}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColor[review.status]}`}
        >
          {review.status.replace("-", " ")}
        </span>
        {review.topics.map((t) => (
          <span
            key={t}
            className="text-xs text-textSecondary bg-white/5 px-2.5 py-1 rounded-full capitalize"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}