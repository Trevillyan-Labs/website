import posthog from "posthog-js";

// Custom conversion events. No-ops unless NEXT_PUBLIC_POSTHOG_KEY is configured,
// mirroring the env-gated PostHogProvider — so it's safe to call from any client
// component and stays silent until analytics is turned on.
export function track(event: string, props?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, props);
}
