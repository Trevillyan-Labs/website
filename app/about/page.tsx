import { Container } from "@/app/_components/container";
import { JsonLd } from "@/app/_components/json-ld";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { withUtm } from "@/lib/utm";
import Link from "next/link";

export const metadata = pageMeta({
  title: "About",
  description:
    "Trevillyan Labs is an independent software studio run by Bill Trevillyan — a product leader and 3x founder — and operated day-to-day with an AI assistant.",
  path: "/about",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bill Trevillyan",
  alternateName: "William Trevillyan",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: site.name, url: site.url },
  url: `${site.url}/about`,
  sameAs: ["https://www.linkedin.com/in/williamtrevillyan/", site.portfolioUrl],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <PageHeader
        eyebrow="About"
        title="A studio that runs on leverage, not headcount."
        intro="Trevillyan Labs is an independent software studio. We build and run our own products, ship software for clients, and advise founders on product and go-to-market execution."
      />

      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-[1.4rem] font-medium text-ink">Who's behind it</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                The studio is run by <strong className="font-medium">Bill Trevillyan</strong>. He
                builds and operates Trevillyan Labs' own products alongside select client
                engagements.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                Day to day, the studio is operated with <strong className="font-medium">Ren</strong>
                , an AI assistant — Trevillyan Labs runs lean on agentic AI rather than headcount.
                It's how we move fast and deliver at senior quality without an agency's overhead,
                and it's the lived proof behind the AI work we advise on.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted">
                Two engines
              </h3>
              <ul className="mt-4 space-y-4 text-[14px] text-ink">
                <li>
                  <p className="font-medium">Owned products</p>
                  <p className="text-muted">
                    Software we build and run for ourselves — NewsNook today.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Client work</p>
                  <p className="text-muted">
                    Custom builds and product/go-to-market advisory for founders and teams.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)]">
        <Container className="py-16">
          <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="mx-auto w-full max-w-[260px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/studiomoot-incode-headshots-111.png"
                alt="Bill Trevillyan"
                className="aspect-[4/5] w-full rounded-xl border border-[var(--color-line)] object-cover object-top"
              />
            </div>
            <div>
              <p className="text-[13px] font-medium text-brand">Meet Bill</p>
              <h2 className="mt-2 text-[1.4rem] font-medium text-ink">
                The founder behind the studio.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                Bill Trevillyan is a product leader and 3x startup founder. He&apos;s built and
                shipped products across early- and mid-stage startups, holds two issued US patents,
                and now runs Trevillyan Labs — building and operating its own products alongside
                select client work.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Away from the keyboard, he lives off of good coffee, gets out for backpacking and
                tennis, and will happily travel (or cook) for cuisines from anywhere in the world.
                He&apos;s based in Mountain View, CA — the heart of Silicon Valley.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/williamtrevillyan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-[var(--color-line)] bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={withUtm(site.portfolioUrl, {
                    medium: "referral",
                    campaign: "studio_site",
                    content: "about_bio",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-[var(--color-line)] bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Portfolio — trevillyan.dev ↗
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(135deg,#1583fa_0%,#0f5fc0_100%)] text-white">
        <Container className="py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-medium leading-tight sm:text-3xl">
              Let&apos;s build something worth shipping.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
              Whether you need a product built or a sharper path to market, tell us what you&apos;re
              working on — we&apos;ll come back with a clear, scoped next step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[14px] font-medium text-[var(--color-brand)] transition hover:bg-white/90"
              >
                Work with us →
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-white/10"
              >
                See the work →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
