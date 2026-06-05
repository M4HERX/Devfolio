"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMeta } from "@/config/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useI18n } from "@/components/i18n/LanguageProvider";

export function ProjectGallery({
  items,
  filters,
}: {
  items: ProjectMeta[];
  filters: string[];
}) {
  const { t } = useI18n();
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(() => {
    if (active === "All") return items;
    return items.filter(
      (p) => p.category === active || p.tech.includes(active)
    );
  }, [active, items]);

  const options = ["All", ...filters];

  return (
    <div>
      {/* filter bar */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setActive(opt)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                isActive
                  ? "border-accent-glow bg-accent-blue/15 text-accent-glow shadow-glow-sm"
                  : "border-edge bg-bg-secondary text-text-muted hover:border-accent-glow/50 hover:text-text-primary"
              }`}
            >
              {opt === "All" ? t("gallery.all") : opt}
            </button>
          );
        })}
      </div>

      {/* grid */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-text-muted">
          {t("gallery.empty")}
        </p>
      )}
    </div>
  );
}

export default ProjectGallery;
