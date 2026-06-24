import { type NextRequest, NextResponse } from "next/server";

// Serve a Markdown mirror of every (mirror-able) page at `/<path>.md`. The matcher
// fires ONLY on `*.md` requests, so normal page/asset traffic never enters here.
// We rewrite (not redirect) to the internal /api/md handler, leaving the URL as
// `/<path>.md` and the App Router page tree untouched.
// See .agents/references/engineering-plans/md-mirrors.md.
export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  if (!pathname.endsWith(".md") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  const clean = pathname.slice(0, -3) || "/"; // "/services.md" → "/services"; "/.md" → "/"
  const url = req.nextUrl.clone();
  url.pathname = `/api/md${clean === "/" ? "/index" : clean}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Scope middleware to `*.md` requests only — normal page/asset traffic never
  // enters here. The in-function guard is defense-in-depth (and excludes /api/).
  matcher: ["/(.*)\\.md"],
};
