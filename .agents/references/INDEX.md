---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
---

# References Index (Progressive Disclosure)

Routing map for the Trevillyan Labs website repo. Read the minimum needed for the task. Check
`DOC_INVENTORY.md` for a doc's status before relying on it.

## Tier 0: Entry points
- `../../README.md` — human-facing repo overview & build instructions
- `../../CLAUDE.md` — agent operating contract; the "when you need X, read Y" table
- `../README.md` — how `.agents/` is organized
- `../../REVAMP-PLAN.md` — the in-progress narrative + Next.js revamp plan

## Tier 1: Canonical references
- `building_the_project.md` — install, build, env, local run (current static site + target Next.js)
- `architecture.md` — current architecture (Webflow static export) and the target (Next.js) + the
  migration shape
- `code_conventions.md` — style, structure, naming for both the current site and the rebuild
- `integrations.md` — Vercel, Cloudflare Turnstile, Gmail/Nodemailer, PostHog (target), analytics
- `security_checklist.md` — secret handling, input validation, headers, what's public vs. secret
- `agent_lessons.md` — repo-specific dos & don'ts (evidence-backed)
- `context_maintenance.md` — how to keep these docs honest (the learning loop)
- `glossary.md` — shared vocabulary (TL business + this repo)

## Tier 1: Decisions
- `decisions/README.md` — ADR index + how to write one
- `decisions/ADR-0001-nextjs-rebuild.md` — rebuild on Next.js + TS + Tailwind
- `decisions/ADR-0002-posthog-analytics.md` — consolidate analytics to PostHog
- `decisions/ADR-0003-build-in-place.md` — build the new app in this repo, preserve URLs
- `decisions/ADR-0004-allow-ai-crawlers.md` — allow AI crawlers (training + answer/search)

## Tier 1: Engineering plans
- `engineering-plans/md-mirrors.md` — per-page Markdown mirrors (`/<path>.md`) for AEO; Phase 1 shipped

## Tier 2: Strategy (the marketing exercise)
- `strategy/product_vision.md` — what the site is for (authority for content/feature decisions)
- `strategy/personas.md` — visitor personas (Dana, Hugh, Sam, Wren, Jordan)
- `strategy/user_journeys.md` — key journeys + user stories
- `strategy/content_plan.md` — page-by-page IA and content intent
- `strategy/brand_style_guide.md` — voice, color, type, layout, components

## Cross-repo source of truth
- Company positioning / operating model / pipeline / roadmap: `/Users/ren/repos/docs/company/`
- NewsNook product context: `/Users/ren/repos/NewsNook-docs`, `/Users/ren/repos/NewsNook-web-app-v2`
- Reference conventions mirrored here: `/Users/ren/repos/new-project-template/.agents`

## Retrieval shortcuts
- *"What goes on the home page?"* → `strategy/content_plan.md` + `strategy/product_vision.md`
- *"Who are we writing for?"* → `strategy/personas.md`
- *"What's the brand blue / voice?"* → `strategy/brand_style_guide.md`
- *"How do I run the site locally / deploy?"* → `building_the_project.md`
- *"Is this key a secret?"* → `security_checklist.md`
- *"Why Next.js / why PostHog?"* → `decisions/`
