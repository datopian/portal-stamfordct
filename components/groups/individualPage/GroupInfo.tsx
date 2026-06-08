import getConfig from "next/config";
import Image from "next/image";
import { Tag } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import { getTimeAgo } from "@/lib/utils";

export default function GroupInfo({ group }: { group: Group }) {
  const url = group.image_display_url ? new URL(group.image_display_url) : undefined;
  const imageSrc =
    group.image_display_url &&
    url &&
    (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname)
      ? group.image_display_url
      : "/images/logos/datasets.png";

  return (
    <div className="rounded-[28px] border border-[var(--surface-border)] bg-white px-5 py-5 shadow-[0_30px_70px_-50px_rgba(16,32,68,0.5)] md:px-6 md:py-6">
      <div className="flex items-center gap-4">
        <div className="overflow-hidden rounded-[22px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] p-3">
          <Image
            width={96}
            height={96}
            src={imageSrc}
            alt={`${group.name}-collection`}
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-y-3 rounded-[22px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] px-4 py-4 text-[15px] font-medium text-[var(--gray-dark)]">
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
          Datasets: {group.package_count || 0}
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          Created: {group.created ? getTimeAgo(group.created) : "N/A"}
        </span>
      </div>

      {!!group.tags?.length && (
        <div className="mt-6">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--gray-dark)]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.tags?.map((tag: Tag) => (
              <span
                className="rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--badge-text)]"
                key={tag.id}
              >
                {tag.display_name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
