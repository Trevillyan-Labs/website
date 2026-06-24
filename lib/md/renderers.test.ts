import {
  renderAbout,
  renderContact,
  renderFaq,
  renderHome,
  renderLegal,
  renderNewsnook,
  renderPatentsIndex,
  renderProducts,
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

  it("includes the intro and the engagement steps (Phase 2)", () => {
    const md = renderServices();
    expect(md).toContain("## How engagements work");
    expect(md).toContain("Tell us what you need");
  });
});

describe("prose pages (Phase 2)", () => {
  it("renders home with frontmatter, what-we-do, and the operating model", () => {
    const md = renderHome();
    expect(md.startsWith("---\n")).toBe(true);
    expect(md).toContain("We build and run software — ours and yours.");
    expect(md).toContain("Run by a founder. Operated by an AI.");
  });

  it("renders about with the founder bio", () => {
    const md = renderAbout();
    expect(md).toContain("## Who's behind it");
    expect(md).toContain("Bill Trevillyan");
  });

  it("renders contact with the booking link", () => {
    expect(renderContact()).toContain("Prefer to talk it through?");
  });

  it("renders products with both products and plain links", () => {
    const md = renderProducts();
    expect(md).toContain("## NewsNook (Live in production)");
    expect(md).toContain("## Verbaly");
    expect(md).not.toMatch(/utm_/); // mirror uses plain destinations, no UTM tags
  });

  it("renders the NewsNook product page", () => {
    const md = renderNewsnook();
    expect(md).toContain("## Why it's here");
    expect(md).toContain("## At a glance");
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
