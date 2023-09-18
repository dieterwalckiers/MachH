import { Slot, component$ } from "@builder.io/qwik";

interface Props {
    class?: string;
}
const MachHTitle = component$<Props>(({ class: _class }) => {
    return (
        <h3 class={`text-machh-primary font-semibold text-xl uppercase ${_class}`}>
            <Slot />
        </h3>
    )
})

export default MachHTitle;