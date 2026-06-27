import { readdirSync } from "node:fs";
import { join } from "node:path";
import { CaseStudyGallery } from "@/app/_components/case-study-gallery";
import { Container } from "@/app/_components/container";
import { CtaLink } from "@/app/_components/cta-link";
import { JsonLd } from "@/app/_components/json-ld";
import { caseStudies } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { withUtm } from "@/lib/utm";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Any images dropped into public/images/work/<slug>/ become the case-study
// gallery automatically (no code change needed to add screenshots). An explicit
// `gallery` on the case study takes precedence.
function folderGallery(slug: string): string[] {
  try {
    const dir = join(process.cwd(), "public", "images", "work", slug);
    return readdirSync(dir)
      .filter((f) => /\.(webp|png|jpe?g|avif)$/i.test(f))
      .sort()
      .map((f) => `/images/work/${slug}/${f}`);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return pageMeta({
    title: `${study.title} — ${study.tag}`,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const gallery = study.gallery ?? folderGallery(study.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.summary,
          author: { "@type": "Organization", name: "Trevillyan Labs" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Case studies", item: `${site.url}/work` },
            {
              "@type": "ListItem",
              position: 3,
              name: study.title,
              item: `${site.url}/work/${study.slug}`,
            },
          ],
        }}
      />
      <section className="bg-[var(--color-hero)] text-white">
        <Container className="pb-14 pt-28 sm:pt-32">
          <Link
            href="/work"
            className="block w-fit text-[13px] text-[var(--color-hero-accent)] hover:text-white"
          >
            ← Work
          </Link>
          <span className="mt-8 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[var(--color-hero-accent)]">
            {study.tag}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-[var(--color-muted-2)]">{study.summary}</p>
          <p className="mt-3 text-[13px] text-[var(--color-hero-muted)]">{study.role}</p>
          {study.liveUrl ? (
            <a
              href={withUtm(study.liveUrl, {
                medium: "referral",
                campaign: "studio_site",
                content: "case_study",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-hover"
            >
              Visit {new URL(study.liveUrl).hostname.replace(/^www\./, "")} →
            </a>
          ) : null}
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          {study.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={study.image}
              alt={`${study.title} — ${study.tag}`}
              className="mb-14 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] object-cover"
            />
          ) : null}
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                The problem
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{study.problem}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                The approach
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{study.approach}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                The outcome
              </h2>
              <ul className="mt-3 space-y-2">
                {study.outcome.map((o) => (
                  <li key={o} className="flex gap-2 text-[15px] text-ink">
                    <span
                      className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {gallery.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
                A closer look
              </h2>
              <CaseStudyGallery images={gallery} title={study.title} />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-[var(--color-surface)]">
        <Container className="py-14 text-center">
          <h2 className="text-[1.4rem] font-medium text-ink">Have something like this to build?</h2>
          <CtaLink
            href="/contact"
            location="case_study_cta"
            className="mt-5 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            Work with us
          </CtaLink>
        </Container>
      </section>
    </>
  );
}
