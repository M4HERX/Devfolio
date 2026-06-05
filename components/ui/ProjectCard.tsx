"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { ProjectMeta } from "@/config/projects";
import { CoverPlaceholder } from "@/components/ui/CoverPlaceholder";
import { useI18n } from "@/components/i18n/LanguageProvider";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const { t } = useI18n();
  const { title, client, description, tech, category, featured, comingSoon, link, cover } =
    project;

  const Wrapper = link && !comingSoon ? "a" : "div";
  const wrapperProps =
    link && !comingSoon
      ? {
          href: link,
          target: link.startsWith("http") ? "_blank" : undefined,
          rel: link.startsWith("http") ? "noopener noreferrer" : undefined,
          "aria-label": `Open project: ${title}`,
        }
      : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Wrapper
        {...(wrapperProps as any)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-bg-secondary transition-shadow duration-300 hover:glow-border-hover"
      >
        {/* cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {cover ? (
            <Image
              src={cover}
              alt={`${title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <CoverPlaceholder label={title} category={category} />
          )}

          <div className="absolute left-3 top-3 flex gap-2">
            {featured && (
              <span className="flex items-center gap-1 rounded-full border border-accent-glow/40 bg-bg-primary/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-glow backdrop-blur">
                <Star size={11} /> {t("card.featured")}
              </span>
            )}
            {comingSoon && (
              <span className="rounded-full border border-accent-blue/40 bg-bg-primary/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-blue backdrop-blur">
                {t("card.comingSoon")}
              </span>
            )}
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent-glow">
              {title}
            </h3>
            {link && !comingSoon && (
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-glow"
              />
            )}
          </div>

          {client && (
            <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-text-muted">
              {client}
            </p>
          )}

          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
            {description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-edge bg-bg-tertiary px-2 py-1 font-mono text-[11px] text-text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default ProjectCard;
