import type { Metadata } from "next";
import { SITE } from "@/config/links";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.fullName}.`,
};

export default function ContactPage() {
  return <ContactContent />;
}
