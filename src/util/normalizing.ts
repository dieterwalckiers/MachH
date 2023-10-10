
import type { AboutUs, Event, Post, Project } from "~/contract";
import { toPlainText } from "./portableText";

export function normalizeEvent(event: any, skipLinkedProjects = false): Event {
    const [y, m, d] = event.date.split('-')
    return {
        ...event,
        date: `${d}/${m}/${y}`,
        slug: event.slug?.current,
        ...(!skipLinkedProjects ? { linkedProjects: event.linkedProjects?.map((p: any) => normalizeProject(p)) } : {}),
    }
}

export function normalizePost(post: any, skipLinkedProjects = false): Post {
    const [y, m, d] = post.date.split('-')
    return {
        ...post,
        date: `${d}/${m}/${y}`,
        ...(!skipLinkedProjects ? { linkedProjects: post.linkedProjects?.map((p: any) => normalizeProject(p)) } : {}),
    }
}

export function normalizeProject(project: any): Project {
    return {
        ...project,
        slug: project.slug?.current,
    }
}

export function normalizeAboutUs(aboutUs: any): AboutUs {
    return {
        ...aboutUs,
    }
}