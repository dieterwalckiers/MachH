export interface Event {
    title: string,
    date: Date,
}

export interface Project {
    name: string,
    photo: any, // TODO
    events: Event[],
}