import type { CSSProperties} from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

interface Props {
    class?: string;
    size?: string;
    style?: CSSProperties;
}
const MachHTitle = component$<Props>(({ class: _class, size, style }) => {
    return (
        <h3
            class={`text-machh-primary font-semibold uppercase ${_class} ${size ?? "text-xl"}`}
            style={style || {}}
        >
            <Slot />
        </h3>
    )
})

export default MachHTitle;