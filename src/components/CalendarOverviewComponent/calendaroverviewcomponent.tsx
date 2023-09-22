import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import DayHeader from "./dayheader";
import type { Event } from "~/contract";
import Spinner from "../shared/spinner";
import { normalizeEvent } from "~/util/normalizing";
import sanityClient from "~/cms/sanityClient";
import CalendarDay from "./calendarday";
import { getFromTo, getMonths } from "./helpers";

export interface CalendaroverviewcomponentProps {
}

export const Calendaroverviewcomponent = component$<CalendaroverviewcomponentProps>(({ }) => {

  const store = useStore<{ monthIndex: number, year: number, isLoading: boolean, events: Event[] }>({
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear(),
    isLoading: false,
    events: [],
  });


  useTask$(async ({ track }) => {

    track(() => [store.monthIndex, store.year]);

    const { dateStrFrom, dateStrTo } = getFromTo(store.year, store.monthIndex)

    const rawEvents = await sanityClient.fetch(`*[_type == "event" && date >= "${dateStrFrom}" && date <= "${dateStrTo}"]{date,time,place,price,title,slug,"image": image.asset->url,linkedProjects[]->{name, slug, hexColor}}`);
    const events = rawEvents.map(normalizeEvent) as Event[];
    store.events = events;


  })


  const prevMonth = $(() => {
    store.monthIndex = store.monthIndex - 1;
    if (store.monthIndex < 0) {
      store.monthIndex = 11;
      store.year = store.year - 1;
    }
  });
  const nextMonth = $(() => {
    store.monthIndex = store.monthIndex + 1;
    if (store.monthIndex > 11) {
      store.monthIndex = 0;
      store.year = store.year + 1;
    }
  });
  const toToday = $(() => {
    store.monthIndex = new Date().getMonth();
    store.year = new Date().getFullYear();
  });

  return (
    <div class="relative">
      {store.isLoading && (
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div class={`wrapper bg-white outline outline-machh-primary w-full my-8 text-machh-primary ${store.isLoading ? "opacity-20 pointer-events-none" : ""}`}>

        <div class="header flex justify-between p-2">
          <span class="text-lg font-bold flex">
            {getMonths(store.year)[store.monthIndex].name} {store.year}
          </span>
          <div class="buttons flex">
            <button onClick$={toToday} class="text-sm ml-2 underline">naar vandaag</button>
            <button class="p-1" onClick$={prevMonth}>
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle fill-current" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
              </svg>
            </button>
            <button class="p-1" onClick$={nextMonth}>
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle fill-current" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="w-full flex border-t border-b border-machh-primary">
          <DayHeader dayLbl="maandag" />
          <DayHeader dayLbl="dinsdag" />
          <DayHeader dayLbl="woensdag" />
          <DayHeader dayLbl="donderdag" />
          <DayHeader dayLbl="vrijdag" />
          <DayHeader dayLbl="zaterdag" />
          <DayHeader dayLbl="zondag" />
        </div>

        <div class="flex flex-wrap">
          {Array.from({ length: getMonths(store.year)[store.monthIndex].nrDays - 1 }, (_, i) => i + 1).map((day, i) => (
            <CalendarDay dayLbl={day + 1} key={`day${i}`} noRightBorder={(i + 1) % 7 === 0} />
          ))}
        </div>

      </div >
    </div>
  );
});

export default Calendaroverviewcomponent;

/*
*/