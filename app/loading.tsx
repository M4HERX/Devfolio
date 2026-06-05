import { SITE } from "@/config/links";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-bg-primary">
      <div className="animate-pulse-node">
        <span className="font-wordmark text-5xl font-black tracking-widest text-accent-glow glow-text sm:text-6xl">
          {SITE.name}
        </span>
      </div>
      <div className="h-0.5 w-40 overflow-hidden rounded-full bg-bg-secondary">
        <div
          className="h-full w-1/2 rounded-full bg-accent-glow shadow-glow"
          style={{ animation: "flow-dash 1.2s ease-in-out infinite alternate" }}
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        Loading
      </span>
    </div>
  );
}
