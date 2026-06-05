"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Maximize2 } from "lucide-react";
import { SKILL_TREE, SKILL_ROOT, type SkillCategory } from "@/config/skills";
import { useI18n } from "@/components/i18n/LanguageProvider";

/* ----------------------------------------------------------------
   Geometry: a radial tree laid out on a fixed canvas. The canvas is
   wrapped in a draggable layer so it can be panned on desktop.
----------------------------------------------------------------- */

// The canvas is sized to hold the fully-expanded tree with margin, so nothing
// ever overflows its box (and therefore can't slip behind the page header).
const CANVAS_W = 1080;
const CANVAS_H = 1040;
const CENTER = { x: CANVAS_W / 2, y: CANVAS_H / 2 };
const CATEGORY_RADIUS = 210;
// The near ring is far enough out to clear the (wide) category labels, so an
// inner skill never sits on top of its own category node.
const SKILL_RADIUS = 195;
// Every other skill is pushed out to a farther ring so two neighbouring
// labels in the same fan never share a distance and overlap each other.
const SKILL_STAGGER = 60;

type Point = { x: number; y: number };

type PlacedSkill = {
  name: string;
  description: string;
  pos: Point;
};

type PlacedCategory = {
  data: SkillCategory;
  pos: Point;
  angle: number;
  skills: PlacedSkill[];
};

function layout(): PlacedCategory[] {
  const n = SKILL_TREE.length;
  return SKILL_TREE.map((cat, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const pos = {
      x: CENTER.x + Math.cos(angle) * CATEGORY_RADIUS,
      y: CENTER.y + Math.sin(angle) * CATEGORY_RADIUS,
    };

    const k = cat.skills.length;
    const spread = Math.min(Math.PI * 0.85, 0.55 * k);
    const skills: PlacedSkill[] = cat.skills.map((s, j) => {
      const t = k === 1 ? 0 : j / (k - 1) - 0.5;
      const a = angle + t * spread;
      // Alternate between a near and a far ring so adjacent labels are
      // separated both by angle and by distance — no more overlap.
      const r = SKILL_RADIUS + (j % 2) * SKILL_STAGGER;
      return {
        name: s.name,
        description: s.description,
        pos: {
          x: pos.x + Math.cos(a) * r,
          y: pos.y + Math.sin(a) * r,
        },
      };
    });

    return { data: cat, pos, angle, skills };
  });
}

/* ---------------------------- Desktop graph ---------------------------- */

function GraphView() {
  const { t } = useI18n();
  const categories = useMemo(layout, []);
  // Only one branch is open at a time (accordion): opening another closes the
  // previous one. `null` means every branch is collapsed.
  const [openId, setOpenId] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; title: string; body: string } | null>(
    null
  );

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  // The map is a fixed-size, non-draggable canvas centered in the page.
  // Sizing the box to the canvas means an expanded branch always stays inside
  // it instead of spilling out behind the header.
  return (
    <div
      className="relative mx-auto max-w-full overflow-hidden"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
          {/* lines */}
          <svg
            width={CANVAS_W}
            height={CANVAS_H}
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            {categories.map((cat) => (
              <g key={`line-${cat.data.id}`}>
                <line
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={cat.pos.x}
                  y2={cat.pos.y}
                  stroke="var(--accent-glow)"
                  strokeWidth={1.5}
                  strokeOpacity={0.55}
                  className="flow-line"
                />
                {openId === cat.data.id &&
                  cat.skills.map((s) => (
                    <line
                      key={`line-${cat.data.id}-${s.name}`}
                      x1={cat.pos.x}
                      y1={cat.pos.y}
                      x2={s.pos.x}
                      y2={s.pos.y}
                      stroke="var(--accent-blue)"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                      className="flow-line"
                    />
                  ))}
              </g>
            ))}
          </svg>

          {/* central root node — the centering translate lives on the wrapper
              so the pulse animation (which animates `transform`) doesn't wipe
              it out and shove the node off the branch convergence point. */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: CENTER.x, top: CENTER.y }}
          >
            <button
              type="button"
              onMouseEnter={() =>
                setTip({
                  x: CENTER.x,
                  y: CENTER.y,
                  title: SKILL_ROOT,
                  body: t("skills.rootTooltip"),
                })
              }
              onMouseLeave={() => setTip(null)}
              className="flex animate-pulse-node items-center justify-center rounded-full border border-accent-glow bg-bg-secondary px-6 py-4 shadow-glow-lg"
              aria-label={SKILL_ROOT}
            >
              <span className="font-wordmark text-xl font-bold tracking-widest text-accent-glow glow-text">
                {SKILL_ROOT}
              </span>
            </button>
          </div>

          {/* category nodes */}
          {categories.map((cat) => {
            const isCollapsed = openId !== cat.data.id;
            return (
              <div key={cat.data.id}>
                <button
                  type="button"
                  onClick={() => toggle(cat.data.id)}
                  onMouseEnter={() =>
                    setTip({
                      x: cat.pos.x,
                      y: cat.pos.y,
                      title: cat.data.name,
                      body: cat.data.description,
                    })
                  }
                  onMouseLeave={() => setTip(null)}
                  className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-xl border border-accent-blue/60 bg-bg-tertiary px-4 py-2.5 font-display font-semibold tracking-wide text-text-primary shadow-glow-sm transition-all hover:border-accent-glow hover:text-accent-glow hover:shadow-glow"
                  style={{ left: cat.pos.x, top: cat.pos.y }}
                  aria-label={`${cat.data.name} (${isCollapsed ? "expand" : "collapse"})`}
                >
                  {cat.data.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                  />
                </button>

                {/* skill nodes — the wrapper holds the centering translate and
                    only animates opacity (no transform), so each node stays
                    pinned to its branch point; the inner button does the pop. */}
                <AnimatePresence>
                  {!isCollapsed &&
                    cat.skills.map((s, j) => (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: j * 0.04 }}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: s.pos.x, top: s.pos.y }}
                      >
                        <motion.button
                          type="button"
                          initial={{ scale: 0.6 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.25, delay: j * 0.04 }}
                          onMouseEnter={() =>
                            setTip({ x: s.pos.x, y: s.pos.y, title: s.name, body: s.description })
                          }
                          onMouseLeave={() => setTip(null)}
                          className="block whitespace-nowrap rounded-lg border border-edge bg-bg-secondary px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent-glow hover:text-accent-glow hover:shadow-glow"
                          aria-label={`${s.name}: ${s.description}`}
                        >
                          {s.name}
                        </motion.button>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            );
          })}

          {/* tooltip — animate opacity only so the -translate-x-1/2 centering
              isn't overwritten by a Framer transform. Flips above the node for
              anything in the lower half so the description never clips off the
              bottom of the canvas. */}
          <AnimatePresence>
            {tip &&
              (() => {
                const above = tip.y > CENTER.y;
                // The tooltip is centered on the node (w-56 → 112px each side);
                // clamp its center so neither edge spills outside the canvas.
                const HALF = 112;
                const PAD = 12;
                const x = Math.min(CANVAS_W - HALF - PAD, Math.max(HALF + PAD, tip.x));
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`pointer-events-none absolute z-30 w-56 -translate-x-1/2 rounded-xl border border-accent-glow/40 bg-bg-tertiary/95 p-3 shadow-glow backdrop-blur ${
                      above ? "-translate-y-full" : ""
                    }`}
                    style={{ left: x, top: above ? tip.y - 18 : tip.y + 28 }}
                  >
                    <p className="font-display text-sm font-semibold text-accent-glow">
                      {tip.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">{tip.body}</p>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
    </div>
  );
}

/* ---------------------------- Mobile accordion ---------------------------- */

function AccordionView() {
  const [open, setOpen] = useState<string | null>(SKILL_TREE[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-2 rounded-xl border border-accent-glow/40 bg-bg-secondary py-3 font-wordmark text-lg font-bold tracking-widest text-accent-glow shadow-glow-sm glow-text">
        {SKILL_ROOT}
      </div>
      {SKILL_TREE.map((cat) => {
        const isOpen = open === cat.id;
        return (
          <div
            key={cat.id}
            className="overflow-hidden rounded-xl border border-edge bg-bg-secondary"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : cat.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <div>
                <span className="font-display text-base font-semibold text-text-primary">
                  {cat.name}
                </span>
                <span className="ml-2 font-mono text-xs text-text-muted">
                  {cat.skills.length}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`shrink-0 text-accent-glow transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="flex flex-col gap-2 border-t border-edge p-4">
                    {cat.skills.map((s) => (
                      <li
                        key={s.name}
                        className="rounded-lg border border-edge bg-bg-tertiary p-3"
                      >
                        <p className="font-mono text-sm text-accent-glow">{s.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-text-muted">
                          {s.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------- Public component ---------------------------- */

export function SkillBranch() {
  const { t } = useI18n();
  return (
    <>
      <div className="hidden md:block">
        <GraphView />
      </div>
      <div className="md:hidden">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-text-muted">
          <Maximize2 size={13} /> {t("skills.tapHint")}
        </div>
        <AccordionView />
      </div>
    </>
  );
}

export default SkillBranch;
