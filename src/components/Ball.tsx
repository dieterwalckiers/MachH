import { component$ } from "@builder.io/qwik";

export default component$<{
    class?: string,
    hexColor?: string,
}>(({ class: _class, hexColor }) => (
    <div class={`w-10 h-10 rounded-full ${_class || ""}`} style={{ backgroundColor: hexColor || "#009548" }} />
));