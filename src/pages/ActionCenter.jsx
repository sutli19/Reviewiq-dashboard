import React, { useState } from "react";
import { AlertCircle, Clock4, CheckCircle2, User, Flag, Copy, Check } from "lucide-react";
import { actions as initialActions } from "../data/actions.js";

const statusConfig = {
  open: { label: "Open", icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
  "in-progress": { label: "In Progress", icon: Clock4, color: "text-warning", bg: "bg-warning/10" },
  resolved: { label: "Resolved", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
};

const priorityColor = {
  high: "text-danger",
  medium: "text-warning",
  low: "text-success",
};

export default function ActionCenter() {
  const [tasks, setTasks] = useState(initialActions);
  const [copiedId, setCopiedId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, lastUpdated: "Today" } : t))
    );
  };

  const handleCopy = (task) => {
    navigator.clipboard.writeText(task.suggestedResponse);
    setCopiedId(task.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const columns = ["open", "in-progress", "resolved"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {columns.map((statusKey) => {
        const config = statusConfig[statusKey];
        const Icon = config.icon;
        const columnTasks = tasks.filter((t) => t.status === statusKey);

        return (
          <div key={statusKey} className="glass rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <div className="flex items-center gap-2">
                <Icon size={16} className={config.color} />
                <span className="font-display text-sm font-semibold text-textPrimary">
                  {config.label}
                </span>
              </div>
              <span className="text-xs font-mono text-textSecondary bg-white/5 px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>

            {columnTasks.length === 0 && (
              <div className="text-xs text-textMuted text-center py-8">No tasks here</div>
            )}

            {columnTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl bg-white/[0.03] border border-border-subtle p-4 transition-all duration-200 hover:border-border-strong hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-textPrimary leading-snug">{task.title}</p>
                  <Flag size={14} className={`shrink-0 mt-0.5 ${priorityColor[task.priority]}`} />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-textSecondary mb-3">
                  <User size={12} />
                  <span>{task.assignedTo}</span>
                  <span className="text-textMuted">· {task.lastUpdated}</span>
                </div>

                <div className="bg-white/5 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-textSecondary italic leading-relaxed">
                    "{task.suggestedResponse}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="flex-1 bg-white/5 border border-border-subtle rounded-lg px-2 py-1.5 text-xs text-textPrimary outline-none focus:border-border-strong"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => handleCopy(task)}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary-glow hover:bg-primary/20 transition-colors shrink-0"
                  >
                    {copiedId === task.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === task.id ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}