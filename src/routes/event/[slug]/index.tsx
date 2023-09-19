import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import EventCard from "~/components/EventCard/EventCard";
import MachHTitle from "~/components/shared/machhtitle";
import { normalizeEvent } from "~/util/normalizing";

export const useEvent = routeLoader$(async (requestEvent: RequestEventLoader) => {
    const [event] = await sanityClient.fetch(`*[_type == "event" && slug.current == "${requestEvent.params.slug}"]{..., "image": image.asset->url, linkedProjects[]->{name, slug, hexColor}}`);
    return normalizeEvent(event);
})

const Event = component$(() => {

    const eventSignal = useEvent();

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
            <EventCard event={eventSignal.value} showDetail />
            <Link href="/calendar" class="flex items-center text-machh-primary text-xl font-medium leading-none py-8 cursor-pointer">
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