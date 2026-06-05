"use client";

import { getProjects, getFilters } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { useI18n } from "@/components/i18n/LanguageProvider";

export function WorkContent() {
  const { t } = useI18n();
  const items = getProjects("work");
  const filters = getFilters(items);

  return (
    <>
      <SpaceBackground />
      <PageTransition className="relative z-10">
        <div className="section-pad mx-auto max-w-7xl pt-28">
          <PageHeader
            eyebrow={t("work.eyebrow")}
            title={t("work.title")}
            subtitle={t("work.subtitle")}
          />

          <div className="mt-8" />

          <ProjectGallery items={items} filters={filters} />
        </div>
      </PageTransition>
    </>
  );
}

export default WorkContent;
