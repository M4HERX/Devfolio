"use client";

import Link from "next/link";
import { SITE } from "@/config/links";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useI18n } from "@/components/i18n/LanguageProvider";

const FOOTER_LINKS = [
  { href: "/about", key: "nav.about" },
  { href: "/skills", key: "nav.skills" },
  { href: "/work", key: "nav.work" },
  { href: "/projects", key: "nav.projects" },
  { href: "/contact", key: "nav.contact" },
];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-edge bg-bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-wordmark text-2xl font-bold tracking-widest text-text-primary hover:text-accent-glow hover:glow-text"
            >
              {SITE.name}
            </Link>
            <p className="mt-3 font-mono text-sm text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
              {t("common.slogan")}
            </p>
            <p
              className="mt-2 inline-block w-fit text-sm text-shine"
              data-text={`${SITE.fullName} · ${t("common.role")} · ${SITE.origin}`}
            >
              {SITE.fullName} · {t("common.role")} · {SITE.origin}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="font-display text-xs uppercase tracking-widest text-text-muted">
              {t("footer.navigate")}
            </span>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-accent-glow"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-display text-xs uppercase tracking-widest text-text-muted">
              {t("footer.connect")}
            </span>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-edge pt-6 sm:flex-row">
          <p className="font-mono text-xs text-text-muted">
            © {year} {SITE.fullName}. {t("footer.builtWith")}
          </p>
          <p className="font-mono text-xs text-text-muted">
            {t("footer.designedBy")} {SITE.name}
            {" · "}
            <a
              href="https://m4herx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-glow"
            >
              Template by M4HERX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
