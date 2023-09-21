import type { Project, Post, Tile } from "~/contract";
import { toPlainText } from "./portableText";

export function buildTiles(
    projects: Project[],
    latestPost: Post,
    isMobile = false,
): Tile[] {
    const tiles: Tile[] = projects.map((project, i) => ({
        backgroundImage: project.photo,
        caption: project.tileCaption,
        text: project.name,
        mobileTitle: i === 0 && isMobile ? "Onze projecten" : undefined,
        href: `/${project.slug}`,
    }));
    const latestPostTile = {
        text: toPlainText(latestPost.body),
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