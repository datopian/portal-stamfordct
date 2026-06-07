import { getTimeAgo } from "@/lib/utils";
import { Resource } from "@/schemas/resource.interface";
import DatasetDescription from "./DatasetDescription";

function formatResourceSize(size?: number | string | null) {
  if (size === null || size === undefined || size === "") {
    return undefined;
  }

  if (typeof size === "string") {
    return size;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let value = size / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const roundedValue = value >= 10 ? Math.round(value) : value.toFixed(1);
  return `${roundedValue} ${units[unitIndex]}`;
}

export default function ResourcePageHero({
  resource,
}: {
  resource: Resource;
}) {
  const heroMeta: string[] = [];

  if (resource.format) {
    heroMeta.push(resource.format.toUpperCase());
  }

  const readableSize = formatResourceSize(resource.size);
  if (readableSize) {
    heroMeta.push(`Size ${readableSize}`);
  }

  if (resource.metadata_modified) {
    heroMeta.push(`Updated ${getTimeAgo(resource.metadata_modified)}`);
  } else if (resource.created) {
    heroMeta.push(`Created ${getTimeAgo(resource.created)}`);
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
            Resource
          </span>

          <h1 className="max-w-4xl text-[30px] font-black leading-[1.02] text-[var(--dark)] md:text-[42px] lg:text-[50px]">
            {resource.name || "Resource"}
          </h1>

          {resource.description ? (
            <DatasetDescription
              content={resource.description}
              showLabel={false}
              className="mt-4 max-w-3xl border-white/70 bg-white/80 backdrop-blur-sm"
            />
          ) : null}

          {!!heroMeta.length && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {heroMeta.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--badge-text)] shadow-[0_18px_40px_-32px_rgba(16,32,68,0.75)]"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
