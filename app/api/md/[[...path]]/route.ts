import { isMirrorablePath, listMirrorablePaths, renderPageMarkdown } from "@/lib/md/registry";
import { NextResponse } from "next/server";

// Internal Markdown endpoint. Public requests arrive as `/<path>.md` and are
// rewritten here by middleware.ts (the URL stays `/<path>.md`). Build-time static:
// no per-request data, so mirrors are baked by generateStaticParams and served
// from the CDN. See .agents/references/engineering-plans/md-mirrors.md.
export const dynamic = "force-static";

export function generateStaticParams(): { path: string[] }[] {
  return listMirrorablePaths().map((p) => ({
    path: p === "/" ? ["index"] : p.replace(/^\//, "").split("/"),
  }));
}

function notFound(): NextResponse {
  return new NextResponse("Not found\n", {
    status: 404,
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path?: string[] }> },
): Promise<NextResponse> {
  const { path } = await ctx.params;
  const segments = (path ?? []).filter(Boolean);
  const route =
    segments.length === 0 || (segments.length === 1 && segments[0] === "index")
      ? "/"
      : `/${segments.join("/")}`;

  if (!isMirrorablePath(route)) return notFound();
  const md = renderPageMarkdown(route);
  if (md == null) return notFound();

  return new NextResponse(md, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
