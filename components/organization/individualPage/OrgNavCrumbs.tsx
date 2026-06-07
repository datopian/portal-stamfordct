import Link from "next/link";
import { RiHome3Line } from "react-icons/ri";

export default function OrgNavCrumbs({
  org,
}: {
  org: { name?: string; title?: string };
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-[var(--surface-border)] bg-white/90"
    >
      <ol className="custom-container flex items-center gap-1 overflow-x-auto py-4 text-sm text-[var(--gray-dark)] md:py-5">
        <li className="flex items-center gap-1.5 whitespace-nowrap">
          <Link
            href="/"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--surface-border)] text-[16px] text-[var(--dark)] transition hover:border-[var(--brand-green)] hover:text-[var(--dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
          >
            <RiHome3Line />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li aria-hidden="true" className="text-[var(--gray-mid)]">
          <Chevron />
        </li>
        <li className="whitespace-nowrap">
          <Link
            href="/organizations"
            className="font-semibold text-[var(--dark)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
          >
            Organizations
          </Link>
        </li>
        <li aria-hidden="true" className="text-[var(--gray-mid)]">
          <Chevron />
        </li>
        <li className="min-w-0 truncate font-semibold text-[var(--dark)]" aria-current="page">
          <span className="truncate">{org.title || org.name}</span>
        </li>
      </ol>
    </nav>
  );
}

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
