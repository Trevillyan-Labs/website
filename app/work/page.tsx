import { CaseStudyCard } from "@/app/_components/case-study-card";
import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { caseStudies } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case studies",
  description:
    "Featured work from Trevillyan Labs — across owned products, startup builds, and websites.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Featured work"
        title="Proof, across engagement types"
        intro="From a startup's founding product to our own SaaS to a client website — the through-line is software that ships and runs."
      />
      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((item) => (
              <CaseStudyCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
