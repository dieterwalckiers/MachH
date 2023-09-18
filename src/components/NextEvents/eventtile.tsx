import { component$ } from '@builder.io/qwik';
import type { Event } from '../../contract';
import GreenBall from '../GreenBall';

export interface Props {
    event: Event;
}


const EventTile = component$<Props>(({ event }) => {

    return (
        <div class="w-full flex" style={{ minWidth: "250px" }}>
            <div class="mr-6">
                <GreenBall />
            </div>
            <div>
                <label>{`${event.date}`}</label>
                <h4>{event.title}</h4>
            </div>
        </div>
    );
});

export default EventTile;