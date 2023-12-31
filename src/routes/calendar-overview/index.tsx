import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader} from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import CalendarOverviewComponent from "~/components/CalendarOverviewComponent/calendaroverviewcomponent";
import List from "../../svg/list.svg?jsx";
import MachHTitle from "~/components/shared/machhtitle";
import { getFromTo } from "~/components/CalendarOverviewComponent/helpers";
import { normalizeEvent } from "~/util/normalizing";
import sanityClient from "~/cms/sanityClient";

export const useEvents = routeLoader$(async (requestEvent: RequestEventLoader) => {
  const year = parseInt(requestEvent.query.get("y") ?? `${new Date().getFullYear()}`);
  const monthIndex = parseInt(requestEvent.query.get("mI") ?? `${new Date().getMonth()}`);
  const { dateStrFrom, dateStrTo } = getFromTo(year, monthIndex);
  const events = await sanityClient.fetch(`*[_type == "event" && date >= "${dateStrFrom}" && date <= "${dateStrTo}"]{date,time,place,price,title,slug,"imageUrl": image.asset->url,"imageRef": image.asset._ref,linkedProjects[]->{name, slug, hexColor}}`);
  return {
    events: events.map((e: any) => normalizeEvent(e)),
    year,
    monthIndex,
  };
})

export default component$(() => {
  const useEventsResult = useEvents();
  const { events, year, monthIndex } = useEventsResult.value;

  return (
    <div class="w-full">
      <div class="header flex flex-col md:flex-row items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
        <MachHTitle size="text-6xl" class="self-start md:self-auto">
          Kalender
        </MachHTitle>
        <Link href="/calendar" class="flex text-machh-primary items-center cursor-pointer hover:opacity-70 transition-all duration-300 mt-4 md:mt-0 self-end md:self-auto">
          <label class="font-normal text-md">naar activiteitenlijst</label>&nbsp;&nbsp;
          <List class="w-6 h-6 fill-current" />
        </Link>
      </div>

      <CalendarOverviewComponent events={events} year={year} monthIndex={monthIndex} />


    </div>
  );
});
