import { $, component$ } from "@builder.io/qwik";
import type { Event } from "~/contract";
import MachHTitle from "../shared/machhtitle";
import GreenBall from "../GreenBall";
import { Link, useNavigate } from "@builder.io/qwik-city";
import SanityImage from "../SanityImage/sanityimage";
import MachHButton from "../shared/machhbutton";

interface Props {
    event: Event;
    clickable?: boolean;
    showDetail?: boolean;
    noBottomBorder?: boolean;
    from?: number;
    to?: number;
}

const EventCard = component$<Props>(({ event, clickable, showDetail, noBottomBorder, from, to }) => {

    const nav = useNavigate();

    const onClick = $(() => {
        if (clickable) {
            nav(`/event/${event.slug}?s=l&f=${from}&t=${to}`);
        }
    });

    return (
        <div
            class={`flex flex-col justify-between text-machh-primary
                font-semibold text-lg ${noBottomBorder ? "" : "border-b-[3px] border-machh-primary"} ${showDetail ? "" : "h-56"} py-8`}
        >
            <div class="flex w-full">
                <div class={`practicaldetails flex w-1/3 ${clickable ? "cursor-pointer" : ""}`} onClick$={onClick}>
                    <GreenBall />
                    <div class="flex flex-col ml-12 pointer-events-none">
                        <label>{event.date}</label>
                        <label>{event.time}</label>
                        <label>{event.place}</label>
                        <label>{event.price}</label>
                    </div>
                </div>
                <div class={`max-w-[50%] grow eventtitle ${clickable ? "cursor-pointer" : ""}`} onClick$={onClick}>
                    <MachHTitle size="text-3xl">
                        {event.title}
                    </MachHTitle>
                </div>
                <div class={`grow flex justify-end ${clickable ? "cursor-pointer" : ""}`} onClick$={onClick}>
                    <div class={`${event.image ? "" : "invisible"}`}>
                        <SanityImage url={event.image} width={120} height={120} alt="event-image" resolutionsOverride={[120]} />
                    </div>
                </div>
            </div>
            {showDetail ? (
                <div class="mt-8 md:pl-[5.5rem]">
                    <label class="mt-8">{event.description}</label>
                </div>
            ) : null}
            <div class="flex ml-[4.5rem] mt-8 justify-between items-center">
                <div class="flex text-sm">
                    {event.linkedProjects?.map((project, i) => (
                        <Link href={`/${project.slug}`} key={`projlink${i}`}>
                            <label style={{ color: project.hexColor ?? "inherit" }} class="uppercase block ml-4 cursor-pointer hover:opacity-75">
                                {project.name}
                            </label>
                        </Link>
                    ))}
                </div>
                {event.ctaHref && event.ctaText ? (
                    <MachHButton
                        onClick$={() => { window.open(event.ctaHref!, '_blank'); }}
                        class="text-sm"
                    >
                        <label class="pointer-events-none">{event.ctaText}</label>
                    </MachHButton>
                ) : null}
            </div>
        </div >
    )
})

export default EventCard;