"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { Check, Copy } from "lucide-react";
import { DISCORD_HANDLE, SITE } from "@/config/links";
import { useI18n } from "@/components/i18n/LanguageProvider";

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

/**
 * Discord contact card — copies the Discord username to the clipboard and
 * confirms with a "Username copied" note.
 */
export function DiscordCard() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyText(DISCORD_HANDLE);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative flex items-center gap-4 rounded-2xl border border-edge bg-bg-secondary p-5 text-left transition-all hover:border-accent-glow hover:shadow-glow"
      aria-label={`Copy ${SITE.fullName}'s Discord username`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-bg-tertiary text-accent-glow transition-all group-hover:border-accent-glow group-hover:shadow-glow-sm">
        <FaDiscord size={22} />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {t("contact.discordLabel")}
        </p>
        <p className="truncate font-display text-base text-text-primary group-hover:text-accent-glow">
          {DISCORD_HANDLE}
        </p>
      </div>

      <span className="ml-auto shrink-0 text-text-muted transition-colors group-hover:text-accent-glow">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </span>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -top-9 right-4 z-20 whitespace-nowrap rounded-md border border-accent-glow/40 bg-bg-tertiary px-2 py-1 font-mono text-xs text-accent-glow shadow-glow-sm"
          >
            {t("social.usernameCopied")}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default DiscordCard;
