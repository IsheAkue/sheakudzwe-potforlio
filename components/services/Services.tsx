import { servicePackages } from "@/lib/services";
import RevealText from "@/components/ui/RevealText";

export default function Services() {
  return (
    <section id="services" className="relative border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="container mb-14 sm:mb-20">
        <h2 className="font-display text-4xl tracking-tight text-[var(--color-fg)] sm:text-5xl">
          <RevealText splitBy="lines">Services</RevealText>
        </h2>
      </div>

      <div className="mb-10 sm:mb-14">
        {servicePackages.map((pkg) => (
          <div
            key={pkg.index}
            className="border-t border-[var(--color-border)] py-8 sm:py-10"
          >
            <div className="container grid grid-cols-1 gap-4 sm:grid-cols-[80px_1.4fr_1fr] sm:items-start sm:gap-8">
              <span className="font-mono text-xs text-[var(--color-fg-faint)]">
                {pkg.index}
              </span>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
                  {pkg.idealFor}
                </p>
                <h3 className="mb-2 font-display text-2xl text-[var(--color-fg)] sm:text-3xl">
                  {pkg.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
                  {pkg.body}
                </p>
              </div>
              <div className="flex flex-col gap-1 sm:items-end sm:text-right">
                <span className="font-display text-xl text-[var(--color-fg)] sm:text-2xl">
                  {pkg.oneTime}
                </span>
                <span className="font-mono text-xs text-[var(--color-fg-faint)]">
                  {pkg.maintenance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
