import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

const Project = component$(() => {
    const slug = useLocation().params.slug;
    return (
        <div>
            <h1>Project {slug}</h1>
        </div>
    )
})

export default Project;