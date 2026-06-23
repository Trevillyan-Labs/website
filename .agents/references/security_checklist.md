---
status: canonical
source_of_truth: true
last_verified: 2026-06-20
owner: bill
related_docs:
  - integrations.md
  - ../../SECURITY.md
---

# Security Checklist

Security requirements and secret-handling rules for the website repo. This is a public-facing
marketing site with one serverless form — the attack surface is small, but secret hygiene and form
abuse are real.

## Secret handling (hard rules)

- **Never commit secrets.** All real credentials are runtime/deploy-platform (Vercel) config.
- **Public vs. secret keys:**

  | Value | Type | Where it lives |
  |---|---|---|
  | `TURNSTILE_SECRET_KEY` | **secret** | Vercel env only |
  | `GMAIL_USER`, `GMAIL_APP_PASSWORD` | **secret** | Vercel env only |
  | `CONTACT_EMAIL`, `SITE_URL` | config | Vercel env |
  | Turnstile **site key** | public (by design) | in page HTML / client |
  | PostHog **public project key** | public (by design) | env-config, injected client-side |
  | PostHog personal API key (if used in scripts) | **secret** | Vercel env / local only |

- **Known cleanup item:** the Mixpanel token is currently committed in
  `js/analytics/analytics-config.js`. The PostHog migration (ADR-0002) moves all analytics keys to
  env-config; remove committed keys then.
- Follow the global secret-handling rules in the user brief: never echo a secret to stdout/transcript;
  pipe secret reads straight into the consuming command.

## Contact form (`api/contact.js` → future Route Handler)

Current protections (keep through the rebuild):
- Cloudflare **Turnstile** server-side verification before sending.
- **`escapeHtml`** on user input rendered into the email body.
- Server-only secrets; env var presence checked.

Add in the rebuild:
- **Rate limiting** on the endpoint (per-IP).
- **Honeypot** field + timing check.
- **Input validation** (length caps, email format, required consent) server-side, not just client.
- Verify `Origin`/method; reject non-POST.

## HTTP & headers (target)

- Security headers via `next.config` / Vercel: **CSP**, `Strict-Transport-Security`,
  `X-Content-Type-Options`, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`,
  `Permissions-Policy`.
- HTTPS only; no mixed content (all assets local or HTTPS).

## Privacy & analytics

- PostHog config should respect privacy (mask sensitive inputs in session replay if enabled; consider
  EU hosting / cookieless where appropriate).
- Update the privacy policy + terms for the PostHog sub-processor when analytics migrates
  (`strategy/content_plan.md`).

## Content safety

- No confidential client terms, pricing, or prospect-stage work in any committed file or published
  page (`docs/company/identity-and-positioning.md §Confidentiality`).
- Publish only docs-supported facts — no invented credentials or metrics.
- **Assume everything published is permanent and AI-trainable.** Per `decisions/ADR-0004`, the site
  intentionally allows AI crawlers (training + answer/search), so published content may enter model
  training corpora and can't be fully clawed back. This makes the two rules above non-negotiable —
  publish only public, accurate, non-confidential content.

## Vulnerability reporting

See `../../SECURITY.md` — private disclosure to `bill@trevillyanlabs.io`.
