# Trevillyan Labs — Website

The marketing site for **Trevillyan Labs**, an independent software studio that ships custom software for clients, operates its own products (NewsNook), and advises founders and early-stage startups on product and go-to-market execution. The site's primary job is to get visitors to **hire the studio**; owned products appear as credibility proof and link out to their own sites. CMS-style content is provided by `data/*.json` and rendered client-side; the contact form posts to a Vercel serverless function and is protected by Cloudflare Turnstile against bots.

> **🚧 Mid-revamp.** This README documents the **current** site — a Webflow static export. The site is being re-narrated and rebuilt on **Next.js + TypeScript + Tailwind** to reflect what Trevillyan Labs does today. See **[`REVAMP-PLAN.md`](REVAMP-PLAN.md)** for the plan and **[`.agents/references/decisions/`](.agents/references/decisions/)** for the decisions behind it.

## For AI agents & contributors

- **Agent operating contract:** [`CLAUDE.md`](CLAUDE.md) (and [`AGENTS.md`](AGENTS.md)).
- **Agent context (progressive disclosure):** [`.agents/README.md`](.agents/README.md) → start at [`.agents/references/INDEX.md`](.agents/references/INDEX.md).
- **Strategy / marketing exercise:** vision, personas, journeys, content plan, brand guide under [`.agents/references/strategy/`](.agents/references/strategy/).
- **Branch / commit / PR conventions:** [`CONTRIBUTING.md`](CONTRIBUTING.md). **Security:** [`SECURITY.md`](SECURITY.md).
- **What Trevillyan Labs does (canonical):** the company `docs` repo, `company/identity-and-positioning.md`.

---

## Quick start

```bash
npm install
npm run build
npx serve .
```

Then open the root URL (e.g. http://localhost:3000). The site must be served over HTTP so `fetch()` can load the JSON data; `file://` won’t work.

---

## Running locally

Serve the folder over HTTP so `fetch()` can load the JSON data (file:// won’t work). Examples:

- **Node:** `npx serve .` or `npx http-server` → open the root URL (e.g. http://localhost:3000)
- **Python:** `python3 -m http.server 8000` → http://localhost:8000
- **VS Code:** “Live Server” extension → “Open with Live Server”

---

## CMS data implementation

Content is driven by JSON in `data/` and `js/cms-render.js`.

### Data files

| File | Purpose |
|------|--------|
| `data/patents.json` | Patent list and detail content |
| `data/team_members.json` | Team list and detail content |

Edit these files directly. Date fields use format `"Mon D, YYYY"` (e.g. `"Oct 17, 2023"`).

### Build step (sitemap)

After editing the JSON files, run **`npm run build:data`** to regenerate `sitemap.xml`. For a different base URL (e.g. staging): `SITE_URL=https://staging.example.com npm run build:data`. Default base URL is `https://www.trevillyanlabs.io`.

### How it works

- **List pages** (`index.html`, `patents.html`, `team.html`): `cms-render.js` loads the JSON, clones the `.w-dyn-item` template per row, fills text/images, and sets card links to the detail page with `?slug=...`. Homepage shows the first 3 patents; patents and team pages show all.
- **Detail pages** (`detail_patents.html`, `detail_team.html`): Script reads `?slug=` from the URL (or path on Vercel), finds the item by `Slug`, and fills the template. Patent detail resolves “Author (Team Member)” to a team member name and link. Team detail hides social buttons when the corresponding link is missing or empty in JSON.

### Adding or editing content

1. Edit `data/patents.json` or `data/team_members.json`.
2. Run `npm run build:data` to refresh the sitemap.
3. Reload the site in the browser.

---

## Header and footer components

Header and footer are shared: edit `components/header.html` and `components/footer.html`, then run **`npm run build:html`** to inject them into the root HTML. Placeholders like `{{HEADER_PATENTS_CUR}}` mark the current page (e.g. “Patents” active).

- **Source pages:** `src/*.html` contain `<!-- INCLUDE components/header.html -->` and `<!-- INCLUDE components/footer.html -->`. The build replaces these with the component contents and writes the result to the repo root. Deploy the root HTML files; don’t edit them for header/footer changes.
- **Full rebuild:** `npm run build` runs both `build:data` and `build:html`.

### When to run init

Regenerate `src/` only when you add a new page that should use the shared header/footer, or when you change the structure of the header/footer block and need to re-slice. Pages without the standard layout (e.g. `401.html`, `404.html`, `detail_patents.html`, `detail_team.html`) are skipped by init and remain static.

```bash
npm run build:html -- --init
```

Then run `npm run build:html` to inject components again.

---

## Project structure

```
website/
├── index.html, team.html, patents.html, contact.html
├── detail_patents.html, detail_team.html   # CMS detail templates
├── privacy-policy.html, terms.html, 404.html, 401.html
├── sitemap.xml                             # Generated by npm run build:data
├── api/
│   └── contact.js                          # Vercel serverless (contact form)
├── components/
│   ├── header.html
│   └── footer.html
├── src/                                    # Page sources (INCLUDE placeholders); generated by build:html --init
├── data/
│   ├── patents.json
│   └── team_members.json
├── scripts/
│   ├── build-data.js                       # Writes sitemap.xml from data/*.json
│   ├── inject-components.js               # Injects header/footer: src → root HTML
│   └── migrate-webflow-assets.js          # Optional: download Webflow CDN assets locally
├── css/                                    # normalize, webflow, trevillyan-labs.webflow
├── js/
│   ├── webflow.js
│   ├── cms-render.js                       # Injects CMS data into lists and detail pages
│   └── analytics/                          # Analytics / third-party (Mixpanel, LogRocket, Hotjar)
│       ├── analytics-config.js            # Single config: IDs and options for all tools
│       ├── mixpanel.js                    # Mixpanel loader + init
│       ├── logrocket.js                   # LogRocket load + init + identify
│       ├── hotjar.js                       # Hotjar init
│       └── mixpanel-events.js             # Element → event mapping and scroll tracking
├── images/
├── vercel.json                             # Rewrites, redirects, build command
├── package.json
└── README.md
```

---

## Deploying to Vercel

1. From project root: `vercel`, or connect the GitHub repo at [vercel.com](https://vercel.com).
2. **Environment variables** (Project Settings → Environment Variables):
   - **`SITE_URL`** — Production URL (e.g. `https://www.trevillyanlabs.io`) for the sitemap.
   - **Contact form** (`api/contact.js`):
     - **`GMAIL_USER`** — Gmail address used to send mail
     - **`GMAIL_APP_PASSWORD`** — [App password](https://support.google.com/accounts/answer/185833) (2FA required)
     - **`CONTACT_EMAIL`** — Optional; defaults to `GMAIL_USER` (e.g. use `bill@trevillyanlabs.io` if different)
     - **`TURNSTILE_SECRET_KEY`** — [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) secret key for server-side verification. Create a widget in the dashboard, add your domain, and copy the secret key. The **site key** is embedded in the contact page HTML (`src/contact.html`; replace the test key `1x00000000000000000000AA` with your production site key for production).

---

## Tech stack

- **Frontend:** Static HTML/CSS/JS (Webflow export). Layout and styling: `css/normalize.css`, `css/webflow.css`, `css/trevillyan-labs.webflow.css`. Interactivity: `js/webflow.js`, jQuery.
- **Content:** JSON in `data/` (patents, team) rendered client-side by `js/cms-render.js`. No CMS backend; edit JSON and run `npm run build:data` to refresh the sitemap.
- **Build:** Node scripts in `scripts/` — `build-data.js` (sitemap from JSON), `inject-components.js` (header/footer into pages), optional `migrate-webflow-assets.js` (localize CDN assets).
- **Hosting:** Static site on Vercel; rewrites in `vercel.json` for clean URLs. Contact form: serverless `api/contact.js` (Node, Nodemailer, Gmail SMTP).
- **Fonts:** Google Fonts (Ubuntu) from `fonts.googleapis.com`.
- **Analytics / third-party:** Mixpanel, Hotjar, LogRocket. All IDs and options live in **`js/analytics/analytics-config.js`**; event mapping and scroll tracking in **`js/analytics/mixpanel-events.js`**. Update or remove there if the project/domain changes.
- **Assets:** All site images (homepage patent block, hero/backgrounds, OG/Twitter meta images, data-driven patent and team images) use local paths under `images/`; no Webflow CDN or external image URLs.
