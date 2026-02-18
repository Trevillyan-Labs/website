/**
 * Injects components/header.html and components/footer.html into HTML pages.
 * Reads from src/*.html (with <!-- INCLUDE ... --> placeholders), writes to *.html in root.
 * Run: npm run build:html
 * To (re)create src/ from current root HTML: npm run build:html -- --init
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const componentsDir = path.join(rootDir, 'components');

const HEADER_MARKER = '<!-- INCLUDE components/header.html -->';
const FOOTER_MARKER = '<!-- INCLUDE components/footer.html -->';

const PAGES = [
  '401.html', '404.html', 'contact.html', 'detail_patents.html', 'detail_team.html',
  'index.html', 'patents.html', 'privacy-policy.html', 'team.html', 'terms.html'
];

const CURRENT_PAGE = {
  'index.html': { header: 'index', footer: 'index' },
  'patents.html': { header: 'patents', footer: 'patents' },
  'team.html': { header: null, footer: 'team' },
  'contact.html': { header: 'contact', footer: 'contact' },
  'detail_patents.html': { header: null, footer: null },
  'detail_team.html': { header: null, footer: null },
  'privacy-policy.html': { header: null, footer: null },
  'terms.html': { header: null, footer: null },
  '404.html': { header: null, footer: null },
  '401.html': { header: null, footer: null }
};

const cur = (page, slot) => (CURRENT_PAGE[page] && CURRENT_PAGE[page].header === slot) || (CURRENT_PAGE[page] && CURRENT_PAGE[page].footer === slot);
const aria = (v) => v ? ' aria-current="page"' : '';
const cls = (v) => v ? ' w--current' : '';

function getVars(filename) {
  const c = CURRENT_PAGE[filename] || {};
  const h = c.header;
  const f = c.footer;
  return {
    '{{HEADER_LOGO_ARIA}}': aria(h === 'index'),
    '{{HEADER_LOGO_CUR}}': cls(h === 'index'),
    '{{HEADER_PATENTS_ARIA}}': aria(h === 'patents'),
    '{{HEADER_PATENTS_CUR}}': cls(h === 'patents'),
    '{{HEADER_CONTACT_ARIA}}': aria(h === 'contact'),
    '{{HEADER_CONTACT_CUR}}': cls(h === 'contact'),
    '{{FOOTER_PATENTS_ARIA}}': aria(f === 'patents'),
    '{{FOOTER_PATENTS_CUR}}': cls(f === 'patents'),
    '{{FOOTER_TEAM_ARIA}}': aria(f === 'team'),
    '{{FOOTER_TEAM_CUR}}': cls(f === 'team'),
    '{{FOOTER_CONTACT_ARIA}}': aria(f === 'contact'),
    '{{FOOTER_CONTACT_CUR}}': cls(f === 'contact'),
    '{{FOOTER_LOGO_ARIA}}': aria(f === 'index'),
    '{{FOOTER_LOGO_CUR}}': cls(f === 'index')
  };
}

function substitute(template, vars) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) out = out.split(k).join(v);
  return out;
}

function findClosingDivs(html, afterIndex, count) {
  let pos = afterIndex;
  for (let i = 0; i < count; i++) {
    const next = html.indexOf('</div>', pos);
    if (next === -1) return pos;
    pos = next + 6;
  }
  return pos;
}

function init() {
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
  const headerStart = '<div class="nav-open-wrapper">';
  const navDivider = '<div class="nav-divider"></div>';
  const footerStart = '<div class="section footer">';

  for (const name of PAGES) {
    const filePath = path.join(rootDir, name);
    if (!fs.existsSync(filePath)) continue;
    let html = fs.readFileSync(filePath, 'utf-8');
    const fi = html.indexOf(footerStart);
    if (fi === -1) {
      console.log('Skip ' + name + ' (no footer)');
      continue;
    }
    const sectionEnd = html.indexOf('</section>', fi) + '</section>'.length;
    const endFooter = findClosingDivs(html, sectionEnd, 4);

    const hi = html.indexOf(headerStart);
    const hasHeader = hi !== -1;
    const nd = hasHeader ? html.indexOf(navDivider, hi) : -1;
    const hasNavDivider = nd !== -1;

    if (hasHeader && hasNavDivider) {
      const endHeader = findClosingDivs(html, nd + navDivider.length, 1);
      html = html.slice(0, hi) + HEADER_MARKER + '\n    ' + html.slice(endHeader, fi).trimStart() + '\n    ' + FOOTER_MARKER + '\n  ' + html.slice(endFooter);
    } else {
      html = html.slice(0, fi) + '\n    ' + FOOTER_MARKER + '\n  ' + html.slice(endFooter);
    }
    fs.writeFileSync(path.join(srcDir, name), html);
    console.log('Created src/' + name);
  }
  console.log('Init done. Run npm run build:html to inject components.');
}

function build() {
  if (!fs.existsSync(srcDir)) {
    console.log('Run with --init first to create src/ from current HTML.');
    process.exit(1);
  }
  let headerTemplate = fs.readFileSync(path.join(componentsDir, 'header.html'), 'utf-8');
  let footerTemplate = fs.readFileSync(path.join(componentsDir, 'footer.html'), 'utf-8');

  for (const name of PAGES) {
    const srcPath = path.join(srcDir, name);
    if (!fs.existsSync(srcPath)) continue;
    let html = fs.readFileSync(srcPath, 'utf-8');
    const vars = getVars(name);
    if (html.includes(HEADER_MARKER)) {
      html = html.replace(HEADER_MARKER, substitute(headerTemplate, vars));
    }
    if (html.includes(FOOTER_MARKER)) {
      html = html.replace(FOOTER_MARKER, substitute(footerTemplate, vars));
    }
    fs.writeFileSync(path.join(rootDir, name), html);
    console.log('Built ' + name);
  }
  console.log('Done.');
}

const initMode = process.argv.includes('--init');
if (initMode) init();
else build();
