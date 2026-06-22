---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - product_vision.md
  - user_journeys.md
  - content_plan.md
---

# Visitor Personas — trevillyanlabs.io

Who the site is designed for. Personas are referenced by name in user stories (`user_journeys.md`)
and page-content decisions (`content_plan.md`). Six personas; **Dana** and **Priya** are P0. The
**Advise** offering focuses on **product & go-to-market execution** (Priya); enterprise AI advice
(Hugh) is a *secondary* line — Hugh is now a P2 persona.

Grounded in real engagements (see `docs/company/pipeline.md`): Dana ≈ Vaquero's Peter, Hugh ≈ the
KPMG advisee, Wren ≈ the journalism-portfolio client, Sam ≈ a NewsNook user. Priya (startup-founder advisory) reflects
TL's product-strategy/PMF/fundraising/agentic-AI advisory line.

> **Cross-persona proof:** Trevillyan Labs is run by Bill and operated day-to-day by **Ren**, an AI
> assistant. For the advisory personas especially (Priya, Hugh), "we run on the agentic AI we advise
> you to adopt" is the single most credible signal — surface it.

---

## P0 — Dana · the prospective client (custom build)

- **Role:** Founder, operator, or non-technical exec at an SMB/startup who needs custom software and
  has no team to build it (e.g. a contractor wanting a 3D tool, a startup needing an MVP).
- **Goal:** Find a build partner who can take a real-world problem to shipped software, fast.
- **What she needs from the site:** Evidence TL can build *her kind of thing*; the stack and process;
  how engagements work; a low-friction way to start a conversation.
- **Pains / objections:** Agencies are slow, expensive, and over-staffed. Freelancers are a coin
  flip. "Will this person actually ship, and understand my business, not just write code?"
- **What converts her:** Relevant case studies with outcomes, a founder who ships real products and
  speaks in business terms, a clear engagement path, and the site itself proving craft.
- **Primary CTA:** *Work with us* → intent-routed contact / discovery call.

## P0 — Priya · the startup founder (product & GTM execution)

- **Role:** Early-stage founder (pre-seed → Series A) wearing every hat; technical or not, but without
  a senior product partner.
- **Goal:** Get to product-market fit and the next raise without wasting scarce runway — and learn how
  to run lean using agentic AI (AI employees / assistants / automation) instead of over-hiring.
- **What she needs from the site:** Evidence TL has *founder-level* product judgment (3x founder,
  ships its own product) and a credible, modern take on running AI-native — not generic startup advice.
- **Pains / objections:** Advisors who've never shipped; generic "fractional" help; burning cash on
  headcount; AI hype with no practical path.
- **What converts her:** A **product & go-to-market execution** offering — product strategy, PMF, GTM,
  fundraising, team building — from a founder who ships, with running lean on AI as a means (and the
  proof that TL itself runs on an AI assistant, Ren). A booking link.
- **Primary CTA:** *Book an intro call* / contact (product & GTM execution intent).

## P2 — Hugh · the enterprise AI leader (secondary)

> **Secondary persona.** Advise now focuses on **product & go-to-market execution** (Priya).
> Enterprise AI advice is a secondary line, so Hugh is no longer a P0 target — keep the content, but
> don't let it headline the Advise pillar.

- **Role:** Senior professional / partner / executive (e.g. consulting, manufacturing, finance) who
  must apply AI in their work but isn't technical.
- **Goal:** Become credible and productive with AI — understand how it works, where agents,
  automation, and tooling fit, and their limits — often within constrained enterprise environments.
- **What he needs from the site:** Proof TL can *teach* and *implement*, not just build; that the
  advice is practical and tailored, not generic AI hype; an easy way to book time.
- **Pains / objections:** Drowning in hype; burned by consultants who lecture but don't translate to
  his world; worried about confidentiality and enterprise constraints.
- **What converts him:** A clear enterprise-AI advisory offering framed around outcomes (sound
  credible with clients, be more productive, deploy agents/automation safely), a trustworthy voice,
  and the lived proof that TL operates on agentic AI itself. A booking link.
- **CTA (secondary):** *Book an intro call* / contact (applying-AI intent — secondary).

## P3 — Sam · the product buyer (NewsNook)

> **Not a conversion target for this site.** trevillyanlabs.io sells the *studio*; selling NewsNook is
> **newsnook.ai's** job. Sam matters here only as the human proof that the studio ships real products
> people use — and as a one-click hand-off, not a funnel to optimize.

- **Role:** Knowledge worker, executive, or thought leader buried in newsletters.
- **Goal:** Stay informed without inbox overload.
- **What they need from the site:** To see NewsNook is a real, live product and click through to it.
  On the TL site, NewsNook is a **credibility proof point** with a link out — not a sales pitch.
- **What we do for them:** A crisp NewsNook proof page that hands off to **newsnook.ai** without
  friction. No deep product-selling here.
- **Hand-off (not a primary site CTA):** *See what we ship → NewsNook* → newsnook.ai.

## P1 — Wren · the web/portfolio client

- **Role:** Author, creator, academic, or solo professional (e.g. a published writer) who needs a
  high-quality personal/portfolio site and won't build it themselves.
- **Goal:** Look credible and polished online; hand the whole thing to someone trustworthy.
- **What they need from the site:** Evidence TL builds beautiful, well-crafted sites end-to-end
  (design → build → maintain), and that the process is hands-off for them.
- **Pains / objections:** DIY builders look generic; doesn't want to manage a project or learn tools.
- **What converts them:** A portfolio/web-build case study (the journalism portfolio, client unnamed),
  visible craft, end-to-end framing.
- **Primary CTA:** *Work with us* → contact (web/portfolio intent).

## P2 — Jordan · the evaluator (investor / peer / press / talent)

- **Role:** Investor, potential collaborator, journalist, or prospective contractor/hire vetting TL.
- **Goal:** Quickly assess legitimacy, traction, and who's behind the studio.
- **What they need from the site:** A coherent story, real proof points (shipped product, named
  clients at a safe level, issued patents), and the founder's background.
- **Pains / objections:** Thin or dated sites read as "not real." (The *current* site is exactly this
  risk.)
- **What converts them:** A confident, modern site; an About/founder page; verifiable proof.
- **Primary CTA:** Explore About / Work; leave with a positive signal.

---

## Design implications (cross-persona)

- **Hire-the-studio is the primary path.** *Work with us* (Dana/Priya/Hugh/Wren) is the dominant CTA.
  *See what we ship → NewsNook* is the secondary, proof-oriented door (it links out to newsnook.ai;
  it isn't a co-equal buyer funnel — selling NewsNook is its own site's job).
- **Intent-routed contact** so each client persona lands in the right conversation (build, startup
  product & GTM execution, applying-AI (secondary), web/portfolio) — and we can measure which line each visit
  was about.
- **Case studies must span engagement types** (product, custom build, advisory, web/portfolio) so
  every client persona sees themselves.
- **"Operated by Ren" is a shared proof point** — strongest for the advisory personas (Priya, Hugh),
  but it differentiates the whole studio.
- **Credibility is shared infrastructure** — About, patents, and the site's own craft serve all six.
