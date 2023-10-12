import { component$, useComputed$ } from "@builder.io/qwik";
import DayHeader from "./dayheader";
import type { Event } from "~/contract";
import CalendarDay from "./calendarday";
import { buildDateLabel, getMonths } from "./helpers";
import { Link } from "@builder.io/qwik-city";

export interface CalendaroverviewcomponentProps {
  events: Event[];
  monthIndex: number;
  year: number;
}

export const Calendaroverviewcomponent = component$<CalendaroverviewcomponentProps>(({
  events,
  monthIndex,
  year,
}) => {

  console.log("events", events.length)

  const todayLink = useComputed$(() => {
    return `/calendar-overview?y=${new Date().getFullYear()}&mI=${new Date().getMonth()}`;
  });

  const prevLink = useComputed$(() => {
    let newMonthIndex = monthIndex - 1;
    let newYear = year;
    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      newYear = year - 1;
    }
    return `/calendar-overview?y=${newYear}&mI=${newMonthIndex}`;
  });

  const nextLink = useComputed$(() => {
    let newMonthIndex = monthIndex + 1;
    let newYear = year;
    if (newMonthIndex > 11) {
      newMonthIndex = 0;
      newYear = year + 1;
    }
    return `/calendar-overview?y=${newYear}&mI=${newMonthIndex}`;
  });

  return (
    <div class="relative">
      <div class={`wrapper bg-white outline outline-machh-primary w-full my-8 text-machh-primary`}>

        <div class="header flex justify-between p-2">
          <span class="text-lg font-bold flex flex-col justify-center">
            {getMonths(year)[monthIndex].name} {year}
          </span>
          <div class="buttons flex">
            <Link href={todayLink.value} class="text-sm ml-2 underline items-center flex">naar vandaag</Link>
            <Link class="p-1" href={prevLink.value}>
              <svg width="1.8em" fill="gray" height="1.8em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle fill-current" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
              </svg>
            </Link>
            <Link class="p-1" href={nextLink.value}>
              <svg width="1.8em" fill="gray" height="1.8em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle fill-current" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </Link>
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
          {Array.from({ length: getMonths(year)[monthIndex].nrDays - 1 }, (_, i) => i + 1).map((day, i) => (
            <CalendarDay
              events={events.filter(e => e.date === buildDateLabel(year, monthIndex + 1, day + 1))}
              dayLbl={day + 1} key={`day${i}`}
              noRightBorder={(i + 1) % 7 === 0}
              y={year}
              mI={monthIndex}
            />
          ))}
        </div>

      </div >
    </div>
  );
});

export default Calendaroverviewcomponent;

/*
*/