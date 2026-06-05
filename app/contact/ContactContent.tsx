"use client";

import { Mail } from "lucide-react";
import { SITE } from "@/config/links";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { DiscordCard } from "@/components/ui/DiscordCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { useI18n } from "@/components/i18n/LanguageProvider";

export function ContactContent() {
  const { t } = useI18n();

  return (
    <>
      <SpaceBackground />
      <PageTransition className="relative z-10">
        <div className="section-pad mx-auto max-w-5xl pt-28">
          <PageHeader
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />

          {/* big social links */}
          <div className="mt-12 flex justify-center">
            <SocialLinks size="lg" />
          </div>

          {/* prominent contact methods */}
          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-edge bg-bg-secondary p-5 transition-all hover:border-accent-glow hover:shadow-glow"
              aria-label={`Email ${SITE.email}`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-bg-tertiary text-accent-glow transition-all group-hover:border-accent-glow group-hover:shadow-glow-sm">
                <Mail size={22} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {t("contact.emailLabel")}
                </p>
                <p className="truncate font-display text-base text-text-primary group-hover:text-accent-glow">
                  {SITE.email}
                </p>
              </div>
            </a>

            <DiscordCard />
          </div>

          {/* form */}
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-edge bg-bg-secondary/50 p-6 sm:p-8">
            <h2 className="mb-6 font-display text-xl font-semibold text-text-primary">
              {t("contact.orSend")}
            </h2>
            <ContactForm />
            <p className="mt-4 font-mono text-xs text-text-muted">
              {t("contact.note")}
            </p>
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default ContactContent;
