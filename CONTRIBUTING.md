# Contributing to the Trevillyan Labs Website

How we branch, commit, and ship. For environment setup and local run, see
[`.agents/references/building_the_project.md`](.agents/references/building_the_project.md); for the
full agent operating contract, see [`CLAUDE.md`](CLAUDE.md).

## Branching model

- **`main`** — production (https://www.trevillyanlabs.io). Protected.
- **`staging`** — integration / pre-production. Feature work targets it via PR.
- **Feature branches** — branch off the latest `staging`. Suggested prefixes: `feat/`, `fix/`,
  `docs/`, `chore/`, `revamp/`.

**Sync the integration branch first.** Before push/PR, `git fetch` and merge latest `staging`, then
re-verify on the merged result.

> The site revamp lives on **`revamp/site-narrative-restack`** (see `REVAMP-PLAN.md`).

## Commits

- One commit per **logical unit of work** — don't batch unrelated changes.
- Imperative, scoped messages (e.g. `feat(home): two-engine hero`).
- Keep docs aligned **in the same commit** that changes behavior.

## Before you push

Current static site:

```bash
npm run build        # build:data + build:html must succeed
npx serve .          # smoke-check pages render
```

Target Next.js app (once scaffolded):

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Prefer verifying the **specific pages/modules** you changed over a full pass while iterating.

## Docs are part of the change

This repo runs a **docs-align-as-you-code** rule, not a docs-at-PR-time rule. In the same change that
changes behavior, update the affected docs — `README.md`, `.agents/references/*` (bump
`last_verified`), `REVAMP-PLAN.md`, code comments, and the relevant ADR/strategy doc. See
[`CLAUDE.md`](CLAUDE.md) → Workflow and
[`.agents/references/context_maintenance.md`](.agents/references/context_maintenance.md).

## Pull requests

- Target `staging` (or `main` only for hotfixes).
- Fill out [`.github/pull_request_template.md`](.github/pull_request_template.md), including the
  **Docs Impact** checklist.
- Preserve existing URLs; never commit secrets (see
  [`.agents/references/security_checklist.md`](.agents/references/security_checklist.md)).

## Decisions

Cross-cutting technical decisions get an ADR in
[`.agents/references/decisions/`](.agents/references/decisions/) (copy `_adr-template.md`).
