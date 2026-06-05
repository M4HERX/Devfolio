"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { getProjects, getFilters } from "@/lib/content";
import { LINKS } from "@/config/links";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { useI18n } from "@/components/i18n/LanguageProvider";

export function ProjectsContent() {
  const { t } = useI18n();
  const items = getProjects("projects");
  const filters = getFilters(items);

  return (
    <>
      <SpaceBackground />
      <PageTransition className="relative z-10">
        <div className="section-pad mx-auto max-w-7xl pt-28">
          <PageHeader
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />

          <div className="mb-10 mt-8 flex justify-center">
            <Link
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-edge bg-bg-secondary px-5 py-2.5 font-mono text-sm text-text-muted transition-all hover:border-accent-glow hover:text-accent-glow hover:shadow-glow-sm"
            >
              <FaGithub size={16} />
              {t("projects.seeMore")}
            </Link>
          </div>

          <ProjectGallery items={items} filters={filters} />
        </div>
      </PageTransition>
    </>
  );
}

export default ProjectsContent;
