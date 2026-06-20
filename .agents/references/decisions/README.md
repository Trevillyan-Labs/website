# Architecture Decision Records (ADRs)

Cross-cutting technical/architectural decisions for the website repo, with their context and
rationale. Feature-scoped decisions live with the feature; *cross-cutting* ones live here.

## How to write one

1. Copy `_adr-template.md` to `ADR-NNNN-short-slug.md` (next number, kebab-case slug).
2. Fill in Context → Decision → Consequences → Alternatives. Keep it factual; cite real paths.
3. Set frontmatter `status` (`proposed` → `accepted` → `superseded`) and `last_verified`.
4. Register it in `../INDEX.md` and `../DOC_INVENTORY.md`.
5. When a later ADR replaces one, set `superseded_by` / `supersedes` on both.

## Index

| ADR | Title | Status |
|---|---|---|
| [ADR-0001](ADR-0001-nextjs-rebuild.md) | Rebuild the site on Next.js + TS + Tailwind | accepted |
| [ADR-0002](ADR-0002-posthog-analytics.md) | Consolidate analytics to PostHog | accepted |
| [ADR-0003](ADR-0003-build-in-place.md) | Build in place; preserve existing URLs | accepted |
| [ADR-0004](ADR-0004-allow-ai-crawlers.md) | Allow AI crawlers — training and answer/search | accepted |
