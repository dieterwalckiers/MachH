import { component$, createContextId, Slot, useContextProvider, useStore } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import MainMenu from "~/components/MainMenu/mainmenu";
import Header from "~/components/header/header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export type MainContextData = {
    showMobileMenu: boolean;
};
export const MainContext = createContextId<MainContextData>("mainContext");


export default component$(() => {

    const store = useStore<MainContextData>({
        showMobileMenu: false,
    });
    useContextProvider(MainContext, store);

    return (
        <div class="w-full flex flex-col py-4 items-center font-roboto">
            <div class="w-[calc(100vw-1rem)] md:w-[50rem] flex flex-col items-center">
                <Header />
                <MainMenu />
                <Slot />
            </div>
        </div>
    );
});
