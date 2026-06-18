import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";
import { platforms } from "../../data/platforms.js";

const severityConfig = {
  high: {
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger",
    icon: AlertTriangle,
  },
  medium: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning",
    icon: AlertCircle,
  },
};

export default function AlertCard({ alert, to = "/reviews" }) {
  const config = severityConfig[alert.severity] || severityConfig.medium;
  const Icon = config.icon;
  const platform = platforms.find((p) => p.id === alert.platform);

  return (
    <Link
      to={to}
      className={`block rounded-xl p-4 bg-white/[0.03] hover:bg-white/[0.06] border-l-4 ${config.border} transition-all duration-200 hover:-translate-y-0.5 group`}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2">
          <Icon size={14} className={config.color} />
          <p className="text-sm font-medium text-textPrimary leading-snug">{alert.title}</p>
        </div>
        <ChevronRight
          size={14}
          className="text-textMuted group-hover:text-textSecondary transition-colors shrink-0 mt-0.5"
        />
      </div>

      <p className="text-xs text-textSecondary leading-relaxed mb-2.5 pl-[22px]">
        {alert.description}
      </p>

      <div className="flex items-center gap-2 pl-[22px]">
        {platform && (
          <span className="flex items-center gap-1.5 text-xs text-textMuted">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: platform.color }}
            />
            {platform.name}
          </span>
        )}
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
          {alert.reviewCount} reviews
        </span>
      </div>
    </Link>
  );
}