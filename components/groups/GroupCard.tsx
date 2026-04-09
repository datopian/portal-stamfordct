import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { Group } from "@portaljs/ckan";
import { useTheme } from "../theme/theme-provider";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

type GroupCardProps = Pick<
  Group,
  "display_name" | "image_display_url" | "description" | "name"
>;

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: GroupCardProps) {
  const { theme } = useTheme();
  const url = image_display_url ? new URL(image_display_url) : undefined;
  return (
    <Link
      href={`/groups/${name}`}
      className={`group col-span-3 block h-full rounded-[24px] bg-white p-8 text-[var(--accent)] transition hover:-translate-y-1 hover:border-[var(--brand-green)] hover:bg-white ${theme.styles.shadowSm}`}
    >
      <Image
        src={
          image_display_url &&
          url &&
          (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname)
            ? image_display_url
            : "/images/logos/datasets.png"
        }
        alt={`${name}-collection`}
        width="54"
        height="54"
      ></Image>
      <div className="text-black">
        <h3 className="mt-4 font-montserrat text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)]">
          {display_name}
        </h3>
        <p className="mb-6 mt-2 line-clamp-2 text-sm leading-6 text-[var(--gray-dark)]">
          {description}
        </p>
      </div>
      <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-green)]">
        View collection
        <ArrowRightIcon width={16} />
      </span>
    </Link>
  );
}
