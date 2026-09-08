"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";

const icons = {
  discover: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M15 15 20 20" />
    </>
  ),
  design: <path d="M4 20l1-4L16 5l3 3L8 19l-4 1z" />,
  build: (
    <>
      <path d="M8 6 3 12l5 6" />
      <path d="M16 6l5 6-5 6" />
    </>
  ),
  launch: (
    <>
      <path d="M6 18 18 6" />
      <path d="M9 6h9v9" />
    </>
  ),
};

const steps = [
  {
    index: "01",
    title: "Brief and Discovery",
    body: "You tell me what you need — a few messages or a quick call. I send back a clear scope and a fixed starting price.",
    icon: icons.discover,
  },
  {
    index: "02",
    title: "Design",
    body: "I work out structure, visual identity and interaction, sharing previews early so you can steer the direction before anything's locked in.",
    icon: icons.design,
  },
  {
    index: "03",
    title: "Build",
    body: "I build it fast and clean — responsive, quick to load, and ready for search engines from day one.",
    icon: icons.build,
  },
  {
    index: "04",
    title: "Launch",
    body: "We deploy and go live on your domain, and I hand over a fully functional site — then stay reachable for the fixes and small changes that come after.",
    icon: icons.launch,
  },
];

export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !listRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-step-row]");

      rows.forEach((row) => {
        const line = row.querySelector("[data-progress-line]");
        const badge = row.querySelector("[data-step-badge]");
        const content = row.querySelector("[data-step-content]");

        gsap.set(content, { opacity: 0, y: 20 });

        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        if (badge) {
          gsap.to(badge, {
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
            duration: 0.4,
            scrollTrigger: {
              trigger: row,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 65%",
                end: "bottom 45%",
                scrub: 0.5,
              },
            }
          );
        }
      });
    },
    { scope: listRef }
  );

  return (
    <section id="process" className="relative border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="container mb-14 sm:mb-20">
        <h2 className="font-display text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
          <RevealText splitBy="lines">How it goes</RevealText>
        </h2>
      </div>

      <div ref={listRef}>
        {steps.map((step, i) => (
          <div
            key={step.index}
            data-step-row
            className="relative border-t border-[var(--color-border)] py-8 sm:py-10"
          >
            <div className="container flex gap-5 sm:gap-8">
              <div className="relative shrink-0 self-stretch">
                <div
                  data-step-badge
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-fg-muted)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </svg>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-14 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-[var(--color-border)] sm:h-[calc(100%+2.5rem)]">
                    <div
                      data-progress-line
                      className="h-full w-full origin-top scale-y-0 bg-[var(--color-accent)]"
                    />
                  </div>
                )}
              </div>

              <div data-step-content className="max-w-2xl pt-1">
                <span className="font-mono text-xs text-[var(--color-fg-faint)]">
                  {step.index}
                </span>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-fg)] sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
