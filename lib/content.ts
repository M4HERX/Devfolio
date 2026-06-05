import type { ProjectMeta } from "@/config/projects";
import { WORK_ITEMS, PROJECT_ITEMS } from "@/config/projects";

type Collection = "work" | "projects";

/**
 * Returns the entries for a collection straight from the JSON data files
 * (data/work.json and data/projects.json, surfaced via config/projects.ts).
 * Featured entries are sorted to the front.
 *
 * 👉 To edit what shows up here, edit the JSON — see config/projects.ts.
 */
export function getProjects(collection: Collection): ProjectMeta[] {
  const items = collection === "work" ? WORK_ITEMS : PROJECT_ITEMS;

  return [...items].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );
}

/** All distinct tech tags + categories across a collection, for filter bars. */
export function getFilters(items: ProjectMeta[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    set.add(item.category);
    item.tech.forEach((t) => set.add(t));
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
