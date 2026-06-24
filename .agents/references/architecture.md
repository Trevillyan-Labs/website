---
status: canonical
source_of_truth: true
last_verified: 2026-06-24
owner: bill
related_docs:
  - building_the_project.md
  - integrations.md
  - decisions/ADR-0001-nextjs-rebuild.md
  - decisions/ADR-0003-build-in-place.md
  - engineering-plans/md-mirrors.md
---

# Architecture

System shape of the Trevillyan Labs website, current and target. Decisions and rationale live in
`decisions/`.

## Current — Webflow static export

A static multi-page site, no framework, no client router.

| Layer | Technology |
|---|---|
| Markup/Style | HTML5 + CSS (Webflow export: `normalize.css` + `webflow.css` + `trevillyan-labs.webflow.css`) |
| Scripts | Vanilla JS + jQuery + `webflow.js` |
| Content (CMS) | JSON in `data/` (`patents.json`, `team_members.json`) rendered client-side by `js/cms-render.js` |
| Build | Node scripts (`scripts/`) — sitemap from JSON, header/footer injection. No bundler. |
| Contact backend | Vercel serverless `api/contact.js` (Nodemailer + Gmail SMTP), Cloudflare Turnstile |
| Analytics | Mixpanel + Hotjar + LogRocket (`js/analytics/`) |
| Hosting | Vercel; clean URLs via `vercel.json` rewrites/redirects |
| Fonts | Google Fonts (Ubuntu) |

**Content flow:** list pages clone a `.w-dyn-item` template per JSON row; detail pages read `?slug=`
(or the path on Vercel) and fill a template. Header/footer are shared components injected at build
time from `components/` into `src/*.html` → root HTML.

**Pages:** `index` (home), `patents` + `detail_patents`, `team` + `detail_team`, `contact`,
`privacy-policy`, `terms`, `401`, `404`.

### Known gaps (drivers for the revamp)
- Narrative is patents/licensing-only — doesn't reflect the studio (see `strategy/product_vision.md`).
- No `robots.txt`, no JSON-LD structured data, thin metadata.
- Analytics token committed in source; `debug:true` in prod; three overlapping tools.
- No blog/case-study infrastructure; hard to extend.

## Target — Next.js (App Router)

Per ADR-0001 and `REVAMP-PLAN.md`. A single Next.js app on Vercel; the site is the studio's flagship
work sample.

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack), TypeScript |
| Styling | Tailwind v4 + brand design tokens (`strategy/brand_style_guide.md`) |
| Content | MDX for patents / case studies / blog; typed data for team |
| Contact | Route Handler `/api/contact` + Turnstile + Nodemailer/Gmail (ported) |
| SEO | Metadata API, dynamic `sitemap.ts` + `robots.ts`, JSON-LD, per-page OG images |
| Analytics | PostHog (env-config, no committed keys) — ADR-0002 |
| Tooling | Biome, TypeScript strict; Vitest/Playwright optional |
| Hosting | Vercel (same project) |

**Migration shape (ADR-0003):** build in place in this repo, on `revamp/site-narrative-restack`.
The existing static site keeps working until cutover. Port `images/`, brand SVGs, legal copy, and the
`api/contact.js` logic. **Preserve all existing URLs** (`/patents`, `/patents/:slug`, `/team`,
`/team/:slug`, `/contact`, `/privacy-policy`, `/terms`) with redirects to prevent SEO regression.

**Planned routes:** `/`, `/services`, `/products/newsnook`, `/work` + `/work/[slug]`,
`/patents` + `/patents/[slug]`, `/team` + `/team/[slug]`, `/about`, `/contact`, `/faq`, legal, and
`/blog` + `/blog/[slug]` (Phase 5). **Discoverability artifacts:** `robots.ts`/`robots.txt`,
`sitemap.ts`/`sitemap.xml`, and `llms.txt` (AI crawlers allowed — ADR-0004). IA + page intent are
authoritative in `strategy/content_plan.md`.

### Per-page Markdown mirrors (AEO)

Every mirror-able page is also served as clean `text/markdown` at `/<path>.md` (e.g. `/services.md`),
the per-URL counterpart to `llms.txt`/`llms-full.txt` (engineering plan: `engineering-plans/md-mirrors.md`).

- **`middleware.ts`** matches `*.md` requests and **rewrites** (URL stays `/<path>.md`) to an internal
  handler — the App Router page tree is untouched.
- **`app/api/md/[[...path]]/route.ts`** — `force-static` Route Handler; `generateStaticParams` bakes
  every mirror at build, served from the CDN.
- **`lib/routes.ts`** — single source of the static route list + the `mirror` flag, consumed by both
  `app/sitemap.ts` and the mirror registry so the two can't drift. Patent detail pages (`/patents/[slug]`,
  which 307-redirect out) are excluded from both.
- **`lib/md/`** — `serialize.ts` (Markdown + a minimal whitelisted HTML→md converter for legal/patent
  copy), `renderers.ts` (per-page renderers from the typed content layer), `registry.ts` (path → renderer).
- **`lib/seo.ts`** `pageMeta` emits `<link rel="alternate" type="text/markdown">` for mirror-able pages.

**Every** page now has a mirror. Phase 1 shipped the data-driven pages (`/services`, `/work` +detail,
`/patents`, `/faq`, `/team` +detail, legal). Phase 2 added the prose pages (home → `/index.md`, about,
contact, products, products/newsnook) by lifting their copy into typed constants in `lib/content/pages.ts`
(shared by the page components and the renderers). `/patents/[slug]` stays excluded (it 307s out).

> Keep this doc's "current/target" split honest as the rebuild progresses — promote target → current
> section by section and bump `last_verified`.
