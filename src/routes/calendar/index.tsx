import type { Event } from "~/contract";
import MachHTitle from "~/components/shared/machhtitle";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import EventCard from "~/components/EventCard/EventCard";
import { normalizeEvent } from "~/util/normalizing";

export const useEvents = routeLoader$(async () => {
  const events = await sanityClient.fetch('*[_type == "event"]|order(date desc){date,time,place,price,title,slug,"image": image.asset->url,linkedProjects[]->{name, slug, hexColor}}');
  console.log(events[0].linkedProjects)
  return events.map(normalizeEvent) as Event[];
})

export default component$(() => {
  const events = useEvents();
  return (
    <div class="w-full">
      <div class="header flex items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
        <MachHTitle size="text-6xl">
          Kalender
        </MachHTitle>
        <svg class="h-12 w-12 fill-machh-primary cursor-pointer" viewBox="0 0 24 24">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
          />
        </svg>
      </div>
      {events.value.map((event, i) => (
        <EventCard event={event} key={`evtc${i}`} clickable />
      ))}
    </div>
  );
});
