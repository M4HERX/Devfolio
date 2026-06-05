/**
 * config/projects.ts
 * ------------------
 * Types + loader for the /work and /projects galleries.
 *
 * 👉 To edit your entries, DON'T touch this file — edit the JSON:
 *      • Client work  → `data/work.json`
 *      • Personal/OSS → `data/projects.json`
 *    Each entry has a slug, Title, Description, tech list, category, and a few
 *    optional flags (see ProjectMeta below).
 */

import workData from "@/data/work.json";
import projectsData from "@/data/projects.json";

export type ProjectMeta = {
  slug: string;
  title: string;
  /** client name for /work, or "Personal" / "Open Source" for /projects */
  client?: string;
  description: string;
  tech: string[];
  category: string;
  featured?: boolean;
  comingSoon?: boolean;
  link?: string;
  /** card image path, served from /public — e.g. "/work/my-project.jpg" */
  cover?: string;
};

/** Client work entries — edit data/work.json (the "items" list). */
export const WORK_ITEMS: ProjectMeta[] = workData.items as ProjectMeta[];

/** Personal / open-source entries — edit data/projects.json (the "items" list). */
export const PROJECT_ITEMS: ProjectMeta[] = projectsData.items as ProjectMeta[];
