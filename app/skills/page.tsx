"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { SITE } from "@/config/links";

const ParticleNetwork = dynamic(
  () => import("@/components/ui/ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false }
);

// The branch visualizer is heavy + interactive — load it on the client only.
const SkillBranch = dynamic(
  () => import("@/components/ui/SkillBranch").then((m) => m.SkillBranch),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] items-center justify-center">
        <span className="animate-pulse-node font-wordmark text-2xl font-bold tracking-widest text-accent-glow glow-text">
          {SITE.name}
        </span>
      </div>
    ),
  }
);

export default function SkillsPage() {
  const { t } = useI18n();
  return (
    <PageTransition className="relative z-10 min-h-screen">
      <ParticleNetwork density={60} className="opacity-60" />

      <div className="section-pad relative z-10 mx-auto max-w-7xl pt-28">
        <PageHeader
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <div className="mt-14">
          <SkillBranch />
        </div>
      </div>
    </PageTransition>
  );
}
