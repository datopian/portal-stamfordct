import { useTheme } from "@/components/theme/theme-provider";
import Link from "next/link";

export default function ActionCard({ title, description, icon, href }) {
  const { theme } = useTheme();
  return (
    <Link
      href={href}
      className={`group flex w-full flex-col items-center rounded-[26px] bg-white px-6 py-10 text-center transition hover:-translate-y-1 hover:border-[var(--brand-green)] lg:px-10 lg:py-12 ${theme.styles.shadowMd}`}
    >
      {icon && (
        <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[44px] text-[var(--accent)] transition group-hover:bg-[var(--accent-light)] group-hover:text-[var(--brand-green)]">
          {icon}
        </span>
      )}

      <h2 className="mb-[14px] font-montserrat text-[18px] font-black uppercase tracking-[0.16em] text-[var(--dark)] group-hover:text-[var(--accent)] lg:text-[22px]">
        {title}
      </h2>
      <div className="max-w-[24ch] text-[15px] leading-6 text-[var(--gray-dark)]">
        {description}
      </div>
    </Link>
  );
}
