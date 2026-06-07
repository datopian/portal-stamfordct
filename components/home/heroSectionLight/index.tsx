import SearchForm from "./SearchForm";

import {
  RiFileCopy2Line,
  RiGridLine,
  RiTeamLine,
} from "react-icons/ri";
import { Stat } from "../heroSection/Stats";

const heroBgImg =
  process.env.NEXT_PUBLIC_HERO_BG_IMG || process.env.NEXT_PUBLIC_HERO_BG_IMAGE;

export default function HeroSectionLight({
  stats,
}: {
  stats: {
    orgCount: number;
    groupCount: number;
    datasetCount: number;
    visualizationCount: number;
  };
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(238,244,246,0.98)_100%)]">
      {heroBgImg ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-right bg-no-repeat bg-contain opacity-70 max-md:opacity-25"
            style={{ backgroundImage: `url('${heroBgImg}')` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.98)_0%,_rgba(255,255,255,0.82)_38%,_rgba(255,255,255,0.38)_68%,_rgba(238,244,246,0.18)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80"
        >
          <div className="absolute left-[-10%] top-[18%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(112,207,203,0.08)_0%,_rgba(112,207,203,0)_72%)]" />
          <div className="absolute right-[-8%] top-[8%] h-[500px] w-[820px] rounded-[50%] border border-white/60 bg-[linear-gradient(180deg,_rgba(112,207,203,0.14)_0%,_rgba(112,207,203,0.03)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[380px] bg-[url('/themes/lighter/assets/background-blur.png')] bg-cover bg-center opacity-70" />
        </div>
      )}

      <div className="custom-container relative mx-auto">
        <div className="grid min-h-[620px] items-center gap-10 py-10 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-12 lg:py-16">
          <div className="max-w-[540px] rounded-[32px] bg-[linear-gradient(145deg,_#13264d_0%,_#102044_100%)] px-8 py-9 text-white shadow-[0_40px_80px_-48px_rgba(16,32,68,0.95)] md:px-10 md:py-11">
            <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-white/70">
              <span className="h-px w-10 bg-[var(--brand-green)]" />
              Open Data Portal
            </span>

            <h1 className="flex flex-col font-montserrat text-[36px] font-black uppercase leading-[0.98] tracking-[0.01em] md:text-[58px]">
              <span>Find and</span>
              <span>Share</span>
              <span className="text-[var(--brand-green)]">Quality</span>
              <span className="text-[var(--brand-green)]">Data.</span>
            </h1>

            <p className="mb-8 mt-6 max-w-[28rem] text-[16px] leading-8 text-white/84">
              Search, explore, and reuse public datasets published across
              Stamford services, departments, and initiatives.
            </p>

            <SearchForm />
          </div>

          <div className="grid w-full grid-cols-2 gap-4 self-center lg:max-w-[500px] lg:justify-self-end">
            <Stat
              Icon={RiFileCopy2Line}
              href="/search"
              count={stats.datasetCount}
              label="Dataset"
              className="min-h-[170px]"
            />

            <Stat
              Icon={RiGridLine}
              href="/groups"
              count={stats.groupCount}
              label="Group"
              className="min-h-[170px]"
            />

            <Stat
              Icon={RiTeamLine}
              href="/organizations"
              count={stats.orgCount}
              label="Organization"
              className="min-h-[170px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
