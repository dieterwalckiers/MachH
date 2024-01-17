import { component$ } from "@builder.io/qwik";


export interface Props {
    value: string;
}

const HtmlBlock = component$<Props>(({
    value
}) => {

    return (
        <div class="w-full" dangerouslySetInnerHTML={value} />
    );
});

export default HtmlBlock;