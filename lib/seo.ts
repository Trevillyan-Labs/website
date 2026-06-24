import { isMirrorablePath } from "@/lib/routes";
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
  // Advertise the Markdown twin only for pages that actually have one (the .md
  // ships in the same phase as this link). See the md-mirrors plan §5.
  const alternates: Metadata["alternates"] = { canonical: url };
  if (isMirrorablePath(path)) {
    alternates.types = { "text/markdown": `${url}.md` };
  }
  return {
    title,
    description,
    alternates,
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
