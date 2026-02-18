/**
 * Reads data/patents.json and data/team_members.json and writes sitemap.xml.
 * Run: npm run build:data
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const baseUrl = (process.env.SITE_URL || 'https://www.trevillyanlabs.com').replace(/\/$/, '');

const patentsPath = path.join(dataDir, 'patents.json');
const teamPath = path.join(dataDir, 'team_members.json');

const patents = JSON.parse(fs.readFileSync(patentsPath, 'utf-8'));
const team = JSON.parse(fs.readFileSync(teamPath, 'utf-8'));

const patentsFiltered = Array.isArray(patents) ? patents.filter((p) => p.Slug && p['Invention Title']) : [];
const teamFiltered = Array.isArray(team) ? team.filter((t) => t.Slug && t.Name) : [];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlNode(loc, lastmod) {
  const date = lastmod || new Date().toISOString().slice(0, 10);
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${date}</lastmod>\n  </url>`;
}

const today = new Date().toISOString().slice(0, 10);
const staticPages = [
  '',
  'patents',
  'team',
  'contact',
  'privacy-policy',
  'terms',
];

const urls = [
  ...staticPages.map((p) => urlNode(p ? `${baseUrl}/${p}` : baseUrl + '/', today)),
  ...patentsFiltered.map((p) =>
    urlNode(`${baseUrl}/patents/${encodeURIComponent(p.Slug)}`, today)
  ),
  ...teamFiltered.map((t) =>
    urlNode(`${baseUrl}/team/${encodeURIComponent(t.Slug)}`, today)
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap);

console.log('Built sitemap.xml');
