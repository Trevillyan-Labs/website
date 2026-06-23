// UTM tagging for outbound links from trevillyanlabs.io.
//
// Conventions follow the org UTM standard — lowercase, underscores; always set
// utm_source and utm_medium. This mirrors NewsNook's tagging guide
// (NewsNook-docs/marketing/utm-campaign-tagging.md), the closest thing we have
// to a shared cross-site framework today. Keep param names and value styling in
// sync with that guide so attribution rolls up consistently across properties.

import { site } from "@/lib/site";

export type Utm = {
  /** Origin of the click. Defaults to this site's domain. */
  source?: string;
  /** Channel type — use "referral" for links between our own properties. */
  medium: string;
  /** Campaign name (lowercase_underscores). */
  campaign?: string;
  /** Placement / creative variant. */
  content?: string;
  /** Paid keyword / targeting term. */
  term?: string;
  /** Campaign / ad-buy id. */
  id?: string;
};

/** Append a consistent set of UTM parameters to an outbound URL. */
export function withUtm(url: string, utm: Utm): string {
  const u = new URL(url);
  const params: Record<string, string | undefined> = {
    utm_source: utm.source ?? site.domain,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
    utm_content: utm.content,
    utm_term: utm.term,
    utm_id: utm.id,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}
