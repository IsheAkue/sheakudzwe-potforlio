"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only custom cursor. Any element can opt in to a "grow" or
 * labelled state via `data-cursor="grow"` / `data-cursor-text="View"`.
 * No-ops entirely on touch/coarse pointers.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<"default" | "grow" | "label">(
    "default"
  );
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (!target) return;
      const kind = target.dataset.cursor;
      const text = target.dataset.cursorText;
      if (text) {
        setLabel(text);
        setVariant("label");
      } else if (kind === "grow" || target.tagName === "A" || target.tagName === "BUTTON") {
        setVariant("grow");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (!target) return;
      setVariant("default");
      setLabel("");
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-fg)]/40 transition-[width,height,background-color,border-color] duration-300 ease-out ${
          variant === "grow"
            ? "h-14 w-14 border-[var(--color-accent)] bg-[var(--color-accent)]/10"
            : variant === "label"
              ? "h-20 w-20 border-[var(--color-accent)] bg-[var(--color-accent)]"
              : "h-8 w-8"
        }`}
      >
        {variant === "label" && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-bg)]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
