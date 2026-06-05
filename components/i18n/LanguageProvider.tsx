"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import translations from "@/data/translations.json";
import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  isLocale,
  isRtl,
  type Locale,
} from "@/config/i18n";
import { getAge, SITE } from "@/config/links";

type Dict = Record<string, string>;
const DICTS = translations as unknown as Record<string, Dict>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** translate a key; falls back to English, then to the key itself */
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on the default so the server and first client render match
  // (no hydration mismatch). We adopt the saved language right after mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Adopt the language saved in the browser, if any.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* localStorage unavailable — stay on default */
    }
  }, []);

  // Persist + reflect the choice on <html lang/dir> whenever it changes.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = isRtl(locale) ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore write failures */
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: string): string => {
      const raw = DICTS[locale]?.[key] ?? DICTS[DEFAULT_LOCALE]?.[key] ?? key;
      // Replace all supported placeholders from config/links.ts
      return raw
        .replace(/\{age\}/g, String(getAge()))
        .replace(/\{name\}/g, SITE.fullName)
        .replace(/\{origin\}/g, SITE.origin)
        .replace(/\{siteName\}/g, SITE.name)
        .replace(/\{role\}/g, SITE.title);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <LanguageProvider>");
  }
  return ctx;
}
