import { caseStudies, faqs, services } from "@/lib/content";
import {
  aboutPage,
  contactPage,
  homePage,
  newsnookPage,
  patentsPage,
  productsPage,
  servicesPage,
} from "@/lib/content/pages";
import { legalHtml } from "@/lib/legal";
import { bullets, frontmatter, htmlToMarkdown, mirrorUrl } from "@/lib/md/serialize";
import { patents } from "@/lib/patents";
import { offerings, site } from "@/lib/site";
import { team } from "@/lib/team";

// Frontmatter title/description for static mirror pages. These mirror each page's
// pageMeta() call in app/<route>/page.tsx — keep them in sync. Body content stays
// drift-free (rendered from the typed layer); this header metadata is low-stakes
// per the md-mirrors plan §5.
const META: Record<string, { title: string; description: string }> = {
  "/": { title: `${site.name} — independent software studio`, description: site.tagline },
  "/about": {
    title: "About",
    description:
      "Trevillyan Labs is an independent software studio run by Bill Trevillyan — a product leader and 3x founder — and operated day-to-day with an AI assistant.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Tell Trevillyan Labs what you need — a build, a website, or product/go-to-market advice. We'll come back with a clear, scoped next step.",
  },
  "/products": {
    title: "Products",
    description:
      "The products Trevillyan Labs builds and operates — proof the studio ships and runs real software. NewsNook is live in production today.",
  },
  "/products/newsnook": {
    title: "NewsNook — our product",
    description:
      "NewsNook is Trevillyan Labs' own product — an AI newsletter reader, live in production. Proof the studio builds and operates real software.",
  },
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
  // render the Products service).
  const groups = ["Build", "Advise"] as const;
  const out = [`# ${META["/services"].title}`, "", servicesPage.intro];
  for (const g of groups) {
    out.push("", `## ${g}`, servicesPage.groupBlurbs[g]);
    for (const s of services.filter((x) => x.group === g)) {
      out.push("", `### ${s.title}`, s.summary, "", bullets(s.whatYouGet));
    }
  }
  out.push("", `## ${servicesPage.stepsHeading}`, "");
  out.push(bullets(servicesPage.steps.map((s) => `**${s.n} · ${s.title}** — ${s.desc}`)));
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

// --- Prose pages (Phase 2): copy lifted to lib/content/pages.ts ------------------

export function renderHome(): string {
  const { hero, howWeWork, closingCta } = homePage;
  const out = [`# ${META["/"].title}`, "", `${hero.headline} ${hero.subcopy}`];
  out.push("", "## What we do");
  out.push(bullets(offerings.map((o) => `**${o.title}** — ${o.body}. ${o.detail}`)));
  out.push("", `## ${howWeWork.heading}`);
  for (const p of howWeWork.paras) out.push("", p);
  out.push("", `## ${closingCta.heading}`, closingCta.body);
  out.push("", `Work with us: ${mirrorUrl("/contact")}`);
  return doc(META["/"].title, META["/"].description, "/", out.join("\n"));
}

export function renderAbout(): string {
  const out = [`# ${META["/about"].title}`, "", aboutPage.intro];
  out.push("", `## ${aboutPage.whoBehindIt.heading}`);
  for (const p of aboutPage.whoBehindIt.paras) out.push("", p);
  out.push("", `## ${aboutPage.twoEngines.heading}`, "");
  out.push(bullets(aboutPage.twoEngines.items.map((i) => `**${i.title}** — ${i.desc}`)));
  out.push("", `## ${aboutPage.founder.heading}`);
  for (const p of aboutPage.founder.paras) out.push("", p);
  out.push(
    "",
    "",
    bullets([
      "LinkedIn: https://www.linkedin.com/in/williamtrevillyan/",
      `Portfolio: ${site.portfolioUrl}`,
    ]),
  );
  return staticDoc("/about", out.join("\n"));
}

export function renderContact(): string {
  const out = [`# ${META["/contact"].title}`, "", contactPage.intro];
  out.push("", `## ${contactPage.booking.title}`, `${contactPage.booking.desc} ${site.bookingUrl}`);
  out.push(
    "",
    `Or send a short note from ${mirrorUrl("/contact")} — choose the intent (build, web/portfolio, advisory, applying AI, patent licensing, or NewsNook).`,
  );
  return staticDoc("/contact", out.join("\n"));
}

export function renderProducts(): string {
  const out = [`# ${META["/products"].title}`, "", productsPage.intro];
  for (const p of productsPage.items) {
    const link = p.external ? p.href : mirrorUrl(p.href);
    out.push("", `## ${p.name} (${p.status})`, p.summary, `${p.cta.replace(/\s*→$/, "")}: ${link}`);
  }
  out.push("", `## ${productsPage.closingCta.heading}`, productsPage.closingCta.body);
  return staticDoc("/products", out.join("\n"));
}

export function renderNewsnook(): string {
  const out = [`# ${META["/products/newsnook"].title}`, "", newsnookPage.intro];
  out.push("", `## ${newsnookPage.whyItsHere.heading}`);
  for (const p of newsnookPage.whyItsHere.paras) out.push("", p);
  out.push("", "## At a glance", "");
  out.push(bullets(newsnookPage.features.map((f) => `**${f.title}** — ${f.desc}`)));
  out.push("", `Visit: ${site.newsnookUrl}`);
  return staticDoc("/products/newsnook", out.join("\n"));
}
