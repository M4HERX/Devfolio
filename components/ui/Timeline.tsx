"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n/LanguageProvider";

export type Milestone = {
  year: string;
  title: string;
  description: string;
  future?: boolean;
};

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const { t } = useI18n();
  return (
    <ol className="relative ml-3 border-l border-edge sm:ml-4">
      {milestones.map((m, i) => (
        <motion.li
          key={m.title}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
          className="relative mb-10 pl-8 last:mb-0 sm:pl-10"
        >
          {/* node */}
          <span
            className={`absolute -left-[7px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
              m.future
                ? "border-accent-blue bg-bg-primary"
                : "border-accent-glow bg-accent-glow shadow-glow"
            }`}
            aria-hidden="true"
          >
            {m.future && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-blue" />
            )}
          </span>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-sm font-medium text-accent-glow">
              {m.year}
            </span>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {m.title}
            </h3>
            {m.future && (
              <span className="rounded-full border border-accent-blue/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-blue">
                {t("about.ahead")}
              </span>
            )}
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
            {m.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

export default Timeline;
