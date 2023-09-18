import { component$ } from '@builder.io/qwik';
import type { Project } from '../../contract';
import HomepageTile from "./homepagetile";

export interface Props {
    projects: Project[];
}


const HomepageTiles = component$<Props>(({ projects }) => {

    return (
        <div class="flex flex-wrap w-full">
            {
                projects.map((project: Project, i: number) => {
                    return (
                        <HomepageTile key={`proj${i}`} backgroundImage={project.photo} caption={project.name} />
                    )
                })
            }
        </div>
    );
});

export default HomepageTiles;