# CLAUDE.md — Trevillyan Labs Website

## Project Overview

The marketing site for **Trevillyan Labs** — an independent software studio that **ships custom
software for clients, operates its own products, and advises founders and early-stage startups on
product and go-to-market execution**. The site's **priority-1 job is to get visitors to hire the
studio** (Build + Advise); owned products (NewsNook) appear as **credibility proof** and link out to
their own sites — selling the products is not this site's job. The studio runs lean on AI (operated
day-to-day by Ren) — a supporting differentiator, strongest on the advisory lines. Full intent and the
SEO/AEO/LLM discoverability objectives: `.agents/references/strategy/product_vision.md`.

**The repo is mid-revamp.** Today the site is a Webflow static export; the accepted plan is to rebuild
on Next.js. See **`REVAMP-PLAN.md`** for the plan and **`.agents/references/decisions/`** for the why.

### Tech Stack

| Layer | Current (Webflow export) | Target (per ADR-0001) |
|---|---|---|
| Framework | Static HTML/CSS/JS, no framework | Next.js 15 (App Router), TypeScript |
| Styling | Webflow CSS | Tailwind v4 + brand tokens |
| Content | JSON in `data/` + `js/cms-render.js` | MDX (patents/case-studies/blog) + typed data |
| Build | Node scripts (`scripts/`) | Next build (Biome, tsc) |
| Contact | Vercel serverless `api/contact.js` + Turnstile | Route Handler + Turnstile (ported) |
| Analytics | Mixpanel + Hotjar + LogRocket | PostHog (ADR-0002) |
| Hosting | Vercel | Vercel (same project) |

Architecture detail: `.agents/references/architecture.md`.

## Agent context (`.agents/`)

Project context for AI-assisted development lives under **`.agents/`** (see **`.agents/README.md`**):

- **`references/`** — long-form specs and conventions (progressive disclosure; read when relevant).
- **`references/strategy/`** — the marketing exercise: vision, personas, journeys, content plan, brand
  guide.
- **`references/decisions/`** — ADRs (cross-cutting decisions + rationale).
- **`skills/`** — repo skills (none yet); Claude Code discovers them via `.claude/skills/` symlinks.

## Context (progressive disclosure)

Start at **`.agents/references/INDEX.md`** for the routing map. Check
**`.agents/references/DOC_INVENTORY.md`** for a doc's status before relying on it.

| When you need… | Read |
|---|---|
| What the site is for | `.agents/references/strategy/product_vision.md` |
| Who we're writing for | `.agents/references/strategy/personas.md` |
| Journeys & user stories | `.agents/references/strategy/user_journeys.md` |
| Page-by-page content plan | `.agents/references/strategy/content_plan.md` |
| Voice, color, type, components | `.agents/references/strategy/brand_style_guide.md` |
| Install, build, env, local run | `.agents/references/building_the_project.md` |
| Architecture (current + target) | `.agents/references/architecture.md` |
| Style, structure, naming | `.agents/references/code_conventions.md` |
| External services & keys | `.agents/references/integrations.md` |
| Secrets, validation, headers | `.agents/references/security_checklist.md` |
| Repo dos & don'ts | `.agents/references/agent_lessons.md` |
| Why Next.js / PostHog / in-place | `.agents/references/decisions/` |
| Keeping context honest | `.agents/references/context_maintenance.md` |
| Branch, commit, PR conventions | `CONTRIBUTING.md` |
| The active revamp plan | `REVAMP-PLAN.md` |
| What TL does (canonical) | `/Users/ren/repos/docs/company/identity-and-positioning.md` |

## Workflow

- **Keep docs aligned as you code.** In the same change that changes the site, update the affected
  docs — `README.md`, the relevant `.agents/references/*` (bump `last_verified`), `REVAMP-PLAN.md`,
  and code comments. Don't defer to PR time. Full rationale: `.agents/references/agent_lessons.md` and
  `context_maintenance.md`.
- **Capture lessons as you learn them** in `.agents/references/agent_lessons.md`; route other
  knowledge (ADR / glossary) per `context_maintenance.md`. Register new reference docs in `INDEX.md` +
  `DOC_INVENTORY.md`.
- **Edit `src/*.html`, not generated root HTML** (current site). Don't hand-edit `sitemap.xml`.
- **Preserve existing URLs** through any change (ADR-0003).
- **Publish only docs-supported facts.** No invented credentials/metrics; no confidential client
  detail (`security_checklist.md`).
- **This is a product repo, not `ren-agent`** — don't auto-commit/push. Use the branch + PR flow
  (`CONTRIBUTING.md`): production = `main`, integration = `staging`.
- Run the formatter/linter before finishing. Use Plan Mode for changes touching >2 files. Commit per
  logical unit of work.
