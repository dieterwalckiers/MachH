import type { Tile } from "~/contract";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import MachHTitle from "../shared/machhtitle";

export interface Props {
    tile: Tile;
}

export const TILE_DIM = 220;

const HomepageTile = component$<Props>(({
    tile
}) => {
    const { backgroundImage, caption, text } = tile;

    console.log("HomepageTile with img", backgroundImage, "and caption", caption, "and text", text);

    return (
        <div class="w-full md:w-[calc(33.3%-1.333rem)] mb-4 md:mb-8 md:[&:not(:nth-child(3))]:mr-8">
            {tile.mobileTitle && (
                <MachHTitle class="block md:hidden my-8">
                    {tile.mobileTitle}
                </MachHTitle>
            )}
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
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
                        <Link href="/news">
                            <div class="cursor-pointer">
                                <label class="text-machh-primary font-bold cursor-pointer">
                                    {text}
                                </label>
                                <label class="absolute bottom-[-8px] right-0 fill-current text-machh-primary text-4xl font-black py-0 px-2 bg-white cursor-pointer">
                                    &#x2192;
                                </label>
                            </div>
                        </Link>
                    ) : null)
                }
            </div>
        </div>

    );
});

export default HomepageTile;