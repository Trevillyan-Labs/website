import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { withUtm } from "@/lib/utm";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Products",
  description:
    "The products Trevillyan Labs builds and operates — proof the studio ships and runs real software. NewsNook is live in production today.",
  path: "/products",
});

type Product = {
  name: string;
  status: string;
  summary: string;
  image: string;
  href: string;
  cta: string;
  external: boolean;
};

const products: Product[] = [
  {
    name: "NewsNook",
    status: "Live in production",
    summary:
      "An AI newsletter reader for thought leaders — built, shipped, and operated by the studio. Our clearest proof we run real software, not just ship it.",
    image: "/images/work/products/newsnook-project.webp",
    href: withUtm(site.newsnookUrl, {
      medium: "referral",
      campaign: "studio_site",
      content: "products_page",
    }),
    cta: "Visit newsnook.ai →",
    external: true,
  },
  {
    name: "Verbaly",
    status: "2,300+ users · Calacanis-backed",
    summary:
      "An AI speech coach — a consumer web app built end-to-end on LLMs + RAG, launched to 2,300+ users and funded by Jason Calacanis & LAUNCH.",
    image: "/images/work/products/verbaly-web-app-project.webp",
    href: "/work/verbaly",
    cta: "Read the case study →",
    external: false,
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Products we build — and run."
        intro="We don't just ship software for clients; we build and operate our own. It's the clearest proof the studio ships real products — and the instincts we earn running them feed every client build and advisory engagement."
      />

      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((p) => {
              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-48 w-full bg-[var(--color-surface-2)] object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-[var(--color-brand-tint)] px-3 py-1 text-[11px] font-medium text-[#1565c0]">
                      {p.status}
                    </span>
                    <h2 className="mt-4 text-lg font-medium text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                      {p.name}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                      {p.summary}
                    </p>
                    <span className="mt-4 inline-block text-[13px] font-medium text-[var(--color-brand)]">
                      {p.cta}
                    </span>
                  </div>
                </>
              );
              const cls =
                "group overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5";
              return p.external ? (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <Link key={p.name} href={p.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-[linear-gradient(135deg,#1583fa_0%,#0f5fc0_100%)] text-white">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-medium leading-tight sm:text-3xl">
              Have a product to build?
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/85">
              We build and operate our own — and we&apos;ll do the same for yours, from first scope
              to live in production.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact?intent=build"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[14px] font-medium text-[var(--color-brand)] transition hover:bg-white/90"
              >
                Work with us →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
