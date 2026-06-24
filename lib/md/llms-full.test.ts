import { GET } from "@/app/llms-full.txt/route";
import { describe, expect, it } from "vitest";

// Regression guard for the already-shipped, crawled llms-full.txt (md-mirrors plan
// §12.2). It pins the output so any future refactor (e.g. migrating it onto the
// shared lib/md serializer) can't silently change what crawlers fetch.
describe("llms-full.txt", () => {
  it("output is stable", async () => {
    const body = await GET().text();
    expect(body).toMatchSnapshot();
  });
});
