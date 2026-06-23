---
status: accepted
source_of_truth: true
last_verified: 2026-06-20
owner: bill
deciders: [Bill Trevillyan]
supersedes: []
superseded_by: []
---

# ADR-0003: Build the new app in place; preserve existing URLs

**Status:** accepted · **Date:** 2026-06-20

## Context

The Next.js rebuild (ADR-0001) could be a fresh repo or done in place in the existing website repo.
The current repo has history, an existing Vercel project, and live SEO on URLs like `/patents`,
`/patents/:slug`, `/team`, `/contact`, and the legal pages (`vercel.json`). Losing those URLs would
regress search rankings and break inbound links.

## Decision

We will **build the Next.js app in place** in this repo, on the `revamp/site-narrative-restack`
branch, keeping the existing static site working until cutover. We will **preserve all existing
public URLs** with redirects, and port `images/`, brand SVGs, legal copy, and the `api/contact.js`
logic rather than recreating them.

## Consequences

- **Easier:** history continuity, same Vercel project/domain, no SEO reset, gradual cutover.
- **Harder / costs accepted:** the repo temporarily holds both the legacy static site and the new
  app; the migration must be sequenced carefully and old files removed at cutover; a URL-parity check
  becomes a launch gate.
- **Follow-on:** a redirect map covering every legacy URL; a cutover checklist (Phase 4 of
  `REVAMP-PLAN.md`).

## Alternatives considered

- **Fresh repo** — cleanest separation. Rejected: loses history, complicates the Vercel project/domain
  swap, and adds risk of SEO/redirect gaps during the move.
