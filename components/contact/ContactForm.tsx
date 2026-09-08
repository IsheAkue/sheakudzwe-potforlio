"use client";

import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full border-b border-[var(--color-border-strong)] bg-transparent py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] transition-colors focus:border-[var(--color-accent)] focus:outline-none sm:text-base";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const res = await fetch(site.formspreeUrl, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[280px] flex-col justify-center rounded-md border border-[var(--color-border)] p-8">
        <p className="font-display text-xl text-[var(--color-fg)] sm:text-2xl">
          Message sent.
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
          Thanks for reaching out — I&rsquo;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-md border border-[var(--color-border)] p-8"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me a bit about the project"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <MagneticButton className="self-start" strength={0.2}>
        <button
          type="submit"
          data-cursor="grow"
          disabled={status === "submitting"}
          className="rounded-full bg-[var(--color-fg)] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </MagneticButton>

      {status === "error" && (
        <p className="text-xs text-[var(--color-accent)]">
          Something went wrong — email me directly at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
