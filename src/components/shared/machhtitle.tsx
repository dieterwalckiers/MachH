import { Slot, component$ } from "@builder.io/qwik";

interface Props {
    class?: string;
    size?: string;
}
const MachHTitle = component$<Props>(({ class: _class, size }) => {
    return (
        <h3 class={`text-machh-primary font-semibold uppercase ${_class} ${size ?? "text-xl"}`}>
            <Slot />
        </h3>
    )
})

export default MachHTitle;