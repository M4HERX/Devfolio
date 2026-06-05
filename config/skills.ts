/**
 * config/skills.ts
 * ----------------
 * Types + loader for the skill-tree that powers the /skills branch
 * visualization and the mobile accordion.
 *
 * 👉 To edit your skills, DON'T touch this file — edit `data/skills.json`.
 *    Each branch has a Title, a Description, and a list of skills (each with
 *    its own name + description). Add/remove branches or skills there and they
 *    flow straight into the page.
 *
 * The center node of the tree automatically uses your brand name from
 * config/links.ts (SITE.name) — no need to set it separately.
 */

import { SITE } from "@/config/links";
import skillsData from "@/data/skills.json";

export type SkillNode = {
  name: string;
  description: string;
};

export type SkillCategory = {
  id: string;
  name: string;
  description: string;
  /** the individual skills that fan out from this branch */
  skills: SkillNode[];
};

type SkillsFile = {
  branches: SkillCategory[];
};

const data = skillsData as SkillsFile;

/** The central node label — automatically uses your brand name from config/links.ts. */
export const SKILL_ROOT: string = SITE.name;

/** Every branch + its skills. Edit `branches` in data/skills.json. */
export const SKILL_TREE: SkillCategory[] = data.branches;
