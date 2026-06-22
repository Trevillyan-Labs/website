---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - architecture.md
  - security_checklist.md
  - strategy/brand_style_guide.md
---

# Code Conventions

Style and structure for the website repo. The repo is mid-revamp; conventions for both the current
static site and the target Next.js app.

## Current — static site

- **Edit page bodies in `src/*.html`**, never the generated root HTML (root is rebuilt by
  `npm run build:html`). Header/footer in `components/`.
- **CMS content** lives in `data/*.json`; rendering logic in `js/cms-render.js`. To add content, edit
  JSON and run `npm run build:data` (refreshes `sitemap.xml`).
- **Analytics config** is centralized in `js/analytics/analytics-config.js`; event mapping in
  `js/analytics/mixpanel-events.js`. (Being replaced by PostHog — ADR-0002.)
- Keep all asset paths local under `images/`; no external/CDN image URLs.
- Don't hand-edit `sitemap.xml` — it's generated.

## Target — Next.js + TypeScript

Mirror the conventions of `NewsNook-web-app-v2` where reasonable.

- **TypeScript strict**; no `any` without justification. Prefer typed content (MDX frontmatter
  validated with a schema; e.g. Zod) over loose JSON.
- **Tailwind + design tokens.** Colors, spacing, and type come from the theme/tokens defined per
  `strategy/brand_style_guide.md`. **Never hard-code brand colors** (`#1583FA` etc.) — use tokens.
- **Components:** small, composable, server components by default; client components only where
  interactivity requires. Co-locate route-specific components with the route.
- **SEO/AEO is centralized** in a `lib/seo.ts` helper (Metadata API + JSON-LD builders —
  Organization/Person/Service/FAQPage/Article/Breadcrumb); every page exports `metadata`. Maintain
  `sitemap.ts`, `robots.ts` (allow AI crawlers — ADR-0004), and `llms.txt`. Write FAQ/answer content
  to be extractable by answer engines (`strategy/product_vision.md` → Discoverability).
- **Formatting/linting:** Biome (format + lint). Run before finishing any task.
- **File naming:** kebab-case for files/routes; PascalCase for components.
- **No secrets in code** — see `security_checklist.md`. Public keys (Turnstile site key, PostHog
  public key) are injected via env-config; server secrets stay in Vercel env.
- **Accessibility is a convention, not a feature:** semantic HTML, focus states, alt text, AA
  contrast, reduced-motion support (`strategy/brand_style_guide.md`).

## Both

- **Keep docs aligned as you code** — update the affected `.agents/references/*` (bump
  `last_verified`), `README.md`, and `REVAMP-PLAN.md` in the same change. See `context_maintenance.md`.
- **Commit per logical unit of work**; imperative, scoped messages.
- **Preserve existing URLs** through any change (`vercel.json` redirects / Next.js redirects).
- **Truth in content** — page copy states only what the company docs support (no invented facts);
  confidential client detail never ships (`strategy/content_plan.md`, `security_checklist.md`).
