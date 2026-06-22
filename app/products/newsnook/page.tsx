import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "NewsNook — our product",
  description:
    "NewsNook is Trevillyan Labs' own product — an AI newsletter reader, live in production. Proof the studio builds and operates real software.",
  path: "/products/newsnook",
});

export default function NewsNookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our product"
        title="NewsNook"
        intro="The AI newsletter reader for thought leaders — built, shipped, and operated by Trevillyan Labs. It's live in production today."
      >
        <a
          href={site.newsnookUrl}
          className="mt-7 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
        >
          Visit newsnook.ai →
        </a>
      </PageHeader>

      <section className="bg-white">
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2 className="text-[1.4rem] font-medium text-ink">Why it's here</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">
              This page isn't a sales pitch — NewsNook sells itself on its own site. On{" "}
              <span className="font-medium">trevillyanlabs.io</span>, NewsNook is{" "}
              <span className="font-medium">proof</span>: the studio doesn't just build software for
              clients, it builds and <em>operates</em> its own product, end-to-end, run lean with AI.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">
              That ownership is what we bring to client work — we ship like owners, not contractors,
              and the product instincts we earn running NewsNook feed every build and advisory
              engagement.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { t: "Live in production", d: "Real users, real product — not a demo." },
              { t: "Built & operated by us", d: "Next.js / TypeScript / Supabase, run day-to-day." },
              { t: "Run lean on AI", d: "The agentic operating model we advise on." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-[var(--color-line)] bg-white p-6">
                <h3 className="text-base font-medium text-ink">{f.t}</h3>
                <p className="mt-2 text-[13px] text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
