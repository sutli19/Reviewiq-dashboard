import React, { useMemo, useState } from "react";
import { Search, Star, MessageSquareOff } from "lucide-react";
import { reviews } from "../data/reviews.js";
import { platforms } from "../data/platforms.js";

const getPlatform = (id) => platforms.find((p) => p.id === id);

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

export default function ReviewExplorer() {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch =
        search.trim() === "" ||
        r.reviewText.toLowerCase().includes(search.toLowerCase()) ||
        r.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === "all" || r.platform === platformFilter;
      const matchesRating = ratingFilter === "all" || r.rating === Number(ratingFilter);
      const matchesSentiment = sentimentFilter === "all" || r.sentiment === sentimentFilter;
      return matchesSearch && matchesPlatform && matchesRating && matchesSentiment;
    });
  }, [search, platformFilter, ratingFilter, sentimentFilter]);

  const clearFilters = () => {
    setSearch("");
    setPlatformFilter("all");
    setRatingFilter("all");
    setSentimentFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5">
          <Search size={16} className="text-textMuted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reviewer or keyword..."
            className="bg-transparent text-sm text-textPrimary placeholder:text-textMuted outline-none w-full"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-white/5 border border-border-subtle rounded-xl px-3 py-2 text-sm text-textPrimary outline-none focus:border-border-strong"
          >
            <option value="all">All Platforms</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-white/5 border border-border-subtle rounded-xl px-3 py-2 text-sm text-textPrimary outline-none focus:border-border-strong"
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>

          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="bg-white/5 border border-border-subtle rounded-xl px-3 py-2 text-sm text-textPrimary outline-none focus:border-border-strong"
          >
            <option value="all">All Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <button
            onClick={clearFilters}
            className="text-sm text-textSecondary hover:text-textPrimary px-3 py-2 transition-colors"
          >
            Clear filters
          </button>

          <span className="ml-auto text-xs font-mono text-textSecondary self-center">
            {filtered.length} of {reviews.length} reviews
          </span>
        </div>
      </div>

      {/* Review list */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 flex flex-col items-center text-center">
          <MessageSquareOff size={32} className="text-textMuted mb-3" />
          <p className="text-textPrimary font-medium mb-1">No reviews match your filters</p>
          <p className="text-textSecondary text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const platform = getPlatform(r.platform);
            return (
              <div
                key={r.id}
                className="glass rounded-2xl p-5 transition-all duration-200 hover:border-border-strong hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: platform?.color }}
                    />
                    <span className="text-sm font-medium text-textPrimary">{r.customerName}</span>
                    <span className="text-xs text-textMuted">on {platform?.name}</span>
                  </div>
                  <span className="text-xs font-mono text-textMuted">{r.date}</span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < r.rating ? "fill-warning text-warning" : "text-textMuted"}
                    />
                  ))}
                </div>

                <p className="text-sm text-textSecondary leading-relaxed mb-3">{r.reviewText}</p>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${sentimentColor[r.sentiment]}`}
                  >
                    {r.sentiment}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColor[r.status]}`}
                  >
                    {r.status.replace("-", " ")}
                  </span>
                  {r.topics.map((t) => (
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
          })}
        </div>
      )}
    </div>
  );
}