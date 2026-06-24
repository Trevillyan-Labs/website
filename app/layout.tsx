import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — independent software studio`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — independent software studio`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: `${site.url}/og?title=${encodeURIComponent("We build and run software — ours and yours.")}`,
        width: 1200,
        height: 630,
        alt: `${site.name} — independent software studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      `${site.url}/og?title=${encodeURIComponent("We build and run software — ours and yours.")}`,
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
