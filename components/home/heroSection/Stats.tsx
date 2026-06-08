import Link from "next/link";
import { IconType } from "react-icons";

export function Stat({
  Icon,
  href,
  count,
  label,
  className = "",
}: {
  Icon: IconType;
  href: string;
  count: number;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center rounded-[24px] border border-[var(--surface-border)] bg-white px-6 py-8 text-center shadow-[0_24px_56px_-42px_rgba(16,32,68,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-40px_rgba(16,32,68,0.35)] md:px-8 md:py-10 ${className}`}
    >
      <div className="flex w-full flex-col gap-3 items-center justify-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(16,32,68,0.05)] bg-[rgba(16,32,68,0.04)]">
          <Icon className="text-[28px] text-[var(--dark)]" aria-hidden={true} />
        </div>

        <div className="font-montserrat text-[38px] font-black leading-none text-[var(--dark)] md:text-[44px]">
          {count}
        </div>

        <div className="text-[12px] font-extrabold uppercase leading-none tracking-[0.24em] text-[var(--dark)]">
          {label}
          {count !== 1 ? "s" : ""}
        </div>
      </div>
    </Link>
  );
}
