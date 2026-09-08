"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToHash } from "@/lib/scrollTo";
import { navLinks, homeLink, site } from "@/lib/site";
import MagneticButton from "@/components/ui/MagneticButton";
import HomeIcon from "@/components/ui/HomeIcon";
import MobileMenu from "@/components/nav/MobileMenu";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 40,
      end: 99999,
      onUpdate: (self) => setScrolled(self.scroll() > 40),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = ["home", "about", "process", "work", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const effectiveActive = pathname === "/" ? active : "";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.split("#")[1];
    if (!hash) return;
    if (pathname === "/") {
      e.preventDefault();
      scrollToHash(`#${hash}`);
    } else {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <div
          className={`mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/90 px-3 py-2 backdrop-blur-md transition-shadow duration-500 sm:px-5 sm:py-2.5 ${
            scrolled ? "shadow-[0_8px_24px_-12px_rgba(34,29,24,0.18)]" : ""
          }`}
        >
          <Link
            href="/"
            className="group flex items-center gap-3 font-display text-lg tracking-tight"
            aria-label="Sheakudzwe Moyo — home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] font-mono text-[10px] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
              SZM
            </span>
            <span className="hidden text-[var(--color-fg)] sm:inline">
              Sheakudzwe Moyo
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <MagneticButton as="span" className="inline-block">
              <Link
                href={homeLink.href}
                onClick={(e) => handleNavClick(e, homeLink.href)}
                aria-label={homeLink.label}
                aria-current={effectiveActive === "home" ? "page" : undefined}
                data-cursor="grow"
                className={`flex h-6 w-6 items-center justify-center transition-colors ${
                  effectiveActive === "home"
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                <HomeIcon className="h-[18px] w-[18px]" />
              </Link>
            </MagneticButton>
            {navLinks.map((link) => {
              const hash = link.href.split("#")[1];
              const isActive = effectiveActive === hash;
              return (
                <MagneticButton key={link.href} as="span" className="inline-block">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${
                      isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-[var(--color-accent)] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </MagneticButton>
              );
            })}
            <MagneticButton>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="rounded-full bg-[var(--color-fg)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)]"
              >
                Let&rsquo;s talk
              </a>
            </MagneticButton>
          </nav>

          <button
            ref={menuToggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] transition-colors hover:border-[var(--color-accent)] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-5 w-5 text-[var(--color-fg)]"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-5 w-5 text-[var(--color-fg)]"
                aria-hidden="true"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeHash={effectiveActive}
        triggerRef={menuToggleRef}
      />
    </>
  );
}
