export interface Event {
    title: string,
    date: string,
    time?: string;
    place?: string;
    price?: string;
    slug: string;
    linkedProjects?: Project[],
    image?: Image,
    description?: string;
    ctaHref?: string;
    ctaText?: string;
}

export interface AboutUs {
    title: string;
    body: string;
}

export interface Image {
    url: string;
    origWidth: number;
    origHeight: number;
}

export interface Project {
    name: string,
    description: string,
    tileCaption?: string,
    image?: Image,
    galleryImages?: Image[],
    events: Event[],
    slug: string,
    hexColor?: string;
}

export interface Post {
    title: string,
    date: string,
    body: string,
    image?: Image,
    linkedProjects?: Project[],
    ctaHref?: string,
    ctaText?: string,
}

export interface Tile {
    backgroundImageUrl?: string;
    caption?: string;
    text?: string;
    mobileTitle?: string;
    href?: string;
    mobileTitleId?: string;
}

