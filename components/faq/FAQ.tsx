"use client";

import { useState } from "react";
import RevealText from "@/components/ui/RevealText";

const faqs = [
  {
    q: "What's included when you build a site for me?",
    a: "Depends on the package — every build ships responsive, SSL-secured and ready for search, with the specifics (pages, CMS, integrations) scoped to whichever tier fits your business. See Services for the full breakdown.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects land in about a week once I have your content and assets — a single landing page can be quicker, a multi-page site takes a bit longer. I'll give you a realistic timeline before we start.",
  },
  {
    q: "Do you handle domains and hosting?",
    a: "I'll recommend and set up your domain and hosting for you, or work with what you already have — but those are billed directly by the provider you use, not by me. My monthly maintenance fee is separate, and only covers the site itself.",
  },
  {
    q: "How does pricing and payment work?",
    a: "The ranges on the Services section are starting points — final scope and price get confirmed in writing before any work begins. From there it's fixed: a 50% deposit to start, the remaining 50% due on launch, no surprises partway through.",
  },
  {
    q: "Do I have to take the monthly maintenance plan?",
    a: "No — some clients just want the site designed and built, and that's completely fine. Maintenance is there if you want ongoing updates and support, but it's optional, not bundled into the build.",
  },
  {
    q: "Do you work with clients outside Zimbabwe?",
    a: "Yes — CB Connexions, one of the case studies on this site, is based in South Africa. Distance isn't a blocker; we handle everything over email, WhatsApp or a call.",
  },
  {
    q: "What happens after the site is live?",
    a: "You get a fully working site handed over on your domain, and I stay reachable for fixes and small changes in the days right after launch. Past that, it depends on whether you're on the maintenance plan: if you are, that covers ongoing updates and support — $20/mo for a Starter site, $30/mo for Business Growth — separate from whatever you pay your host or domain registrar, and either of us can end that arrangement with 30 days' notice. If you're not on it, the site is yours to run as-is, and you can always add maintenance later if you need it. Either way, you keep full control of your domain and files.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="container">
        <h2 className="mb-14 font-display text-4xl tracking-tight text-[var(--color-fg)] sm:mb-20 sm:text-5xl">
          <RevealText splitBy="lines">Common questions</RevealText>
        </h2>

        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              open={openIndex === i}
              className="group border-t border-[var(--color-border)] py-6 last:border-b"
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? null : i);
                }}
                className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-[var(--color-fg)] sm:text-xl [&::-webkit-details-marker]:hidden"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-xl text-[var(--color-fg-faint)] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
