import { site } from "@/lib/site";
import type { Metadata } from "next";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = `${site.url}/og?title=${encodeURIComponent(title)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} · ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}
