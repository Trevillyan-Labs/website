import { patents } from "@/lib/patents";
import { notFound, redirect } from "next/navigation";

export function generateStaticParams() {
  return patents.map((p) => ({ slug: p.slug }));
}

// Patents redirect straight to Google Patents (parity with the original site).
// The /patents/[slug] URL is preserved; visiting it forwards to the patent.
export default async function PatentRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const patent = patents.find((p) => p.slug === slug);
  if (!patent) notFound();
  redirect(patent.sourceUrl);
}
