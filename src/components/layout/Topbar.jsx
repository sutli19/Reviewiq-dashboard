import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, User } from "lucide-react";

const pageMeta = {
  "/": { title: "Dashboard", subtitle: "Your brand's review health at a glance" },
  "/reviews": { title: "Review Explorer", subtitle: "Search and filter every review" },
  "/insights": { title: "AI Insights", subtitle: "Patterns and recommendations from your reviews" },
  "/actions": { title: "Action Center", subtitle: "Track and resolve flagged issues" },
};

export default function Topbar() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];

  return (
    <header className="sticky top-0 z-30 bg-base/70 backdrop-blur-xl border-b border-border-subtle">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
            className="lg:hidden text-textSecondary hover:text-textPrimary transition-colors shrink-0"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold text-textPrimary truncate">
              {meta.title}
            </h1>
            <p className="text-xs text-textSecondary truncate hidden sm:block">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-border-subtle rounded-xl px-3.5 py-2 w-64">
            <Search size={15} className="text-textMuted" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="bg-transparent text-sm text-textPrimary placeholder:text-textMuted outline-none w-full"
            />
          </div>

          <button
            className="relative w-9 h-9 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center text-textSecondary hover:text-textPrimary hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-danger border-2 border-base" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}