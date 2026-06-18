import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Sparkles,
  LayoutDashboard,
  MessageSquareText,
  BrainCircuit,
  ListChecks,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/reviews", label: "Review Explorer", icon: MessageSquareText },
  { to: "/insights", label: "AI Insights", icon: BrainCircuit },
  { to: "/actions", label: "Action Center", icon: ListChecks },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar is always position:fixed — App.jsx compensates with lg:pl-64
          on the content wrapper, so this must NOT switch to lg:static. */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-panel/70 backdrop-blur-xl border-r border-border-subtle transform transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-textPrimary leading-none">
                ReviewIQ
              </p>
              <p className="text-[11px] text-textMuted mt-0.5">Review Intelligence</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-textSecondary hover:text-textPrimary transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-accent/10 text-textPrimary border border-border-strong shadow-glow"
                    : "text-textSecondary hover:text-textPrimary hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-primary-glow"
                        : "text-textMuted group-hover:text-textSecondary"
                    }
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-5 border-t border-border-subtle">
          <div className="glass rounded-xl p-3.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <p className="text-[11px] text-textSecondary leading-snug">
              AI insights refresh every 6 hours
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}