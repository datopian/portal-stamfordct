import type { InferGetServerSidePropsType } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "@/components/_shared/Layout";
import DatasetSearchForm from "@/components/dataset/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/dataset/search/DatasetSearchFilters";
import ListOfDatasets from "@/components/dataset/search/ListOfDatasets";
import { searchDatasets } from "@/lib/queries/dataset";
import SearchPageHero from "@/components/_shared/SearchPageHero";
import {
  SearchStateProvider,
  useSearchState,
} from "@/components/dataset/search/SearchContext";
import { PackageSearchOptions } from "@portaljs/ckan";
import { SearchPageStructuredData } from "@/components/schema/SearchPageStructuredData";

export async function getServerSideProps() {
  // TODO: this doesn't work properly. It must read the params from the URL.
  const initialRequestOption: PackageSearchOptions = {
    offset: 0,
    limit: 10,
    tags: [],
    groups: [],
    orgs: [],
    resFormat: [],
  };

  const search_result = await searchDatasets(initialRequestOption);

  return {
    props: {
      fallback: {
        [unstable_serialize(["package_search", initialRequestOption])]:
          search_result,
      },
      searchFacets: {
        ...search_result.search_facets,
      },
    },
  };
}

export default function DatasetSearch({
  fallback,
  searchFacets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <SearchPageStructuredData />
      <SWRConfig value={{ fallback }}>
        <SearchStateProvider facets={searchFacets}>
          <SearchPageContent />
        </SearchStateProvider>
      </SWRConfig>
    </>
  );
}

function SearchPageContent() {
  const { options } = useSearchState();

  return (
    <Layout>
      <SearchPageHero title="Search" titleAccent={`${options.type}s`}>
        <DatasetSearchForm />
      </SearchPageHero>
      <div className="custom-container">
        <article className="grid grid-cols-1 gap-x-6 gap-y-6 pb-[10px] pt-6 lg:grid-cols-9 xl:gap-x-12">
          <div className="lg:col-span-3  lg:sticky top-3 h-fit">
            <DatasetSearchFilters />
          </div>
          <div className="lg:col-span-6">
            <ListOfDatasets />
          </div>
        </article>
      </div>
    </Layout>
  );
}
