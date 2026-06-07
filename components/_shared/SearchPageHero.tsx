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
    <section className="relative border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(238,244,246,0.96)_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[18%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,_rgba(112,207,203,0.09)_0%,_rgba(112,207,203,0)_72%)]" />
        <div className="absolute right-[-10%] top-[4%] h-[360px] w-[720px] rounded-[50%] bg-[linear-gradient(180deg,_rgba(112,207,203,0.11)_0%,_rgba(112,207,203,0.02)_100%)]" />
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
                <span className="text-[var(--accent)]">{titleAccent}</span>
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
