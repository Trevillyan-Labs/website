import { caseStudies } from "@/lib/content";
import { staticRoutes } from "@/lib/routes";
import { site } from "@/lib/site";
import { team } from "@/lib/team";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  // Static route list is the shared source in lib/routes.ts (also drives the
  // Markdown-mirror registry, so the two can't drift).
  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const c of caseStudies) {
    entries.push({
      url: `${base}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    });
  }
  // /patents/[slug] is intentionally excluded — those URLs redirect (307) to
  // Google Patents (URL parity), so they're redirects, not indexable content.
  for (const m of team) {
    entries.push({
      url: `${base}/team/${m.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
