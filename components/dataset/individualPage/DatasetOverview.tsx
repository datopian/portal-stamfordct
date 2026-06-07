import { Dataset } from "@portaljs/ckan";

export default function DatasetOverview({ dataset }: { dataset: Dataset }) {
  const items = [
    {
      label: "Author",
      value: dataset.author
        ? dataset.author
        : dataset.organization
          ? dataset.organization.title
          : "N/A",
    },
    {
      label: "Author Email",
      value: dataset.author_email ? dataset.author_email : "N/A",
    },
    {
      label: "Group",
      value:
        dataset.groups.length > 0
          ? dataset.groups.map((group) => group.title).join(", ")
          : "N/A",
    },
    {
      label: "Dataset Date",
      value: dataset.metadata_created
        ? new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(dataset.metadata_created))
        : "N/A",
    },
    {
      label: "Version",
      value: dataset.version ? dataset.version : "1.0",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[22px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] px-4 py-4"
        >
          <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
            {item.label}
          </h4>
          <p className="mt-2 text-sm font-semibold leading-7 text-[var(--dark)]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
