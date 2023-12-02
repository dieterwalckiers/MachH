import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import sanityClient from "~/cms/sanityClient";
import Gallery from "~/components/Gallery/gallery";
import MachHTitle from "~/components/shared/machhtitle";
import { normalizeProject } from "~/util/normalizing";
import { Project } from "~/contract";
import MachHImage from "~/components/MachHImage";

export const useProject = routeLoader$(async (requestEvent: RequestEventLoader) => {
    const [project] = await sanityClient.fetch(`*[_type == "project" && slug.current == "${requestEvent.params.slug}"]{...,name,hexColor,"photoUrl": photo.asset->url,"photoRef": photo.asset._ref,description,"galleryPhotoUrls": gallery[].asset->url,"galleryPhotoRefs": gallery[].asset._ref}`);
    return project && normalizeProject(project);
})

const Project = component$(() => {
    const projectSignal = useProject();
    const project = projectSignal.value as Project | undefined;

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
                <MachHImage
                    image={project.image}
                    alt={`${project.name} main image`}
                    // eslint-disable-next-line qwik/no-react-props
                    className="float-left mr-8 mb-4"
                    width={180} height={180}
                    resolutionsOverride={[180]}
                />
                {project.description}
                <Gallery images={project.galleryImages || []} />
            </div>
        </div>
    )
})

export default Project;