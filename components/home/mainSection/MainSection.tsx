import { Dataset } from "@/schemas/dataset.interface";
import { Group } from "@portaljs/ckan";
import {
  ArrowLongRightIcon,
  ArrowUpTrayIcon,
  BuildingOffice2Icon,
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const quickActions: Array<{
  title: string;
  description: string;
  href: string;
  Icon: IconComponent;
}> = [
  {
    title: "Find Data",
    description: "Find, share, and use data with confidence.",
    href: "/search",
    Icon: MagnifyingGlassIcon,
  },
  {
    title: "Add Data",
    description: "Make your dataset available on the portal.",
    href: "#",
    Icon: ArrowUpTrayIcon,
  },
  {
    title: "Request Data",
    description: "Send a request for data you could not find.",
    href: "mailto:request@stamfordct.org?subject=Data%20Request%20from%20Stamford%20Open%20Data%20Portal",
    Icon: QuestionMarkCircleIcon,
  },
  
  {
    title: "API Access",
    description: "Use our API to build apps and connect data.",
    href: "https://api.cloud.portaljs.com/@stamfordct/api/3/docs",
    Icon: CodeBracketIcon,
  },
];

const collectionIcons: IconComponent[] = [
  BuildingOffice2Icon,
  Squares2X2Icon,
  UserGroupIcon,
  DocumentTextIcon,
  CodeBracketIcon,
];

export default function MainSection({
  groups,
  datasets,
}: {
  groups: Array<Group>;
  datasets: Array<Dataset>;
}) {
  const visibleDatasets = datasets.slice(0, 5);
  const visibleGroups = groups.slice(0, 5);

  return (
    <section className="custom-container homepage-padding bg-transparent pt-12 md:pt-16">
      <section aria-labelledby="explore-data-heading" className="mb-12 md:mb-16">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.32em] text-[var(--dark)]">
            <span className="h-px w-10 bg-[var(--brand-green)]" />
            Explore and Use Data
            <span className="h-px w-10 bg-[var(--brand-green)]" />
          </div>
          <h2 id="explore-data-heading" className="sr-only">
            Explore and use data
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map(({ title, description, href, Icon }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col items-center text-center"
            >
              <span className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[linear-gradient(180deg,_#f8fbfc_0%,_#edf4f6_100%)] shadow-[0_18px_34px_-28px_rgba(16,32,68,0.22)] transition group-hover:-translate-y-1 group-hover:border-[var(--brand-green)]">
                <Icon
                  className="h-10 w-10 text-[var(--accent)]"
                  aria-hidden={true}
                />
              </span>
              <span className="mb-3 font-montserrat text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--dark)]">
                {title}
              </span>
              <span className="max-w-[20ch] text-[14px] leading-6 text-[var(--gray-dark)]">
                {description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]">
        {visibleDatasets.length > 0 && (
          <section className="rounded-[24px] border border-[var(--surface-border)] bg-white p-7 shadow-[0_20px_44px_-34px_rgba(16,32,68,0.18)] md:p-8">
            <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--gray-dark)]">
              <span className="h-px w-8 bg-[var(--brand-green)]" />
              Most Popular Datasets
            </div>
            <h2 className="mt-5 font-montserrat text-[34px] font-black text-[var(--dark)]">
              Highlights
            </h2>

            <div className="mt-6 space-y-4">
              {visibleDatasets.map((dataset) => (
                <Link
                  key={dataset.id}
                  href={`/@${dataset.organization.name}/${dataset.name}`}
                  className="group flex items-start gap-4 rounded-[18px] border border-transparent px-2 py-2 transition hover:border-[var(--surface-border)] hover:bg-[rgba(238,244,246,0.75)]"
                >
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)]">
                    <DocumentTextIcon className="h-5 w-5" aria-hidden={true} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-[20px] font-bold leading-7 text-[var(--dark)]">
                      {dataset.title}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gray-dark)]">
                      Last updated: {formatDate(dataset.metadata_modified)}
                    </span>
                  </span>
                  <ArrowLongRightIcon className="mt-3 h-5 w-5 shrink-0 text-[var(--brand-green)] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            <Link
              href="/search"
              className="a11y-ignore-color-contrast mt-8 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-green)] transition hover:gap-3"
            >
              View all datasets
              <ArrowLongRightIcon className="h-4 w-4" />
            </Link>
          </section>
        )}

        <section className="rounded-[24px] border border-[var(--surface-border)] bg-white p-7 shadow-[0_20px_44px_-34px_rgba(16,32,68,0.18)] md:p-8">
          <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--gray-dark)]">
            <span className="h-px w-8 bg-[var(--brand-green)]" />
            Browse Data Collections
          </div>

          <div className="mt-6 space-y-4">
            {visibleGroups.map((group, index) => {
              const GroupIcon = collectionIcons[index % collectionIcons.length];

              return (
                <Link
                  key={group.id}
                  href={`/groups/${group.name}`}
                  className="group flex items-center gap-4 rounded-[18px] border border-transparent px-2 py-2 transition hover:border-[var(--surface-border)] hover:bg-[rgba(238,244,246,0.75)]"
                >
                  <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)]">
                    <GroupIcon className="h-6 w-6" aria-hidden={true} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-[22px] font-bold leading-7 text-[var(--dark)]">
                      {group.display_name}
                    </span>
                   
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/groups"
            className="a11y-ignore-color-contrast mt-8 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-green)] transition hover:gap-3"
          >
            View all collections
            <ArrowLongRightIcon className="h-4 w-4" />
          </Link>
        </section>
      </section>

      <section className="mt-8 rounded-[24px] border border-[var(--surface-border)] bg-white shadow-[0_20px_44px_-34px_rgba(16,32,68,0.18)]">
        <div className="grid overflow-hidden lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="relative min-h-[220px] bg-[linear-gradient(135deg,_#70cfcb_0%,_#63c1cf_100%)]">
            <div className="absolute inset-x-0 bottom-6 h-16 opacity-40">
              <div className="absolute inset-x-[-10%] bottom-0 h-8 rounded-[100%] border-2 border-white/50" />
              <div className="absolute inset-x-[-6%] bottom-3 h-8 rounded-[100%] border-2 border-white/35" />
            </div>
            <div className="flex h-full items-center justify-center">
              <div className="rounded-[24px] border border-[rgba(16,32,68,0.08)] bg-white/10 p-5 text-[var(--dark)]">
                <EnvelopeIcon className="h-20 w-20" aria-hidden={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 py-8 md:px-10">
            <h2 className="font-montserrat text-[34px] font-black leading-tight text-[var(--dark)] md:text-[42px]">
              Need data that isn&apos;t available?
            </h2>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-8 text-[var(--gray-dark)]">
              We&apos;re always working to improve our catalog. Send a request
              and help us build a better open data portal for Stamford.
            </p>
            <Link
              href="mailto:request@stamfordct.org?subject=Data%20Request%20from%20Stamford%20Open%20Data%20Portal"
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-[8px] bg-[var(--dark)] px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.24em] text-white transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"
            >
              Request Data
              <ArrowLongRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

function formatDate(value?: string) {
  if (!value) return "Unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
