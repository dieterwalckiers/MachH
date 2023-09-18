
import type { Event, Project } from "~/contract";

export function normalizeEvent(event: any): Event {
    const [y, m, d] = event.date.split('-')
    return {
        ...event,
        date: `${d}/${m}/${y}`,
        slug: event.slug.current,
        linkedProjects: event.linkedProjects.map(normalizeProject),
    }
}

export function normalizeProject(project: any): Project {
    return {
        ...project,
        slug: project.slug.current,
    }
}