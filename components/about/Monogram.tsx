export default function Monogram() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[var(--color-bg-raised)]">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="250"
          r="168"
          stroke="var(--color-fg)"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="250"
          r="126"
          stroke="var(--color-accent)"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <path
          d="M20 430 C110 360 150 180 210 40"
          stroke="var(--color-accent)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      </svg>

      <p className="relative font-display text-[20vw] font-medium leading-none tracking-tight sm:text-8xl">
        <span className="text-[var(--color-accent)]">S</span>
        <span className="text-[var(--color-fg)]">Z</span>
        <span className="text-[var(--color-accent)]">M</span>
      </p>

      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-fg-faint)]">
        Sheakudzwe Moyo
      </span>
    </div>
  );
}
