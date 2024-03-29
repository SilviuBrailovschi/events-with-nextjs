import { CatEvent } from "@/src/components/events/catEvent";
import Image from "next/image";
import Link from "next/link";

const EventsCatPage = ({ data, pageName }) => {
  const titleCity = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return <CatEvent data={data} titleCity={titleCity} />;
};
export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("data/data.json");
  const data = allEvents.filter((ev) => ev.city === id);
  return { props: { data, pageName: id } };
}
