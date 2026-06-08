import { ReactNode } from "react";
import { useTheme } from "@/components/theme/theme-provider";

export default function SearchPageHero({
  eyebrow = "Open Data",
  title,
  titleAccent = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  children: ReactNode;
}) {
  const {
    theme: { styles },
  } = useTheme();

  return (
    <section className="relative border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(223,244,243,0.32)_42%,_rgba(238,244,246,0.96)_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[18%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,_rgba(114,202,204,0.13)_0%,_rgba(114,202,204,0)_72%)]" />
        <div className="absolute left-[24%] top-[14%] h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle,_rgba(138,214,29,0.1)_0%,_rgba(138,214,29,0)_70%)]" />
        <div className="absolute right-[-10%] top-[4%] h-[360px] w-[720px] rounded-[50%] bg-[linear-gradient(180deg,_rgba(114,202,204,0.14)_0%,_rgba(184,192,199,0.05)_56%,_rgba(114,202,204,0.02)_100%)]" />
      </div>

      <div className="custom-container relative py-10 md:py-12 lg:py-14">
        <div className="max-w-[840px] px-1">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gray-dark)]">
            <span className="h-px w-10 bg-[var(--brand-green)]" />
            {eyebrow}
          </span>

          <h1 className="text-[36px] font-black leading-[1.02] text-[var(--dark)] md:text-[56px]">
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="a11y-ignore-color-contrast text-[var(--brand-green)]">{titleAccent}</span>
              </>
            ) : null}
          </h1>
        </div>

        <div
          className={`mt-8 `}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
