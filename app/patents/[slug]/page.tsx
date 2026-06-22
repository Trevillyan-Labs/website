import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/app/_components/container";
import { patents } from "@/lib/patents";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return patents.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const patent = patents.find((p) => p.slug === slug);
  if (!patent) return {};
  return pageMeta({
    title: patent.title,
    description: patent.summary,
    path: `/patents/${patent.slug}`,
  });
}

export default async function PatentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const patent = patents.find((p) => p.slug === slug);
  if (!patent) notFound();

  return (
    <>
      <section className="bg-[var(--color-hero)] text-white">
        <Container className="pb-14 pt-28 sm:pt-32">
          <Link href="/patents" className="text-[13px] text-[var(--color-hero-accent)] hover:text-white">
            ← Patents
          </Link>
          <p className="mt-5 font-mono text-[13px] text-[var(--color-hero-accent)]">{patent.number}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">
            {patent.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-[var(--color-muted-2)]">{patent.summary}</p>
          <p className="mt-3 text-[13px] text-[var(--color-hero-muted)]">Published {patent.published}</p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={patent.image}
              alt={patent.title}
              className="w-full rounded-xl border border-[var(--color-line)] object-cover"
            />
            <div>
              <div
                className="legal"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted patent abstract
                dangerouslySetInnerHTML={{ __html: patent.bodyHtml }}
              />
              <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
                <a href={patent.sourceUrl} className="font-medium text-brand hover:text-brand-hover">
                  View on Google Patents →
                </a>
                <Link
                  href={`/team/${patent.authorSlug}`}
                  className="font-medium text-muted hover:text-ink"
                >
                  Inventor: {patent.authorName}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
