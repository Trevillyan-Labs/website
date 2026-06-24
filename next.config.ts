import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This worktree sits inside the parent repo's checkout; pin the tracing root here
  // so Next doesn't pick up the legacy package-lock.json one level up.
  outputFileTracingRoot: import.meta.dirname,
  // URL parity (ADR-0003): preserve the legacy Webflow .html URLs.
  async redirects() {
    const map: [string, string][] = [
      ["/index.html", "/"],
      ["/contact.html", "/contact"],
      ["/patents.html", "/patents"],
      ["/team.html", "/team"],
      ["/privacy-policy.html", "/privacy-policy"],
      ["/terms.html", "/terms"],
      ["/detail_patents.html", "/patents"],
      ["/detail_team.html", "/team"],
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  // Security headers — production only (avoids HSTS/frame restrictions in dev,
  // which would block the local preview iframe).
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
