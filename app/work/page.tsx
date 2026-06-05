import type { Metadata } from "next";
import { SITE } from "@/config/links";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Work",
  description: `Client work by ${SITE.fullName}.`,
};

export default function WorkPage() {
  return <WorkContent />;
}
