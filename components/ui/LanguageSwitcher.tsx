"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { LOCALES } from "@/config/i18n";
import { useI18n } from "@/components/i18n/LanguageProvider";

/**
 * Floating language picker, fixed to the bottom-left of every page.
 * A globe button opens a list of languages; choosing one updates the whole
 * site instantly and saves the choice in the browser (via LanguageProvider).
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LOCALES.find((l) => l.code === locale);

  return (
    <div ref={ref} className="fixed bottom-5 left-5 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            aria-label={t("lang.label")}
            className="absolute bottom-full left-0 mb-2 w-44 overflow-hidden rounded-xl border border-edge bg-bg-tertiary/95 p-1 shadow-glow backdrop-blur"
          >
            {LOCALES.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setLocale(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left font-display text-sm transition-colors ${
                      active
                        ? "bg-bg-secondary text-accent-glow"
                        : "text-text-muted hover:bg-bg-secondary hover:text-text-primary"
                    }`}
                  >
                    <span>{l.native}</span>
                    {active && <Check size={15} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-edge bg-bg-secondary/90 px-3.5 py-2.5 text-text-muted shadow-glow-sm backdrop-blur transition-all hover:border-accent-glow hover:text-accent-glow hover:shadow-glow"
      >
        <Globe size={18} className="shrink-0" />
        <span className="font-mono text-xs font-medium uppercase tracking-wider">
          {current?.code ?? "en"}
        </span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
