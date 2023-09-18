import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import NextEvents from "~/components/NextEvents/nextevents";
import HomepageTiles from "~/components/HomepageTiles/homepagetiles"
import type { Event, Project } from "../contract";

export const useNextThreeEvents = routeLoader$(async () => {
    const nextThreeEvents = await sanityClient.fetch('*[_type == "event" && date > now()] | order(date asc)[0..2]');
    return nextThreeEvents as Event[];
});

export const useProjects = routeLoader$(async () => {
    const projects = await sanityClient.fetch('*[_type == "project"]{..., "photo": photo.asset->url}');
    return projects as Project[];
})

export default component$(() => {
    const nextThreeEventsSignal = useNextThreeEvents();
    const projects = useProjects();
    // const newsTile = useNewsTile();
    return nextThreeEventsSignal.value.length > 1 ? (
        <>
            <NextEvents events={nextThreeEventsSignal.value} />
            <HomepageTiles projects={projects.value} />
        </>
    ) : null;
});

export const head: DocumentHead = {
    title: "Mach-H",
    meta: [
        {
            name: "Mach-H",
            content: "Mach-H, samen voor een groene en warme wijk",
        },
    ],
};
