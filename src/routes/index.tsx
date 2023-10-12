import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import NextEvents from "~/components/NextEvents/nextevents";
import HomepageTiles from "~/components/HomepageTiles/homepagetiles"
import type { Event, Tile } from "../contract";
import { buildTiles } from "~/util/tiles";
import { MainContext } from "./layout";
import { isMobile } from "~/util/rwd";
import { normalizeEvent, normalizePost } from "~/util/normalizing";

export const useNextThreeEvents = routeLoader$(async () => {
    const nextThreeEvents = await sanityClient.fetch('*[_type == "event" && date > now()] | order(date asc)[0..2]');
    return nextThreeEvents.map((e: any) => normalizeEvent(e, true)) as Event[];
});

export const useLatestPost = routeLoader$(async () => {
    const latestPost = await sanityClient.fetch('*[_type == "post"]|order(date desc)[0]');
    return normalizePost(latestPost);
})

export default component$(() => {
    const nextThreeEventsSignal = useNextThreeEvents();
    
    const latestPost = useLatestPost();

    const store = useStore<{ tiles: Tile[] }>({
        tiles: [],
    });

    const mainCtx = useContext(MainContext);

    useTask$(({ track }) => {
        const { projects } = mainCtx;
        if (!projects) {
            return;
        }
        const tiles = buildTiles(projects, latestPost.value, isMobile(mainCtx.screenSize));
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
