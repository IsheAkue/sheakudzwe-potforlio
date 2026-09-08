"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { navLinks, homeLink, site } from "@/lib/site";
import HomeIcon from "@/components/ui/HomeIcon";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activeHash: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const allLinks = [homeLink, ...navLinks];

export default function MobileMenu({
  open,
  onClose,
  activeHash,
  triggerRef,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const pathname = usePathname();
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!panelRef.current) return;
    const panel = panelRef.current;
    const links = linksRef.current;
    const reduced = prefersReducedMotion();

    if (open) {
      wasOpenRef.current = true;
      document.body.style.overflow = "hidden";

      if (reduced) {
        gsap.set(panel, { display: "flex", clipPath: "inset(0 0 0% 0)" });
        gsap.set(links, { yPercent: 0, opacity: 1 });
      } else {
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.inOut" }
        );
        gsap.fromTo(
          links,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            delay: 0.2,
            ease: "expo.out",
          }
        );
      }

      const focusTimer = setTimeout(
        () => links[0]?.focus(),
        reduced ? 0 : 150
      );
      return () => clearTimeout(focusTimer);
    } else {
      if (reduced) {
        gsap.set(panel, { display: "none" });
      } else {
        gsap.to(panel, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
      document.body.style.overflow = "";
      if (wasOpenRef.current) {
        triggerRef.current?.focus();
      }
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      id="mobile-nav-panel"
      ref={panelRef}
      className="fixed inset-0 z-[90] hidden flex-col justify-between bg-[var(--color-bg)] px-[var(--gutter)] pb-10 pt-28"
      style={{ clipPath: "inset(0 0 100% 0)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <nav className="flex flex-col">
        {allLinks.map((link, i) => {
          const hash = link.href.split("#")[1];
          const isActive = activeHash === hash;
          const isHome = link === homeLink;
          const number = String(i).padStart(2, "0");
          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              aria-label={isHome ? link.label : undefined}
              className={`group flex items-center gap-4 overflow-hidden border-b border-[var(--color-border)] transition-colors ${
                isHome ? "py-4" : "py-5"
              } ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg)]"}`}
            >
              {isHome ? (
                <HomeIcon className="h-6 w-6 shrink-0 transition-colors group-hover:text-[var(--color-accent)]" />
              ) : (
                <>
                  <span className="w-6 shrink-0 font-mono text-xs text-[var(--color-accent)]">
                    {number}
                  </span>
                  <span className="font-display text-[10vw] leading-none transition-colors group-hover:text-[var(--color-accent)] sm:text-5xl">
                    {link.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 font-mono text-sm text-[var(--color-fg-muted)]">
          <a href={`mailto:${site.email}`} className="w-fit hover:text-[var(--color-accent)]">
            {site.email}
          </a>
          <div className="flex gap-4">
            <a href={site.facebook} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">
              Facebook
            </a>
          </div>
        </div>

        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          data-cursor="grow"
          className="flex items-center justify-center rounded-full bg-[var(--color-accent)] py-4 font-mono text-xs uppercase tracking-widest text-[var(--color-bg)] transition-transform active:scale-[0.98]"
        >
          Let&rsquo;s talk
        </a>
      </div>
    </div>
  );
}
