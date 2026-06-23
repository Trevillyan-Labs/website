import Link from "next/link";
import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Trevillyan Labs is an independent software studio run by Bill Trevillyan — a product leader and 3x founder — and operated day-to-day with an AI assistant.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
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
                The studio is run by <strong className="font-medium">Bill Trevillyan</strong>, a product
                leader and 3x startup founder. He's built and shipped products for early- and
                mid-stage startups, holds two issued US patents, and now builds and operates Trevillyan
                Labs' own products alongside select client engagements.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                Day to day, the studio is operated with <strong className="font-medium">Ren</strong>, an
                AI assistant — Trevillyan Labs runs lean on agentic AI rather than headcount. It's how
                we move fast and deliver at senior quality without an agency's overhead, and it's the
                lived proof behind the AI work we advise on.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted">Two engines</h3>
              <ul className="mt-4 space-y-4 text-[14px] text-ink">
                <li>
                  <p className="font-medium">Owned products</p>
                  <p className="text-muted">Software we build and run for ourselves — NewsNook today.</p>
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
          <h2 className="text-[1.4rem] font-medium text-ink">Patents</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-muted">
            Two issued US patents from the founder's invention work — proof of the capability, not the
            headline.
          </p>
          <Link
            href="/patents"
            className="mt-6 inline-flex rounded-lg border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            View patents →
          </Link>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-2)]">
        <Container className="py-14 text-center">
          <h2 className="text-[1.4rem] font-medium text-ink">Want to work together?</h2>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            Work with us
          </Link>
        </Container>
      </section>
    </>
  );
}
