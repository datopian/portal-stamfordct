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
      className="group block rounded-[24px] border border-[var(--surface-border)] bg-white p-8 transition hover:-translate-y-1 hover:border-[var(--brand-green)] hover:bg-white hover:shadow-[0_20px_48px_-32px_rgba(17,32,57,0.5)]"
    >
      <div className=" col-span-3  h-full  flex flex-col ">
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
          width="43"
          height="43"
        ></Image>
        <h3 className="mt-4 font-montserrat text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)]">
          {display_name}
        </h3>
        <p className="mb-6 mt-2 line-clamp-2 text-sm leading-6 text-[var(--gray-dark)]">
          {description}
        </p>

        <span className="mt-auto flex cursor-pointer items-center gap-1 text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-green)]">
          View <RiArrowRightLine />
        </span>
      </div>
    </Link>
  );
}
