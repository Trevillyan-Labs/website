"use client";

import { track } from "@/lib/analytics";

// An outbound NewsNook link with a `newsnook_clickthrough` analytics event, so the
// product proof-point click is a first-class event rather than UTM-only. The href
// is passed in already UTM-tagged (via `withUtm`) — the event is additive, not a
// replacement. `location` identifies where on the site it was clicked (e.g.
// "footer", "products_page", "newsnook_spotlight").
export function NewsnookLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("newsnook_clickthrough", { location })}
    >
      {children}
    </a>
  );
}
