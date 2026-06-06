"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SITE, getAge } from "@/config/links";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useI18n } from "@/components/i18n/LanguageProvider";

// Lazy-load the canvas background — it's decorative and heavy.
const ParticleNetwork = dynamic(
  () => import("@/components/ui/ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const { t } = useI18n();
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      <ParticleNetwork density={90} />

      {/* radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, var(--bg-primary) 85%)",
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center pb-28">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 rounded-full border border-edge bg-bg-secondary/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-text-muted backdrop-blur"
        >
          {t("common.role")} · {getAge()} · {SITE.origin}
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-wordmark text-6xl font-black tracking-tight text-text-primary glow-text sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl font-display text-xl font-medium tracking-wide text-accent-glow sm:text-2xl"
        >
          &ldquo;{t("common.slogan")}&rdquo;
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
        >
          {t("home.intro")}
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/skills"
            className="group flex items-center gap-2 rounded-xl border border-accent-glow bg-accent-blue/10 px-6 py-3 font-display font-semibold uppercase tracking-wide text-accent-glow transition-all hover:bg-accent-blue/20 hover:shadow-glow"
          >
            {t("home.exploreSkills")}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-edge bg-bg-secondary px-6 py-3 font-display font-semibold uppercase tracking-wide text-text-primary transition-all hover:border-accent-glow hover:text-accent-glow"
          >
            {t("home.getInTouch")}
          </Link>
        </motion.div>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12"
        >
          <SocialLinks />
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {t("home.scroll")}
        </span>
        <ChevronDown size={20} className="animate-scroll-bounce text-accent-glow" />
      </motion.div>
    </section>
  );
}
