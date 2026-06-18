/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0E17",
        surface: "#0F1420",
        panel: "#131A2B",
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        primary: {
          DEFAULT: "#6366F1",
          dim: "#4338CA",
          glow: "#818CF8",
        },
        accent: {
          DEFAULT: "#22D3EE",
          dim: "#0E7490",
        },
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",
        textPrimary: "#F1F5F9",
        textSecondary: "#8B95A7",
        textMuted: "#5C6478",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.25)",
        "glow-accent": "0 0 40px rgba(34, 211, 238, 0.18)",
        card: "0 4px 24px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-20px) scale(1.05)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        fadeUp: "fadeUp 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};