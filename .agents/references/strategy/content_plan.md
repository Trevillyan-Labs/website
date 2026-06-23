---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - product_vision.md
  - personas.md
  - user_journeys.md
  - brand_style_guide.md
  - ../../../REVAMP-PLAN.md
---

# Content Plan — trevillyanlabs.io

Page-by-page information architecture and content intent. Implements the vision
(`product_vision.md`) for the personas (`personas.md`) along the journeys (`user_journeys.md`).
This is the bridge from strategy to build. Copy is drafted per page in Phase 2.

## Information architecture

```
/                       Home — studio story (hire-first); primary CTA Work with us, secondary NewsNook (proof)
/services               Offerings (Build / Advise / Products) + engagement model
/products/newsnook      Owned-product spotlight → newsnook.ai
/work                   Case-study index (proof across engagement types)
/work/[slug]            Case study (MDX)
/about                  Founder + studio story; patents as proof
/patents                Patents index (credibility) — preserved URL
/patents/[slug]         Patent detail — preserved URL
/team  ·  /team/[slug]  Team — preserved URLs (folds into /about or stays)
/contact                Intent-routed contact + Turnstile; booking link — preserved URL
/faq                    FAQ written for answer engines (AEO); FAQPage JSON-LD
/privacy-policy · /terms  Legal — preserved URLs
/blog · /blog/[slug]    Writing — Phase 5 (deferred)

robots.txt              Allow reputable AI crawlers; point to sitemap
sitemap.xml             Dynamic, from routes/content
llms.txt                Curated, accurate overview for LLMs (docs-supported facts only)
```

URL parity for `/patents`, `/team`, `/contact`, `/privacy-policy`, `/terms` is mandatory
(redirects spec'd in the current `vercel.json`).

## Page intents

### Home  *(all personas; J1–J5)*
- **Above the fold (hero baseline — see `product_vision.md`; A/B-test in PostHog):**
  *"We build and run software — ours and yours."* + the one-liner subhead (ships custom software for
  clients, operates its own products — NewsNook live — advises founders and early-stage startups on
  **product and go-to-market execution**). Primary CTA *Work with us*; secondary *See what we ship →
  NewsNook* (proof / outbound).
- **Then:** what we do (Build / Advise / Products, scannable) · flagship product (NewsNook) · proof
  (case-study teasers + patents + "this site is the sample") · the supporting differentiator — a studio
  that runs **lean on AI**, operated day-to-day by Ren · final CTA.
- **Job:** orient any visitor in <30s and route them.

### Services  *(Dana, Priya, Hugh, Wren; J1/J2/J2b/J4)*
- Grouped under **Build**, **Advise**, and **Products** — each offering: **what it is · what you get ·
  how it works · how to start.**
  - **Build**
    1. **Contract software development** — full-stack Next.js / React / TypeScript builds (Python for
       scripting). MVPs, internal tools, custom apps.
    2. **Web & portfolio builds** — focused, high-craft sites, end-to-end (design → build → maintain).
  - **Advise — product & go-to-market execution** (the focus, *not* "AI advisory")
    3. **Startup & founder advisory** — product and go-to-market execution for founders and early-stage
       startups: product strategy, path to PMF, GTM, fundraising, and team building; running lean with
       agentic AI as a means. From a 3x founder who ships a live product.
    4. *(Secondary)* **Applying AI for leaders** — advising on where agents/assistants/automation/
       tooling fit and what they can't do; a secondary line, not a headline. The studio's own AI-run
       operation is the proof.
  - **Products**
    5. **Indie SaaS** — TL builds and operates its own products (NewsNook); product know-how applied
       to client bets.
- **The proof that ties it together:** TL is run by Bill and **operated day-to-day by Ren, an AI
  assistant** — the studio practices the agentic-AI operating model it advises. Make this explicit on
  the advisory offerings.
- **Engagement model:** how an engagement starts (discovery → scoped build *or* advisory cadence),
  what working with a lean AI-native studio is like. **CTA:** intent-routed contact / book a call.

### Products → NewsNook  *(proof for Jordan/Dana/Priya; light touch for Sam — J3/J5)*
- **A credibility/proof page, not a product sales page.** Shows that TL ships and *operates* a real
  product — NewsNook ("the AI newsletter reader for thought leaders"), live in production — with a
  one-click handoff to **newsnook.ai**. Keep it brief: enough to prove the studio builds real software,
  then link out. **Selling NewsNook is newsnook.ai's job, not this page's.**

### Work (case studies)  *(Dana, Wren, Jordan; J1/J4/J5)*
- **Four at launch**, spanning engagement types so every persona sees themselves:
  Order matters: **lead with Clip Automation — the most impactful proof.** Then NewsNook, journalism
  portfolio, Verbaly.
  | Order | Case study | Type tag | Notes / outcome |
  |---|---|---|---|
  | 1 | **Clip Automation** | "Startup MVP" | **Lead — most impactful.** Contract PM/PgM (first 6 months) — **delivered the MVP, the founding engineering team, and 7-figure ARR**. (Lead with delivered value, not "leadership.") |
  | 2 | **NewsNook** | "Our product" | Live; strongest proof of shipping + operating an owned SaaS |
  | 3 | **Journalism portfolio** | "Website" | **Client unnamed on the site** — present as "Journalism portfolio," no client name (internally: the Faith engagement) |
  | 2.5 | **Verbaly** | "AI web app" | AI speech coach — 2,300+ users, $25K from Jason Calacanis/LAUNCH, LLM+RAG (content sourced from trevillyan.dev) |
  | 5 | **trevillyan.dev** | "Website" | Founder's own dev portfolio (also the source of the carousel screencaps) |
- **Type-tag labels** revised for clarity (prospect-plain): "Our product" · "Website" · "Startup MVP"
  (not "owned product / web build / product & program," which read unclearly).
- **Held back — KPMG.** Do **not** publish a KPMG case study yet — needs KPMG's permission first.
  Add once approved.
- Each card: title/logo · one-line **outcome** (the value delivered) · type tag. Each page: problem →
  approach → outcome (+ role). Honor confidentiality (no client names where withheld; no terms/pricing/
  prospect-stage detail).

### About  *(Jordan, Hugh; J5/J2)*
- Founder story (Bill — product leader, 3x founder, issued patents), the studio's operating model
  (two engines; leverage over headcount; **run by Bill, operated day-to-day by Ren, an AI
  assistant** — the studio embodies the agentic-AI model it advises), and how to engage. **Patents
  move here** as credibility.
- **Accuracy:** only docs-supported facts. Rewrite the stale "founded to license inventions" bio
  (`data/team_members.json`) to the current studio framing.

### Patents  *(Jordan; credibility)*
- Preserve the two issued patents (US 11,788,918 B2; US 12,123,807 B2) as IP proof. Reframed: proof
  of invention capability, not the company's purpose.

### Contact  *(Dana, Hugh, Wren; conversion)*
- **Intent router:** "Hire us to build something" · "Advisory — product & go-to-market execution" ·
  "Web/portfolio site" · "Applying AI in my org (secondary)" · "About NewsNook" · "Something else." Tag
  submissions by intent (PostHog + email). Keep Turnstile + server-side validation. Add a **booking
  link** for warm advisory leads.

### Legal
- Port privacy policy + terms; update for the new analytics stack (PostHog) and any new sub-processors.

## Cross-page elements
- **Persistent CTAs** in nav/footer — *Work with us* (primary) and *See what we ship → NewsNook*
  (secondary, proof / outbound).
- **Footer:** nav, NewsNook link, contact, social (LinkedIn, X), legal.
- **Per-page metadata + OG image; JSON-LD** (Organization sitewide; Person on /about; Service on
  /services; FAQPage on the FAQ; Article on case studies/blog; BreadcrumbList on detail pages).

## Discoverability (SEO / AEO / LLM — implements `product_vision.md` → Discoverability)
- **`/faq`** (or per-page FAQ blocks) written the way prospects *ask* ("can a small studio build my
  MVP?", "who advises founders on AI?") — answer-engine-friendly, question-shaped headings, quotable
  self-contained answers. Backed by `FAQPage` JSON-LD.
- **`/llms.txt`** — a curated, accurate plain-text overview for LLMs: what TL does, the offerings,
  proof points (NewsNook live, patents, run-on-AI), how to engage, contact. Docs-supported facts only.
- **`robots.txt`** allowing all reputable AI crawlers — **training *and* answer/search** (GPTBot,
  ClaudeBot, CCBot, Google-Extended, Applebot-Extended, OAI-SearchBot, PerplexityBot, …) per
  `decisions/ADR-0004-allow-ai-crawlers.md` + **dynamic `sitemap.xml`**.
- **Entity consistency** — same name/role/links everywhere; link out to LinkedIn, the patents, and
  newsnook.ai so engines disambiguate the TL entity and represent it correctly.
- **Targets:** high-intent queries per offering (build · product & go-to-market advisory · web builds;
  applying-AI secondary) + the founder's name. Goal: surface, get cited accurately, earn the click → primary
  funnel.

## Open content tasks (Phase 2 inputs)
- **Verbaly** and **Clip Automation** case-study content (no docs exist yet) — from Bill.
- **Journalism portfolio** case study — confirm what's shareable **without naming the client**.
- **KPMG** — held back until KPMG grants permission; don't publish until then.
- Draft/confirm the service descriptions (Build / Advise — product & GTM execution / Products) and the
  engagement-model copy.
- Confirm whether `/team` folds into `/about` or remains a standalone preserved URL.
