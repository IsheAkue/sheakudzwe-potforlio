"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectPanel({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-text="View"
      className="group relative block border-t border-[var(--color-border)] py-10 sm:py-14"
      style={{ ["--panel-accent" as string]: project.colors.accent }}
    >
      <span
        className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--panel-accent)]/[0.08] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
        aria-hidden="true"
      />

      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <span className="font-mono text-xs text-[var(--color-fg-faint)]">
            {project.index}
          </span>
          <h3 className="font-display text-[11vw] font-medium leading-none tracking-tight text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--panel-accent)] sm:text-6xl lg:text-7xl">
            {project.shortName}
          </h3>
        </div>

        <div className="flex flex-col gap-3 pl-0 sm:max-w-xs sm:items-end sm:pl-6 sm:text-right">
          <p className="text-sm text-[var(--color-fg-muted)]">
            {project.tagline}
          </p>
          <ul className="flex flex-wrap gap-2 sm:justify-end">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--panel-accent)] transition-transform duration-300 group-hover:translate-x-1">
            View project
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
