import {
  renderFaq,
  renderLegal,
  renderPatentsIndex,
  renderServices,
  renderWorkDetail,
} from "@/lib/md/renderers";
import { describe, expect, it } from "vitest";

describe("renderWorkDetail", () => {
  it("includes problem / approach / outcome and frontmatter", () => {
    const md = renderWorkDetail("clip-automation");
    expect(md).toBeTruthy();
    expect(md).toContain('title: "Clip Automation — Startup MVP"');
    expect(md).toContain("## The problem");
    expect(md).toContain("## The approach");
    expect(md).toContain("## The outcome");
  });

  it("returns null for an unknown slug", () => {
    expect(renderWorkDetail("nope")).toBeNull();
  });
});

describe("renderServices", () => {
  it("renders Build and Advise but not the Products service", () => {
    const md = renderServices();
    expect(md).toContain("## Build");
    expect(md).toContain("## Advise");
    expect(md).toContain("Contract software development");
    // The /services page does not render the Products group; the mirror matches.
    expect(md).not.toContain("Indie SaaS");
  });
});

describe("renderPatentsIndex", () => {
  it("includes the lifted technology prose and patent numbers", () => {
    const md = renderPatentsIndex();
    expect(md).toContain("## The technology");
    expect(md).toContain("US 11,788,918 B2");
    expect(md).toContain("## Licensing");
  });
});

describe("renderFaq", () => {
  it("renders questions as headings", () => {
    expect(renderFaq()).toContain("## What does Trevillyan Labs do?");
  });
});

describe("renderLegal", () => {
  it("converts legal HTML to tag-free Markdown with a title", () => {
    const md = renderLegal("privacy");
    expect(md).toContain("# Privacy Policy");
    expect(md).not.toMatch(/<[^>]+>/);
  });
});
