---
status: accepted
source_of_truth: true
last_verified: 2026-06-20
owner: bill
deciders: [Bill Trevillyan]
supersedes: []
superseded_by: []
---

# ADR-0004: Allow AI crawlers — training *and* answer/search

**Status:** accepted · **Date:** 2026-06-20

## Context

A core discoverability objective is for Trevillyan Labs to be surfaced, cited, and accurately
represented by AI answer engines and LLMs — a primary acquisition channel for an AI-native studio
(`strategy/product_vision.md` → Discoverability). The `robots.txt` policy is a real choice: block AI
crawlers, allow only answer/search crawlers, or allow everything including training crawlers. The site
is **public marketing content with no confidential data**, and confidential client detail is already
barred from publication (`security_checklist.md`).

## Decision

We will **allow all reputable AI crawlers in `robots.txt` — both training crawlers and answer/search
crawlers** — alongside standard search indexers. We will *not* disallow AI bots. Explicitly allowed
(non-exhaustive):

- **Training crawlers:** `GPTBot`, `ClaudeBot` / `anthropic-ai`, `CCBot` (Common Crawl),
  `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `Meta-ExternalAgent`, `Bytespider`,
  `cohere-ai`.
- **Answer / search crawlers:** `OAI-SearchBot`, `PerplexityBot`, `Perplexity-User`, plus standard
  `Googlebot` / `Bingbot` (which feed AI Overviews / Copilot).

## Consequences

- **Easier / upside:** TL's public content can enter model **training corpora**, so LLMs come to
  *natively know and recommend* the studio — the biggest discoverability prize for an AI-native
  studio — on top of live citation via answer crawlers. Simplest, most open policy; maximal reach.
- **Costs accepted:** public marketing copy may be used in model training with no attribution or
  compensation, and content already trained on can't be fully clawed back later. Acceptable because
  the site is intentionally public, promotional, and accuracy-controlled.
- **Mitigations / follow-on:** keep only public, accurate, non-confidential content on the site
  (already required — `security_checklist.md`); steer representation with `llms.txt` + structured data
  + entity consistency so models quote accurate facts rather than guess.

## Alternatives considered

- **Block all AI crawlers** — rejected: directly defeats the discoverability objective.
- **Allow answer/search crawlers but block training crawlers** — rejected per the studio's goal: being
  present in training data is what makes LLMs natively recommend and accurately describe TL, which is
  worth more here than protecting public marketing copy.
