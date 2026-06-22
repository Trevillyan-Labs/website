import Link from "next/link";
import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { patents } from "@/lib/patents";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Patents",
  description: "Issued US patents from Trevillyan Labs' founder — fluid-detection fabric technology.",
  path: "/patents",
});

export default function PatentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patents"
        title="Issued IP"
        intro="Patents from the founder's invention work — proof of the capability, not the headline."
      />
      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {patents.map((p) => (
              <Link
                key={p.slug}
                href={`/patents/${p.slug}`}
                className="group overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <p className="font-mono text-[13px] text-brand">{p.number}</p>
                  <h2 className="mt-2 text-base font-medium text-ink group-hover:text-brand">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[13px] text-muted">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
