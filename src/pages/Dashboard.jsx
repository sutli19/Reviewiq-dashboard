import React from "react";
import { Link } from "react-router-dom";
import { MessageSquareText, HeartPulse, AlertTriangle, Clock } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

import BrandHealthRing from "../components/common/BrandHealthRing.jsx";
import KPICard from "../components/common/KPICard.jsx";
import FloatingInsightsPanel from "../components/common/FloatingInsightsPanel.jsx";
import SentimentTrendChart from "../components/charts/SentimentTrendChart.jsx";

import { platforms } from "../data/platforms.js";
import { sentimentTrend } from "../data/sentimentTrend.js";
import { alerts } from "../data/alerts.js";

export default function Dashboard() {
  const totalReviews = platforms.reduce((sum, p) => sum + p.totalReviews, 0);

  const latestScore = sentimentTrend[sentimentTrend.length - 1].score;
  const firstScore = sentimentTrend[0].score;
  const sentimentDelta = latestScore - firstScore;

  const totalReviewsSpark = sentimentTrend.map((d) => d.positive + d.neutral + d.negative);
  const sentimentSpark = sentimentTrend.map((d) => d.score);
  const alertsSpark = sentimentTrend.map((d) => Math.round(d.negative / 10));
  const responseTimeSpark = [9.1, 8.6, 8.4, 7.9, 7.5, 7.0, 6.4];

  const highSeverityCount = alerts.filter((a) => a.severity === "high").length;
  const heroSparkData = sentimentTrend.map((d) => ({ date: d.date, score: d.score }));

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative rounded-3xl glass shadow-card p-8 lg:p-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full opacity-30 animate-drift"
          style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full opacity-25 animate-drift"
          style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <BrandHealthRing score={latestScore} delta={sentimentDelta} deltaLabel="vs last week" />

          <div className="flex-1 w-full text-center lg:text-left">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              Brand Health
            </p>
            <h1 className="font-display text-2xl lg:text-[28px] font-semibold text-textPrimary leading-snug mb-3 max-w-xl mx-auto lg:mx-0">
              Sentiment is climbing back after the packaging dip — up {sentimentDelta} points since last week.
            </h1>
            <p className="text-textSecondary text-sm mb-6">
              Across {totalReviews.toLocaleString()} reviews from 5 platforms in the last 30 days.
            </p>

            <div className="h-14 w-full max-w-md mx-auto lg:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={heroSparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fill="url(#heroSpark)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* KPI ROW */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          icon={MessageSquareText}
          label="Total Reviews"
          value={totalReviews.toLocaleString()}
          delta="+8.2%"
          deltaPositive
          sparklineData={totalReviewsSpark}
          accent="primary"
        />
        <KPICard
          icon={HeartPulse}
          label="Avg Sentiment"
          value={latestScore}
          delta={`+${sentimentDelta} pts`}
          deltaPositive
          sparklineData={sentimentSpark}
          accent="accent"
        />
        <KPICard
          icon={AlertTriangle}
          label="Open Alerts"
          value={alerts.length}
          delta={`${highSeverityCount} high priority`}
          deltaPositive={false}
          sparklineData={alertsSpark}
          accent="warning"
        />
        <KPICard
          icon={Clock}
          label="Avg Response Time"
          value="6.4h"
          delta="-1.2h"
          deltaPositive
          sparklineData={responseTimeSpark}
          accent="success"
        />
      </section>

      {/* TREND + AI INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 glass rounded-3xl shadow-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-textPrimary">
                Sentiment Trend
              </h2>
              <p className="text-textSecondary text-sm">Last 30 days across all platforms</p>
            </div>
            <span className="font-mono text-xs text-textSecondary bg-white/5 px-3 py-1 rounded-full border border-border-subtle">
              30D
            </span>
          </div>
          <div className="flex-1 min-h-[260px]">
            <SentimentTrendChart />
          </div>
        </div>

        <div className="lg:-mt-6">
          <FloatingInsightsPanel />
        </div>
      </section>

      {/* PLATFORM BREAKDOWN + TOP ALERTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl shadow-card p-6">
          <h2 className="font-display text-lg font-semibold text-textPrimary mb-5">
            Platform Breakdown
          </h2>
          <div className="space-y-4">
            {platforms.map((p) => {
              const pct = Math.round((p.totalReviews / totalReviews) * 100);
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-textPrimary font-medium">{p.name}</span>
                    <span className="font-mono text-textSecondary text-xs">
                      {p.totalReviews.toLocaleString()} · {pct}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${p.color}, ${p.color}99)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={16} className="text-warning" />
            <h2 className="font-display text-lg font-semibold text-textPrimary">Top Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((a) => (
              <Link
                key={a.id}
                to="/reviews"
                className={`block rounded-xl p-4 bg-white/[0.03] hover:bg-white/[0.06] border-l-4 transition-all duration-200 hover:-translate-y-0.5 ${
                  a.severity === "high" ? "border-danger" : "border-warning"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-textPrimary leading-snug">{a.title}</p>
                  <span className="text-xs font-mono text-textSecondary shrink-0">
                    {a.reviewCount}
                  </span>
                </div>
                <p className="text-xs text-textSecondary leading-relaxed">{a.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}