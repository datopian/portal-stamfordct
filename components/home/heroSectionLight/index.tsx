import SearchForm from "./SearchForm";

import {
  RiBarChartLine,
  RiFileCopy2Line,
  RiFunctionLine,
  RiTeamLine,
} from "react-icons/ri";
import { Stat } from "../heroSection/Stats";

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
    <div className="border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(238,242,246,0.95)_100%)]">
      <div className="custom-container mx-auto">
        <div className="flex flex-col gap-10 py-[36px] md:py-[72px] lg:flex-row lg:items-center lg:gap-12 lg:py-[96px]">
          <div className="lg:max-w-[560px] rounded-[28px] bg-[var(--dark)] px-8 py-8 text-white shadow-[0_36px_72px_-48px_rgba(15,28,48,0.8)] md:px-10 md:py-10">
            <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-white/70">
              <span className="h-px w-10 bg-[var(--brand-green)]" />
              Open Data Portal
            </span>
            <h1 className="flex flex-col font-montserrat text-[38px] font-black uppercase leading-[1.02] md:text-[58px]">
              <span>Find and Share</span>
              <span className="text-[var(--brand-green)]">Quality Data.</span>
            </h1>
            <p className="mb-[30px] mt-[14px] max-w-[34rem] text-[16px] leading-7 text-white/78 md:text-[19px]">
              Search, explore, and reuse public datasets published across
              Stamford services, departments, and initiatives.
            </p>

            <SearchForm />
          </div>
          <div className="flex w-full flex-wrap justify-center gap-4 lg:ml-auto lg:max-w-[420px] lg:justify-end">
            <Stat
              Icon={RiFileCopy2Line}
              href="/search"
              count={stats.datasetCount}
              label="Dataset"
            />
            {!!stats.visualizationCount && (
              <Stat
                Icon={RiBarChartLine}
                href="/search?type=visualization"
                count={stats.visualizationCount}
                label="Visualization"
              />
            )}
            <Stat
              Icon={RiFunctionLine}
              href="/groups"
              count={stats.groupCount}
              label="Group"
            />
            <Stat
              Icon={RiTeamLine}
              href="/organizations"
              count={stats.orgCount}
              label="Organization"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
