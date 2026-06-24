import { ClosingCta } from "@/app/_components/home/cta";
import { Hero } from "@/app/_components/home/hero";
import { OperatedByRen } from "@/app/_components/home/operated-by-ren";
import { Services } from "@/app/_components/home/services";
import { Work } from "@/app/_components/home/work";
import { site } from "@/lib/site";
import type { Metadata } from "next";

// Home uses the layout's default title/description/OG; set the canonical here.
export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.tagline,
  sameAs: [site.newsnookUrl, "https://www.linkedin.com/in/williamtrevillyan/"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />
      <Services />
      <OperatedByRen />
      <Work />
      <ClosingCta />
    </>
  );
}
