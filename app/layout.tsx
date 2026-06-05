import type { Metadata, Viewport } from "next";
import { Rajdhani, DM_Sans, IBM_Plex_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SITE } from "@/config/links";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.fullName}`,
    template: `%s · ${SITE.name}`,
  },
  description: `${SITE.title}. ${SITE.slogan}`,
  keywords: [
    SITE.fullName,
    SITE.name,
    SITE.title,
    SITE.origin,
    "Portfolio",
    "Developer",
  ],
  authors: [{ name: SITE.fullName }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${SITE.name} · ${SITE.fullName}`,
    description: `${SITE.title}. ${SITE.slogan}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1f22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${orbitron.variable}`}
    >
      <body className="font-body antialiased grain-overlay">
        <LanguageProvider>
          <Navbar />
          <main className="relative min-h-screen">{children}</main>
          <Footer />
          {SITE.showLanguageSwitcher && <LanguageSwitcher />}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
