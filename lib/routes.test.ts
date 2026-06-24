import { renderPageMarkdown } from "@/lib/md/registry";
import { isMirrorablePath, listMirrorablePaths, staticRoutes, workSlugs } from "@/lib/routes";
import { describe, expect, it } from "vitest";

describe("mirror-able path consistency", () => {
  it("every mirror-able path resolves and renders non-empty Markdown", () => {
    const paths = listMirrorablePaths();
    expect(paths.length).toBeGreaterThan(0);
    for (const p of paths) {
      expect(isMirrorablePath(p), `isMirrorablePath(${p})`).toBe(true);
      const md = renderPageMarkdown(p);
      expect(md, `renderPageMarkdown(${p})`).toBeTruthy();
      expect(md?.startsWith("---\n"), `frontmatter for ${p}`).toBe(true);
    }
  });

  it("listMirrorablePaths static entries are all declared in staticRoutes", () => {
    const declared = new Set(staticRoutes.map((r) => (r.path === "" ? "/" : r.path)));
    const staticMirror = listMirrorablePaths().filter(
      (p) => !p.startsWith("/work/") && !p.startsWith("/team/"),
    );
    for (const p of staticMirror) expect(declared.has(p), p).toBe(true);
  });

  it("non-mirror pages are not mirror-able", () => {
    for (const p of ["/", "/about", "/contact", "/products", "/products/newsnook"]) {
      expect(isMirrorablePath(p), p).toBe(false);
      expect(renderPageMarkdown(p), p).toBeNull();
    }
  });

  it("patent detail pages are never mirror-able (they 307 out)", () => {
    expect(isMirrorablePath("/patents/fluid-detection-fabric-method-and-system")).toBe(false);
    expect(renderPageMarkdown("/patents/fluid-detection-fabric-method-and-system")).toBeNull();
  });

  it("unknown dynamic slugs are not mirror-able", () => {
    expect(isMirrorablePath("/work/does-not-exist")).toBe(false);
    expect(renderPageMarkdown("/work/does-not-exist")).toBeNull();
    expect(isMirrorablePath("/team/nobody")).toBe(false);
  });

  it("normalizes trailing slashes", () => {
    const slug = workSlugs()[0];
    expect(isMirrorablePath(`/work/${slug}/`)).toBe(true);
    expect(isMirrorablePath("/faq/")).toBe(true);
  });
});
