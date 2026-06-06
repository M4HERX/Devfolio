"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE } from "@/config/links";
import { useI18n } from "@/components/i18n/LanguageProvider";

const NAV_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/skills", key: "nav.skills" },
  { href: "/work", key: "nav.work" },
  { href: "/projects", key: "nav.projects" },
  { href: "/contact", key: "nav.contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu whenever the route changes (covers link taps + back button)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock background scroll only while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-edge bg-bg-tertiary/95 backdrop-blur-md"
            : "border-b border-transparent bg-bg-primary/70 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10"
          aria-label="Primary"
        >
          {/* header logo — fade out while the menu is open so only the blue menu logo shows */}
          <Link
            href="/"
            aria-label={`${SITE.name} home`}
            className={`font-wordmark text-xl font-bold tracking-widest transition-all hover:text-accent-glow hover:glow-text ${
              open ? "pointer-events-none opacity-0" : "text-text-primary"
            }`}
          >
            {SITE.name}
          </Link>

          {/* desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-4 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                      active
                        ? "text-accent-glow"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {t(link.key)}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-glow shadow-glow"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* mobile toggle — opens only; closing is handled by the in-menu X + route change */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-text-primary transition-colors hover:border-accent-glow hover:text-accent-glow md:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* mobile overlay — sibling of <header> so its z-index is a true top-level value.
          ALWAYS mounted: closed = invisible AND click-through (pointer-events-none), so a
          closed overlay can never swallow a tap, regardless of animation state. */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] flex flex-col bg-bg-secondary transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-edge px-6">
          <span className="font-wordmark text-xl font-bold tracking-widest text-accent-glow glow-text">
            {SITE.name}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-text-primary transition-colors hover:border-accent-glow hover:text-accent-glow"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="flex flex-1 flex-col items-center justify-center gap-1">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <motion.li
                key={link.href}
                initial={false}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.3, delay: open ? 0.05 + i * 0.06 : 0 }}
                className="w-full max-w-xs"
              >
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-center font-display text-2xl font-medium uppercase tracking-wide transition-colors ${
                    active
                      ? "text-accent-glow glow-text"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {t(link.key)}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
