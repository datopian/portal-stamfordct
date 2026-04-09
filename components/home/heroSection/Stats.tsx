import Link from "next/link";

export function Stat({
  Icon,
  label,
  href,
  count,
}: {
  Icon: React.FC<{ className?: string; width?: number }>;
  label: string;
  href: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[148px] min-w-[148px] flex-1 flex-col items-center justify-center rounded-full border border-[var(--surface-border)] bg-white px-4 text-center transition hover:-translate-y-1 hover:border-[var(--brand-green)] hover:text-[var(--dark)] hover:shadow-[0_20px_48px_-32px_rgba(17,32,57,0.5)]"
    >
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)] transition group-hover:bg-[var(--accent-light)] group-hover:text-[var(--brand-green)]">
        <Icon className="text-[32px]" width={32} />
      </span>
      <div className="flex flex-col gap-0">
        <span className="font-montserrat text-[30px] font-black leading-none text-[var(--dark)]">
          {count}
        </span>
        <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gray-dark)]">
          {label}
          {count > 1 ? "s" : ""}
        </span>
      </div>
    </Link>
  );
}
