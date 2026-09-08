import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

const links = [
  { label: "Facebook", href: site.facebook },
  { label: "WhatsApp", href: site.whatsappHref },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-border)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, var(--color-accent-tint), transparent)",
        }}
      />

      <div className="container grid grid-cols-1 gap-16 py-28 sm:py-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col items-start">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Get in touch
          </p>

          <h2 className="max-w-3xl font-display text-[10vw] font-medium leading-[0.95] tracking-tight text-[var(--color-fg)] sm:text-6xl lg:text-7xl">
            <RevealText splitBy="lines">
              Have a real project? Let&rsquo;s build it properly.
            </RevealText>
          </h2>

          <MagneticButton className="mt-12 inline-block" strength={0.25}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="grow"
              className="group inline-flex items-baseline gap-3 border-b border-[var(--color-border-strong)] pb-2 font-display text-2xl text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:text-4xl"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          </MagneticButton>

          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>

      <div className="container flex flex-col gap-3 border-t border-[var(--color-border)] py-8 font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          &copy; {year} {site.name}
        </span>
        <span>Built with Next.js &amp; GSAP</span>
      </div>
    </footer>
  );
}
