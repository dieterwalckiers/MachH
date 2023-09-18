import { component$ } from '@builder.io/qwik';
import type { Tile } from '../../contract';
import HomepageTile from "./homepagetile";
import MachHTitle from '../shared/machhtitle';

export interface Props {
    tiles: Tile[];
}


const HomepageTiles = component$<Props>(({ tiles }) => {

    return (
        <section class="homepagetiles">
            <div class="hidden md:flex relative w-full my-6">
                <MachHTitle>
                    Onze projecten
                </MachHTitle>
                <MachHTitle class="absolute l-0 ml-[calc((100%/1.5)+1.33rem)]">
                    Nieuws
                </MachHTitle>
            </div>
            <div class="flex flex-wrap w-full">
                {
                    tiles.map((tile: Tile, i: number) => {
                        return (
                            <HomepageTile key={`proj${i}`} tile={tile} />
                        )
                    })
                }
            </div>
        </section>
    );
});

export default HomepageTiles;