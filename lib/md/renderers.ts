import { type Group, caseStudies, faqs, services } from "@/lib/content";
import { patentsPage } from "@/lib/content/pages";
import { legalHtml } from "@/lib/legal";
import { bullets, frontmatter, htmlToMarkdown, mirrorUrl } from "@/lib/md/serialize";
import { patents } from "@/lib/patents";
import { team } from "@/lib/team";

// Frontmatter title/description for static mirror pages. These mirror each page's
// pageMeta() call in app/<route>/page.tsx — keep them in sync. Body content stays
// drift-free (rendered from the typed layer); this header metadata is low-stakes
// per the md-mirrors plan §5.
const META: Record<string, { title: string; description: string }> = {
  "/services": {
    title: "Services",
    description:
      "Hire Trevillyan Labs to build custom software, ship a web/portfolio site, or advise on product and go-to-market execution.",
  },
  "/work": {
    title: "Case studies",
    description:
      "Featured work from Trevillyan Labs — across owned products, startup builds, and websites.",
  },
  "/patents": {
    title: "Patents",
    description:
      "Two issued US patents in fluid-detection technology from Trevillyan Labs' founder — proof of invention capability and available for commercial licensing.",
  },
  "/faq": {
    title: "FAQ",
    description:
      "Common questions about Trevillyan Labs — what we do, who we help, how engagements work, and how we use AI.",
  },
  "/team": { title: "Team", description: "The people behind Trevillyan Labs." },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "How Trevillyan Labs, LLC collects, uses, and protects your information.",
  },
  "/terms": {
    title: "Terms and Conditions",
    description: "The legal terms for using Trevillyan Labs, LLC's website and services.",
  },
};

function doc(title: string, description: string, path: string, body: string): string {
  return `${frontmatter({ title, description, url: mirrorUrl(path) })}\n\n${body.trim()}\n`;
}

function staticDoc(path: string, body: string): string {
  const m = META[path];
  return doc(m.title, m.description, path, body);
}

// --- Static, data-driven pages (Phase 1) ---------------------------------------

export function renderServices(): string {
  // Mirrors the /services page: Build and Advise groups only (the page does not
  // render the Products service). Intro and the "How engagements work" steps are
  // prose and land in Phase 2.
  const groups: Group[] = ["Build", "Advise"];
  const out = [`# ${META["/services"].title}`, "", META["/services"].description];
  for (const g of groups) {
    out.push("", `## ${g}`);
    for (const s of services.filter((x) => x.group === g)) {
      out.push("", `### ${s.title}`, s.summary, "", bullets(s.whatYouGet));
    }
  }
  return staticDoc("/services", out.join("\n"));
}

export function renderWorkIndex(): string {
  const out = [`# ${META["/work"].title}`, "", META["/work"].description];
  for (const c of caseStudies) {
    out.push("", `## ${c.title} (${c.tag})`, c.summary);
    out.push(`Read the full case study: ${mirrorUrl(`/work/${c.slug}`)}`);
  }
  return staticDoc("/work", out.join("\n"));
}

export function renderWorkDetail(slug: string): string | null {
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return null;
  const out = [
    `# ${c.title}`,
    "",
    `${c.tag} · ${c.role}`,
    "",
    c.summary,
    "",
    "## The problem",
    c.problem,
    "",
    "## The approach",
    c.approach,
    "",
    "## The outcome",
    bullets(c.outcome),
  ];
  if (c.liveUrl) out.push("", `Live: ${c.liveUrl}`);
  return doc(`${c.title} — ${c.tag}`, c.summary, `/work/${c.slug}`, out.join("\n"));
}

export function renderPatentsIndex(): string {
  const out = [`# ${META["/patents"].title}`, "", META["/patents"].description];
  out.push("", "## The technology");
  for (const p of patentsPage.technology) out.push("", p);
  out.push("", "## Issued patents");
  for (const p of patents) {
    out.push("", `### ${p.number} — ${p.title}`, `${p.summary} (Issued ${p.published}.)`);
    out.push(`Source: ${p.sourceUrl}`);
  }
  out.push("", "## Licensing", "", patentsPage.licensing);
  return staticDoc("/patents", out.join("\n"));
}

export function renderFaq(): string {
  const out = [`# ${META["/faq"].title}`, "", META["/faq"].description];
  for (const f of faqs) out.push("", `## ${f.q}`, f.a);
  return staticDoc("/faq", out.join("\n"));
}

export function renderTeamIndex(): string {
  const out = [`# ${META["/team"].title}`, "", META["/team"].description];
  for (const m of team) {
    out.push("", `## ${m.name} — ${m.title}`, m.bio);
    out.push(`Profile: ${mirrorUrl(`/team/${m.slug}`)}`);
  }
  return staticDoc("/team", out.join("\n"));
}

export function renderTeamDetail(slug: string): string | null {
  const m = team.find((x) => x.slug === slug);
  if (!m) return null;
  const out = [`# ${m.name}`, "", m.title, "", m.bio];
  const links: string[] = [];
  if (m.links.linkedin) links.push(`- LinkedIn: ${m.links.linkedin}`);
  if (m.links.twitter) links.push(`- X: ${m.links.twitter}`);
  if (links.length) out.push("", links.join("\n"));
  return doc(`${m.name} — ${m.title}`, m.bio, `/team/${m.slug}`, out.join("\n"));
}

export function renderLegal(name: "privacy" | "terms"): string {
  const path = name === "privacy" ? "/privacy-policy" : "/terms";
  const body = `# ${META[path].title}\n\n${htmlToMarkdown(legalHtml(name))}`;
  return staticDoc(path, body);
}
