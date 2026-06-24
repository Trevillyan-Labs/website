"use client";

import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

// The Calendly booking link, with a `booking_click` analytics event. `location`
// identifies where on the site it was clicked (e.g. "contact_intro_card").
export function BookingLink({
  location,
  className,
  children,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("booking_click", { location })}
    >
      {children}
    </a>
  );
}
