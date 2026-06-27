"use client";

import { track } from "@/lib/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// A Next.js Link that emits a `cta_click` PostHog event on click — the funnel
// step before the destination `$pageview`. `location` disambiguates same-labeled
// CTAs across the site (defaults to the current pathname); `label` defaults to
// the child text when it's a plain string. No-ops on analytics when no key is set.
export function CtaLink({
  href,
  location,
  label,
  className,
  children,
}: {
  href: string;
  location?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        track("cta_click", {
          label: label ?? (typeof children === "string" ? children : undefined),
          location: location ?? pathname,
          href,
        })
      }
    >
      {children}
    </Link>
  );
}
