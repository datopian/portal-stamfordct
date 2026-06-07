import Link from "next/link";

export default function PortalDefaultLogo({
  inverted = false,
}: {
  inverted?: boolean;
}) {
  const frameClass = inverted
    ? "border-white/15 bg-white/10"
    : "border-[var(--surface-border)] bg-white";
  const barClass = inverted ? "bg-white" : "bg-[var(--dark)]";
  const overlineClass = inverted ? "text-white/65" : "text-[var(--gray)]";
  const titleClass = inverted ? "text-white" : "text-[var(--dark)]";

  return (
    <Link
      href="/"
      aria-label="Stamford Open Data home"
      className="inline-flex items-center gap-3"
    >
      <span
        className={`relative flex h-12 w-12 shrink-0 items-end justify-center overflow-hidden rounded-xl border ${frameClass}`}
      >
        <span className="absolute inset-x-2 bottom-2 h-[5px] rounded-full bg-[var(--brand-green)]" />
        <span
          className={`absolute bottom-[13px] left-[12px] h-[18px] w-[4px] rounded-t-sm ${barClass}`}
        />
        <span
          className={`absolute bottom-[13px] left-[20px] h-[24px] w-[4px] rounded-t-sm ${barClass}`}
        />
        <span
          className={`absolute bottom-[13px] left-[28px] h-[14px] w-[4px] rounded-t-sm ${barClass}`}
        />
      </span>
      <span className="flex flex-col leading-none font-sans">
        <span className={`text-[9px] font-bold uppercase tracking-[0.34em] ${overlineClass}`}>
          City of
        </span>
        <span className={`text-[22px] font-black uppercase tracking-[0.08em] ${titleClass}`}>
          Stamford
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
          Open Data
        </span>
      </span>
    </Link>
  );
}
