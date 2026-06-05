/**
 * A stylized cover placeholder for project cards that have no screenshot yet.
 * Renders a gradient + circuit-line motif and the project's initials — never
 * just a flat gray box.
 */
export function CoverPlaceholder({
  label,
  category,
}: {
  label: string;
  category?: string;
}) {
  const initials = label
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary">
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`grid-${initials}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--accent-glow)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${initials})`} />
      </svg>

      {/* glowing diagonal accent */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-blue/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-glow/20 blur-2xl" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-wordmark text-5xl font-black text-accent-glow/80 glow-text">
          {initials}
        </span>
        {category && (
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}

export default CoverPlaceholder;
