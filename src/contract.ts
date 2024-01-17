export interface Event {
    title: string,
    date: string,
    time?: string;
    place?: string;
    price?: string;
    slug: string;
    linkedProjects?: Project[],
    image?: Image,
    descriptionHtml?: string;
    callToActions?: CallToAction[];
}

export interface CallToAction {
    href: string;
    text: string;
}

export interface AboutUs {
    title: string;
    bodyHtml: string;
}

export interface Image {
    url: string;
    origWidth: number;
    origHeight: number;
}

export interface Project {
    name: string,
    descriptionHtml: string,
    tileCaption?: string,
    image?: Image,
    galleryImages?: Image[],
    events: Event[],
    slug: string,
    hexColor?: string;
    callToActions?: CallToAction[];
}

export interface Post {
    title: string,
    date: string,
    bodyHtml: string,
    image?: Image,
    linkedProjects?: Project[],
    callToActions?: CallToAction[];
}

export interface Tile {
    backgroundImageUrl?: string;
    caption?: string;
    text?: string;
    mobileTitle?: string;
    href?: string;
    mobileTitleId?: string;
}

