# Trevillyan Labs Website Revamp — Plan

**Branch:** `revamp/site-narrative-restack`
**Goal:** Flip the site's narrative from "patent R&D lab" to **an independent software studio you
hire**. Any visitor should immediately understand what TL does — ships custom software for clients,
operates its own products, and advises founders and early-stage startups on product and go-to-market
execution — and take the **primary** next step: *work with the studio*. Owned products (NewsNook)
appear as **credibility proof** and link out to their own sites; selling them is not this site's job
(see priority note below). Bring the engineering bar up to NewsNook's standard.
**Decision (locked):** Rebuild on **Next.js (App Router) + TypeScript + Tailwind**, deployed on Vercel.

Full vision: `.agents/references/strategy/product_vision.md`. Canonical company positioning:
`docs/company/identity-and-positioning.md`. This initiative is the "Revamp the trevillyanlabs.io
website" item in `docs/company/roadmap.md`.

---

## 1. The narrative shift

| | From (today) | To (target) |
|---|---|---|
| One-liner | "R&D company that invents and licenses technologies" | "Trevillyan Labs ships custom software for clients, operates its own products, and advises founders and early-stage startups on product and go-to-market execution." |
| Hero | "Inventing Tomorrow, Today" | **"We build and run software — ours and yours."** Primary CTA *Work with us*; secondary *See what we ship → NewsNook* (proof) |
| Priority | Patents / licensing | **Hire the studio (priority 1)**; products = proof, not a sales funnel here |
| Patents | The headline | Demoted to **credibility proof** (move to /about) |
| Missing | — | Services, NewsNook proof page, case studies, /about, /faq, "how to work with us" |

**What to communicate, in priority order** (detail: `strategy/product_vision.md`):
1. **Hire the studio (priority 1).** *Build* — contract software development; web & portfolio builds.
   *Advise* — startup advisory (product/PMF/fundraising/team/agentic-AI) and enterprise AI advisory.
2. **Credibility.** Owned products — **NewsNook**, live (proof TL ships *and runs* real software;
   links out, not sold here) — plus issued patents and the site itself as the work sample.
3. **Supporting differentiator.** The studio runs lean on AI (operated day-to-day by Ren) — strongest
   on the advisory lines; not the headline.

---

## 2. Information architecture

Mirrors `.agents/references/strategy/content_plan.md` (authoritative for IA + page intent).

```
/                       Home — studio story (hire-first); primary CTA Work with us, secondary NewsNook (proof)
/services               Offerings: Build (contract dev, web/portfolio) · Advise (startup, enterprise AI) · Products
/products/newsnook      NewsNook proof page (credibility) → links out to newsnook.ai (not sold here)
/work                   Case studies index (proof across engagement types)
/work/[slug]            Case study (MDX): NewsNook, Journalism portfolio (client unnamed),
                        Verbaly, Clip Automation  (KPMG held back — needs permission)
/about                  Founder + studio story; patents as proof
/patents                Patents index (credibility) — preserved
/patents/[slug]         Patent detail — preserved
/team  ·  /team/[slug]  Team — preserved (may fold into /about)
/contact                Intent-routed contact (Turnstile) + booking link — preserved
/faq                    FAQ written for answer engines (AEO); FAQPage JSON-LD
/blog  ·  /blog/[slug]  Writing — SEO/AEO thought leadership (Phase 5, optional)
/privacy-policy · /terms  Legal — ported
robots.txt · sitemap.xml · llms.txt   Discoverability (AI crawlers allowed — ADR-0004)
```

**URL parity is mandatory** — `/patents`, `/patents/:slug`, `/team`, `/team/:slug`, `/contact`,
`/privacy-policy`, `/terms` must keep working (301s where paths change) so existing SEO and any inbound
links survive. Current `vercel.json` rewrites/redirects are the spec to preserve.

---

## 3. Tech stack (target)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 App Router, TypeScript | Mirrors `NewsNook-web-app-v2`; dogfoods TL's client stack |
| Styling | Tailwind v4 + brand tokens | Brand Blue `#1583FA`, Ink, Ubuntu typeface (`identity-and-positioning.md`) |
| Content | MDX for patents / case studies / blog; JSON→typed data for team | Replaces client-side `cms-render.js` |
| Contact | Route handler `/api/contact` + Turnstile + Nodemailer/Gmail | Port existing `api/contact.js` logic as-is |
| SEO | Metadata API, dynamic `sitemap.ts` + `robots.ts`, JSON-LD | Net-new structured data |
| Analytics | **PostHog**, env-config, **no committed keys** | Replaces Mixpanel + Hotjar + LogRocket |
| Tooling | Biome, TypeScript strict; Vitest/Playwright optional | Match NewsNook conventions |
| Hosting | Vercel | Reuse existing project + env vars |

---

## 4. SEO / AEO / LLM / tracking / security upgrades (the NewsNook-grade layer)

**SEO**
- Per-route `metadata` (title, description, canonical, OG/Twitter) via the Metadata API.
- **`robots.ts`** (currently missing) + **dynamic `sitemap.ts`** (replaces hand-built `sitemap.xml`).
- **JSON-LD structured data** (currently none): `Organization`, `Person` (founder), `Service`,
  `FAQPage`, `BreadcrumbList`, `Article` on blog/case studies.
- Per-page OG images (keep the existing `og-image-*.jpg` pattern; add for new pages).

**AEO / LLM discoverability** (objectives in `.agents/references/strategy/product_vision.md` →
Discoverability — a *primary acquisition channel* for an AI-native studio: be surfaced, cited, and
represented accurately by AI answer engines and LLMs to drive client referrals)
- **`/faq`** written the way prospects ask (extractable, question-shaped), backed by `FAQPage` JSON-LD.
- **`llms.txt`** — curated, accurate plain-text overview for LLMs (offerings, proof, how to engage),
  docs-supported facts only.
- **`robots.ts` allows all reputable AI crawlers — training *and* answer/search** (GPTBot, ClaudeBot,
  CCBot, Google-Extended, Applebot-Extended, OAI-SearchBot, PerplexityBot, …); see
  `.agents/references/decisions/ADR-0004-allow-ai-crawlers.md`.
- **Entity consistency** — link out to LinkedIn, patents, newsnook.ai for correct entity resolution.
- Spot-check target prompts in answer engines pre/post launch.

**Tracking** (fix today's issues: token committed in `analytics-config.js`, `debug:true` in prod,
3 overlapping tools)
- Move all keys to **env-config** (build-time injection, nothing secret in git) — NewsNook's pattern.
- **Consolidate to PostHog** — replaces Mixpanel + Hotjar + LogRocket (product analytics + session
  replay + funnels in one tool).
- Preserve the useful bits of today's setup: declarative event mapping (`mixpanel-events.js`) and
  scroll-depth tracking → re-implement as a small typed analytics module on top of PostHog.

**Security**
- Keep the contact form's strengths: Turnstile verify, `escapeHtml`, server-only secrets.
- **Add:** rate-limiting on `/api/contact`, security headers (CSP, HSTS, X-Frame-Options) via
  `next.config` / Vercel headers, a honeypot field.
- Add **`SECURITY.md`**, **`CODEOWNERS`**, and a `.agents/` context tree (ADRs, `DOC_INVENTORY`,
  `security_checklist`) mirroring NewsNook so the repo is agent- and contributor-ready.

---

## 5. Phases

| Phase | Outcome | Key work |
|---|---|---|
| **0 — Plan & content** ✅ | Agreed scope, IA, copy, design language | Stack locked, strategy + `.agents/` written, mockups approved |
| **1 — Scaffold & brand** ✅ | Running Next.js app with brand shell + home | App Router + Tailwind v4 + brand tokens, Ubuntu (`next/font`), nav/footer, home (hero/services/work/CTA). Live preview via PR #2 |
| **2 — Content & narrative** ✅ | All pages live with real copy | `/services`, `/work` + case studies (Clip/NewsNook/journalism), `/about` (+patents), `/products/newsnook`, `/contact` (intent-routed + route handler), `/faq` (+FAQPage JSON-LD), `/patents` + `/patents/[slug]`, `/team` + `/team/[slug]`, `/privacy-policy` + `/terms` (faithful legal copy), and legacy `.html` → clean-URL redirects (parity). Case studies use typed content (`lib/content.ts`); MDX deferred. **Still needs Bill:** Verbaly case-study content; full Turnstile + booking wiring (env/keys) — landing in Phase 3. |
| **3 — SEO/AEO/analytics/security** | NewsNook-grade non-functional layer | Metadata + JSON-LD + robots/sitemap, **AEO/LLM layer (FAQ, `llms.txt`, AI-crawler allowlist, entity consistency)**, env-config analytics, security headers + rate-limit, `.agents/` + SECURITY.md + CODEOWNERS |
| **4 — QA & launch** | Production on Vercel | URL/redirect parity check, Lighthouse + a11y pass, contact-form e2e, preview → promote |
| **5 — Post-launch** *(optional)* | Compounding SEO | Blog/case-study cadence, conversion measurement, iterate copy on data |

---

## 6. Decisions (locked)

- **A. Analytics → PostHog.** Consolidate Mixpanel + Hotjar + LogRocket into a single PostHog setup
  (product analytics + session replay + funnels), keys via env-config.
- **B. Case studies (4 at launch):** NewsNook ("Our product"), **Journalism portfolio** ("Website" —
  **client unnamed on the site**; internally the Faith engagement), **Verbaly**, and **Clip Automation**
  ("Startup MVP" — contracted PM/PgM for 6 months; **delivered the MVP, founding engineering team, and
  7-figure ARR**). Type tags lead with delivered value, plain-language. **KPMG is held back** — don't
  publish until KPMG grants permission.
- **C. Blog → deferred to Phase 5.** Ship the studio story first.
- **D. Repo → build in place** on this branch (`revamp/site-narrative-restack`), same Vercel project.

### Content still to gather (Phase 2 input)

- **Verbaly** has **no docs** yet — need from Bill: what the engagement was, role/scope, outcome,
  dates, and what's publicly shareable. **Clip Automation** headline outcome is known (MVP, founding
  engineering team, 7-figure ARR); still need supporting detail for the full case-study page. NewsNook
  and the journalism-portfolio engagement have repo context to draw from.
- **Journalism portfolio:** confirm what's shareable **without naming the client**.
- **KPMG:** held back pending KPMG's permission — do not publish a KPMG case study until then.

---

## 7. Risks / guardrails

- **SEO regression** if URLs or metadata drop — parity checklist is a launch gate (Phase 4).
- **Scope creep** — the studio story is the must-ship; blog/extras are explicitly Phase 5.
- **Confidentiality** — client case studies must clear the rules in `identity-and-positioning.md §Confidentiality` before going public.
- **Secrets** — Turnstile/Gmail keys stay Vercel-only; analytics keys via env-config; nothing sensitive in git.
