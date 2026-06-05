import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./config/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        accent: {
          blue: "var(--accent-blue)",
          glow: "var(--accent-glow)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        edge: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        wordmark: ["var(--font-orbitron)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(79, 158, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(79, 158, 255, 0.45)",
        "glow-sm": "0 0 12px rgba(79, 158, 255, 0.25)",
      },
      keyframes: {
        "flow-dash": {
          to: { strokeDashoffset: "-1000" },
        },
        "pulse-node": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.12)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 18s linear infinite",
        "pulse-node": "pulse-node 3.5s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scroll-bounce": "scroll-bounce 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
