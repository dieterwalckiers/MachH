import { component$ } from "@builder.io/qwik";

export default component$<{ class?: string }>(({ class: _class }) => (
    <div class={`w-10 h-10 rounded-full bg-machh-primary ${_class || ""}`} />
));