import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import MachHTitle from '~/components/shared/machhtitle';
import CalendarOverviewComponent from '~/components/CalendarOverviewComponent/calendaroverviewcomponent';
import List from "../../svg/list.svg?jsx";
import sanityClient from '~/cms/sanityClient';
import { getFromTo } from '~/components/CalendarOverviewComponent/helpers';

export const useEventsOfMonth = routeLoader$(async () => {
  // pick back up: year and monthIndex in url? If no, use current. Then further roll out this solution
  const { dateStrFrom, dateStrTo } = getFromTo();
  const events = await sanityClient.fetch(`*[_type == "event" && date >= "${dateStrFrom}" && date <= "${dateStrTo}"]{date,time,place,price,title,slug,"image": image.asset->url,linkedProjects[]->{name, slug, hexColor}}`);
  return events;
})

export default component$(() => {
  const thisMonthsEvents = useEventsOfMonth();
  return (
    <div class="w-full">
      <div class="header flex items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
        <MachHTitle size="text-6xl">
          Kalender
        </MachHTitle>
        <Link href="/calendar" class="flex text-machh-primary items-center cursor-pointer hover:opacity-70 transition-all duration-300">
          <label class="font-normal text-md">naar activiteitenlijst</label>&nbsp;&nbsp;
          <List class="w-6 h-6 fill-current" />
        </Link>
      </div>

      <CalendarOverviewComponent
        events={thisMonthsEvents}
      />


    </div>
  );
});
