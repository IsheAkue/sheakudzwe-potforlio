import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProject, projects } from "@/lib/projects";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
    openGraph: { title: project.name, description: project.oneLiner },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);

  const theme = {
    ["--case-bg" as string]: project.colors.bg,
    ["--case-fg" as string]: project.colors.fg,
    ["--case-accent" as string]: project.colors.accent,
    ["--case-accent-soft" as string]: project.colors.accentSoft,
  };

  return (
    <article style={theme} className="bg-[var(--case-bg)] text-[var(--case-fg)]">
      <header className="relative overflow-hidden border-b border-[var(--case-fg)]/10 pb-16 pt-40 sm:pb-24">
        <div className="container">
          <Link
            href="/#work"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--case-fg)]/60 transition-colors hover:text-[var(--case-accent)]"
          >
            ← Back to work
          </Link>

          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--case-accent)]">
            {project.index} — {project.role}
          </p>

          <h1 className="max-w-4xl font-display text-[11vw] font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <RevealText splitBy="lines" trigger="load">
              {project.name}
            </RevealText>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-[var(--case-fg)]/70 sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--case-accent)] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[var(--case-bg)] transition-transform hover:scale-[1.03]"
              >
                Visit live site ↗
              </a>
            </MagneticButton>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--case-fg)]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--case-fg)]/60"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="container -mt-8 sm:-mt-12">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--case-fg)]/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
          <Image
            src={project.screenshot}
            alt={`Screenshot of the ${project.name} website`}
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[200px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--case-fg)]/40">
              {project.year}
            </p>
          </div>

          <div className="flex flex-col gap-16 sm:gap-20">
            {project.sections.map((section) => (
              <div
                key={section.heading}
                className="grid grid-cols-1 gap-4 border-t border-[var(--case-fg)]/10 pt-8 sm:grid-cols-[180px_1fr] sm:gap-10"
              >
                <h2 className="font-display text-xl sm:text-2xl">
                  {section.heading}
                </h2>
                {section.list ? (
                  <ul className="flex max-w-2xl flex-col gap-3 text-sm leading-relaxed text-[var(--case-fg)]/75 sm:text-base">
                    {section.body.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[var(--case-accent)]">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-[var(--case-fg)]/75 sm:text-base">
                    {section.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="grid grid-cols-1 gap-4 border-t border-[var(--case-fg)]/10 pt-8 sm:grid-cols-[180px_1fr] sm:gap-10">
              <h2 className="font-display text-xl sm:text-2xl">Deliverables</h2>
              <ul className="flex max-w-2xl flex-col gap-3 text-sm leading-relaxed text-[var(--case-fg)]/75 sm:text-base">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="text-[var(--case-accent)]">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={`/work/${next.slug}`}
        data-cursor-text="Next"
        className="group relative flex flex-col items-start justify-center gap-4 border-t border-[var(--case-fg)]/10 px-[var(--gutter)] py-20 transition-colors hover:bg-[var(--case-accent)]/[0.06] sm:py-28"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--case-fg)]/50">
          Next project
        </p>
        <h2 className="font-display text-[12vw] font-medium leading-none tracking-tight transition-colors group-hover:text-[var(--case-accent)] sm:text-6xl lg:text-7xl">
          {next.shortName} →
        </h2>
      </Link>
    </article>
  );
}
