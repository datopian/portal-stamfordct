import { GetServerSideProps } from "next";
import DatasetList from "../../components/_shared/DatasetList";
import ActivityStream from "../../components/_shared/ActivityStream";
import Layout from "../../components/_shared/Layout";
import Tabs from "../../components/_shared/Tabs";
import { CKAN } from "@portaljs/ckan";
import GroupNavCrumbs from "../../components/groups/individualPage/GroupNavCrumbs";
import GroupInfo from "../../components/groups/individualPage/GroupInfo";
import GroupPageHero from "../../components/groups/individualPage/GroupPageHero";
import { getGroup } from "@/lib/queries/groups";
import { searchDatasets } from "@/lib/queries/dataset";
import { GroupIndividualPageStructuredData } from "@/components/schema/GroupIndividualPageStructuredData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  const groupName = context.params?.groupName;
  if (!groupName) {
    return {
      notFound: true,
    };
  }
  let group = await getGroup({
    name: groupName as string,
    include_datasets: false,
  });
  let initialDatasets = null;
  if (group.package_count) {
    initialDatasets = await searchDatasets({
      fq: `groups:${group.name}`,
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
  const activityStream = await ckan.getGroupActivityStream(group.name);
  if (!group) {
    return {
      notFound: true,
    };
  }
  group = { ...group, activity_stream: activityStream };
  return {
    props: {
      group,
      initialDatasets,
    },
  };
};

export default function GroupPage({ group, initialDatasets }): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content:  (
        //TO DO: index search by group name
        <DatasetList type="group" name={group?.groups[0]?.name+'--'+group.name} initialDatasets={initialDatasets} />
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",
    content: (
        <ActivityStream
          activities={group?.activity_stream ? group.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];

  return (
    <>
      <GroupIndividualPageStructuredData group={group} />
      {group && (
        <Layout>
          <GroupPageHero group={group} />
          <GroupNavCrumbs
            group={{
              name: group?.name,
              title: group?.title,
            }}
          />
          <section className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,249,0.98)_100%)] py-6 md:py-8 lg:py-10">
            <div className="custom-container">
              {group && (
                <main className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-8">
                  <aside className="lg:sticky lg:top-6">
                    <GroupInfo group={group} />
                  </aside>

                  <section
                    aria-label="Group content"
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
