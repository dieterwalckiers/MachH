import { component$, useComputed$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import EventCard from "~/components/EventCard/EventCard";
import MachHTitle from "~/components/shared/machhtitle";
import { normalizeEvent } from "~/util/normalizing";

export const useRouteInfo = routeLoader$(async (requestEvent: RequestEventLoader) => {
    const [event] = await sanityClient.fetch(`*[_type == "event" && slug.current == "${requestEvent.params.slug}"]{..., "image": image.asset->url, linkedProjects[]->{name, slug, hexColor}}`);
    return {
        event: normalizeEvent(event),
        source: requestEvent.query.get("s"),
        year: requestEvent.query.get("y"),
        monthIndex: requestEvent.query.get("mI"),
        from: requestEvent.query.get("f"),
        to: requestEvent.query.get("t"),
    };
})

const Event = component$(() => {

    const routeInfoSignal = useRouteInfo();
    const { event, source, year, monthIndex, from, to } = routeInfoSignal.value;
    const backToCalendarLink = useComputed$(() => {
        if (source === "m") {
            return `/calendar-overview${year !== null && monthIndex !== null ? `?y=${year}&mI=${monthIndex}` : ""}`;
        } else {
            return `/calendar${from !== null && to !== null ? `?from=${from}&to=${to}` : ""}`;
        }
    });

    return (
        <div class="w-full">
            <div class="header flex items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
                <MachHTitle size="text-6xl">
                    Activiteit
                </MachHTitle>
                <svg class="h-12 w-12 fill-machh-primary cursor-pointer" viewBox="0 0 24 24">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                    />
                </svg>
            </div>
            <EventCard event={event} showDetail />
            <Link href={backToCalendarLink.value} class="flex items-center text-machh-primary text-xl font-medium leading-none py-8 cursor-pointer">
                <label class="text-4xl pointer-events-none">&#x2190;</label>
                <div class="whitespace-break-spaces ml-2">
                    {`terug naar
kalender`}
                </div>
            </Link>
        </div>
    )
})

export default Event;