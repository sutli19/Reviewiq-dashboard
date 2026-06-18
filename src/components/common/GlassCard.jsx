import React from "react";

export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "p-6",
  as: Tag = "div",
  ...rest
}) {
  return (
    <Tag
      className={`glass rounded-2xl shadow-card ${padding} ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-border-strong"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}