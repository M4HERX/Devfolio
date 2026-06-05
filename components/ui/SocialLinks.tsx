"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaDiscord, FaInstagram } from "react-icons/fa";
import { LINKS, DISCORD_HANDLE, SITE } from "@/config/links";
import { useI18n } from "@/components/i18n/LanguageProvider";
import type { IconType } from "react-icons";

type SocialItem = {
  key: string;
  label: string;
  href: string;
  Icon: IconType;
};

const SOCIALS: SocialItem[] = [
  { key: "github",    label: "GitHub",    href: LINKS.github,    Icon: FaGithub    },
  { key: "linkedin",  label: "LinkedIn",  href: LINKS.linkedin,  Icon: FaLinkedinIn },
  { key: "discord",   label: "Discord",   href: LINKS.discord,   Icon: FaDiscord   },
  { key: "instagram", label: "Instagram", href: LINKS.instagram, Icon: FaInstagram },
];

/** Copy text to the clipboard with a graceful fallback for older browsers. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch { /* ignore */ }
    document.body.removeChild(ta);
  }
}

type Props = {
  /** "sm" for compact icon row, "lg" for the big contact-page buttons */
  size?: "sm" | "lg";
  className?: string;
};

export function SocialLinks({ size = "sm", className = "" }: Props) {
  const { t } = useI18n();
  const large = size === "lg";
  const [copied, setCopied] = useState(false);

  async function copyDiscord() {
    await copyText(DISCORD_HANDLE);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const itemClass = `group flex items-center justify-center rounded-xl border border-edge bg-bg-secondary text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-glow hover:text-accent-glow hover:shadow-glow ${
    large ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12"
  }`;

  return (
    <ul className={`flex flex-wrap items-center gap-4 ${className}`}>
      {SOCIALS.map(({ key, label, href, Icon }, i) => {
        // Discord: copy handle to clipboard instead of opening the link
        const isDiscord = key === "discord" && !!DISCORD_HANDLE;
        const icon = (
          <Icon
            className={`transition-transform duration-300 group-hover:scale-110 ${
              large ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
            aria-hidden="true"
          />
        );

        return (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative"
          >
            {isDiscord ? (
              <button
                type="button"
                onClick={copyDiscord}
                aria-label={`Copy ${SITE.fullName}'s Discord username`}
                className={itemClass}
              >
                {icon}
              </button>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${SITE.fullName}'s ${label}`}
                className={itemClass}
              >
                {icon}
              </a>
            )}

            <AnimatePresence>
              {isDiscord && copied && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-accent-glow/40 bg-bg-tertiary px-2 py-1 font-mono text-xs text-accent-glow shadow-glow-sm"
                >
                  {t("social.usernameCopied")}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
