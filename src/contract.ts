export interface Event {
    title: string,
    date: string,
    time?: string;
    place?: string;
    price?: string;
    slug: string;
    linkedProjects?: Project[],
    image?: any, // TODO
    description?: string;
    ctaHref?: string;
    ctaText?: string;
}

export interface Project {
    name: string,
    tileCaption?: string,
    photo: any, // TODO
    events: Event[],
    slug: string,
    hexColor?: string;
}

export interface Post {
    title: string,
    date: string,
    body: string,
    image?: any, // TODO
    linkedProjects?: Project[],
    ctaHref?: string,
    ctaText?: string,
}

export interface Tile {
    backgroundImage?: string;
    caption?: string;
    text?: string;
    mobileTitle?: string;
    href?: string;
}

