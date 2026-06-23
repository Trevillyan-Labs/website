---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - INDEX.md
  - DOC_INVENTORY.md
  - agent_lessons.md
  - decisions/README.md
---

# Context Maintenance — Keeping `.agents/` Alive

How to keep this repo's agent context honest. The docs are only useful if they reflect reality.

## 1. The learning loop (capture lessons)

Capture a lesson when:
- a bug fix reveals a wrong assumption,
- a failure costs real diagnosis time,
- the same correction recurs, or
- a pattern proves itself worth repeating.

Write it in `agent_lessons.md`: one imperative sentence + *why* + *evidence* (real path), dated.

## 2. Where does knowledge belong? (routing)

| Knowledge type | Home |
|---|---|
| Repo rule / proven pattern | `agent_lessons.md` |
| Cross-cutting technical decision | `decisions/` (ADR) |
| Domain / technical term | `glossary.md` |
| Architecture / stack / integration change | the relevant canonical doc + bump `last_verified` |
| Content/brand/positioning change | `strategy/*` (and confirm against the `docs` repo) |
| Build/run/deploy change | `building_the_project.md` |

## 3. Adding or changing a reference doc

1. Add frontmatter: `status`, `source_of_truth`, `last_verified`, `owner` (+ `related_docs`).
2. Register it in `INDEX.md` under the right tier.
3. Register it in `DOC_INVENTORY.md` with its classification.
4. If `CLAUDE.md`'s context table should point to it, add a row there.

## 4. Docs-align-as-you-code

In the same change that changes the site, update the affected docs — `README.md`, the relevant
`.agents/references/*` (bump `last_verified`), `REVAMP-PLAN.md`, and code comments. Don't defer to PR
time; the PR template's Docs Impact checklist is a backstop, not the trigger.

## 5. Current/target hygiene (revamp-specific)

This repo is mid-migration (Webflow static → Next.js). Several docs carry **current** and **target**
sections. As the Next.js rebuild lands:
- promote "target" content to "current" section by section,
- bump `last_verified`,
- revisit the ADR consequences,
- update `DOC_INVENTORY.md`'s "current vs. target" note.

## 6. Periodic hygiene review

At each meaningful milestone (e.g. a phase of the revamp ships):
- [ ] Canonical docs touched this period have a current `last_verified`.
- [ ] New docs are registered in `INDEX.md` + `DOC_INVENTORY.md`.
- [ ] `agent_lessons.md` captured the period's lessons.
- [ ] Settled ADRs are flipped to `accepted`/`superseded`.
- [ ] Strategy docs still match the canonical `docs` repo positioning.
- [ ] `glossary.md` covers new terms.
