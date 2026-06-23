---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - personas.md
  - product_vision.md
  - content_plan.md
---

# User Journeys & Stories — trevillyanlabs.io

Key paths visitors take and the user stories the site must satisfy. Personas (Dana, Hugh, Sam, Wren,
Jordan) are defined in `personas.md`. Each journey ends in a measurable action wired to PostHog
(see `../integrations.md`).

## Journey map (happy paths)

### J1 — Prospective client hires the studio  *(Dana — P0)*
1. Lands on **Home** (often via search, referral, or LinkedIn).
2. Reads the studio story; recognizes "they build software for clients."
3. Clicks **Work with us** or **Services** → scans the offerings (Build / Advise / Products), lands on
   **contract dev**.
4. Opens a relevant **case study** (`/work/[slug]`) — sees problem → approach → outcome.
5. Hits **Contact**, selects intent *"Hire us to build something"*, submits (Turnstile) or books a
   discovery call.
- **Conversion event:** `contact_submitted` (intent: build) / `call_booked`.
- **Drop-off risks:** unclear what TL builds; no relevant proof; high-friction contact.

### J2 — Enterprise AI leader books advisory  *(Hugh — P2, secondary)*
> Secondary path. Advise focuses on product & GTM execution (J2b); applying AI for leaders is a
> secondary line, not a headline.
1. Lands on **Home** or **Services** and finds the secondary "applying AI for leaders" line.
2. Reads it framed around *his* outcomes (credible with clients; productive with agents/automation/
   tooling), and notes TL itself runs on agentic AI (Ren).
3. **Books an intro call** / submits contact (intent: applying AI — secondary).
- **Conversion event:** `call_booked` / `contact_submitted` (intent: applying-ai).

### J2b — Startup founder books advisory  *(Priya — P0)*
1. Lands on **Home** or **Services → product & go-to-market execution** (referral / inbound).
2. Reads the offering: product strategy, PMF, fundraising, team building, running lean with agentic
   AI — backed by a 3x founder who ships a live product and operates the studio on an AI assistant.
3. Skims a relevant proof point (NewsNook as owned product; the "operated by Ren" model).
4. **Books an intro call** / submits contact (intent: product & GTM execution).
- **Conversion event:** `call_booked` / `contact_submitted` (intent: startup-advisory).

### J3 — NewsNook as proof → hand-off  *(secondary; Sam — P3 / proof for clients)*
1. Visitor sees NewsNook on **Home** or the **/products/newsnook** proof page.
2. Registers that the studio ships and runs a real, live product (credibility for the hire decision).
3. If personally interested, clicks through to **newsnook.ai** — where the product is actually sold.
- **Not a primary funnel.** `newsnook_clickthrough` is tracked as a proof/interest signal, not a site
  conversion goal. The product converts on its own site.

### J4 — Web/portfolio client engages  *(Wren — P1)*
1. Lands on **Home / Services → web & portfolio builds**.
2. Opens the **journalism portfolio** case study (client unnamed); sees craft + end-to-end framing.
3. **Contact** (intent: web/portfolio build).
- **Conversion event:** `contact_submitted` (intent: web build).

### J5 — Evaluator vets the studio  *(Jordan — P2)*
1. Lands on **Home**; senses quality immediately (the site is the proof).
2. Visits **About/founder** and **Work**; checks **Patents** for hard proof.
3. Leaves with a positive signal; may bookmark or reach out later.
- **Conversion event:** `about_viewed` + depth/return metrics (soft conversion).

## User stories

Format: *As a [persona], I want [capability] so that [outcome].*

**Home / orientation**
- As **Dana**, I want to understand what TL does within one screen so that I can tell if they're
  relevant before investing more time.
- As any visitor, I want a clear primary path to *work with the studio*, with a secondary "see what we
  ship" door, so that I route fast without the product competing with the hire decision.

**Services**
- As **Dana**, I want each offering to state *what I get, how it works, and how to start* so that I
  can picture an engagement.
- As **Priya**, I want product & go-to-market execution help (product/PMF/GTM/fundraising) *and* a way
  to run lean with AI, from someone who's actually shipped, so that I trust it over generic fractional
  help.
- As **Hugh**, I want the enterprise-AI advisory framed around my outcomes (not jargon) so that I
  trust it's practical.
- As **Priya/Hugh**, I want proof TL runs on agentic AI itself (operated by Ren) so that the advice
  is credible, not theoretical.
- As **Wren**, I want to see that web builds are handled end-to-end so that I know it's hands-off.

**Work / case studies**
- As **Dana**, I want a case study close to my problem so that I believe TL can build mine.
- As **Jordan**, I want real outcomes and named work (at a safe level) so that the studio reads as
  legitimate.
- As any client persona, I want at least one case study that matches my engagement type.

**Product (NewsNook — proof, not a sales funnel here)**
- As **Sam**, if I'm curious I want a direct link to NewsNook so I can reach the product (which is sold
  on newsnook.ai, not here) in one click.
- As **Jordan**, I want proof TL ships and operates a live product so that the studio reads as real.

**About / credibility**
- As **Jordan**, I want the founder's background and proof (patents, shipped work) so that I can vet
  who's behind it.
- As **Hugh**, I want a trustworthy founder voice so that I'm comfortable booking time.

**Contact / conversion**
- As **Dana/Hugh/Wren**, I want to say what I need (intent-routed) so that the first reply is relevant.
- As a warm lead, I want to book a call directly so that I skip the back-and-forth.
- As the studio, I want each submission tagged by intent so that I can measure and prioritize.

**Non-functional (all visitors)**
- As any visitor, I want the site to load fast and work on mobile so that I don't bounce.
- As a sharer, I want links to render a designed preview (OG image) so that shared links look credible.
- As an AI crawler / search engine, I want clean structured data and `llms.txt` so that TL is
  discoverable and correctly summarized.

## Acceptance signals (v1)

- Every page answers "what is this / what do I do next" above the fold.
- Every persona has a matching case study and a one-click primary CTA.
- Conversion events fire in PostHog and assemble into the **core funnel** (visitor → service view →
  contact/booking). NewsNook click-through is tracked as a secondary proof/interest signal, not a
  primary funnel.
- URL parity preserved for `/patents`, `/team`, `/contact`, legal (no SEO regression).
