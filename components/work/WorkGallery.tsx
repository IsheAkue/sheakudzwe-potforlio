"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/lib/projects";
import ProjectPanel from "./ProjectPanel";

function GalleryHead({
  dotsRef,
  counterRef,
}: {
  dotsRef?: React.RefObject<HTMLSpanElement[]>;
  counterRef?: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
          /work
        </p>
        <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
            Selected
          </span>
          <span className="font-display text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
            Cases
          </span>
          <span className="font-mono text-[11px] normal-case tracking-normal text-[var(--color-fg-faint)] sm:text-sm">
            — preview of my most recent projects
          </span>
        </h2>
      </div>
      {dotsRef && (
        <div className="flex items-center gap-3 pb-2 font-mono text-xs text-[var(--color-fg-faint)]">
          <div className="flex gap-1.5">
            {projects.map((p, i) => (
              <span
                key={p.slug}
                ref={(el) => {
                  if (el) dotsRef.current[i] = el;
                }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg)] transition-opacity duration-300"
                style={{ opacity: i === 0 ? 1 : 0.3 }}
              />
            ))}
          </div>
          <span ref={counterRef}>
            01 / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Pinned horizontal scroll-through gallery for desktop + motion-safe users.
 * Scrolling vertically through this section's height drives a scrubbed
 * horizontal traverse across full-viewport project slides, with a dot +
 * counter progress readout. Falls back to the plain stacked ProjectPanel
 * list on mobile/tablet and under prefers-reduced-motion — pinning a
 * scroll-jacked gallery on a touch device fights native scroll feel.
 */
export default function WorkGallery() {
  const [galleryEnabled, setGalleryEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const widthQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );
    const update = () =>
      setGalleryEnabled(widthQuery.matches && motionQuery.matches);
    update();
    widthQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      widthQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!galleryEnabled || !wrap || !track) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      const total = projects.length;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              total - 1,
              Math.round(self.progress * (total - 1))
            );
            dotsRef.current.forEach((dot, i) => {
              if (dot) dot.style.opacity = i === idx ? "1" : "0.3";
            });
            if (counterRef.current) {
              counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [galleryEnabled], scope: wrapRef }
  );

  if (!galleryEnabled) {
    return (
      <section
        id="work"
        className="relative scroll-mt-28 border-t border-[var(--color-border)] py-24 sm:py-32"
      >
        <div className="container mb-14 sm:mb-20">
          <GalleryHead />
        </div>
        <div>
          {projects.map((project) => (
            <ProjectPanel key={project.slug} project={project} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      className="relative scroll-mt-28 border-t border-[var(--color-border)] py-24 sm:py-32"
    >
      <div ref={wrapRef} className="relative h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 w-screen pt-10 sm:pt-14">
          <div className="container">
            <GalleryHead dotsRef={dotsRef} counterRef={counterRef} />
          </div>
        </div>

        <div ref={trackRef} className="flex h-full">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-cursor-text="View"
              className="group relative block h-full w-screen shrink-0"
              style={{
                ["--panel-accent" as string]: project.colors.accent,
                background: `radial-gradient(140% 100% at 100% 100%, ${project.colors.accent}1f, transparent 60%)`,
              }}
            >
              <div className="container flex h-full flex-col justify-end pb-20 pt-64">
                <div className="mb-auto flex justify-start pt-6 sm:pt-10">
                  {/* eslint-disable-next-line @next/next/no-img-element -- real client logo asset, rendered as-is */}
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="h-14 w-auto max-w-[70vw] object-contain opacity-90 sm:h-20"
                  />
                </div>

                <span className="mb-4 font-mono text-xs text-[var(--color-fg-faint)]">
                  {project.index}
                </span>
                <h3 className="font-display text-[13vw] font-medium leading-[0.9] tracking-tight text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--panel-accent)] lg:text-8xl">
                  {project.shortName}
                </h3>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-sm text-sm text-[var(--color-fg-muted)] sm:text-base">
                    {project.tagline}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
