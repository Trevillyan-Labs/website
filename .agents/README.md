# Agent context (`.agents/`)

Project-scoped material for humans and AI coding assistants (Ren, Claude Code, Cursor) working on the
**Trevillyan Labs website**. Application source lives elsewhere in the repo; this directory holds the
specs, conventions, decisions, and strategy that give an agent the right context from the start.

Modeled on the `new-project-template` and `NewsNook-web-app-v2` `.agents/` conventions so context is
consistent across Trevillyan Labs repos.

## `references/`

Long-form documentation, organized for **progressive disclosure** — read what's relevant, not
everything. Start at:

- **`references/INDEX.md`** — the Tier 0/1/2 routing map ("when you need X, read Y").
- **`references/DOC_INVENTORY.md`** — each doc's status (`canonical`, `draft`, `superseded`,
  `template`) so you know what to trust before relying on it.

Every reference doc carries frontmatter (`status`, `source_of_truth`, `last_verified`, `owner`).
Subfolders: `decisions/` (ADRs) and `strategy/` (vision, personas, journeys, brand, content plan).

## `skills/`

Task and stack skills live under `.agents/skills/<name>/SKILL.md` (none website-specific yet; the
session already has access to the global skill library). **Claude Code** discovers repo skills via
symlinks `.claude/skills/` → `.agents/skills/`. After adding or removing a skill folder, run
`./scripts/sync-claude-skill-symlinks.sh` (added when the first repo skill is created).

## Source of truth & cross-repo

- **Company positioning** is canonical in the **docs** repo (`/Users/ren/repos/docs/company/`). The
  strategy docs here translate that into a website; the docs repo wins on any conflict.
- **The website revamp plan** lives at the repo root: `REVAMP-PLAN.md`.
- Keep these docs honest: update them in the same change that changes the site (see
  `references/context_maintenance.md`).
