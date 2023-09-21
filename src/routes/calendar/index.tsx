import type { Event } from "~/contract";
import MachHTitle from "~/components/shared/machhtitle";
import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import EventCard from "~/components/EventCard/EventCard";
import { normalizeEvent } from "~/util/normalizing";

const EVENTS_ON_PAGE = 6;

export const useEvents = routeLoader$(async (requestEvent: RequestEventLoader) => {
  const from = parseInt(requestEvent.query.get("from") ?? "0");
  const to = parseInt(requestEvent.query.get("to") ?? `${EVENTS_ON_PAGE}`);
  const fromMinusOne = Math.max(from - 1, 0);
  const toPlusOne = to + 1;
  const rawEvents = await sanityClient.fetch(`*[_type == "event"]|order(date desc){date,time,place,price,title,slug,"image": image.asset->url,linkedProjects[]->{name, slug, hexColor}}[${fromMinusOne}...${toPlusOne}]`);
  const events = rawEvents.map(normalizeEvent) as Event[];
  let moreFurther;
  if (events.length > (to - from)) {
    moreFurther = true;
    events.pop();
  }
  if (from !== fromMinusOne) {
    events.shift();
  }
  return {
    events,
    pagingInfo: {
      isFirstPage: from === 0,
      isLastPage: !moreFurther,
      from,
      to,
    }
  }
})

export default component$(() => {

  const useEventsResult = useEvents();
  const { events, pagingInfo } = useEventsResult.value;


  const prevLink = pagingInfo.isFirstPage ?
    null :
    `/calendar?from=${Math.max(0, pagingInfo.from - EVENTS_ON_PAGE)}&to=${Math.max(0, pagingInfo.to - EVENTS_ON_PAGE)}`;

  const nextLink = pagingInfo.isLastPage ?
    null :
    `/calendar?from=${pagingInfo.to}&to=${pagingInfo.to + EVENTS_ON_PAGE}`;

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
      {events.map((event, i) => (
        <EventCard
          event={event}
          key={`evtc${i}`}
          clickable
          noBottomBorder={i === events.length - 1 && pagingInfo.isFirstPage && pagingInfo.isLastPage}
        />
      ))}
      {
        pagingInfo.isFirstPage && pagingInfo.isLastPage ? null : (
          <div class="my-12 flex justify-between w-full text-machh-primary text-5xl">
            <Link class={`cursor-pointer ${prevLink ? "" : "invisible"}`} href={prevLink ?? ""}>
              &#x2190;
            </Link>
            <Link class={`cursor-pointer ${nextLink ? "" : "invisible"}`} href={nextLink ?? ""}>
              &#x2192;
            </Link>
          </div>
        )

      }
    </div>
  );
});
