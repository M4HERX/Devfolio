/**
 * config/i18n.ts
 * --------------
 * List of languages the site supports, plus small helpers.
 *
 * 👉 To add or rename a language: add an entry here AND add a matching block
 *    of translations in data/translations.json (same "code"). Set rtl: true
 *    for right-to-left languages (the layout mirrors automatically).
 *
 * 👉 To remove a language: delete its entry from LOCALES and its block from
 *    data/translations.json.
 *
 * 👉 To run a single-language site: set showLanguageSwitcher: false in
 *    config/links.ts — the picker disappears but this list is still used
 *    internally for the default locale.
 */

export type Locale = "en" | "fr" | "ar" | "es" | "de" | "zh" | "ru";

export type LocaleInfo = {
  code: Locale;
  /** English name (for reference) */
  label: string;
  /** how the language calls itself — shown in the switcher */
  native: string;
  /** right-to-left script? */
  rtl?: boolean;
};

export const LOCALES: LocaleInfo[] = [
  { code: "en", label: "English",  native: "English"   },
  { code: "fr", label: "French",   native: "Français"  },
  { code: "ar", label: "Arabic",   native: "العربية", rtl: true },
  { code: "es", label: "Spanish",  native: "Español"   },
  { code: "de", label: "German",   native: "Deutsch"   },
  { code: "zh", label: "Chinese",  native: "中文"       },
  { code: "ru", label: "Russian",  native: "Русский"   },
];

/** The language used on first visit and as a fallback for any missing key. */
export const DEFAULT_LOCALE: Locale = "en";

/** localStorage key the chosen language is saved under. */
export const STORAGE_KEY = "portfolio-locale";

export function isRtl(locale: Locale): boolean {
  return LOCALES.find((l) => l.code === locale)?.rtl ?? false;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && LOCALES.some((l) => l.code === value);
}
