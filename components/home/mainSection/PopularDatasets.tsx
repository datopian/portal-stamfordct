import Link from "next/link";
import { useTheme } from "@/components/theme/theme-provider";
import { Dataset } from "@/schemas/dataset.interface";

type DatasetLinkProps = Pick<Dataset, "title" | "metadata_modified">;

// Name is "PopularDatasets" but content is "Recent Datasets" - Parametrize this
export default function PopularDatasets({
  datasets,
}: {
  datasets: Array<Dataset>;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full rounded-[28px] bg-white p-8 text-black ${theme.styles.shadowSm}`}
    >
      <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--gray-dark)]">
        <div className="h-px w-10 bg-[var(--brand-green)]" />
        Most Popular Datasets
      </div>
      <h1 className="mt-6 font-montserrat text-4xl font-black text-[var(--dark)]">
        Highlights
      </h1>
      <div className="mt-2 flex flex-col">
        {datasets.map((dataset, index) => (
          <Link
            key={index}
            href={`/@${dataset.organization.name}/${dataset.name}`}
            className="mt-5 block rounded-2xl border border-transparent px-1 py-2 transition hover:border-[var(--surface-border)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            <DatasetLink
              key={dataset.id}
              title={dataset.title}
              metadata_modified={dataset.metadata_modified}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function DatasetLink({ title, metadata_modified }: DatasetLinkProps) {
  return (
    <div>
      <h2 className="font-montserrat text-xl font-bold text-[var(--dark)]">
        {title}
      </h2>
      <span className="mt-2 flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--gray-dark)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-3 w-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Last updated:{" "}
        {metadata_modified
          ? new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(metadata_modified))
          : ""}
      </span>
    </div>
  );
}
