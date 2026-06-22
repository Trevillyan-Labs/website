import { ClosingCta } from "@/app/_components/home/cta";
import { Hero } from "@/app/_components/home/hero";
import { Services } from "@/app/_components/home/services";
import { Work } from "@/app/_components/home/work";
import { site } from "@/lib/site";

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
      <Work />
      <ClosingCta />
    </>
  );
}
