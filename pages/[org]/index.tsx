import { GetServerSideProps } from "next";
import OrgNavCrumbs from "@/components/organization/individualPage/OrgNavCrumbs";
import OrgInfo from "@/components/organization/individualPage/OrgInfo";
import OrgPageHero from "@/components/organization/individualPage/OrgPageHero";
import ActivityStream from "@/components/_shared/ActivityStream";
import Layout from "@/components/_shared/Layout";
import Tabs from "@/components/_shared/Tabs";
import DatasetList from "@/components/_shared/DatasetList";
import { CKAN } from "@portaljs/ckan";
import { getOrganization } from "@/lib/queries/orgs";
import { searchDatasets } from "@/lib/queries/dataset";
import { OrganizationIndividualPageStructuredData } from "@/components/schema/OrganizationIndividualPageStructuredData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  let orgName = context.params?.org as string;
  if (!orgName || !orgName.startsWith("@")) {
    return {
      notFound: true,
    };
  }
  orgName = orgName.split("@")[1];
  let org = await getOrganization({
    name: orgName as string,
    include_datasets: false,
  });
  let initialDatasets = null

  if (org.package_count) {
    initialDatasets = await searchDatasets({
      fq: `owner_org:${org.id}`,
      offset: 0,
      limit: 10,
      type: "dataset",
      query: "",
      sort: "metadata_modified desc",
      groups: [],
      orgs: [],
      tags: [],
      resFormat: [],
    });
  }

  const activityStream = await ckan.getOrgActivityStream(org.name);
  if (!org) {
    return {
      notFound: true,
    };
  }
  org = { ...org, activity_stream: activityStream};
  return {
    props: {
      org,
      initialDatasets,
    },
  };
};

export default function OrgPage({ org, initialDatasets }): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content: (
        <DatasetList type="organization" name={org.id} initialDatasets={initialDatasets} />
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",  
      content: (
        <ActivityStream
          activities={org?.activity_stream ? org.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];
  return (
    <>
      <OrganizationIndividualPageStructuredData org={org} />
      {org && (
        <Layout>
          <OrgPageHero org={org} />
          <OrgNavCrumbs
            org={{
              name: org?.name,
              title: org?.title,
            }}
          />
          <section className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,249,0.98)_100%)] py-6 md:py-8 lg:py-10">
            <div className="custom-container">
              {org && (
                <main className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-8">
                  <aside className="lg:sticky lg:top-6">
                    <OrgInfo org={org} />
                  </aside>

                  <section
                    aria-label="Organization content"
                    className="rounded-[28px] border border-[var(--surface-border)] bg-white px-5 py-5 shadow-[0_30px_70px_-50px_rgba(16,32,68,0.5)] md:px-7 md:py-7"
                  >
                    <Tabs items={tabs} />
                  </section>
                </main>
              )}
            </div>
          </section>
        </Layout>
      )}
    </>
  );
}
