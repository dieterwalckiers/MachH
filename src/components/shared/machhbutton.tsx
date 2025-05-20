import type { PropsOf } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

type Props = PropsOf<"button"> & {
    class?: string;
}
const MachHButton = component$<Props>(({ class: _class, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            class={`bg-machh-primary text-white px-4 py-2 uppercase cursor-pointer hover:bg-machh-primary-light transition-colors duration-300 ${_class}`}
        >
            <Slot />
        </button >
    )
})

export default MachHButton;