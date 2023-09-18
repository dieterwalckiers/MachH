import { component$ } from "@builder.io/qwik";
import type { Event } from "~/contract";
import MachHTitle from "../shared/machhtitle";
import GreenBall from "../GreenBall";
import { Link } from "@builder.io/qwik-city";

interface Props {
    event: Event;
}

const EventCard = component$<Props>(({ event }) => {
    return (
        <div class="flex flex-col justify-between text-machh-primary font-semibold text-lg border-b-[3px] border-machh-primary h-56 py-8">
            <div class="flex">
                <div class="practicaldetails flex w-1/3">
                    <GreenBall />
                    <div class="flex flex-col ml-12">
                        <label>{event.date}</label>
                        <label>{event.time}</label>
                        <label>{event.place}</label>
                        <label>{event.price}</label>
                    </div>
                </div>
                <div class="eventtitle">
                    <MachHTitle size="text-3xl">
                        {event.title}
                    </MachHTitle>
                </div>
            </div>
            <div class="flex ml-[4.5rem] text-sm mt-8">
                {event.linkedProjects?.map((project, i) => (
                    <Link href={`/project/${project.slug}`} key={`projlink${i}`}>
                        <label style={{ color: project.hexColor ?? "inherit" }} class="uppercase block ml-4 cursor-pointer hover:opacity-75">
                            {project.name}
                        </label>
                    </Link>
                ))}
            </div>
        </div >
    )
})

export default EventCard;