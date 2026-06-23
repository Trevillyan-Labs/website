import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
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
        intro="Two issued US patents from the founder's invention work. Proof of deep technical capability — and available for commercial licensing."
      />

      {/* Patent cards */}
      <section className="bg-white">
        <Container className="py-16">
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
      <section className="bg-[var(--color-hero)] text-white">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-widest text-[var(--color-hero-accent)]">
              Licensing
            </p>
            <h2 className="mt-4 text-2xl font-medium leading-tight sm:text-3xl">
              Interested in licensing this IP?
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-hero-muted)]">
              Both patents are issued and actively maintained. If your business operates in fluid
              detection, smart textiles, IoT sensing, or adjacent technology — reach out. We&apos;re
              open to licensing discussions with companies that can put the IP to work.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-hero-muted)]">
              William Trevillyan (the named inventor) handles all licensing inquiries directly.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact?intent=licensing"
                className="inline-flex items-center rounded-lg bg-[var(--color-brand)] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[var(--color-brand-hover)]"
              >
                Inquire about licensing →
              </Link>
              <a
                href="mailto:bill@trevillyanlabs.io?subject=Patent Licensing Inquiry"
                className="inline-flex items-center text-[14px] text-[var(--color-hero-muted)] transition hover:text-white"
              >
                Or email directly
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Technology summary */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-lg font-medium text-[var(--color-ink)]">The technology</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
              These patents cover a fluid detection system using conductive fabric: a multi-layer
              textile that detects liquid presence and pinpoints leak location via an electrical
              pathway formed by the liquid itself. The architecture spans the detection fabric, the
              sensing methodology, and the control apparatus — providing broad coverage across
              applications.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
              Potential applications include leak detection in data centers, industrial facilities,
              smart buildings, smart textiles, medical monitoring, and consumer IoT devices.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
