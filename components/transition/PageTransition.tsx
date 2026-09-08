"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isAnimating = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("/#")) return;
      if (anchor.target === "_blank") return;
      if (href === pathname || isAnimating.current) return;

      e.preventDefault();
      isAnimating.current = true;
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.55,
        ease: "expo.inOut",
        onComplete: () => router.push(href),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const raf = requestAnimationFrame(() => {
      gsap.to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.55,
        delay: 0.05,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(overlay, { transformOrigin: "bottom" });
          isAnimating.current = false;
        },
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[110] origin-bottom scale-y-0 bg-[var(--color-accent)]"
    />
  );
}
