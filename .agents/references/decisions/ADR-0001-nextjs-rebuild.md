---
status: accepted
source_of_truth: true
last_verified: 2026-06-20
owner: bill
deciders: [Bill Trevillyan]
supersedes: []
superseded_by: []
---

# ADR-0001: Rebuild the site on Next.js + TypeScript + Tailwind

**Status:** accepted · **Date:** 2026-06-20

## Context

The current trevillyanlabs.io is a Webflow static export (HTML/CSS/jQuery + Node build scripts). It
sells a retired "patent R&D lab" story and lacks the content infrastructure (services, product
showcase, case studies, blog) the studio now needs (`strategy/product_vision.md`,
`docs/company/roadmap.md`). The revamp requires real per-route SEO, structured data, and an
extensible content model — awkward on a Webflow export. TL's primary client-facing stack, and
NewsNook's product app (`NewsNook-web-app-v2`), is Next.js / TypeScript.

## Decision

We will rebuild the website as a **Next.js (App Router) + TypeScript + Tailwind** app on Vercel,
using MDX for patents/case-studies/blog and reusing the existing Vercel serverless contact form
(ported to a Route Handler) with Cloudflare Turnstile.

## Consequences

- **Easier:** first-class SEO (Metadata API, dynamic `sitemap.ts`/`robots.ts`, JSON-LD, per-page OG),
  an extensible content model, component reuse, and a site that **dogfoods** the studio's own
  stack — the strongest proof for prospects.
- **Harder / costs accepted:** a full rebuild rather than a re-content; a larger maintenance surface
  than static HTML; introduces a build/runtime (Next.js) and tooling (TS, Biome).
- **Follow-on:** must preserve existing URLs (ADR-0003), migrate analytics (ADR-0002), and port
  images/brand/legal/contact logic.

## Alternatives considered

- **Re-content the Webflow static site** — fastest and lowest-risk, mirrors `NewsNook-website`. Rejected:
  doesn't dogfood the stack and is painful to extend (blog/case studies/structured data).
- **Astro (static, content-first)** — excellent SEO/perf and MDX-native. Rejected: diverges from TL's
  Next.js client-facing stack, weakening the "we'll build yours like this" proof.
