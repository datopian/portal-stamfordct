import { Resource } from "@/schemas/resource.interface";
import Link from "next/link";
import { RiDownload2Fill, RiEyeLine } from "react-icons/ri";
import ResourcesBadges from "../_shared/ResourcesBadges";

interface ResourcesListProps {
  resources: Array<Resource>;
  orgName: string;
  datasetName: string;
}

export default function ResourcesList({
  resources,
  orgName,
  datasetName,
}: ResourcesListProps) {
  return (
    <div className="w-full py-6 md:py-8">

      <div className="flex max-h-[680px] flex-col gap-4 overflow-y-auto pr-1">
        {resources.map((resource: Resource) => (
          <div
            key={resource.id}
            className="rounded-[24px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] px-4 py-4 shadow-[0_18px_40px_-34px_rgba(16,32,68,0.55)] md:px-5"
          >
            <article className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-3 pr-3 text-lg font-bold leading-tight text-[var(--dark)]">
                  {resource.name || "No title"}
                </h4>
                <p className="mt-2 line-clamp-4 max-w-3xl text-sm leading-7 text-[var(--gray-dark)]">
                  {resource.description || "No description"}
                </p>
                <div className="mt-3">
                  <ResourcesBadges resources={[resource]} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                {(["csv", "pdf", "xlsx", "xls", "geojson"].includes(
                  resource.format.toLowerCase()
                ) ||
                  resource?.iframe) && (
                  <Link
                    href={`/@${orgName}/${datasetName}/r/${resource.id}`}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-[var(--surface-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--dark)] shadow-sm transition hover:border-[var(--brand-green)] hover:bg-[rgba(121,193,67,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
                  >
                    <RiEyeLine aria-hidden="true" />
                    <span>Preview</span>
                  </Link>
                )}
                {resource.url && (
                  <Link
                    href={resource.url}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[var(--dark)] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
                  >
                    <RiDownload2Fill aria-hidden="true" />
                    <span>Download</span>
                  </Link>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
