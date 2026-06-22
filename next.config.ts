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
};

export default nextConfig;
