---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
supersedes: []
superseded_by: []
---

# Documentation Inventory & Classification

Classifies the repo's docs so agents can prioritize canonical material and avoid stale content.
A doc's authoritative status is the `status:` in its own frontmatter; this table mirrors it.

## Canonical (Tier 0/1)

| Doc | Status |
|---|---|
| `../../README.md` | canonical |
| `../../CLAUDE.md` | canonical |
| `../../AGENTS.md` | canonical |
| `../../REVAMP-PLAN.md` | canonical (active plan) |
| `README.md` (`.agents/`) | canonical |
| `INDEX.md` | canonical |
| `building_the_project.md` | canonical |
| `architecture.md` | canonical |
| `code_conventions.md` | canonical |
| `integrations.md` | canonical |
| `security_checklist.md` | canonical |
| `agent_lessons.md` | canonical |
| `context_maintenance.md` | canonical |
| `glossary.md` | canonical |

## Strategy (Tier 2 — canonical for content/brand decisions)

| Doc | Status |
|---|---|
| `strategy/product_vision.md` | canonical |
| `strategy/personas.md` | canonical |
| `strategy/user_journeys.md` | canonical |
| `strategy/content_plan.md` | canonical |
| `strategy/brand_style_guide.md` | canonical |

## Engineering plans

| Plan | Status |
|---|---|
| `engineering-plans/md-mirrors.md` | accepted (Phase 1 + 2 shipped) |

## Decisions (ADRs)

| ADR | Status |
|---|---|
| `decisions/ADR-0001-nextjs-rebuild.md` | accepted |
| `decisions/ADR-0002-posthog-analytics.md` | accepted |
| `decisions/ADR-0003-build-in-place.md` | accepted |
| `decisions/ADR-0004-allow-ai-crawlers.md` | accepted |

## Notes on current vs. target state

The repo is **mid-revamp**. Today the site is a **Webflow static export** (HTML/CSS/jQuery + Node
build scripts); the accepted decision is to rebuild on **Next.js + TS + Tailwind** (ADR-0001). Docs
that describe both states (`architecture.md`, `building_the_project.md`, `code_conventions.md`,
`integrations.md`) label **current** vs. **target** explicitly. As the rebuild lands, move content
from "target" to "current" and bump `last_verified`.

## Rules for updating this file

- Update classification whenever a doc is added, archived, or promoted.
- Keep `last_verified` current on canonical docs whenever the site's structure, stack, or content
  model changes.
- When the Next.js rebuild ships, revisit every "current/target" doc and the ADRs' consequences.
- Mark superseded docs with `superseded_by` and move them to an `archive/` folder.
