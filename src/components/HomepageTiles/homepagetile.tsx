import type { Tile } from "~/contract";
import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import MachHTitle from "../shared/machhtitle";
import { MainContext } from "~/routes/layout";
import { isMobile } from "~/util/rwd";

export interface Props {
    tile: Tile;
}

const HomepageTile = component$<Props>(({
    tile
}) => {
    const { backgroundImage, caption, text } = tile;
    const mainCtx = useContext(MainContext);
    const backgroundImageBestFitUrl = isMobile(mainCtx.screenSize) ?
        `${backgroundImage}?w=450&h=450&fit=crop&auto=format` :
        `${backgroundImage}?w=245&h=245&fit=crop&auto=format`;

    return (
        <Link href={tile.href} class="w-full md:w-[calc(33.3%-1.333rem)] mb-4 md:mb-8 md:[&:not(:nth-child(3))]:mr-8">
            {tile.mobileTitle && (
                <MachHTitle class="block md:hidden my-8">
                    {tile.mobileTitle}
                </MachHTitle>
            )}
            <div
                style={{
                    backgroundImage: `url(${backgroundImageBestFitUrl})`,
                    backgroundSize: 'cover',
                }}
                class={`aspect-square overflow-hidden relative ${backgroundImage ? "hover:opacity-80 transition-opacity duration-300 cursor-pointer" : ""}`}
            >
                {
                    caption ? (
                        <div class="flex items-center justify-center text-center w-full h-full">
                            <label class="text-white text-3xl font-extrabold uppercase whitespace-break-spaces cursor-pointer">
                                {caption.replace(" ", "\n")}
                            </label>
                        </div>
                    ) : (text ? (
                        <div class="cursor-pointer">
                            <label class="text-machh-primary font-bold cursor-pointer">
                                {text}
                            </label>
                            <label class="absolute bottom-[-8px] right-0 fill-current text-machh-primary text-4xl font-black py-0 px-2 bg-white cursor-pointer">
                                &#x2192;
                            </label>
                        </div>
                    ) : null)
                }
            </div>
        </Link>

    );
});

export default HomepageTile;