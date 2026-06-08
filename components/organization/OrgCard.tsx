import { Organization } from "@portaljs/ckan";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";

import { RiArrowRightLine } from "react-icons/ri";

type OrgCardProps = Pick<
  Organization,
  "display_name" | "image_display_url" | "description" | "name"
>;

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: OrgCardProps) {
  const url = image_display_url ? new URL(image_display_url) : undefined;
  return (
    <Link
      href={`/@${name}`}
      className="group flex h-full min-h-[280px] flex-col rounded-[24px] border border-[var(--surface-border)] bg-white p-8 transition hover:-translate-y-1 hover:border-[var(--brand-green)] hover:bg-white hover:shadow-[0_20px_48px_-32px_rgba(17,32,57,0.5)]"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(244,248,249,0.72)_100%)] p-2">
          <Image
            src={
              image_display_url &&
              url &&
              (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(
                url.hostname,
              )
                ? image_display_url
                : "/images/logos/DefaultOrgLogo.svg"
            }
            alt={`${name}-collection`}
            width="40"
            height="40"
            className="h-10 w-10 object-contain"
          ></Image>
        </div>
        <h3 className="mt-4 font-montserrat text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)]">
          {display_name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--gray-dark)]">
          {description}
        </p>

        <span className="a11y-ignore-color-contrast mt-auto pt-6 flex cursor-pointer items-center gap-1 text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-green)]">
          View <RiArrowRightLine />
        </span>
      </div>
    </Link>
  );
}
