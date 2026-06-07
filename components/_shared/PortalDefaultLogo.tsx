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
      <img
        src="/logo.svg"
        alt="Stamford Open Data"
        className="h-11 w-auto shrink-0"
      />
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
