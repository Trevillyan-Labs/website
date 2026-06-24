import {
  renderFaq,
  renderLegal,
  renderPatentsIndex,
  renderServices,
  renderTeamDetail,
  renderTeamIndex,
  renderWorkDetail,
  renderWorkIndex,
} from "@/lib/md/renderers";
import { isMirrorablePath, listMirrorablePaths } from "@/lib/routes";

// Path → renderer map. The set of static keys here must match the `mirror: true`
// static routes in lib/routes.ts (asserted by lib/routes.test.ts) so the matcher,
// generateStaticParams, and rel=alternate can never disagree about what exists.
const staticRenderers: Record<string, () => string> = {
  "/services": renderServices,
  "/work": renderWorkIndex,
  "/patents": renderPatentsIndex,
  "/faq": renderFaq,
  "/team": renderTeamIndex,
  "/privacy-policy": () => renderLegal("privacy"),
  "/terms": () => renderLegal("terms"),
};

function normalize(path: string): string {
  if (path === "" || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Render the Markdown for a cleaned page path, or null if it isn't mirror-able. */
export function renderPageMarkdown(path: string): string | null {
  const p = normalize(path);
  const renderStatic = staticRenderers[p];
  if (renderStatic) return renderStatic();
  const work = p.match(/^\/work\/([^/]+)$/);
  if (work) return renderWorkDetail(work[1]);
  const member = p.match(/^\/team\/([^/]+)$/);
  if (member) return renderTeamDetail(member[1]);
  return null;
}

export { isMirrorablePath, listMirrorablePaths };
