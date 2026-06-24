import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { patentsPage } from "@/lib/content/pages";
import { patents } from "@/lib/patents";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Patents",
  description:
    "Two issued US patents in fluid-detection technology from Trevillyan Labs' founder — proof of invention capability and available for commercial licensing.",
  path: "/patents",
});

export default function PatentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Issued IP"
        title="Patents"
        intro="Two issued US patents. Proof of deep technical capability — and available for commercial licensing."
      />

      {/* Technology summary */}
      <section className="bg-white">
        <Container className="pt-16 pb-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-lg font-medium text-[var(--color-ink)]">The technology</h2>
            {patentsPage.technology.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]"
              >
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Patent cards */}
      <section className="bg-white">
        <Container className="pt-6 pb-16">
          <div className="grid gap-6 md:grid-cols-2">
            {patents.map((p) => (
              <a
                key={p.slug}
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <p className="font-mono text-[13px] text-[var(--color-brand)]">{p.number}</p>
                  <h2 className="mt-2 text-base font-medium text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[13px] text-[var(--color-muted)]">{p.summary}</p>
                  <span className="mt-3 inline-block text-[12.5px] font-medium text-[var(--color-brand)]">
                    View on Google Patents →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Licensing CTA */}
      <section className="bg-[linear-gradient(135deg,#1583fa_0%,#0f5fc0_100%)] text-white">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-widest text-white/70">
              Licensing
            </p>
            <h2 className="mt-4 text-2xl font-medium leading-tight sm:text-3xl">
              Interested in licensing this IP?
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/85">
              {patentsPage.licensing}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact?intent=licensing"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[14px] font-medium text-[var(--color-brand)] transition hover:bg-white/90"
              >
                Inquire about licensing →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
