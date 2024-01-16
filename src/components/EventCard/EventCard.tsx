import { $, component$ } from "@builder.io/qwik";
import type { Event } from "~/contract";
import MachHTitle from "../shared/machhtitle";
import Ball from "../Ball";
import { Link, useNavigate } from "@builder.io/qwik-city";
import MachHImage from "../MachHImage";
import CallToActions from "../shared/calltoactions";
import HtmlBlock from "../HtmlBlock/htmlblock";

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

    const hexColor = event.linkedProjects?.[0]?.hexColor;

    return (
        <div
            class={`flex flex-col justify-between text-machh-primary
                font-semibold text-lg ${noBottomBorder ? "" : "border-b-[3px] border-machh-primary"} ${showDetail ? "" : "md:h-64"} py-8`}
        >
            <div class="flex w-full flex-col md:flex-row">
                <div class={`practicaldetails flex ${clickable ? "cursor-pointer" : ""} md:w-1/3`} onClick$={onClick}>
                    <Ball class="hidden md:block" hexColor={hexColor} />
                    <div class="flex flex-col pointer-events-none md:ml-12">
                        <label>{event.dateNotation1}</label>
                        <label>{event.timeNotation1}</label>
                        <label>{event.place}</label>
                        <label>{event.price}</label>
                    </div>
                </div>
                <div class={`grow eventtitle ${clickable ? "cursor-pointer" : ""} md:max-w-[50%]`} onClick$={onClick}>
                    <MachHTitle size="text-3xl">
                        {event.title}
                    </MachHTitle>
                </div>
                <div class={`grow flex ${clickable ? "cursor-pointer" : ""} mt-4 md:mt-0 md:justify-end`} onClick$={onClick}>
                    {!event.image ? (
                        <div class="w-[120px] h-[120px]">
                        </div>
                    ) : (
                        <div>
                            <MachHImage image={event.image} width={155} height={155} alt="event-image" resolutionsOverride={[155]} />
                        </div>
                    )}
                </div>
            </div>
            {showDetail ? (
                <div class="mt-8 md:pl-[5.5rem]">
                    {event.descriptionHtml && <HtmlBlock value={event.descriptionHtml} class="text-justify" />}
                </div>
            ) : null}
            <div class="flex ml-[4.5rem] mt-8 justify-between items-top">
                <div class="flex text-sm">
                    {event.linkedProjects?.map((project, i) => (
                        <Link href={`/${project.slug}`} key={`projlink${i}`}>
                            <label style={{ color: project.hexColor ?? "inherit" }} class="uppercase block ml-4 cursor-pointer hover:opacity-75">
                                {project.name}
                            </label>
                        </Link>
                    ))}
                </div>
                {event.callToActions?.length && (
                    <CallToActions callToActions={event.callToActions} />
                )}
            </div>
        </div >
    )
})

export default EventCard;