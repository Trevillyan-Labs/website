import { readFileSync } from "node:fs";
import { join } from "node:path";

// Faithful legal copy, extracted from the original Webflow export's rich-text
// containers (lib/legal/*.html). Edit the source fragments, not the markup here.
export function legalHtml(name: "privacy" | "terms"): string {
  return readFileSync(join(process.cwd(), "lib", "legal", `${name}.html`), "utf8");
}
