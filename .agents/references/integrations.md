---
status: canonical
source_of_truth: true
last_verified: 2026-06-26
owner: bill
related_docs:
  - building_the_project.md
  - security_checklist.md
---

# Integrations

External services the website depends on. Keys and secret rules: `security_checklist.md`.

## Hosting — Vercel
- Static site (current) and target Next.js app deploy here. Production = `main`; integration =
  `staging`. Env vars configured in Project Settings, not the repo.
- `vercel.json` (current) defines clean-URL rewrites and redirects. URL parity must be preserved
  through the rebuild.

## Contact form — Cloudflare Turnstile + Gmail (Nodemailer)
- **Turnstile** (bot prevention): server-side verification in `api/contact.js`. Site key is public
  (in page HTML); `TURNSTILE_SECRET_KEY` is server-only. Manage widget/domains in the Cloudflare
  dashboard.
- **Gmail SMTP** via Nodemailer: `GMAIL_USER`, `GMAIL_APP_PASSWORD` (app password; 2FA required),
  optional `CONTACT_EMAIL` recipient. Server-only.

## Analytics — current vs. target
- **Current:** Mixpanel + Hotjar + LogRocket, configured in `js/analytics/analytics-config.js`
  (token committed — cleanup item), event mapping in `mixpanel-events.js`, `debug:true` in prod.
- **Target (ADR-0002):** **PostHog** — product analytics + session replay + funnels in one tool.
  Public project key via env-config (no committed keys). Re-implement the useful pieces of today's
  setup (declarative event mapping, scroll-depth) as a typed analytics module.
- **Wired today (see `strategy/user_journeys.md`):** PostHog loads only when
  `NEXT_PUBLIC_POSTHOG_KEY` is set (`app/_components/posthog-provider.tsx`); autocapture + `$pageview`
  (manual, on route change) + `$pageleave`. Named conversion events go through `lib/analytics.ts`
  (`track()`, a no-op until the key is set):
  - `contact_submitted` (with `intent`) — contact form success.
  - `contact_submit_failed` (with `intent`, `error`) — submit error path (Turnstile / API / validation),
    so a broken form doesn't read as "no traffic".
  - `contact_started` (with `intent`) — first interaction with the contact form (→ abandonment rate).
  - `booking_click` (with `location`) — Calendly CTA via `app/_components/booking-link.tsx`.
  - `cta_click` (with `label`, `location`, `href`) — primary "Work with us" / "Start a project" CTAs
    via `app/_components/cta-link.tsx` (the `Button` component routes through it).
  - `newsnook_clickthrough` (with `location`: `footer` / `products_page` / `newsnook_spotlight`) —
    outbound NewsNook links via `app/_components/newsnook-link.tsx`; additive to the UTM tags from
    `lib/utm.ts`.
  Core funnels: visitor → service view → CTA click → contact; visitor → NewsNook.
- **Still planned:** scroll/read depth, and `about_viewed`+depth as a soft conversion. (`about_viewed`
  is covered by `$pageview` today.)

## Fonts — Google Fonts
- **Ubuntu** (+ Ubuntu Mono). In the rebuild, prefer `next/font` for self-hosting/perf.

## Discoverability — search engines & AI answer engines (target)
- **Objective:** be found *and accurately represented* by search + AI answer engines/LLMs to drive
  client referrals (see `strategy/product_vision.md` → Discoverability).
- **Surfaces:** `robots.txt` (allow all reputable AI crawlers — **training *and* answer/search**:
  GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, OAI-SearchBot, PerplexityBot, … — per
  `decisions/ADR-0004-allow-ai-crawlers.md`), dynamic `sitemap.xml`, JSON-LD (Organization/Person/
  Service/FAQPage/Article/BreadcrumbList), an AEO-oriented `/faq`, and **`llms.txt`** (curated accurate
  overview, docs-supported facts only).
- **Measurement:** organic + AI-referral traffic, branded/entity search lift, spot-checked answer-engine
  citations for target prompts; attributable events flow into PostHog.
- **Entity consistency:** keep name/role/links aligned across the site, LinkedIn, the patents, and
  newsnook.ai so engines resolve the TL entity correctly.

## Booking (target)
- A scheduling link (e.g. Cal.com / Google Calendar) for warm advisory/discovery leads on
  `/contact` and `/services`. Tool TBD.

## Related external resources
- Company docs (positioning, pipeline): `/Users/ren/repos/docs`
- NewsNook (product the site links to): https://www.newsnook.ai · repos `NewsNook-web-app-v2`,
  `NewsNook-website`, `NewsNook-docs`
