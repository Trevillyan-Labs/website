"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useRef } from "react";

// Analytics is opt-in via env (ADR-0002). With no key set, PostHog never loads
// — no network, no cookies — so the site ships safe and analytics turns on the
// moment NEXT_PUBLIC_POSTHOG_KEY is configured.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const ready = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY || ready.current) return;
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // captured manually on route change below
      capture_pageleave: true,
    });
    ready.current = true;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run on each route change to fire a pageview
  useEffect(() => {
    if (!KEY || !ready.current) return;
    posthog.capture("$pageview");
  }, [pathname]);

  return children;
}
