import { site } from "@/lib/site";

// Shared, dependency-free Markdown serialization for the per-page mirrors. Built
// fresh for this feature; llms-full.txt migrates onto it in Phase 2 behind a
// snapshot test (see .agents/references/engineering-plans/md-mirrors.md §4).

export type Frontmatter = { title: string; description: string; url: string };

// JSON string encoding is valid YAML for a double-quoted scalar and safely
// escapes colons, quotes, and unicode (em dashes, smart quotes).
function yamlString(s: string): string {
  return JSON.stringify(s);
}

export function frontmatter({ title, description, url }: Frontmatter): string {
  return [
    "---",
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `url: ${yamlString(url)}`,
    "---",
  ].join("\n");
}

export function mirrorUrl(path: string): string {
  return `${site.url}${path}`;
}

export function bullets(items: string[]): string {
  return items.map((i) => `- ${i}`).join("\n");
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
  hellip: "…",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

// Minimal, whitelisted HTML→Markdown for first-party legal/patent fragments.
// Inputs are fixed and trusted (lib/legal/*.html, patents.ts bodyHtml) — this is
// NOT a general-purpose HTML parser (md-mirrors plan §12.8: no new dependency).
export function htmlToMarkdown(html: string): string {
  let s = html;
  // Block structure comes from tags, not source whitespace.
  s = s.replace(/[\t\r\n]+/g, " ");
  // Inline links (before any tag stripping).
  s = s.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>(.*?)<\/a>/gi, (_, href, text) => {
    const label = text.replace(/<[^>]+>/g, "").trim();
    return `[${label}](${href})`;
  });
  // Inline emphasis.
  s = s.replace(/<\/?(?:strong|b)\b[^>]*>/gi, "**");
  s = s.replace(/<\/?(?:em|i)\b[^>]*>/gi, "*");
  // Line breaks.
  s = s.replace(/<br\s*\/?>/gi, "\n");
  // Headings → ATX, preserving relative depth.
  s = s.replace(/<h([1-6])\b[^>]*>(.*?)<\/h\1>/gi, (_, lvl, text) => {
    const hashes = "#".repeat(Math.min(6, Number(lvl)));
    return `\n\n${hashes} ${text.replace(/<[^>]+>/g, "").trim()}\n\n`;
  });
  // List items, then list containers.
  s = s.replace(
    /<li\b[^>]*>(.*?)<\/li>/gi,
    (_, text) => `\n- ${text.replace(/<[^>]+>/g, "").trim()}`,
  );
  s = s.replace(/<\/?(?:ul|ol)\b[^>]*>/gi, "\n\n");
  // Block containers → paragraph breaks.
  s = s.replace(/<\/(?:p|div|blockquote)>/gi, "\n\n");
  s = s.replace(/<(?:p|div|blockquote)\b[^>]*>/gi, "");
  // Drop any remaining tags, then decode entities (so we don't synthesize tags).
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  // Remove zero-width characters (Webflow used empty <p> spacers with a ZWJ).
  s = s.replace(/\u200B|\u200C|\u200D|\uFEFF/g, "");
  // Tidy whitespace: trim each line, collapse blank runs.
  s = s
    .split("\n")
    .map((l) => l.replace(/[ \t]{2,}/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return s;
}
