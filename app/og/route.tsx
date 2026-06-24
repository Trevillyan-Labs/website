import { ImageResponse } from "next/og";

// Dynamic, branded Open Graph image. Driven by query params so every page can
// have a title-specific card via lib/seo.ts (pageMeta). Not under /api/ so it
// isn't blocked by robots.txt. Example: /og?title=Case%20studies
export const runtime = "nodejs";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Trevillyan Labs").slice(0, 120);
  const kicker = (searchParams.get("kicker") ?? "TREVILLYAN LABS").slice(0, 60);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0b1220",
        padding: 90,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 6, color: "#5aa9ff", fontWeight: 700 }}>
        {kicker}
      </div>
      <div
        style={{
          fontSize: 70,
          color: "#ffffff",
          fontWeight: 600,
          marginTop: 28,
          lineHeight: 1.08,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
