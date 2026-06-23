import { Container } from "@/app/_components/container";
import { JsonLd } from "@/app/_components/json-ld";
import { PageHeader } from "@/app/_components/page-header";
import { faqs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Common questions about Trevillyan Labs — what we do, who we help, how engagements work, and how we use AI.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        intro="What Trevillyan Labs does, who we help, and how to work with us."
      />
      <section className="bg-white">
        <Container className="py-16">
          <dl className="mx-auto max-w-3xl divide-y divide-[var(--color-line)]">
            {faqs.map((f) => (
              <div key={f.q} className="py-7 first:pt-0">
                <dt className="text-lg font-medium text-ink">{f.q}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-[#475569]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
