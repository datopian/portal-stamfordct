import Link from "next/link";
import { Resource, Tag } from "@portaljs/ckan";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { getTimeAgo } from "@/lib/utils";
import { Dataset } from "@/schemas/dataset.interface";
import { RiExternalLinkLine } from "react-icons/ri";


function uniqueFormat(resources) {
  const formats = resources.map((item: Resource) => item.format);
  return [...new Set(formats)];
}

export default function DatasetInfo({
  dataset,
}: {
  dataset: Dataset;
}) {
  const metaFormats = [
    { format: "jsonld", label: "JSON-LD" },
    { format: "rdf", label: "RDF" },
    { format: "ttl", label: "TTL" },
  ];

  return (
    <div className="rounded-[28px] border border-[var(--surface-border)] bg-white px-5 py-5 shadow-[0_30px_70px_-50px_rgba(16,32,68,0.5)] md:px-6 md:py-6">
      <div className="flex flex-col gap-y-3 rounded-[22px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] px-4 py-4 text-[15px] font-medium text-[var(--gray-dark)]">
        {!!dataset.resources.length && (
          <span className="inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 inline h-5 w-5 text-[var(--dark)]"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
            Files: {dataset.resources.length}
          </span>
        )}

        {!!dataset.resources.length && (
          <span className="inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 inline h-5 w-5 text-[var(--dark)]"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Formats: {uniqueFormat(dataset.resources).join(", ")}
          </span>
        )}

        <span className="inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1 inline h-5 w-5 text-[var(--dark)]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          Created: {dataset.metadata_created && getTimeAgo(dataset.metadata_created)}
        </span>

        <span className="inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1 inline h-5 w-5 text-[var(--dark)]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Updated: {dataset.metadata_modified && getTimeAgo(dataset.metadata_modified)}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-y-4">
        {dataset.type === "visualization" && !!dataset.external_url && (
          <a
            href={dataset.external_url}
            className="inline-flex items-center cursor-pointer w-fit my-2 gap-1.5 text-sm py-2 text-[var(--accent)] transition hover:text-[var(--darkaccent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="underline">Access Visualization</span>
            <RiExternalLinkLine className="h-4 w-4" aria-hidden="true" />
            
          </a>
        )}

        {dataset.source && dataset.source.length > 0 && (
          <div className="rounded-[22px] border border-[var(--surface-border)] px-4 py-4">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
              Source{dataset.source.length > 1 ? "s" : ""}
            </h3>

            <div className="flex flex-col gap-1.5">
              {dataset.source.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 break-all text-sm text-[var(--accent)] transition hover:text-[var(--darkaccent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
                >
                  <RiExternalLinkLine
                    className="mt-1 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="underline">{url}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {!!dataset.tags?.length && (
        <div className="my-6">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {dataset.tags?.map((tag: Tag) => (
              <span
                className="rounded-full border border-[rgba(38,56,95,0.1)] bg-[rgba(38,56,95,0.06)] px-3 py-1.5 text-xs font-semibold text-[var(--dark)]"
                key={tag.id}
              >
                {tag.display_name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
          Export metadata
        </h3>
        <div className="flex flex-wrap gap-2">
          {metaFormats.map((item) => (
            <Link
              key={item.format}
              href={`${process.env.NEXT_PUBLIC_DMS}/dataset/${dataset.name}.${item.format}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--surface-border)] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--dark)] transition hover:border-[var(--brand-green)] hover:text-[var(--darkaccent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
            >
              <ArrowDownTrayIcon
                className="h-4 w-4 text-[var(--accent)] transition group-hover:text-[var(--darkaccent)]"
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
