import Link from "next/link";
import { CaseStudyCard } from "@/app/_components/case-study-card";
import { Container } from "@/app/_components/container";
import { caseStudies } from "@/lib/content";

export function Work() {
  return (
    <section className="bg-white">
      <Container className="py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-brand">Selected work</p>
            <h2 className="mt-2 text-[1.6rem] font-medium text-ink">Proof, across engagement types</h2>
          </div>
          <Link
            href="/work"
            className="hidden text-[13px] font-medium text-brand hover:text-brand-hover sm:block"
          >
            All work →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
