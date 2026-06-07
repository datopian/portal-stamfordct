import { GetServerSideProps } from "next";
import DatasetInfo from "@/components/dataset/individualPage/DatasetInfo";
import DatasetOverview from "@/components/dataset/individualPage/DatasetOverview";
import DatasetNavCrumbs from "@/components/dataset/individualPage/NavCrumbs";
import DatasetPageHero from "@/components/dataset/individualPage/DatasetPageHero";
import ResourcesList from "@/components/dataset/individualPage/ResourcesList";
import ActivityStream from "@/components/_shared/ActivityStream";
import Layout from "@/components/_shared/Layout";
import Tabs from "@/components/_shared/Tabs";
import { CKAN } from "@portaljs/ckan";
import { getDataset } from "@/lib/queries/dataset";
import { DatasetPageStructuredData } from "@/components/schema/DatasetPageStructuredData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ckan = new CKAN(process.env.NEXT_PUBLIC_DMS);
  const datasetName = context.params?.dataset as string;
  const orgName = context.params?.org as string;

  if (!datasetName || !orgName.startsWith("@")) {
    return {
      notFound: true,
    };
  }

  try {
    let dataset = await getDataset({ name: datasetName as string });
    if (!dataset) {
      return {
        notFound: true,
      };
    }
    const activityStream = await ckan.getDatasetActivityStream(datasetName);
    dataset = {
      ...dataset,
      activity_stream: activityStream,
    };

    if (!dataset.organization || "@" + dataset.organization.name !== orgName) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        dataset,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default function DatasetPage({ dataset }): JSX.Element {
  const tabs = [
    ...(dataset.type != "visualization"
      ? [
          {
            id: "resources",
            content: (
              <ResourcesList
                resources={dataset?.resources}
                orgName={dataset.organization ? dataset.organization.name : ""}
                datasetName={dataset.name}
              />
            ),
            title: "Resources",
          },
        ]
      : []),
    {
      id: "information",
      content: <DatasetOverview dataset={dataset} />,
      title: "Info",
    },
    {
      id: "activity-stream",
      content: (
        <ActivityStream
          activities={dataset?.activity_stream ? dataset.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];
  return (
    <>
      <DatasetPageStructuredData dataset={dataset} />
      <Layout>
        <DatasetPageHero dataset={dataset} />
        <DatasetNavCrumbs
          datasetType={dataset.type}
          datasetsLinkHref={
            dataset.type === "visualization"
              ? "/search?type=visualization"
              : "/search"
          }
          org={{
            name: dataset.organization?.name,
            title: dataset.organization?.title,
          }}
          dataset={{
            name: dataset.name,
            title: dataset.title ? dataset.title : "This dataset",
          }}
        />
        <section className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,249,0.98)_100%)] py-6 md:py-8 lg:py-10">
          <div className="custom-container">
            {dataset && (
              <main className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-8">
                <aside className="lg:sticky lg:top-6">
                  <DatasetInfo dataset={dataset} />
                </aside>

                <section
                  aria-label="Dataset content"
                  className="rounded-[28px] border border-[var(--surface-border)] bg-white px-5 py-5 shadow-[0_30px_70px_-50px_rgba(16,32,68,0.5)] md:px-7 md:py-7"
                >
                  <Tabs items={tabs} />
                </section>
              </main>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
