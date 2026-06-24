import { caseStudies } from "@/lib/content";
import { team } from "@/lib/team";
import type { MetadataRoute } from "next";

export type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export type StaticRoute = {
  /** URL path; "" is the home page. */
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** Whether this page currently has a per-page Markdown mirror (`/<path>.md`). */
  mirror: boolean;
};

// Single source of truth for the site's static routes — consumed by both the
// sitemap (app/sitemap.ts) and the Markdown-mirror registry (lib/md/registry.ts)
// so the two can never drift. `mirror` gates the .md feature per rollout phase
// (see .agents/references/engineering-plans/md-mirrors.md): Phase 1 mirrors the
// data-driven pages; home/about/contact/products are prose and land in Phase 2.
export const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1, changeFrequency: "weekly", mirror: true },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", mirror: true },
  { path: "/work", priority: 0.9, changeFrequency: "monthly", mirror: true },
  { path: "/products", priority: 0.8, changeFrequency: "monthly", mirror: true },
  { path: "/products/newsnook", priority: 0.6, changeFrequency: "monthly", mirror: true },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", mirror: true },
  { path: "/patents", priority: 0.7, changeFrequency: "yearly", mirror: true },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly", mirror: true },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly", mirror: true },
  { path: "/team", priority: 0.4, changeFrequency: "yearly", mirror: true },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly", mirror: true },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", mirror: true },
];

// Dynamic mirror sources. Patent detail pages (/patents/[slug]) are intentionally
// absent — they 307-redirect to Google Patents, so they're neither indexable nor
// mirror-able (see app/sitemap.ts + the engineering plan).
export const workSlugs = (): string[] => caseStudies.map((c) => c.slug);
export const teamSlugs = (): string[] => team.map((m) => m.slug);

function normalize(path: string): string {
  if (path === "" || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function mirrorStaticPaths(): Set<string> {
  return new Set(staticRoutes.filter((r) => r.mirror).map((r) => (r.path === "" ? "/" : r.path)));
}

/** Every path that has a Markdown mirror today (drives `generateStaticParams`). */
export function listMirrorablePaths(): string[] {
  const out = [...mirrorStaticPaths()];
  for (const s of workSlugs()) out.push(`/work/${s}`);
  for (const s of teamSlugs()) out.push(`/team/${s}`);
  return out;
}

/** Is there a Markdown mirror for this (HTML) path? */
export function isMirrorablePath(path: string): boolean {
  const p = normalize(path);
  if (mirrorStaticPaths().has(p)) return true;
  const work = p.match(/^\/work\/([^/]+)$/);
  if (work) return workSlugs().includes(work[1]);
  const member = p.match(/^\/team\/([^/]+)$/);
  if (member) return teamSlugs().includes(member[1]);
  return false;
}
