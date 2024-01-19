import type { Project, Post, Tile } from "~/contract";

export function buildTiles(
    projects: Project[],
    latestPost: Post,
    isMobile = false,
): Tile[] {
    const tiles: Tile[] = projects.map((project, i) => ({
        backgroundImageUrl: project.image?.url,
        caption: project.tileCaption,
        text: project.name,
        mobileTitle: i === 0 && isMobile ? "Onze projecten" : undefined,
        mobileTitleId: i === 0 && isMobile ? "projects" : undefined,
        href: `/${project.slug}`,
    }));
    const latestPostTile = {
        text: latestPost.bodyHtml,
        mobileTitle: "Nieuws",
        href: "/news",
    } as Tile;

    if (isMobile) {
        return [latestPostTile, ...tiles];
    }

    if (tiles.length < 3) {
        return [...tiles, latestPostTile];
    }
    tiles.splice(2, 0, latestPostTile);
    return tiles;
}