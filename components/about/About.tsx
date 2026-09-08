import RevealText from "@/components/ui/RevealText";
import Monogram from "./Monogram";

export default function About() {
  return (
    <section id="about" className="relative border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm lg:max-w-none">
          <Monogram />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            /about
          </p>
          <h2 className="mb-8 font-display text-3xl leading-tight tracking-tight text-[var(--color-fg)] sm:text-4xl lg:text-5xl">
            <RevealText splitBy="lines">
              Passionate Digital Designer and Developer
            </RevealText>
          </h2>

          <div className="flex flex-col gap-5 text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
            <p>
              Hi. I&rsquo;m Sheakudzwe, a full-stack web developer based in
              Zimbabwe, working at the intersection of design and code. I
              design, build, and deploy digital experiences with a focus on
              making them feel as good as they function.
            </p>
            <p>
              I care about a site actually doing its job — loading fast,
              communicating your business clearly, and giving visitors
              exactly what they came for without anything getting in the
              way.
            </p>
            <p>
              My mantra is simple:{" "}
              <em className="text-[var(--color-fg)]">
                design with intent and build a solution with purpose
              </em>
              . Every business has different problems, goals and people to
              serve, so every solution needs to be tailored to the
              business&rsquo;s specific needs. Nothing goes into a site
              unless it earns its place — if it doesn&rsquo;t serve the
              user or the business, it doesn&rsquo;t belong.
            </p>
            <p>
              What I bring is real, shipped work, a clear point of view on
              what makes a website good, and an appetite for the next
              project that pushes me to figure out something I
              don&rsquo;t already know how to do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
