import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import Gallery from "~/components/Gallery/gallery";
import FixedImage from "~/components/FixedImage/FixedImage";
import MachHTitle from "~/components/shared/machhtitle";
import { normalizeProject } from "~/util/normalizing";

export const useProject = routeLoader$(async (requestEvent: RequestEventLoader) => {
    const [project] = await sanityClient.fetch(`*[_type == "project" && slug.current == "${requestEvent.params.slug}"]{...,name,hexColor,"photo": photo.asset->url,description,"gallery": gallery[].asset->url}`);
    return project && normalizeProject(project);
})

const Project = component$(() => {
    const projectSignal = useProject();
    const project = projectSignal.value;

    if (!project) {
        return null;
    }

    return (
        <div class="w-full">
            <div class="header flex items-center justify-between w-full py-8 border-b-[3px] border-machh-primary">
                <MachHTitle size="text-6xl" style={project.hexColor ? { color: project.hexColor } : {}}>
                    {project.name}
                </MachHTitle>
            </div>
            <div class="textContainer w-full py-8 text-machh-primary text-justify">
                <FixedImage
                    url={project.photo}
                    alt={`${project.name} main image`}
                    // eslint-disable-next-line qwik/no-react-props
                    className="float-left mr-8 mb-4"
                    width={180} height={180}
                    resolutionsOverride={[180]}
                />
                {project.description}
                <Gallery gallery={project.gallery} />
            </div>
        </div>
    )
})

export default Project;