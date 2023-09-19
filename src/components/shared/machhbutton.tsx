import { Slot, component$ } from "@builder.io/qwik";

interface Props {
    class?: string;
    onClick$: () => void;
}
const MachHButton = component$<Props>(({ class: _class, onClick$ }) => {
    return (
        <button
            type="button"
            class={`bg-machh-primary text-white px-4 py-2 uppercase cursor-pointer hover:bg-machh-primary-light transition-colors duration-300 ${_class}`}
            onClick$={onClick$}
        >
            <Slot />
        </button >
    )
})

export default MachHButton;