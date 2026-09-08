"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Thin decorative line art behind the hero headline — two large arcs and a
 * small hollow circle, drawn in once on load. Purely ambient: renders fully
 * drawn and static under prefers-reduced-motion.
 */
export default function HeroLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg || prefersReducedMotion()) return;

      const paths = svg.querySelectorAll<SVGPathElement | SVGCircleElement>(
        "[data-line]"
      );

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2.2,
        stagger: 0.25,
        delay: 0.2,
        ease: "power3.inOut",
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 1600 1000"
      className="absolute inset-0 h-full w-full text-[var(--color-fg)]"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        data-line
        d="M -100 850 C 300 650, 500 1000, 900 750 S 1500 250, 1750 350"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <path
        data-line
        d="M 1650 60 C 1300 150, 1250 500, 950 480 S 550 700, 250 620"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <circle
        data-line
        cx="1360"
        cy="190"
        r="95"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
}
