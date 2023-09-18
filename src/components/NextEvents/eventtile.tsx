import { component$ } from '@builder.io/qwik';
import type { Event } from '../../contract';

export interface Props {
    event: Event;
}


const EventTile = component$<Props>(({ event }) => {

    return (
        <div class="w-full flex" style={{ minWidth: "250px" }}>
            <div class="mr-6">
                <div class="w-10 h-10 rounded-full bg-machh-primary" />
            </div>
            <div>
                <label>{`${event.date}`}</label>
                <h4>{event.title}</h4>
            </div>
        </div>
    );
});

export default EventTile;