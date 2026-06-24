import { bullets, frontmatter, htmlToMarkdown } from "@/lib/md/serialize";
import { describe, expect, it } from "vitest";

describe("frontmatter", () => {
  it("emits a YAML block with quoted, escaped values", () => {
    const fm = frontmatter({
      title: "Terms: the legal bits",
      description: 'He said "hi" — really',
      url: "https://www.trevillyanlabs.io/terms",
    });
    expect(fm).toBe(
      [
        "---",
        'title: "Terms: the legal bits"',
        'description: "He said \\"hi\\" — really"',
        'url: "https://www.trevillyanlabs.io/terms"',
        "---",
      ].join("\n"),
    );
  });
});

describe("bullets", () => {
  it("renders a Markdown list", () => {
    expect(bullets(["a", "b"])).toBe("- a\n- b");
  });
});

describe("htmlToMarkdown", () => {
  it("converts paragraphs, lists, links, emphasis, and headings", () => {
    const html =
      '<h6>Heading</h6><p>Hello <strong>world</strong>, see <a href="https://x.io">x</a>.</p>' +
      '<ul role="list"><li>one</li><li>two</li></ul>';
    const md = htmlToMarkdown(html);
    expect(md).toContain("###### Heading");
    expect(md).toContain("Hello **world**, see [x](https://x.io).");
    expect(md).toContain("- one");
    expect(md).toContain("- two");
  });

  it("decodes entities and strips zero-width spacer paragraphs", () => {
    const md = htmlToMarkdown("<p>&quot;we&quot; &amp; us</p><p>‍</p><p>next</p>");
    expect(md).toContain('"we" & us');
    expect(md).toContain("next");
    expect(md).not.toContain("‍");
    // No empty paragraph should produce 3+ consecutive newlines.
    expect(md).not.toMatch(/\n{3,}/);
  });

  it("never leaves raw HTML tags behind", () => {
    expect(htmlToMarkdown("<p>clean <span>me</span></p>")).not.toMatch(/<[^>]+>/);
  });
});
