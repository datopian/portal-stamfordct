import { useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSearchState } from "./SearchContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatasetItem from "./DatasetItem";

export default function ListOfDatasets() {
  return (
    <div className="grid grid-cols-1 gap-[13px] homepage-padding">
      <ListItems />
    </div>
  );
}

function ListItems() {
  const { options, setOptions, searchResults, isLoading } = useSearchState();

  const [subsetOfPages, setSubsetOfPages] = useState(0);

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <h2 className="font-montserrat text-[23px] font-black capitalize leading-[28px] text-[var(--dark)]">
            {searchResults?.count}{" "}
            {options.type === "visualization" ? "Visualizations" : "Datasets"}
          </h2>
        </div>
        <div className="flex gap-2 cursor-pointer">
          <div className="text-[14px] font-medium text-[var(--gray-dark)]">
            Sort by:{" "}
            <select
              aria-label="Sort datasets by"
              value={options.sort ?? "score desc"}
              onChange={(e) => {
                const value = e.target.value;
                setOptions({ sort: value });
              }}
              className="rounded-full border border-[var(--surface-border)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--dark)] outline-0 focus:border-[var(--brand-green)]"
            >
              <option value="score desc">Most relevant</option>
              <option value="title_string asc">Name ascending</option>
              <option value="title_string desc">Name descending </option>
              <option value="metadata_modified desc">Last updated</option>
            </select>
          </div>
        </div>
      </div>

      <FilterBadges />
      <div className="flex flex-col gap-8 mt-4">
        {searchResults?.datasets?.map((dataset) => (
          <DatasetItem key={dataset.id} dataset={dataset} />
        ))}
      </div>

      <div className="mt-10">
        <PackagePagination
          isLoading={isLoading}
          count={searchResults?.count}
          subsetOfPages={subsetOfPages}
          setSubsetOfPages={setSubsetOfPages}
        />
      </div>
    </>
  );
}

function FilterBadges() {
  const { options, setOptions, searchFacets } = useSearchState();

  const getActiveFilters = (optionKey: string, facetKey: string) => {
    if (
      options.hasOwnProperty(optionKey) &&
      searchFacets.hasOwnProperty(facetKey)
    ) {
      const activeFilters = options[optionKey]
        .map((af) =>
          searchFacets[facetKey].items.find((item) => item.name === af),
        )
        .filter((item) => !!item);
      return activeFilters ?? [];
    }
    return [];
  };

  const filters = {
    resFormat: getActiveFilters("resFormat", "res_format"),
    orgs: getActiveFilters("orgs", "organization"),
    groups: getActiveFilters("groups", "groups"),
    tags: getActiveFilters("tags", "tags"),
  };

  const activeFiltersCount = Object.keys(filters)
    .map((fk) => filters[fk]?.length ?? 0)
    .reduce((a, v) => {
      return a + v;
    }, 0);

  return (
    <div className="border-b border-[var(--surface-border)] pb-3">
      {!!activeFiltersCount && (
        <span className="mb-2 inline-block text-xs font-semibold text-[var(--gray-dark)]">
          Applied filters{" "}
          <span className="font-[600]">
            ({activeFiltersCount}
            ):
          </span>
        </span>
      )}

      <div className="flex gap-2 flex-wrap">
        {filters.orgs.length > 0 &&
          filters.orgs.map((org) => (
            <ActiveFilter
              key={org.name}
              label={org.display_name}
              onClick={() => {
                setOptions({
                  orgs: options.orgs.filter((item) => item !== org.name),
                });
              }}
            />
          ))}

        {filters.groups.length > 0 &&
          filters.groups.map((g) => (
            <ActiveFilter
              key={g.name}
              label={g.display_name}
              onClick={() => {
                setOptions({
                  groups: options.groups.filter((item) => item !== g.name),
                });
              }}
            />
          ))}

        {filters.tags.length > 0 &&
          filters.tags.map((t) => (
            <ActiveFilter
              key={t.name}
              label={t.display_name}
              onClick={() => {
                setOptions({
                  tags: options.tags.filter((item) => item !== t.name),
                });
              }}
            />
          ))}

        {filters.resFormat.length > 0 &&
          filters.resFormat.map((f) => (
            <ActiveFilter
              key={f.name}
              label={f.display_name}
              onClick={() => {
                setOptions({
                  resFormat: options.resFormat.filter(
                    (item) => item !== f.name,
                  ),
                });
              }}
            />
          ))}

        {!!activeFiltersCount && (
          <span
            onClick={() => {
              setOptions({
                resFormat: [],
                groups: [],
                orgs: [],
                tags: [],
              });
            }}
            className="ml-auto inline-flex h-fit w-fit cursor-pointer items-center gap-x-0.5 rounded-full bg-[var(--dark)] px-3 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-black/10"
          >
            clear all
            <button
              type="button"
              className="group relative -mr-1 size-3.5 rounded-full hover:bg-white/10"
            >
              <XMarkIcon width={14} />
              <span className="absolute -inset-1"></span>
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

function PackagePagination({
  isLoading,
  count,
  subsetOfPages,
  setSubsetOfPages,
}) {
  if (isLoading) return null;

  if (count > 0) {
    return (
      <Pagination
        subsetOfPages={subsetOfPages}
        setSubsetOfPages={setSubsetOfPages}
        count={count}
      />
    );

    return <ResultsNotFound />;
  }

  // make a pagination component once insights are added
  return null;
}

function ResultsNotFound() {
  const router = useRouter();

  const clearFilters = () => {
    router.push("/search", undefined, { shallow: true });
  };
  return (
    <div className="mt-5 flex flex-col items-center gap-4 rounded-[28px] border border-[var(--surface-border)] bg-white px-8 py-10 text-center md:px-20">
      <Image
        src={"/images/search/noDatasets.svg"}
        height={269}
        width={358}
        alt="no datasets found"
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-[18px] font-semibold leading-[23px] text-[var(--dark)]">
          No datasets found.
        </span>
        <span className="text-center text-[15px] font-normal leading-[24px] text-[var(--gray-dark)]">
          It looks like no datasets match your current search criteria. Try
          reducing the number of filters or broadening your search terms and
          give it another go.
        </span>
      </div>
      <div
        onClick={clearFilters}
        className="flex h-[46px] w-fit cursor-pointer items-center justify-center rounded-full bg-[var(--accent)] px-6 transition hover:bg-[var(--accent-dark)]"
      >
        <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
          Clear filters
        </span>
      </div>
    </div>
  );
}

function ActiveFilter({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className="inline-flex cursor-pointer items-center gap-x-0.5 rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--gray-dark)] ring-1 ring-inset ring-[var(--surface-border)]"
    >
      {label}
      <button
        type="button"
        className="group relative -mr-1 size-3.5 rounded-full hover:bg-black/5"
      >
        <XMarkIcon width={14} />
        <span className="absolute -inset-1"></span>
      </button>
    </span>
  );
}
