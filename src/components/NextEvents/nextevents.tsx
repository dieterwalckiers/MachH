import { component$, useContext, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { Event } from '../../contract';
import EventTile from "./eventtile";
import { MainContext } from '~/routes/layout';

export interface Props {
    events: Event[];
}


const NextEvents = component$<Props>(({ events }) => {

    const store = useStore<{ showArrows: boolean }>({
        showArrows: true,
    });

    const mainCtx = useContext(MainContext);

    useVisibleTask$(({ track }) => {
        console.log("mainCtx.screenSize", mainCtx.screenSize)
        switch (mainCtx.screenSize) {
            case "my-xs":
            case "md":
            case "sm":
                store.showArrows = true;
                break;
            default:
                store.showArrows = false;
        }
        track(() => mainCtx.screenSize);
    });

    return (
        <div class="nextevents w-full text-machh-primary border-b-[3px] border-machh-primary pt-6 font-semibold uppercase">
            <h3 class="text-machh-primary font-semibold text-xl uppercase mb-6">
                Komende activiteiten
            </h3>
            <div class="flex justify-between relative overflow-x-auto py-8">
                {
                    events.slice(0, 3).map((event, i) => (
                        <EventTile event={event} key={`etile${i}`} />
                    ))
                }
            </div>
        </div>
    );
});

export default NextEvents;