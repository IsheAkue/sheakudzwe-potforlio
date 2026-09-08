"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";
import HeroLines from "@/components/hero/HeroLines";

export default function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      "[data-hero-fade]",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power2.out", stagger: 0.12 }
    );
    gsap.fromTo(
      "[data-hero-photo]",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-bg)]"
    >
      <HeroLines />

      <div className="container relative z-10 grid min-h-[100svh] grid-cols-1 items-center gap-2 pb-0 pt-32 sm:pt-36 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
        <div className="flex flex-col justify-center py-10 xl:py-24">
          <p
            data-hero-fade
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] opacity-0"
          >
            Web Developer — Based in Zimbabwe
          </p>

          <h1 className="font-display text-[8vw] font-medium leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-[5.5vw] xl:text-[2.6vw]">
            <RevealText as="span" className="block" splitBy="lines" trigger="load" delay={0.15}>
              I build websites
            </RevealText>
            <RevealText as="span" className="block text-[var(--color-fg-muted)]" splitBy="lines" trigger="load" delay={0.3}>
              and design digital experiences
            </RevealText>
            <RevealText as="span" className="block italic text-[var(--color-accent)]" splitBy="lines" trigger="load" delay={0.45}>
              that businesses run and rely on.
            </RevealText>
          </h1>

          <div
            data-hero-fade
            className="mt-10 flex max-w-md flex-col gap-6 opacity-0"
          >
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
              <span className="h-px w-10 bg-[var(--color-border-strong)]" />
              Scroll
            </div>
          </div>
        </div>

        <div
          data-hero-photo
          className="relative order-first mx-auto aspect-square w-44 overflow-hidden rounded-full border border-[var(--color-border-strong)] opacity-0 sm:w-56 md:w-64 xl:order-last xl:aspect-auto xl:h-[88svh] xl:w-full xl:max-w-none xl:self-end xl:justify-self-end xl:overflow-visible xl:rounded-none xl:border-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered as a plain isolated cutout asset, no Next.js image processing */}
          <img
            src="/images/sheakudzwe-hero.png"
            alt="Portrait of Sheakudzwe Moyo"
            width={1086}
            height={1448}
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 h-full w-full origin-top scale-125 object-cover object-top xl:origin-center xl:scale-100 xl:object-contain xl:object-right-bottom"
          />
        </div>
      </div>
    </section>
  );
}
