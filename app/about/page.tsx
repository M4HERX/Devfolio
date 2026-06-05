"use client";

import { motion } from "framer-motion";
import { Hammer, GraduationCap, Sparkles, Rocket } from "lucide-react";
import { SITE, getAge, SPOKEN_LANGUAGES } from "@/config/links";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { AvatarFrame } from "@/components/ui/AvatarFrame";
import { GlowCard } from "@/components/ui/GlowCard";
import { Timeline, type Milestone } from "@/components/ui/Timeline";
import { useI18n } from "@/components/i18n/LanguageProvider";
import type { Proficiency } from "@/config/links";

const VALUE_ICONS = [Hammer, GraduationCap, Sparkles];

const LEVEL_KEY: Record<Proficiency, string> = {
  native: "about.langNative",
  fluent: "about.langFluent",
  learning: "about.langLearning",
};
const LEVEL_STYLES: Record<Proficiency, string> = {
  native: "border-accent-glow/50 bg-accent-blue/15 text-accent-glow",
  fluent: "border-accent-blue/40 text-accent-blue",
  learning: "border-green-400/50 bg-green-500/10 text-green-400",
};

export default function AboutPage() {
  const { t } = useI18n();

  // Built from the dictionary so they re-render on language change.
  const MILESTONES: Milestone[] = [
    { year: t("about.m1.year"), title: t("about.m1.title"), description: t("about.m1.desc") },
    { year: t("about.m2.year"), title: t("about.m2.title"), description: t("about.m2.desc") },
    { year: t("about.m3.year"), title: t("about.m3.title"), description: t("about.m3.desc") },
    { year: t("about.m4.year"), title: t("about.m4.title"), description: t("about.m4.desc") },
    {
      year: t("about.m5.year"),
      title: t("about.m5.title"),
      description: t("about.m5.desc"),
      future: true,
    },
  ];

  const VALUES = [
    { icon: VALUE_ICONS[0], title: t("about.v1.title"), body: t("about.v1.body") },
    { icon: VALUE_ICONS[1], title: t("about.v2.title"), body: t("about.v2.body") },
    { icon: VALUE_ICONS[2], title: t("about.v3.title"), body: t("about.v3.body") },
  ];

  return (
    <>
      <SpaceBackground />
      <PageTransition className="relative z-10">
      <div className="section-pad mx-auto max-w-6xl pt-28">
        <PageHeader
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          subtitle={`${SITE.fullName} · ${getAge()} · ${SITE.origin}`}
        />

        {/* bio + avatar */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <AvatarFrame size={300} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-base leading-relaxed text-text-muted"
          >
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
            <p>{t("about.bio3")}</p>
            <p>{t("about.bio4")}</p>
            <p className="font-mono text-sm text-accent-glow glow-text">
              &ldquo;{t("common.slogan")}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* currently working on */}
        <div className="mt-20">
          <GlowCard interactive={false} className="overflow-hidden">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-glow/40 bg-bg-tertiary text-accent-glow shadow-glow-sm">
                  <Rocket size={22} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-glow">
                    {t("about.currentlyWorkingOn")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-text-primary">
                    {t("about.currentTitle")}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-text-muted">
                    {t("about.currentBody")}
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-blue/40 px-3 py-1.5 font-mono text-xs text-accent-blue">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-blue" />
                {t("about.inProgress")}
              </span>
            </div>
          </GlowCard>
        </div>

        {/* spoken languages — configured in config/links.ts */}
        <div className="mt-24">
          <h2 className="mb-10 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {t("about.languages")}
          </h2>
          <div className="flex flex-wrap gap-4">
            {SPOKEN_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-3 rounded-xl border border-edge bg-bg-secondary px-4 py-3 transition-colors hover:border-accent-glow/50"
              >
                <span className="font-display text-base font-semibold text-text-primary">
                  {lang.name}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${LEVEL_STYLES[lang.level]}`}
                >
                  {t(LEVEL_KEY[lang.level])}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="mt-24">
          <h2 className="mb-10 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {t("about.journey")}
          </h2>
          <Timeline milestones={MILESTONES} />
        </div>

        {/* values */}
        <div className="mt-24">
          <h2 className="mb-10 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {t("about.philosophy")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <GlowCard
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-edge bg-bg-tertiary text-accent-glow transition-all group-hover:border-accent-glow group-hover:shadow-glow">
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-text-primary">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{v.body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
      </PageTransition>
    </>
  );
}
