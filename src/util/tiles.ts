import type { Project, Tile } from "~/contract";

export function buildTiles(
    projects: Project[],
): Tile[] {
    return projects.map((project) => ({
        backgroundImageUrl: project.image?.url,
        caption: project.tileCaption,
        text: project.name,
        href: `/${project.slug}`,
        isFocused: project.isFocused,
    }));
}