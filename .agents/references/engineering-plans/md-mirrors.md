---
status: accepted
source_of_truth: false
last_verified: 2026-06-24
owner: bill
related_docs:
  - architecture.md
  - code_conventions.md
  - security_checklist.md
  - strategy/product_vision.md
  - decisions/ADR-0004-allow-ai-crawlers.md
---

# Engineering Plan — Per-page Markdown mirrors (`/<path>.md`)

> **Status: Phase 1 implemented** on `feat/md-mirrors` (off `staging`). This was the reviewable design;
> the code now exists (`middleware.ts`, `app/api/md/[[...path]]/route.ts`, `lib/routes.ts`, `lib/md/`).
> Implementation notes vs. this plan:
> - **Middleware matcher:** the regex sketched in §3.2 (negative-lookahead with a trailing `\.md$`)
>   does **not** match under Next 15 — `path-to-regexp` mishandles the `$` anchor and every `.md`
>   request fell through to the App Router's 404. The shipped matcher is `"/(.*)\\.md"` (no `$`;
>   path-to-regexp auto-anchors the end) plus an in-function `endsWith(".md")` / `/api/` guard. Still
>   scoped to `*.md` only, so the §6 perf property holds.
> - **Frontmatter title/description** are kept in a small `META` map in `lib/md/renderers.ts` that
>   mirrors each page's `pageMeta()` (per the §5 low-stakes decision); page bodies stay drift-free from
>   the typed layer.
> - **Vitest** was added (dev-only) for the serializer/registry/consistency tests (§8) — the repo had
>   no test runner.
> Original design follows unchanged.

## 1. Problem / goal & non-goals

### Goal

Serve a clean Markdown mirror of every HTML page. For any page at
`https://www.trevillyanlabs.io/<path>`, make `https://www.trevillyanlabs.io/<path>.md` return the
same page's content as well-structured `text/markdown` — no nav chrome, no JSON-LD, no Tailwind, just
the headings, prose, and lists an LLM would want to cite.

This is the emerging "Mintlify-style" convention (a page and its `.md` twin live at the same path).
It complements the **already-shipped** site-wide LLM artifacts:

- `public/llms.txt` — the curated index / table of contents for crawlers.
- `app/llms-full.txt/route.ts` — one data-driven document concatenating the full typed content layer.

Per-page `.md` is the **per-URL** counterpart: when an answer engine has a *specific* page URL (from a
search result, a sitemap entry, or a citation), it can fetch the `.md` for that exact page rather than
parsing HTML or downloading the entire `llms-full.txt` corpus.

### Why this matters (AEO/LLM citation)

Answer engines (ChatGPT search, Perplexity, Claude, Google AI Overviews) cite more accurately and more
often when they can fetch low-noise, token-cheap source text. A `.md` mirror removes the markup,
scripts, and layout that dilute the signal in our HTML. Allowing and *feeding* these crawlers is
already an accepted decision (`decisions/ADR-0004-allow-ai-crawlers.md`); this is the natural next
increment of that strategy, alongside `llms.txt`/`llms-full.txt`.

### Non-goals (explicit)

- **Not required for Google crawling or ranking.** Googlebot reads our HTML; `robots.ts` + `sitemap.ts`
  + per-page `metadata` already cover classic SEO. `.md` mirrors are an **AEO enhancement, not a launch
  blocker.** Nothing here gates a deploy.
- **Not a content rewrite.** We mirror existing approved copy; we do not author new marketing prose.
- **Not a CMS / MDX migration.** Long-form-to-MDX is a separate, later track (`content.ts` header note).
  This plan reuses the *current* typed content layer.
- **Not a replacement for `llms-full.txt` or `llms.txt`.** Those stay; this is additive and must not
  redesign them.

## 2. Current state (what this builds on)

| Concern | Where it lives today | Reuse in this plan |
|---|---|---|
| Typed content (data-driven pages) | `lib/content.ts` (`services`, `caseStudies`, `faqs` + types), `lib/patents.ts` (`patents`), `lib/team.ts` (`team`) | **Primary source** for the `.md` *body* — near-zero drift (header/section prose is the exception, see the crux below). |
| Site constants / nav / offerings | `lib/site.ts` (`site`, `nav`, `socials`, `offerings`) | Frontmatter base URL, footer-ish facts. |
| Legal copy | `lib/legal.ts` → `lib/legal/{privacy,terms}.html` (read from disk) | Convert HTML → Markdown for the two legal `.md` mirrors. |
| Per-page title/description | `lib/seo.ts` `pageMeta({title, description, path})`; most pages pass these (home is the exception — uses layout defaults) | **Seeds the `.md` frontmatter** (`title`, `description`). |
| Full-corpus LLM mirror | `app/llms-full.txt/route.ts` (already shipped) | The **established pattern** for "typed content → Markdown via a Route Handler." But its serialization is *inline closures* returning `text/plain` — not reusable helpers — so this is a refactor, not a lift; see §4 (recommend building `lib/md/` fresh and migrating it later). |
| Crawler index | `public/llms.txt` (already shipped) | Optionally references the new `.md` URLs (§5). |
| robots / sitemap | `app/robots.ts`, `app/sitemap.ts` (already shipped) | `sitemap.ts` already holds the authoritative mirror-able path list — **share it**, don't fork it (§3.4); the `matcher` must never shadow these. |

### The page routes to mirror

Static: `/` (home), `/services`, `/work`, `/products`, `/products/newsnook`, `/about`, `/patents`,
`/contact`, `/faq`, `/team`, `/privacy-policy`, `/terms`.
Dynamic: `/work/[slug]`, `/team/[slug]`.
Special: `/patents/[slug]` **redirects out** to Google Patents (it renders no first-party content). Note
the actual mechanism is Next's `redirect(patent.sourceUrl)` in `app/patents/[slug]/page.tsx`, which
issues an **HTTP 307**, not a 301 (an in-repo comment in `sitemap.ts` mislabels it "301" — a separate
cosmetic cleanup, see §12). The behavior is what matters here: these URLs serve no first-party body, so
their `.md` has nothing to mirror.

### Prose-vs-data reality (the crux, surfaced early)

> Verified against `origin/staging` (the implementation base) on 2026-06-24. The claims below reflect
> the actual code, not the older commit this plan's own branch was cut from.

The split is **not** the clean two-way it first appears. Three shapes exist:

1. **Data-driven body** — the page's *core* content lives in the typed layer (`services`,
   `caseStudies`, `faqs`, `patents`, `team`). `/work/[slug]`, `/faq`, `/team/[slug]` map almost
   entirely to that data; the `.md` generator can render their bodies with **zero drift**.
2. **Hybrid (typed body + hand-written page header)** — this is the important nuance the first draft
   missed. *Every* index page wraps its typed data in a `<PageHeader>` whose `eyebrow` / `title` /
   `intro` strings are hand-written in JSX, not in any constant. Examples: `/work` ("Proof, across
   engagement types" + intro), `/faq` ("Questions, answered" + intro), `/team` ("Who's behind it" +
   intro). Worse, **`/patents` carries a whole prose `"The technology"` section (two paragraphs) and a
   licensing CTA** *on top of* the `patents` array, and **`/services` carries an intro, per-group
   blurbs, and (further down) a "How engagements work" steps array** on top of the `services` cards.
   So "`/patents` and `/services` are zero-drift data pages" is **false** — their bodies are, but their
   surrounding prose is not. A faithful mirror must either pull that prose from somewhere typed or
   accept dropping it. §4 sets the policy.
3. **Prose-in-JSX (no typed body at all)** — copy is entirely hand-written in markup: the home `Hero`
   ("We build and run software — ours and yours." + tagline), `app/about/page.tsx` ("Who's behind it"),
   `app/contact/page.tsx`, **`app/products/newsnook/page.tsx`** (pure prose), and **`app/products/page.tsx`**
   (an *inline* `const products: Product[]` for NewsNook + Verbaly, plus header prose — not read from
   any `lib/` constant). The legal pages are a sub-case: their source of truth is HTML on disk
   (`lib/legal/*.html`), convertible deterministically.

The frontmatter `title`/`description` are the one piece always available in a typed-ish form: every
page except home calls `pageMeta({ title, description, path })` (`lib/seo.ts`), so the generator can
seed frontmatter from the same strings the `<head>` uses. **Home is the exception** — it uses the
layout's default metadata plus an inline canonical (`app/page.tsx`), so home needs bespoke handling for
both frontmatter and its `rel="alternate"` (see §5).

§4 makes the recommendation for shapes (2) and (3).

## 3. Approach — middleware rewrite + a Markdown Route Handler

Two pieces:

1. **`middleware.ts`** — intercept requests whose pathname ends in `.md`, strip the suffix, validate
   the remaining path against the known page set, and **rewrite** (not redirect — URL stays `/x.md`)
   to an internal Route Handler that emits Markdown.
2. **A Markdown Route Handler** at `app/api/md/[[...path]]/route.ts` — resolves the cleaned path to a
   page, builds the Markdown via the content→md module (§4), and returns it as `text/markdown`.

### 3.1 Why middleware + internal route (vs. a public catch-all)

We deliberately keep the `.md` interception in middleware and the generation behind `/api/md/*` rather
than mounting a public `app/[...path]/route.ts`. A public root catch-all competes with every real page
route and is conflict-prone (see §6). Middleware runs *before* routing, so it can cheaply pattern-match
`*.md` and hand off, leaving the App Router's page tree untouched.

### 3.2 Middleware sketch (illustrative)

```ts
// middleware.ts
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // matcher guarantees pathname ends in ".md" and is not a reserved file (see config).
  const clean = pathname.slice(0, -3) || "/"; // "/services.md" -> "/services", "/.md" -> "/"
  const url = req.nextUrl.clone();
  url.pathname = `/api/md${clean === "/" ? "/index" : clean}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Only paths ending in .md, and never the reserved system/special files.
  matcher: [
    "/((?!_next/|api/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|txt|xml|woff2?|map)$).*)\\.md$",
  ],
};
```

Key points on the `matcher`:

- It **only** fires on `*.md`. Everything else skips middleware entirely (no per-request cost on normal
  traffic — see §6 perf).
- The negative lookahead excludes `_next/*`, `api/*`, and static asset extensions. Critically it
  excludes `.txt` and `.xml`, so the already-shipped **`robots.txt`, `sitemap.xml`, `llms.txt`, and
  `llms-full.txt` are never touched** (none end in `.md` anyway, but the exclusion is belt-and-suspenders
  and documents intent). If a future special file ever ends in `.md`, add it to the lookahead.
- Path **validation happens in the Route Handler**, not the matcher — the regex only does coarse
  filtering; the authoritative "is this a real page?" check is the page registry (§3.4). The handler
  returns 404 for unknown paths.

### 3.3 Markdown Route Handler sketch (illustrative)

```ts
// app/api/md/[[...path]]/route.ts
import { NextResponse } from "next/server";
import { renderPageMarkdown, isMirrorablePath } from "@/lib/md/registry";

export const dynamic = "force-static"; // see §6 caching

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await ctx.params;
  const route = "/" + (path ?? []).join("/"); // "/index" -> normalize to "/"
  const resolved = route === "/index" ? "/" : route;

  if (!isMirrorablePath(resolved)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const md = await renderPageMarkdown(resolved);
  return new NextResponse(md, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
```

`generateStaticParams` can enumerate the static + known dynamic slugs so the mirrors are baked at build
time alongside the pages (mirrors the `force-static` choice in §6).

### 3.4 Path → page resolution (the registry)

A single `lib/md/registry.ts` is the authoritative map from a cleaned path to a renderer. It is the one
place that knows which paths are mirror-able, so the matcher stays dumb and the handler stays thin.

```ts
// lib/md/registry.ts (illustrative shape)
type Renderer = () => string | Promise<string>;

const staticPages: Record<string, Renderer> = {
  "/": renderHome,
  "/services": renderServices,
  "/work": renderWorkIndex,
  "/products": renderProducts,
  "/products/newsnook": renderNewsnook,
  "/about": renderAbout,
  "/patents": renderPatentsIndex,
  "/contact": renderContact,
  "/faq": renderFaq,
  "/team": renderTeamIndex,
  "/privacy-policy": () => renderLegal("privacy"),
  "/terms": () => renderLegal("terms"),
};

// dynamic: "/work/<slug>" -> caseStudies; "/team/<slug>" -> team
```

Resolution order: exact match in `staticPages`; else match `"/work/:slug"` against `caseStudies`,
`"/team/:slug"` against `team`. No match → not mirror-able → 404. `generateStaticParams` derives its
list from these same sources so the build and the runtime check can't drift.

**Share the path list with `sitemap.ts` — don't fork it.** `app/sitemap.ts` already hard-codes the
authoritative static-route list (the same 12 static paths above) plus `caseStudies` and `team`, and
already encodes the one intentional exclusion (`/patents/[slug]` — "those URLs redirect to Google
Patents, so they're redirects, not indexable content"). If the registry copies that list, we now have
**two** path lists to keep in sync, and the failure mode is silent: add a page, update the sitemap,
forget the registry → the page has no `.md` (or vice versa). **Recommendation:** lift the static-path
list into one small module — e.g. `lib/routes.ts` exporting `staticPaths` (and the
`patentsDetailExcluded` intent) — and have `sitemap.ts`, the registry, `isMirrorablePath`,
`generateStaticParams`, *and* the `rel="alternate"` emission all consume it. The sitemap keeps its
per-route `priority`/`changeFrequency` (mirror-irrelevant) locally; only the canonical *path set* is
shared. A test then asserts the two can't diverge (§8).

## 4. The content → Markdown module (`lib/md/`)

This is the heart of the work. The goal is one shared serializer so both the full mirror and the
per-page mirrors agree on "how a case study becomes Markdown," etc. **Reality check on the starting
point:** `app/llms-full.txt/route.ts` does *not* currently expose reusable helpers — it builds its
output with an inline `p()` push-to-array closure and returns `text/plain` (not `text/markdown`). So
this is a genuine **refactor of an already-shipped artifact**, not a clean "lift out existing helpers."

Two consequences to plan for:

- **Retrofitting `llms-full.txt` to the new `lib/md/` serializer can change its shipped byte output**
  (heading style, spacing, list joins). That route is live and crawled. Either (a) keep its output
  byte-identical and add a snapshot test that pins it (§8), or (b) **don't retrofit it in Phase 1** —
  build `lib/md/` fresh for the per-page mirrors and migrate `llms-full.txt` onto it later as a separate,
  separately-verified change. **Decision (§12): (b)** — build `lib/md/` fresh in Phase 1; migrate
  `llms-full.txt` onto it in Phase 2 behind a snapshot test, decoupling the new feature from touching a
  shipped artifact.
- Per-page output is **`text/markdown`** with a YAML frontmatter block; `llms-full.txt` stays
  **`text/plain`**. Same serializer core, different envelope.

Each page renderer returns a string with a small YAML frontmatter block (`title`/`description` seeded
from that page's `pageMeta`; `url` is the canonical page URL) plus the body.

```md
---
title: Services
description: Hire Trevillyan Labs to build custom software...
url: https://www.trevillyanlabs.io/services
---

# Hire the studio — to build, or to advise.

...
```

### 4.1 Data-driven pages — mostly zero-drift, do these first

These read the typed layer directly for their **body**. Editing `content.ts`/`patents.ts`/`team.ts`
updates the page and its mirror together. Caveat per §2: each also has a hand-written `PageHeader`
(`eyebrow`/`title`/`intro`), and two have extra prose.

**Header-prose policy (Phase 1):** for the frontmatter `title`/`description`, reuse the page's
`pageMeta` strings (already typed, already in `<head>`). For the visible H1, reuse the same `title`.
**Do not** try to mirror the short `eyebrow`/`intro` lines by reading them out of JSX — either
synthesize a one-line lead from `pageMeta.description`, or (cleaner, and the right call for any intro
that carries real citation value) lift the header strings into the shared typed constants as part of
the §4.2 Option-A work. The short eyebrow/intro lines are low-stakes to approximate; the *section* prose
on `/patents` and `/services` is not (see below).

- **`/work`** ← `caseStudies` (index: title, tag, summary). **`/work/<slug>`** ← the full record
  (problem, approach, outcome list, role, liveUrl). The detail page also renders an image `gallery` and
  a generic "Have something like this to build?" CTA — **omit both** from the `.md` (images and
  boilerplate CTAs aren't citation signal). Genuinely clean — best first target.
- **`/faq`** ← `faqs` (q/a) — high-value for AEO; renders as a clean Q/A list. Clean.
- **`/team`** ← `team` (index, currently one member). **`/team/<slug>`** ← the member record (name,
  title, bio, links). Clean body; note the index largely duplicates `/about` and the single detail page
  — fine, but low marginal value.
- **`/patents`** ← `patents` (number, title, published, summary, `sourceUrl`). **Not pure zero-drift:**
  the page also has a prose `"The technology"` section and a licensing CTA that are *not* in the
  `patents` array. To mirror faithfully, lift that section's copy into a typed constant (Option A) — so
  `/patents` is partly a §4.2-style lift, not a free data render. (Also: both patent records currently
  share an *identical* generic `bodyHtml` abstract; render the per-patent `summary` + `sourceUrl`, not
  two copies of the same `bodyHtml`.) The patent *detail* pages redirect out — see §6/§7.
- **`/services`** ← `services` (group, title, summary, `whatYouGet`, `start`), rendered grouped by
  Build/Advise. **Hybrid, not zero-drift:** the page also has an intro, per-group blurbs, and a "How
  engagements work" steps array, all in JSX. **Decision (§12):** Phase 1 ships `/services.md` with the
  **service cards only** (the body notes the omission); the intro/blurbs/steps arrive in Phase 2 with the
  Option-A lift. The cards are the core offering data, so they ship early and the page completes later.

### 4.2 Prose-in-JSX pages — the problem & recommendation

Home hero, About, Services intro/steps, Contact, **`/products` (its inline `products` array + header),
`/products/newsnook` (pure prose)**, and the legal pages keep copy inside markup. `/products` and
`/products/newsnook` were unassigned in the first draft — they belong here, in Phase 2: `/products`
needs its inline `const products` array lifted into a typed constant (Option A), and `/products/newsnook`
is straight prose. (Note `/products` partly overlaps `/work` — Verbaly — and `/products/newsnook`.)

**Options considered:**

| Option | Drift risk | Effort | Notes |
|---|---|---|---|
| **A. Lift prose into typed content constants** that both the JSX and the `.md` generator consume | **None** — one source | Medium (one-time refactor of a handful of pages) | E.g. `lib/content/pages.ts` exporting `home.hero`, `about.whoBehindIt`, `services.intro`, `services.steps`, `contact.*` as typed strings/arrays. The JSX renders them; the generator serializes them. Matches the existing pattern (`offerings` in `site.ts`, the `groups`/steps arrays already inline in `services/page.tsx`). |
| B. Author standalone Markdown constants per prose page | **High** — two copies to keep in sync by hand | Low up front | The page JSX and the `.md` diverge silently on the next copy edit. Rejected for anything we expect to edit. |
| C. Skip prose pages initially; mirror only data-driven pages | None (nothing to drift) | Lowest | Ships the 80% AEO value fast; home/about/contact `.md` come later. |

**Recommendation:** **C now, A as the immediate follow-up.** Phase 1 ships the data-driven mirrors
(§4.1) — most of the citation value (work, FAQ, team, plus the `/services` cards and the `/patents`
list) with **zero or near-zero drift**. The only Phase-1 lift is `/patents`' "The technology" section
(small). Phase 2 does the rest of the Option-A lift (move hero/about/services-intro+steps/contact and
the `/products` inline array into typed `lib/content/pages.ts` constants the JSX and generator share, and
add `/products/newsnook`) so prose mirrors also stay drift-free. **Reject Option B outright** — duplicated hand-maintained Markdown is exactly the drift the
content layer exists to prevent (`content.ts` header; `code_conventions.md` "typed content over loose").
Legal pages are a special case: convert the existing `lib/legal/*.html` to Markdown at render time (a
deterministic HTML→md transform — they already are the source of truth), so they can ship in Phase 1 or
2 cheaply without a copy lift.

One-line summary: **mirror data-driven pages first (zero drift), then lift prose into shared typed
constants (Option A) so prose mirrors stay drift-free; never hand-duplicate Markdown (Option B).**

## 5. Discoverability of the mirrors

- **`<link rel="alternate" type="text/markdown" href="…md">`** in each page `<head>`. Add via the
  Metadata API in `lib/seo.ts` `pageMeta` — but **merge, don't replace**: `pageMeta` already returns
  `alternates: { canonical: url }`, so emit `alternates: { canonical: url, types: { "text/markdown": \`${url}.md\` } }`
  (note `url` is the already-built `${site.url}${path}`, so the href is `${url}.md`). **Two caveats:**
  - **Home is the exception.** `app/page.tsx` does *not* call `pageMeta` — it uses the layout's default
    metadata plus an inline `alternates: { canonical: site.url }`. Extending `pageMeta` won't touch
    home; its `rel="alternate"` must be added directly in `app/page.tsx`. And the naive `${url}.md`
    would yield `https://www.trevillyanlabs.io.md` (no separator), so home's mirror URL is set
    explicitly to **`${site.url}/index.md`** (decision §12), shipping in Phase 2.
  - **Only advertise a mirror that exists.** Emit `rel="alternate"` for a page *in the same phase its
    `.md` ships* — don't point at a `.md` that 404s or is a thin stub. Phase 1 pages get it in Phase 1;
    home/about/contact/products get it in Phase 2.
- **`llms.txt`** — **annotate it** (decision §12) with a single curated one-liner so a crawler reading
  the index knows the per-page mirrors exist — e.g. "Each page has a Markdown mirror at `<url>.md`." Keep
  `llms.txt` small; the one-line note is enough — do **not** enumerate every `.md` URL.
- **`sitemap.ts`** — **do not** add `.md` URLs as separate sitemap entries. The sitemap is for
  *indexable HTML*; the `.md` is an alternate representation, not a distinct page (avoid duplicate-content
  confusion). The `rel="alternate"` link is the correct discovery channel.

## 6. Alternatives considered & rejected

| Alternative | Verdict | Why |
|---|---|---|
| **Root catch-all Route Handler** `app/[...path]/route.ts` that serves `.md` | **Rejected** | A public catch-all competes with the entire page route tree and is fragile/conflict-prone — it can shadow real routes and ordering is hard to reason about. Middleware runs before routing and only touches `*.md`, leaving pages untouched. |
| **Build-time static `.md` files into `public/`** (a script that writes `public/services.md` etc.) | **Rejected as the mechanism** (but `force-static` gives us the same perf) | Two sources of truth for the path list (the generator + the file-writer), `.md` files in `public/` would need a build step and risk drift with routes; dynamic slugs (`/work/<slug>.md`) need enumeration anyway. The Route Handler with `dynamic = "force-static"` + `generateStaticParams` gets us statically-cached output **without** shipping generated files into the repo. |
| **Do nothing — rely on `llms-full.txt`** | **Rejected** | `llms-full.txt` is one big corpus; an engine that has a *specific* page URL still has to parse our HTML or pull the whole corpus. Per-URL `.md` is the citation-friendly primitive. Low incremental cost on top of the existing pattern. |

## 7. Edge cases & risks

- **Dynamic routes** (`/work/<slug>.md`, `/team/<slug>.md`): resolved via the registry against
  `caseStudies` / `team`. Unknown slug → 404 (same as the HTML route's `notFound()`).
- **Patent detail pages (`/patents/<slug>`) redirect out** (Next `redirect()` → HTTP 307) to Google
  Patents and render no first-party content. **Decision (§12): the `.md` mirror 404s** — there is no
  first-party Markdown to serve, and mirroring a redirect target we don't own is wrong. The `/patents.md`
  index (which lists our patents) is the useful mirror. The registry excludes these the same way
  `sitemap.ts` already does (the shared path module, §3.4).
- **404 for unknown `.md`** (e.g. `/nope.md`): registry miss → handler returns 404 `text/markdown` (or a
  short plain body). Must not 500.
- **Trailing slashes** (`/services/.md`, `/services.md/`): normalize in the matcher/handler — strip a
  trailing slash before lookup so `/services/.md` and `/services.md` resolve identically; reject odd
  forms with 404 rather than guessing.
- **Caching — `force-static` vs dynamic:** content is build-time static (no per-request data), so
  `dynamic = "force-static"` + `generateStaticParams` bakes mirrors at build and serves them from the
  CDN. Set `Cache-Control: s-maxage` + `stale-while-revalidate` as a backstop. Revalidate on deploy
  (new build regenerates).
- **Middleware perf on every request:** the `matcher` ensures middleware is **invoked only for `*.md`
  requests** — normal page/asset traffic never enters the middleware, so there is no added latency on
  the 99%+ of requests. The `.md` path itself is a cheap string-slice + rewrite.
- **Content-type/encoding:** always `text/markdown; charset=utf-8`. Watch for smart quotes / em dashes in
  the copy — serialize as UTF-8, don't HTML-entity-encode. The HTML→md path for legal/patent `bodyHtml`
  must decode entities (`&amp;` → `&`) and strip tags safely.
- **HTML→Markdown for `bodyHtml`/legal:** **Decision (§12): no new dependency — a tiny hand-rolled,
  whitelisted converter.** The inputs are simple and first-party (the patent `bodyHtml` is a single
  `<p>`; legal is richer but a small, fixed tag set), so a minimal deterministic transform covers them.
  Revisit a vetted lib only if the legal HTML proves too rich for a clean hand-rolled pass. Never inject
  untrusted HTML, and keep the converter strict (`security_checklist.md`).
- **Keeping the registry honest:** `sitemap.ts`, `generateStaticParams`, `isMirrorablePath`, and the
  `rel=alternate` emission must all derive from the **one shared path module** (§3.4), or a page could
  link to a `.md` that 404s — or the sitemap and the mirrors could disagree on which pages exist.
  Centralize the path list and add a consistency test (§8).
- **Existing security headers apply to `.md` too.** `next.config.ts` `headers()` matches `/:path*` in
  production (nosniff, `X-Frame-Options`, HSTS, a `frame-ancestors 'self'` CSP). These attach to the
  `.md` responses as well — harmless for `text/markdown` (and `nosniff` + an explicit `text/markdown`
  content-type is exactly right). No action needed; just don't be surprised to see them on `.md`.
- **Home `rel="alternate"` is bespoke** (see §5): home doesn't use `pageMeta`, so its markdown link and
  mirror URL (`/index.md`) are wired directly in `app/page.tsx`, in Phase 2.

## 8. Testing & verification

- **Build:** `pnpm build` (Next build, Biome, tsc) must pass with the new middleware + route; confirm
  `generateStaticParams` enumerates all mirror-able paths.
- **Manual curl (against `pnpm dev` or a preview):**
  - `curl -i http://localhost:3000/services.md` → `200`, `content-type: text/markdown`, sane body
    (Phase 1: service cards present; intro/steps may be absent until Phase 2 — see §4.1).
  - `curl -i http://localhost:3000/work/clip-automation.md` → `200`, includes problem/approach/outcome
    (`clip-automation` is a real `caseStudies` slug).
  - `curl -i http://localhost:3000/faq.md` → `200`, Q/A list.
  - `curl -i http://localhost:3000/nope.md` → `404`.
  - `curl -i http://localhost:3000/patents/fluid-detection-fabric-method-and-system.md` → `404`
    (per §7 decision) — confirm it does **not** redirect into the external URL.
  - `curl -i http://localhost:3000/products.md` and `…/products/newsnook.md` → `404` in Phase 1, `200`
    in Phase 2 (they ship with the prose lift).
  - `curl -i http://localhost:3000/index.md` (and `/.md`) → `200` only once home ships in Phase 2.
  - `curl -i http://localhost:3000/llms.txt`, `…/llms-full.txt`, `…/sitemap.xml`, `…/robots.txt` →
    unchanged (middleware must not have touched them).
- **Unit tests** for the markdown generator (`lib/md/`): given a fixture `CaseStudy`/`Service`/`Faq`,
  assert the serialized Markdown (frontmatter keys, headings, list rendering). Add a test asserting
  **every path in the registry round-trips** (registry path → renderer returns non-empty md) and that
  `isMirrorablePath`, `generateStaticParams`, **and `sitemap.ts`** all agree (modulo the documented
  `/patents/[slug]` exclusion) — i.e. they share the §3.4 path module.
- **`llms-full.txt` regression guard:** per the §4/§12 decision, `llms-full.txt` is **left untouched in
  Phase 1** (the mirrors get a fresh `lib/md/`). When it's migrated onto the shared serializer in Phase 2,
  add a snapshot test pinning its output so the refactor of a shipped, crawled artifact can't silently
  change it.
- **Lint/format:** Biome on all new files (`code_conventions.md`).

## 9. Rollout

- **Phase 1 (data-driven, near-zero-drift):** the shared path module (`lib/routes.ts`, §3.4), a fresh
  `lib/md/` serializer (built for the mirrors — **do not** retrofit `llms-full.txt` yet, §4),
  `middleware.ts`, `app/api/md/[[...path]]/route.ts`, registry, and renderers for `/work` (+`/work/<slug>`),
  `/faq`, `/team` (+`/team/<slug>`), the `/patents` index (with its "The technology" prose lifted to a
  typed constant), and the `/services` **service cards** (intro/steps deferred to Phase 2). Legal
  (`/privacy-policy`, `/terms`) via the HTML→md path. Add `rel=alternate` for these pages. Verify per §8.
- **Phase 2 (prose, Option A):** lift home/about/services-intro+steps/contact and the `/products` inline
  array into shared typed constants (`lib/content/pages.ts`); render their `.md` (incl. `/products/newsnook`);
  complete `/services.md`; wire home's bespoke `rel=alternate` + `/index.md`; add `rel=alternate` for the
  rest. Optionally migrate `llms-full.txt` onto the shared serializer here, behind its snapshot test (§8).
  No new infra — just renderers + the copy lift.
- **Flow:** branch off `staging` → PR → merge to `staging` for preview verification → promote to `main`
  (production) per `CONTRIBUTING.md`. **Not a launch blocker** (§1) — can ship after the Next.js cutover
  lands.
- **Docs:** in the implementing PR, bump `architecture.md` (add the middleware + `/api/md` surface),
  note the mirrors in `integrations.md`/AEO section if relevant, and flip this plan's `status:` to
  `accepted`/`done`.

## 10. Effort estimate

**~1.5–2.5 days** of focused work.

- Phase 1 (shared routes module + fresh `lib/md/` serializer + middleware + route + registry +
  data-driven renderers + `/patents` prose lift + legal HTML→md + tests + `rel=alternate`):
  **~1–1.5 days.**
- Phase 2 (prose lift into typed constants — home/about/services-intro+steps/contact/products — + their
  renderers + home's bespoke `rel=alternate` + optional `llms-full.txt` migration): **~0.5–1 day**,
  dominated by carefully moving approved copy without changing it.

Low risk: no new external services, no secrets, no schema/DB, fully static output, and the matcher
scopes middleware to `.md` only.

## 11. Implementation task checklist

- [ ] `lib/routes.ts`: single source of the mirror-able path set + the `/patents/[slug]` exclusion;
      refactor `app/sitemap.ts` to consume it (keeping its local priority/changeFreq) and fix its stale
      "301" comment → "307" (§12.1).
- [ ] `lib/md/serialize.ts`: fresh shared serializer for the per-page mirrors (do **not** retrofit
      `llms-full.txt` in Phase 1 — §4).
- [ ] `lib/md/registry.ts`: path → renderer map + `isMirrorablePath` + dynamic slug resolution, deriving
      its path set from `lib/routes.ts`.
- [ ] Data-driven renderers: work index, work detail, faq, team index, team detail, `/patents` index,
      and `/services` cards (read `content.ts`/`patents.ts`/`team.ts`).
- [ ] `/patents` "The technology" prose: lift to a typed constant the page JSX and renderer share.
- [ ] Legal renderer: HTML→Markdown for `lib/legal/{privacy,terms}.html`.
- [ ] `app/api/md/[[...path]]/route.ts`: `force-static`, `generateStaticParams`, 404 handling,
      `text/markdown` headers.
- [ ] `middleware.ts` with the `.md`-only `matcher` excluding `_next`/`api`/assets/special files.
- [ ] Extend `lib/seo.ts` `pageMeta` to emit `rel="alternate" type="text/markdown"` — **merge with the
      existing `alternates.canonical`**, don't replace it.
- [ ] (Phase 2) `lib/content/pages.ts`: lift home/about/services-intro+steps/contact + `/products` inline
      array to typed constants; update the JSX to consume them; add prose renderers + `/products/newsnook`.
- [ ] (Phase 2) Home `app/page.tsx`: bespoke `rel="alternate"` → `/index.md` (home doesn't use `pageMeta`).
- [ ] (Phase 2) migrate `llms-full.txt` onto the shared serializer behind a snapshot test (§12.2).
- [ ] Annotate `public/llms.txt` with a one-line "every page has a `.md` mirror" note (§12.6).
- [ ] Tests: serializer unit tests + registry/static-params/**sitemap** consistency test (+ `llms-full`
      snapshot if/when it's migrated).
- [ ] `pnpm build` + curl matrix (§8) green; Biome clean.
- [ ] Docs: update `architecture.md`; flip this plan's status; register in `DOC_INVENTORY.md`/`INDEX.md`.

## 12. Resolved decisions

All eight open questions were resolved by Bill on 2026-06-24 (proceed with every recommendation). They're
recorded here and folded into §§3–11 above. The plan's `status:` flips to `accepted`/`done` in the
implementing PR (§9).

1. **Patent detail `.md`** (`/patents/<slug>.md`) → **404.** No first-party body to serve; the registry
   excludes these the way `sitemap.ts` already does. Drive-by: fix the stale "301" comment in `sitemap.ts`
   to "307" (the HTML page uses `redirect()` → 307).
2. **`llms-full.txt` retrofit timing** → build `lib/md/` **fresh in Phase 1**; migrate the already-shipped
   `llms-full.txt` onto it in **Phase 2**, behind a snapshot test. Avoids changing a live artifact
   mid-feature.
3. **Phase 2 timing** → **ship Phase 1 (data-driven) first**, follow with prose in Phase 2. Two PRs, not
   one.
4. **`/services.md` in Phase 1** → **service cards only**; intro, group blurbs, and the "How engagements
   work" steps arrive in Phase 2 with the Option-A lift. The body notes the omission.
5. **Header/intro prose** → seed frontmatter + H1 from `pageMeta`; **don't** mirror the short
   `eyebrow`/`intro` lines in Phase 1 (synthesize a lead from the description). Lift header/section prose
   into typed constants only where it carries citation value — `/patents`' "The technology" section is
   lifted in Phase 1 regardless.
6. **`llms.txt` annotation** → **add** a single curated one-liner ("Each page has a Markdown mirror at
   `<url>.md`"); do not enumerate every `.md` URL.
7. **Home mirror URL** → **`/index.md`**, shipping in **Phase 2**. Wired directly in `app/page.tsx`
   (home doesn't use `pageMeta`).
8. **HTML→md dependency** → **no new dependency**; a tiny hand-rolled, whitelisted converter for the
   legal/patent HTML. Revisit a vetted lib only if the legal HTML proves too rich.
