# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in the Trevillyan Labs website, please report it
**privately** — do not open a public issue.

- Email: **bill@trevillyanlabs.io**
- Or use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
  on this repository.

Please include steps to reproduce, affected commits, and any relevant logs. We aim to acknowledge
reports within a few business days.

## Supported versions

The deployed `main` branch (production at https://www.trevillyanlabs.io) is the only supported
version. Security fixes ship to `main`.

## Scope & practices

This is a public marketing site with one serverless contact form (Cloudflare Turnstile + Gmail SMTP).
Engineering security requirements and the secret-handling rules — including which keys are **public
client** keys by design (Turnstile site key, PostHog public key) vs. genuine secrets that must never
be committed — live in
[`.agents/references/security_checklist.md`](.agents/references/security_checklist.md). Never commit
secrets; all build/deploy credentials are runtime/deploy-platform (Vercel) configuration.
