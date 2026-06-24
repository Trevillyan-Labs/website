import { type Group, caseStudies, faqs, services } from "@/lib/content";
import { patents } from "@/lib/patents";
import { site } from "@/lib/site";
import { team } from "@/lib/team";

// Full plain-text/markdown content mirror for LLMs, generated from the typed
// content layer so it never drifts from the site. Served at /llms-full.txt.
export const dynamic = "force-static";

const groupOrder: Group[] = ["Build", "Advise", "Products"];

export function GET() {
  const out: string[] = [];
  const p = (s: string) => out.push(s);

  p(`# ${site.name} — full content`);
  p("");
  p(`> ${site.tagline}`);
  p("");
  p(
    "Trevillyan Labs is an independent software studio. The site's priority job is to get visitors to hire the studio (Build + Advise); owned products (e.g. NewsNook) appear as credibility proof. The studio runs lean on agentic AI — run by founder Bill Trevillyan and operated day-to-day by an AI assistant (Ren), the lived proof behind the AI work it advises on.",
  );

  p("");
  p("## What we do");
  for (const g of groupOrder) {
    p("");
    p(`### ${g}`);
    for (const s of services.filter((x) => x.group === g)) {
      p("");
      p(`**${s.title}** — ${s.summary}`);
      for (const w of s.whatYouGet) p(`- ${w}`);
    }
  }

  p("");
  p("## Case studies");
  for (const c of caseStudies) {
    p("");
    p(`### ${c.title} (${c.tag})`);
    p(c.summary);
    p(`- **Problem:** ${c.problem}`);
    p(`- **Approach:** ${c.approach}`);
    p(`- **Outcome:** ${c.outcome.join("; ")}`);
    p(`- **Role:** ${c.role}`);
    if (c.liveUrl) p(`- **Live:** ${c.liveUrl}`);
  }

  p("");
  p("## Patents");
  p(
    "Two issued US patents in fluid-detection fabric technology, available for commercial licensing.",
  );
  for (const pt of patents) {
    p("");
    p(`### ${pt.number} — ${pt.title}`);
    p(`${pt.summary} (Issued ${pt.published}.) Source: ${pt.sourceUrl}`);
  }

  p("");
  p("## Founder");
  for (const m of team) {
    p("");
    p(`**${m.name}** — ${m.title}. ${m.bio}`);
    if (m.links.linkedin) p(`- LinkedIn: ${m.links.linkedin}`);
  }

  p("");
  p("## FAQ");
  for (const f of faqs) {
    p("");
    p(`**Q: ${f.q}**`);
    p(`A: ${f.a}`);
  }

  p("");
  p("## How to engage");
  p(
    `Start at the contact page (${site.url}/contact) and pick the intent (build, web/portfolio, advisory, applying AI, patent licensing, or NewsNook). Warm advisory leads can book a 30-minute call directly.`,
  );

  p("");
  p("## Links");
  p(`- Home: ${site.url}/`);
  p(`- Services: ${site.url}/services`);
  p(`- Case studies: ${site.url}/work`);
  p(`- Products: ${site.url}/products`);
  p(`- Patents: ${site.url}/patents`);
  p(`- About: ${site.url}/about`);
  p(`- FAQ: ${site.url}/faq`);
  p(`- Contact: ${site.url}/contact`);
  p(`- NewsNook (owned product): ${site.newsnookUrl}`);
  p("- Company LinkedIn: https://www.linkedin.com/company/trevillyan-labs/about/");
  p("");

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
