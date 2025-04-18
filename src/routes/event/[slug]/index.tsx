import { Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { component$, useComputed$ } from "@builder.io/qwik";
import EventCard from "~/components/EventCard/EventCard";
import MachHTitle from "~/components/shared/machhtitle";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { normalizeEvent } from "~/util/normalizing";
import sanityClient from "~/cms/sanityClient";

// pick back up: selecting and inserting works, implement error handling, confirmation, validation, tweak design, add confirmation mail (supabase edge function), then release with free-only events, then implement mollie

export const useRouteInfo = routeLoader$(async (requestEvent: RequestEventLoader) => {
    const [event] = await sanityClient.fetch(`*[_type == "event" && slug.current == "${requestEvent.params.slug}"]{..., "imageUrl": image.asset->url,"imageRef": image.asset._ref, linkedProjects[]->{name, slug, hexColor}}`);
    let isFull;
    if (event?.slug && event.subscribable) {
        const supabaseClient = createServerClient(
            requestEvent.env.get("SUPABASE_URL")!,
            requestEvent.env.get("SUPABASE_ANON_KEY")!,
            requestEvent
        );
        const rs = await supabaseClient
            .from("attendees")
            .select("id", { count: "exact" })
            .eq("event_slug", event.slug.current);
        const { count } = rs;
        isFull = (count || 0) >= event!.subscriptionMaxParticipants;
    }
    return {
        event: normalizeEvent(event, false, { isFull }),
        source: requestEvent.query.get("s"),
        year: requestEvent.query.get("y"),
        monthIndex: requestEvent.query.get("mI"),
        from: requestEvent.query.get("f"),
        to: requestEvent.query.get("t"),
    };
})

export const useSubscribe = routeAction$(async (data, requestEvent) => {
    const supabaseClient = createServerClient(
        requestEvent.env.get("SUPABASE_URL")!,
        requestEvent.env.get("SUPABASE_ANON_KEY")!,
        requestEvent
    );
    console.log("inserting", data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: supabaseResponseData, error } = await supabaseClient.from("attendees")
        .insert({
            event_slug: data.eventSlug,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
        })
        .select()
        .single();
    console.log("DATA!", supabaseResponseData);
    let success;
    if (error) {
        // errorTextSignal.value = error.message;
        console.error("error", error);
        success = false;
    } else {
        // errorTextSignal.value = "";
        success = true;
    }
    return {
        success,
    };
});

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

    const subscribeAction = useSubscribe();

    return (
        <div class="w-full">
            <div class="header flex items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
                <MachHTitle size="text-6xl">
                    Activiteit
                </MachHTitle>
            </div>
            <EventCard event={event} showDetail subscribeAction={subscribeAction} />
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