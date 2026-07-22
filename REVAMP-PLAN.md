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
- Per-route `metadata` (title, description, canonical, OG/Twitter) via the Metadata API. ✅
- **`app/robots.ts`** ✅ (allow-list per ADR-0004 + Sitemap/Host) + **dynamic `app/sitemap.ts`** ✅
  (all routes + case studies, patents, team — replaces the hand-built `sitemap.xml`).
- **JSON-LD structured data**: `Organization` (home), `Service` (services), `Article` (case studies),
  `FAQPage` (faq) ✅. Still to add: `Person` (founder), `BreadcrumbList`.
- Per-page OG images (keep the existing `og-image-*.jpg` pattern; add for new pages). _(pending)_

**AEO / LLM discoverability** (objectives in `.agents/references/strategy/product_vision.md` →
Discoverability — a *primary acquisition channel* for an AI-native studio: be surfaced, cited, and
represented accurately by AI answer engines and LLMs to drive client referrals)
- **`/faq`** written the way prospects ask (extractable, question-shaped), backed by `FAQPage` JSON-LD. ✅
- **`public/llms.txt`** ✅ — curated, accurate plain-text overview for LLMs (offerings, proof, how to
  engage), docs-supported facts only.
- **`app/robots.ts` allows all reputable AI crawlers — training *and* answer/search** ✅ (GPTBot,
  ClaudeBot, CCBot, Google-Extended, Applebot-Extended, OAI-SearchBot, PerplexityBot, …); see
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
| **2 — Content & narrative** ✅ | All pages live with real copy | `/services`, `/work` + case studies (Clip/NewsNook/journalism), `/about` (+patents), `/products/newsnook`, `/contact` (intent-routed + route handler), `/faq` (+FAQPage JSON-LD), `/patents` + `/patents/[slug]`, `/team` + `/team/[slug]`, `/privacy-policy` + `/terms` (faithful legal copy), and legacy `.html` → clean-URL redirects (parity). Case studies use typed content (`lib/content.ts`); MDX deferred. Booking link wired (Calendly, `site.bookingUrl`) on `/contact` + advisory CTAs. **Still needs Bill:** journalism-portfolio screencaps; full Turnstile wiring (env/keys) — landing in Phase 3. |
| **3 — SEO/AEO/analytics/security** | NewsNook-grade non-functional layer | Metadata + JSON-LD + robots/sitemap, **AEO/LLM layer (FAQ, `llms.txt`, AI-crawler allowlist, entity consistency)**, env-config analytics, security headers + rate-limit, `.agents/` + SECURITY.md + CODEOWNERS |
| **4 — QA & launch** | Production on Vercel | URL/redirect parity check, Lighthouse + a11y pass, contact-form e2e, preview → promote |
| **5 — Post-launch** *(optional)* | Compounding SEO + advisory authority | **Agentic workflows blog program** (see §8.5) — platform → free series → optional paid tier; conversion measurement; iterate copy on data |

---

## 6. Decisions (locked)

- **A. Analytics → PostHog.** Consolidate Mixpanel + Hotjar + LogRocket into a single PostHog setup
  (product analytics + session replay + funnels), keys via env-config.
- **B. Case studies (4 at launch):** NewsNook ("Our product"), **Journalism portfolio** ("Website" —
  **client unnamed on the site**; internally the Faith engagement), **Verbaly**, and **Clip Automation**
  ("Startup MVP" — contracted PM/PgM for 6 months; **delivered the MVP, founding engineering team, and
  7-figure ARR**). Type tags lead with delivered value, plain-language. **KPMG is held back** — don't
  publish until KPMG grants permission.
- **C. Blog → Phase 5 program (expanded 2026-07-22).** Ship the studio story first. Post-launch the
  blog is the **agentic workflows program** (platform → free series → optional paid) documented in
  §8.5 — not an unbounded writing dump.
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

---

## 8. Post-launch backlog (prioritised)

Improvement ideas captured after launch, highest-impact first. Tier reflects impact on the site's
#1 job — turning visitors into "hire the studio" conversations.

### Tier 1 — Conversion
1. **Social proof / testimonials.** No client quotes exist on the site today — the single biggest
   conversion gap. Add 2–3 attributed quotes (e.g. the Clip founder, an advisory client) near the CTAs,
   with `Review`/`AggregateRating` JSON-LD. *Needs: real quotes from Bill (clear confidentiality first).*
2. **"Trusted by" logo wall.** Surface real company logos already in the portfolio repo (Clip Automation,
   Incode, Property Meld, HomeMetrics) as a credibility strip, ideally above the fold.
3. **Concrete engagement path.** A short "how we work" (scope → timeline → what you get), no pricing
   required, to reduce "is this for me?" friction before the contact form.

### Tier 2 — Inbound & discoverability
4. **Blog / Insights — agentic workflows program** (Phase 5). Highest value for the **advisory** line —
   thought leadership + lived-practice posts are what AI answer engines cite and what warm leads
   convert on. Full expansion in **§8.5** below. Depends on the deferred MDX content path to author well.

> **Done since launch:** markdown mirrors / `llms-full.txt` AEO layer, case-study galleries (NewsNook +
> Verbaly), `.com` canonical, conversion analytics events, `next/image` galleries, and lint hygiene.

---

## 8.5 Agentic workflows blog program (Phase 5 expansion)

Bill prompt 2026-07-22: turn the deferred blog into a **deliberate content program** that posts
solutions, dos/don'ts, and credibility on *how to get the most out of agentic workflows* — rooted in how
Trevillyan Labs actually runs (Ren). Decide "one vs many roadmap items," document accordingly.

### Decision (one parent, three tracks — not six company-roadmap rows)

| Layer | What | Why this shape |
|---|---|---|
| **1 parent initiative** | *Agentic workflows blog on trevillyanlabs.com* | One company/studio bet; one owner of payoff (advisory inbound + AEO citations). Lives here as Phase 5 + Tier-2 #4; thin pointer on `docs/company/roadmap.md`. |
| **3 sequential tracks** | A platform · B free series · C optional paid tier | Different critical path, risk, and "done". Shipping articles before a render path is inventing work twice; paywall before free traction is premature. |
| **Content backlog (not roadmap items)** | Named article concepts under Track B | Topics are a *series outline*, not six parallel initiatives. Reorder/swap freely without renumbering roadmaps. |

Do **not** promote each article concept to its own company-roadmap row. Do **not** walk paywall until
free posts prove citation + inquiry signal.

### Strategy fit

- **Primary job:** compounding inbound for the **Advise** line (founder / product-GTM / agentic-operating-model buyers) + AEO citations on high-intent "how do I run agents" queries.
- **Secondary:** credibility that TL *runs* the model it advises (Ren as lived proof) — already the
  supporting differentiator in the site narrative.
- **Non-job:** selling a content product first. Paywall is a *later option*, not the launch thesis.
- **Guardrail:** never leak proprietary Ren internals, client detail, or anything covered by Hard Rule 5 /
  `identity-and-positioning.md` confidentiality. Public bar = patterns, tradeoffs, practices — not
  runbooks that hand a competitor the stack.

### Track A — Blog platform (prerequisite)

**Outcome:** `/blog` + `/blog/[slug]` ship, authored via MDX (or the post-Phase-2 content path), with
Article JSON-LD, OG, sitemap inclusion, and a list → post IA that matches `content_plan.md`.

- [ ] MDX (or equivalent) authoring path live; blog routes in App Router
- [ ] Index + post templates (title, dek, publish date, series tag, CTA to /contact · advisory)
- [ ] SEO/AEO: `Article` JSON-LD, canonical/OG, sitemap + `llms.txt` pointer to the series hub
- [ ] PostHog: `blog_view`, `blog_cta_click` (route into existing conversion analytics)
- [ ] Editorial minimalism: one series tag (`agentic-workflows`), draft → review → publish checklist

**Depends on:** site launch gate (Phase 4) stable. **Unblocks:** Track B.

### Track B — Free high-value series: *Getting the most out of agentic workflows*

**Outcome:** a public series of practical how-to / dos-and-don'ts posts, each long enough to be citable
and specific enough to be useful — TLDV, not thought-leadership fog. Cadence target once platform is
up: **1 post / 2 weeks** until the first 6 land, then reassess on GSC + AEO + inquiry evidence
(`seo-pulse` already covers trevillyanlabs.com).

**Series outline** (seed concepts from Bill 2026-07-22 — reorder on evidence; each is a post, not a roadmap row):

| # | Working title | Angle (solutions + dos/don'ts + credibility) |
|---|---|---|
| 1 | **One agent brain, many harnesses** | Multi-harness orchestration on top of a single agent "brain" with unified memory — why fork-per-tool identity drifts, and the pattern that keeps Claude Code / Cursor / Hermes / Discord as hands on one mind. |
| 2 | **What an "agent brain" actually is** | Durable memory vs session context vs skills vs prompts; what belongs in the brain, what must stay ephemeral, and the failure mode of "the model is the memory." |
| 3 | **Cockpit observability & directing** | Practices for *directing* an agent you trust: progress gists not play-by-plays, decision pings only, ledgers, verification-as-a-stage — how the human stays pilot without becoming the bottleneck. |
| 4 | **Discord (or chat) as the agent gateway** | Event-driven two-way reach from any device; threads as workspaces; when chat-as-gateway beats a web UI; ops gotchas (mentions, reply chrome, streaming). |
| 5 | **Voice pedal → right Discord thread** | Hands-free capture: speech-to-text pedal that drops a transcript and triggers the agent into the *correct* thread — hardware + routing pattern, failure modes. |
| 6 | **Skills as the unit of leverage** | Skills vs prompts vs tools; how a skill library compounds; draft/audit loops; when *not* to mint a skill. |

Each post should earn: (a) one clear practice a reader can try this week, (b) at least one explicit
don't, (c) a soft CTA into advisory / "work with us" for readers who want it built with them.

**Depends on:** Track A. **Unblocks:** Track C decision.

### Track C — Optional paid tier (later, evidence-gated)

**Outcome:** a call on whether high-value depth becomes a paid blog / members tier — **only after**
Track B shows signal.

Gate before any paywall design (all three preferred):
1. **Organic/AEO signal** — non-brand queries + answer-engine citations on series posts (via `seo-pulse` + AEO panel).
2. **Commercial signal** — inbound that names a post, or advisory conversations that started from one.
3. **Depth leftover** — material too operational/sensitive for free, still clean to publish behind a wall
   (templates, scorecards, deeper run-pattern libraries) without violating the proprietary-info guardrail.

Until the gate trips: **do not** scaffold billing, members routes, or gated MDX. If it never trips, the
free series still paid for itself as advisory inbound.

Possible paid shapes (pick later, don't pre-commit): email/member newsletter · paid post tier on-site ·
bundle as an advisory lead-magnet / workshop companion. Stripe exists for NewsNook; reuse patterns, don't
fork a second commerce stack casually.

### Sequencing & sizing

```
Phase 4 launch stable
        │
        ▼
 Track A  blog platform          (eng, ~S–M)
        │
        ▼
 Track B  free series (posts 1–6) (content + light eng; 1/2wk cadence)
        │
        ▼
  evidence gate?
    no  → keep free cadence / retire weak topics
    yes → Track C paid-tier design (separate decision)
```

**Right-sizing vs "maybe multiple roadmap items":** keep **one** Phase-5/Tier-2 parent. Tracks A/B/C are
checklist stages inside it. Article concepts stay a content backlog. Promote a sub-item to its own
company-roadmap row only if it grows into a standalone product (e.g. a real paid publication with its
own P&L) — default assumption is it won't.

### Open calls (not blocking documentation)

- Voice-pedal post: publish only if the hardware path is real enough to demo or honestly frame as a
  pattern-in-progress — no vapor screenshots.
- Series home: `/blog` filtered by `agentic-workflows` vs a dedicated hub page — decide at Track A.
- Cross-post to Substack/personal brand: `projects/substack` is parked; default is **site-canonical**,
  syndicate later if useful.
