import { component$ } from '@builder.io/qwik';
import type { Event } from '../../contract';
import EventTile from "./eventtile";

export interface Props {
    events: Event[];
}


const NextEvents = component$<Props>(({ events }) => {

    return (
        <div class="nextevents w-full text-machh-primary border-b-[3px] border-machh-primary py-6 font-semibold uppercase">
            <h3 class="text-machh-primary font-semibold text-xl uppercase mb-6">Komende activiteiten</h3>
            <div class="flex justify-between">
                {events.map((event, i) => (
                    <EventTile event={event} key={`etile${i}`}/>
                ))}
            </div>
        </div>
    );
});

export default NextEvents;