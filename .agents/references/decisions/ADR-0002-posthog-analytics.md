---
status: accepted
source_of_truth: true
last_verified: 2026-06-20
owner: bill
deciders: [Bill Trevillyan]
supersedes: []
superseded_by: []
---

# ADR-0002: Consolidate analytics to PostHog

**Status:** accepted · **Date:** 2026-06-20

## Context

The current site runs **three overlapping** analytics tools — Mixpanel + Hotjar + LogRocket
(`js/analytics/`) — with the Mixpanel token committed in source and `debug:true` in production. The
revamp needs product analytics, session replay, and conversion funnels (visitor → contact; visitor →
NewsNook) with clean, env-driven key management. PostHog covers all three in one tool and is already
used in NewsNook's app.

## Decision

We will **consolidate analytics to PostHog**, configured via env-config (public project key injected
client-side; no committed keys), and re-implement the useful pieces of today's setup (declarative
event mapping, scroll-depth) as a typed analytics module. Defined events: `contact_submitted` (with
intent), `call_booked`, `newsnook_clickthrough`, `about_viewed` (`strategy/user_journeys.md`).

## Consequences

- **Easier:** one tool for analytics + replay + funnels; single key surface; funnels map directly to
  the two conversion goals; A/B testing via feature flags later.
- **Harder / costs accepted:** removing three embedded tools and any historical Mixpanel/Hotjar/
  LogRocket continuity; privacy config (session-replay masking, EU/cookieless considerations) and a
  privacy-policy/sub-processor update (`strategy/content_plan.md`, `security_checklist.md`).
- **Follow-on:** delete committed keys when migrating; wire env-config in the Next.js app.

## Alternatives considered

- **Keep Mixpanel only** — least change, stays "in the family." Rejected: no integrated session replay
  and still needs the env-config cleanup; PostHog consolidates more for the same effort.
- **Keep all three** — rejected: redundant, key hygiene issues, heavier client.
