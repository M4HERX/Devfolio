/**
 * config/links.ts
 * ---------------
 * ★ MAIN CONFIGURATION FILE — start here.
 *
 * Every piece of personal info (name, title, birth date, social links) lives
 * here. Change these values once and the entire site updates automatically.
 *
 * Also controls optional features via the SITE flags below.
 */

// ─── Birth date ────────────────────────────────────────────────────────────────
/** Your date of birth (month is 1-based: 1 = January). */
export const BIRTH_DATE = { year: 1995, month: 1, day: 1 } as const;

/**
 * Current age, derived from BIRTH_DATE — auto-updates every birthday.
 * Used via the {age} placeholder in translations.json.
 */
export function getAge(now: Date = new Date()): number {
  let age = now.getFullYear() - BIRTH_DATE.year;
  const monthDiff = now.getMonth() + 1 - BIRTH_DATE.month;
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < BIRTH_DATE.day)) {
    age -= 1;
  }
  return age;
}

// ─── Site identity ─────────────────────────────────────────────────────────────
export const SITE = {
  /** Your brand / handle — shown in the navbar, footer, loading screen, and page titles. */
  name: "DEVFOLIO",
  /** Your full real name — shown in the footer, about page, and meta tags. */
  fullName: "Jane Doe",
  /** One-line professional title — used as a meta description and in the footer. */
  title: "Full Stack Developer",
  /** A short personal slogan — shown on the home page and footer. */
  slogan: "Building things that matter.",
  age: getAge(),
  /** Your city or country of origin — shown on the home page badge and about page. */
  origin: "Your City",
  /** Your contact email — used by the contact form (FormSubmit.co) and the email card. */
  email: "you@example.com",

  // ─── Feature flags ───────────────────────────────────────────────────────────
  /**
   * Show the floating language picker in the bottom-left corner.
   * Set to false if you only want a single language site.
   */
  showLanguageSwitcher: true,
} as const;

// ─── Social links ──────────────────────────────────────────────────────────────
export const LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  /** Server invite or profile link — shown as an icon in SocialLinks. */
  discord: "https://discord.gg/yourserver",
  instagram: "https://instagram.com/yourusername",
} as const;

/**
 * Your Discord username — clicking the Discord icon copies this to the
 * clipboard instead of opening the server invite.
 * Set to "" to disable the copy behaviour and just open the invite link.
 */
export const DISCORD_HANDLE = "yourusername";

// ─── Spoken languages (About page) ────────────────────────────────────────────
/**
 * Languages you speak, shown as badge pills on the About page.
 * Write the language name in its own script (e.g. "Español", not "Spanish").
 * Levels: "native" | "fluent" | "learning"
 */
export type Proficiency = "native" | "fluent" | "learning";

export const SPOKEN_LANGUAGES: { name: string; level: Proficiency }[] = [
  { name: "English", level: "native" },
  { name: "Español", level: "fluent" },
  { name: "Français", level: "learning" },
];

export type SocialKey = keyof typeof LINKS;
