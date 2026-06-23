---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - product_vision.md
  - personas.md
related_company_docs:
  - /Users/ren/repos/docs/company/identity-and-positioning.md
---

# Brand & Style Guide — trevillyanlabs.io

The visual and verbal system for the site. Brand identity is canonical in
`docs/company/identity-and-positioning.md` (logo, color, type); this doc is the **website-applied**
version with usage rules and component direction. Where this doc and the company doc disagree, the
company doc wins — update both.

## Brand essence

**An independent software studio that runs on leverage, not headcount.** Founder-led (a founder who
ships real products), AI-leveraged, fast, and tasteful — **run by Bill and operated day-to-day by Ren,
an AI assistant** (a real proof point, especially on the advisory offerings, not a gimmick to
over-play). The site should feel like a serious modern product company (think the restraint of
Linear / Vercel / Stripe), not an agency brochure.

## Voice & tone

**Direct, product-minded, time-respecting.** (Per `identity-and-positioning.md` — confirm before any
new external-facing phrasing.)

| Do | Don't |
|---|---|
| Lead with the point; short sentences. | Bury value under preamble or buzzwords. |
| Speak in outcomes and specifics. | "Synergy," "cutting-edge," "passionate about." |
| Explain a technical choice briefly when it matters. | Lecture or over-explain basics. |
| Confident, plain, a little dry. | Hype, exclamation marks, fake urgency. |
| Show proof (shipped product, clients, patents). | Claim adjectives without evidence. |

**Tone by surface:** Home/Services — confident and crisp. Case studies — factual, outcome-led.
About — human and credible. Microcopy/CTAs — plain and action-oriented ("Work with us," "See
NewsNook," "Book a call").

**Truth rule:** publish only what the company docs support. No invented credentials, metrics, or
client claims. Confidential client terms never appear (see `identity-and-positioning.md
§Confidentiality`).

## Logo

Source assets: `docs/company/logos/` — four variants. (Current site also ships an inline SVG wordmark
in the header; carry the official assets forward in the rebuild.)

| File | Use |
|---|---|
| `logo-full-blue.svg` | Full wordmark on **light** backgrounds (default) |
| `logo-full-white.svg` | Full wordmark on **dark / brand-blue** backgrounds |
| `logo-icon-blue.svg` | Icon only (favicon, avatar) on light |
| `logo-icon-white.svg` | Icon only on dark / brand-blue |

Rules: keep clear space around the wordmark; never recolor, distort, or add effects. White on
dark/brand-blue, blue on light.

## Color

| Token | Hex | Status | Use |
|---|---|---|---|
| **Brand Blue** (primary) | `#1583FA` | confirmed | Logo, primary CTAs, links, key accents |
| **Ink** | `#1E293B` | working | Body text on light |
| **Muted** | `#64748B` / `#94A3B8` | working | Secondary text, captions |
| **Surface** | `#F8FAFC` / `#F1F5F9` | working | Subtle fills, cards |
| **Amber** (secondary accent) | `#F59E0B` | working | Optional highlight/callout — use sparingly |
| White | `#FFFFFF` | — | Light backgrounds, text on dark |

Direction: keep the existing **dark + brand-blue alternating section rhythm** from the current site —
it reads premium. Brand Blue is an accent, not a flood; large brand-blue fields are for hero/section
breaks only. Define all colors as design tokens (Tailwind theme / CSS variables), never hard-coded.

## Typography

- **Ubuntu** (Google Fonts) — weights 300/400/500/700. Headings and body.
- **Ubuntu Mono** — code, and as a deliberate accent for technical/credibility moments.
- **Fallback:** Helvetica, system sans-serif.
- Strong hierarchy: large confident headings, generous line-height on body, restrained weights.
  (Retire the stray `Outfit` font lingering in the current Webflow CSS — Ubuntu is the studio
  typeface.)

**Type scale (locked — mockup-approved).** Two weights only (400 regular, 500 medium); sentence case.

| Role | Size / weight | Use |
|---|---|---|
| Display | 40 / 500 | Hero headline |
| H1 | 30 / 500 | Page / section heading |
| H2 | 22 / 500 | Subsection heading |
| H3 | 18 / 500 | Card title |
| Body | 16 / 400 | Body copy (line-height ~1.6) |
| Caption | 13 / 400 | Captions, muted labels, eyebrows |
| Mono | 14 | Ubuntu Mono — technical/credibility accent |

Sizes are fluid/responsive (scale down on mobile). Implement as Tailwind theme tokens, not hard-coded.

## Layout & visual style

- **Generous whitespace, clear grid, big type.** Let content breathe.
- **Full-bleed imagery** as section accents — reuse the current scientific/lab photography sparingly
  as a nod to the patent heritage, but it is not the story.
- **Premium minimalism:** restrained motion (purposeful, never decorative), subtle depth, crisp
  cards. One tasteful hero motion moment (e.g. a brand-blue animated gradient) is welcome; avoid
  gratuitous animation.
- **Mobile-first**, fully responsive, accessibility built in (WCAG AA: contrast, focus states,
  semantic landmarks, keyboard paths).

## Components (direction for the Next.js rebuild)

- **Buttons:** primary (brand-blue, used once per view for the main action), secondary (outline/ghost),
  link. Plain action labels.
- **Nav:** persistent CTAs — *Work with us* (primary) and *See what we ship → NewsNook* (secondary,
  proof / outbound).
- **Case-study card:** client/logo, one-line outcome, engagement type tag.
- **Service card:** offering, "what you get," "how to start."
- **Section pattern:** alternating light/dark/brand-blue bands for rhythm.
- Build with the studio's own stack (Next.js + Tailwind, tokens-driven) — the implementation is part
  of the brand (it's the portfolio piece).

## Imagery & OG

- Per-page **OG/Twitter images**, auto-generated where possible (Next.js OG), brand-consistent so
  every shared link looks designed. Keep the existing `og-image-*.jpg` pattern as a fallback.
- Favicon / apple-touch from the icon logo variants.

## Accessibility & quality bar

- WCAG 2.1 AA minimum. Visible focus, sufficient contrast (watch Muted-on-Surface), alt text,
  semantic HTML, reduced-motion support.
- Performance is a brand attribute: top-tier Core Web Vitals and Lighthouse are non-negotiable —
  a slow studio site contradicts the pitch.

## Quick checklist (before shipping any page)

- [ ] Voice is direct, specific, proof-backed; no buzzwords or unverified claims.
- [ ] Brand Blue used as accent (and for the single primary CTA), not flooded.
- [ ] Ubuntu type with clear hierarchy; no stray fonts.
- [ ] One obvious next action above the fold.
- [ ] Colors/spacing from tokens, not hard-coded.
- [ ] AA contrast, focus states, alt text, keyboard path.
- [ ] Per-page metadata + OG image; structured data where applicable.
