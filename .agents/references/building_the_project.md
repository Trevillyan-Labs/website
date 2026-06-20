---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - architecture.md
  - integrations.md
---

# Building the Project

How to install, build, and run the Trevillyan Labs website. The repo is mid-revamp; this covers the
**current** static site and the **target** Next.js app.

## Current state — Webflow static export

Static HTML/CSS/JS exported from Webflow, with Node build scripts and a Vercel serverless contact
form. CMS-style content is JSON rendered client-side.

```bash
npm install
npm run build          # build:data (sitemap from data/*.json) + build:html (inject header/footer)
```

Run locally (must be over HTTP so `fetch()` can load the JSON; `file://` won't work):

```bash
npx serve .            # static only — contact form won't submit (no API)
vercel dev             # full: static site + /api/contact serverless fn
python3 -m http.server 8000
```

Key build scripts (`scripts/`):
- `build-data.js` — writes `sitemap.xml` from `data/*.json` (`npm run build:data`). Override base URL:
  `SITE_URL=https://staging.example.com npm run build:data`.
- `inject-components.js` — injects `components/header.html` + `footer.html` into root HTML from
  `src/*.html` (`npm run build:html`). Edit page bodies in **`src/*.html`**, never the generated root
  HTML.
- `migrate-webflow-assets.js` — optional, localizes Webflow CDN assets.

Env vars for the contact form (`.env` / `.env.local`, or Vercel): `GMAIL_USER`,
`GMAIL_APP_PASSWORD`, `CONTACT_EMAIL` (optional), `TURNSTILE_SECRET_KEY`, `SITE_URL`. See
`integrations.md`. **Never commit secrets** — see `security_checklist.md`.

## Target state — Next.js (per ADR-0001)

The rebuild will be a Next.js (App Router) + TypeScript + Tailwind app, deployed on Vercel, reusing
the existing serverless contact form (ported to a Route Handler) and Turnstile.

Expected once scaffolded (to be filled in when the app lands):

```bash
pnpm install
pnpm dev               # next dev
pnpm build             # next build
pnpm typecheck         # tsc --noEmit
pnpm lint              # biome check
```

Planned structure (from `REVAMP-PLAN.md`): `app/` routes (home, services, products/newsnook,
work/[slug], patents/[slug], team/[slug], about, contact, faq, blog), `lib/seo.ts`, dynamic
`sitemap.ts` + `robots.ts` (AI crawlers allowed — ADR-0004) + `llms.txt`, MDX for
patents/case-studies/blog, PostHog analytics via env-config.

> **Update this section** with real commands and the dev-doctor/seed flow once the Next.js app is
> scaffolded, and move the "current" section to an archive note.

## Deploy

Hosted on **Vercel**. Production = `main`; integration = `staging` (see `../../CONTRIBUTING.md`).
Configure env vars in Vercel Project Settings, not in the repo. Current routing/redirects live in
`vercel.json`; URL parity for `/patents`, `/team`, `/contact`, and legal must be preserved through the
rebuild.
