import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import NextEvents from "~/components/NextEvents/nextevents";
import HomepageTiles from "~/components/HomepageTiles/homepagetiles"
import type { Event, Post, Project, Tile } from "../contract";
import { buildTiles } from "~/util/tiles";
import { MainContext } from "./layout";
import { isMobile } from "~/util/rwd";

export const useNextThreeEvents = routeLoader$(async () => {
    const nextThreeEvents = await sanityClient.fetch('*[_type == "event" && date > now()] | order(date asc)[0..2]');
    return nextThreeEvents as Event[];
});

export const useProjects = routeLoader$(async () => {
    const projects = await sanityClient.fetch('*[_type == "project"]{..., "photo": photo.asset->url}|order(orderRank)');
    return projects as Project[];
})

export const useLatestPost = routeLoader$(async () => {
    const latestPost = await sanityClient.fetch('*[_type == "post"]|order(date desc)[0]');
    return latestPost as Post;
})

export default component$(() => {
    const nextThreeEventsSignal = useNextThreeEvents();
    const projects = useProjects();
    const latestPost = useLatestPost();

    const store = useStore<{ tiles: Tile[] }>({
        tiles: [],
    });

    const mainCtx = useContext(MainContext);

    useTask$(({ track }) => { // diagn rebuild on window resize
        const tiles = buildTiles(projects.value, latestPost.value, isMobile(mainCtx.screenSize));
        store.tiles = tiles;
        track(() => [projects, latestPost, mainCtx.screenSize]);
    })

    return nextThreeEventsSignal.value.length > 1 ? (
        <>
            <NextEvents events={nextThreeEventsSignal.value} />
            <HomepageTiles tiles={store.tiles} />
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
