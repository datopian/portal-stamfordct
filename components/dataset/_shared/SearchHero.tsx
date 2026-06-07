import { useTheme } from "@/components/theme/theme-provider";
import { Dispatch, SetStateAction } from "react";

export default function SearchHero({
  title,
  searchValue,
  onChange,
}: {
  title: string;
  searchValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  const {
    theme: { styles },
  } = useTheme();
  return (
    <section className="relative overflow-hidden border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(223,244,243,0.34)_42%,_rgba(237,245,244,0.96)_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-10%] top-[18%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,_rgba(114,202,204,0.14)_0%,_rgba(114,202,204,0)_72%)]" />
        <div className="absolute left-[24%] top-[14%] h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle,_rgba(138,214,29,0.1)_0%,_rgba(138,214,29,0)_68%)]" />
        <div className="absolute right-[-12%] top-[4%] h-[360px] w-[720px] rounded-[50%] bg-[linear-gradient(180deg,_rgba(114,202,204,0.16)_0%,_rgba(184,192,199,0.07)_54%,_rgba(114,202,204,0.02)_100%)]" />
      </div>

      <div className="custom-container  relative py-10 md:py-12 lg:py-14">
        <div className="max-w-[840px] px-1">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gray-dark)]">
            <span className="h-px w-10 bg-[var(--brand-green)]" />
            Explore
          </span>
          <h1 className="text-[30px] font-black leading-[1.02] text-[var(--dark)] md:text-[56px]">
            {title}
          </h1>
        </div>

        <div className={`mt-8 md:mt-10 `}>
          <form
            className="flex min-h-[56px] sm:min-h-[70px] flex-col  lg:flex-row lg:items-center"
            onSubmit={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <input
              type="text"
              placeholder={`Search for ${title}`}
              className="grow rounded-full border border-[rgba(114,202,204,0.28)] bg-[rgba(255,255,255,0.96)] px-5 py-2 text-[var(--dark)] shadow-[0_16px_32px_-28px_rgba(25,37,76,0.22)] placeholder:text-[var(--gray)] outline-0 focus:border-[var(--brand-green)] sm:py-4"
              id="search2"
              name="search"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              value={searchValue}
              aria-label={`Search ${title}`}
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
/*<div className="grid md:grid-cols-2 mx-auto items-center grow custom-container grow">
      <div className="col-span-1">
        <h1 className="text-5xl font-black ">{title}</h1>
        <input
          id="search2"
          type="search"
          name="search"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={searchValue}
          placeholder="Search..."
          aria-label="Search"
          className="w-3/4 px-3 py-4 mt-8 border border-accent rounded-md leading-none bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent"
        />
      </div>
    </div>*/
