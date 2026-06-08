import Link from "next/link";
import { Dataset } from "@portaljs/ckan";
import ResourcesBadges from "../_shared/ResourcesBadges";
import {
  RiMapPinTimeLine,
  RiOrganizationChart,
  RiPriceTagLine,
} from "react-icons/ri";
import { getTimeAgo } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";

export default function DatasetItem({
  dataset,
  showOrg = true,
}: {
  dataset: Dataset;
  showOrg?: boolean;
}) {
  const {
    theme: { styles },
  } = useTheme();

  return (
    <Link
      href={`/@${dataset.organization.name}/${dataset.name}`}
      className={`flex items-start gap-4 rounded-[24px] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--brand-green)] hover:bg-white ${styles.shadowMd}`}
    >
      <span className="min-w-[5px] min-h-[5px] bg-accent rounded-full mt-3 hidden"></span>
      <div className="w-full">
        <div className="font-montserrat text-lg font-bold text-[var(--dark)]">
          {dataset.title}
        </div>

        <p className="mb-2 mt-2 line-clamp-2 overflow-y-hidden text-sm leading-6 text-[var(--gray-dark)]">
          {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
        </p>
        <div className="text-sm flex gap-2 flex-col md:flex-row md:flex-wrap">
          <div className="flex items-center gap-2 ">
            <RiOrganizationChart className="text-accent" />
            <span className="text-[var(--gray-dark)]">
              {dataset.organization.title}
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <RiMapPinTimeLine className="text-accent" />
            <span className="text-[var(--gray-dark)]">
              {dataset.metadata_modified &&
                getTimeAgo(dataset.metadata_modified)}
            </span>
          </div>
          {!!dataset.tags?.length && (
            <div className="flex items-center gap-2 ">
              <RiPriceTagLine className="text-accent" />
              <span className="line-clamp-1 text-[var(--gray-dark)]">
                {dataset.tags.map((t) => t.display_name).join(", ")}
              </span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <ResourcesBadges resources={dataset.resources} />
        </div>
      </div>
    </Link>
  );
}
