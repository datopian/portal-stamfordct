import { getTimeAgo } from "@/lib/utils";
import { Group } from "@portaljs/ckan";
import DatasetDescription from "@/components/dataset/individualPage/DatasetDescription";

export default function GroupPageHero({ group }: { group: Group }) {
  const heroMeta: string[] = [];

  heroMeta.push(
    `${group.package_count || 0} Dataset${group.package_count === 1 ? "" : "s"}`
  );

  if (group.created) {
    heroMeta.push(`Created ${getTimeAgo(group.created)}`);
  }

  return (
    <section className="relative overflow-hidden border-b border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(238,244,246,0.96)_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-12%] top-[16%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,_rgba(112,207,203,0.08)_0%,_rgba(112,207,203,0)_72%)] md:h-[300px] md:w-[300px]" />
        <div className="absolute right-[-14%] top-[2%] h-[320px] w-[680px] rounded-[50%] border border-white/50 bg-[linear-gradient(180deg,_rgba(112,207,203,0.12)_0%,_rgba(112,207,203,0.02)_100%)] md:h-[420px] md:w-[860px]" />
        <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[url('/themes/lighter/assets/background-blur.png')] bg-cover bg-center opacity-60" />
      </div>

      <div className="custom-container relative py-10 md:py-12 lg:py-14">
        <div className="max-w-5xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--gray-dark)]">
            <span className="h-px w-10 bg-[var(--brand-green)]" />
            Group
          </span>

          <h1 className="max-w-4xl text-[30px] font-black leading-[1.02] text-[var(--dark)] md:text-[42px] lg:text-[50px]">
            {group.title}
          </h1>

          {group.description ? (
            <DatasetDescription
              content={group.description}
              showLabel={false}
              className="mt-4 max-w-3xl border-white/70 bg-white/80 backdrop-blur-sm"
            />
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2.5">
            {heroMeta.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-[var(--surface-border)] bg-white/92 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-dark)] shadow-[0_18px_40px_-32px_rgba(16,32,68,0.75)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
