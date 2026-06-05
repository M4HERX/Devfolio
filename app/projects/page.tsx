import type { Metadata } from "next";
import { SITE } from "@/config/links";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description: `Personal and open-source projects by ${SITE.fullName}.`,
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
