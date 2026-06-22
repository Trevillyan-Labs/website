import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This worktree sits inside the parent repo's checkout; pin the tracing root here
  // so Next doesn't pick up the legacy package-lock.json one level up.
  outputFileTracingRoot: import.meta.dirname,
  // URL-parity redirects for legacy pages are added in a later phase (ADR-0003).
};

export default nextConfig;
