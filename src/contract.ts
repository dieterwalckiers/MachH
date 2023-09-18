export interface Event {
    title: string,
    date: Date,
}

export interface Project {
    name: string,
    tileCaption?: string,
    photo: any, // TODO
    events: Event[],
}

export interface Post {
    title: string,
    date: Date,
    body: any, // TODO
    linkedProjects: any[], // TODO
    ctaHref?: string,
}

export interface Tile {
    backgroundImage?: string;
    caption?: string;
    text?: string;
    mobileTitle?: string;
}

