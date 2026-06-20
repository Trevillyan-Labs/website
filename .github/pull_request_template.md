## Summary

-

## Docs Impact

**Rule: a PR is not complete until its docs are aligned.** Update every doc this change affects, in
this PR. See [`.agents/references/agent_lessons.md`](../.agents/references/agent_lessons.md) and
[`.agents/references/context_maintenance.md`](../.agents/references/context_maintenance.md).

- [ ] **Canonical docs** updated for impacted behavior (`architecture`, `building_the_project`,
      `code_conventions`, `integrations`, `security_checklist`, etc.)
- [ ] **`last_verified`** bumped on every touched canonical doc
- [ ] **ADR** added for any cross-cutting technical decision (`.agents/references/decisions/`)
- [ ] **Strategy docs** updated if positioning/personas/journeys/content/brand changed
      (and still consistent with the canonical `docs` repo)
- [ ] **README / CLAUDE.md / REVAMP-PLAN.md** updated if setup, layout, agent context, or plan changed
- [ ] **Glossary** updated if new terms were introduced
- [ ] New/changed docs registered in `INDEX.md` + `DOC_INVENTORY.md`
- [ ] If no docs changed, explanation provided below

### Docs changed

-

## Checks

- [ ] Existing URLs preserved (no SEO regression)
- [ ] No secrets committed (public vs. secret keys per `security_checklist.md`)
- [ ] Build passes (`npm run build` / `pnpm build`); pages smoke-checked
- [ ] Content states only docs-supported facts; no confidential client detail
