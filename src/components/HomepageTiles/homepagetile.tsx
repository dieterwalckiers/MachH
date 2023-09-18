import { component$ } from '@builder.io/qwik';

export interface Props {
    backgroundImage?: string;
    caption?: string;
    text?: string;
}

export const TILE_DIM = 220;

const HomepageTile = component$<Props>(({
    backgroundImage,
    caption,
    text
}) => {

    console.log("HomepageTile with img", backgroundImage, "and caption", caption);

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
        }} class="flex items-center justify-center w-[calc(33.3%-1.333rem)] aspect-square mb-8 [&:not(:nth-child(3))]:mr-8">
            <label class="text-white text-2xl uppercase">
                {caption}
            </label>
        </div>
    );
});

export default HomepageTile;