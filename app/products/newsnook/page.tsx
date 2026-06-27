import { Container } from "@/app/_components/container";
import { NewsnookLink } from "@/app/_components/newsnook-link";
import { PageHeader } from "@/app/_components/page-header";
import { newsnookPage } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { withUtm } from "@/lib/utm";

export const metadata = pageMeta({
  title: "NewsNook — our product",
  description:
    "NewsNook is Trevillyan Labs' own product — an AI newsletter reader, live in production. Proof the studio builds and operates real software.",
  path: "/products/newsnook",
});

export default function NewsNookPage() {
  return (
    <>
      <PageHeader eyebrow="Our product" title="NewsNook" intro={newsnookPage.intro}>
        <NewsnookLink
          href={withUtm(site.newsnookUrl, {
            medium: "referral",
            campaign: "studio_site",
            content: "newsnook_spotlight",
          })}
          location="newsnook_spotlight"
          className="mt-7 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
        >
          Visit newsnook.ai →
        </NewsnookLink>
      </PageHeader>

      <section className="bg-white">
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2 className="text-[1.4rem] font-medium text-ink">
              {newsnookPage.whyItsHere.heading}
            </h2>
            {newsnookPage.whyItsHere.paras.map((para) => (
              <p key={para.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {newsnookPage.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-[var(--color-line)] bg-white p-6"
              >
                <h3 className="text-base font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-[13px] text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
