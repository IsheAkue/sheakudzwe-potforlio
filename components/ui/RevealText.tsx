"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

type RevealTextProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  splitBy?: "words" | "lines";
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
};

/**
 * Splits text and reveals it with a clipped upward motion. Falls back to
 * plain static text under prefers-reduced-motion (no split, no animation).
 */
export default function RevealText({
  children,
  as: Tag = "span",
  className,
  splitBy = "words",
  trigger = "scroll",
  delay = 0,
  stagger = 0.04,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = new SplitText(el, {
        type: splitBy,
        mask: splitBy,
        linesClass: "reveal-line",
        wordsClass: "reveal-word",
      });

      const targets = splitBy === "lines" ? split.lines : split.words;
      gsap.set(targets, { yPercent: 110, opacity: 0 });

      // The mask wrapper GSAP adds around each line/word is sized to the
      // (often tight) line-height these display headings use, so it clips
      // descenders (g/j/p/y/q) if left in place — revert it once the reveal
      // finishes so the text sits unclipped for the rest of the page's life.
      const anim = {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: "expo.out",
        onComplete: () => split.revert(),
      };

      if (trigger === "load") {
        gsap.to(targets, anim);
      } else {
        gsap.to(targets, {
          ...anim,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      return () => split.revert();
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
