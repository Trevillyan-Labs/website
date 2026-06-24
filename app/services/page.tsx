import { Container } from "@/app/_components/container";
import { Icon } from "@/app/_components/icon";
import { JsonLd } from "@/app/_components/json-ld";
import { PageHeader } from "@/app/_components/page-header";
import { AdviseMotif } from "@/app/_components/services/advise-motif";
import { BuildMotif } from "@/app/_components/services/build-motif";
import { type Group, services } from "@/lib/content";
import { servicesPage } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Hire Trevillyan Labs to build custom software, ship a web/portfolio site, or advise on product and go-to-market execution.",
  path: "/services",
});

const groups: { group: Group; blurb: string }[] = [
  { group: "Build", blurb: servicesPage.groupBlurbs.Build },
  { group: "Advise", blurb: servicesPage.groupBlurbs.Advise },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: "Trevillyan Labs" },
          serviceType: services.filter((s) => s.group !== "Products").map((s) => s.title),
        }}
      />
      <PageHeader
        eyebrow="Services"
        title="Hire the studio — to build, or to advise."
        intro={servicesPage.intro}
      />

      {groups.map((g, i) => {
        const items = services.filter((s) => s.group === g.group);
        return (
          <section key={g.group} className={i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-white"}>
            <Container className="py-16">
              <h2 className="text-[1.6rem] font-medium text-ink">{g.group}</h2>
              <p className="mt-2 max-w-2xl text-[15px] text-muted">{g.blurb}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {items.map((s) => (
                  <div
                    key={s.slug}
                    className="group relative flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
                  >
                    {s.group === "Build" ? (
                      <BuildMotif
                        kind={s.slug === "contract-software-development" ? "app" : "site"}
                      />
                    ) : s.group === "Advise" ? (
                      <AdviseMotif
                        kind={s.slug === "product-and-gtm-execution" ? "growth" : "ai"}
                      />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-brand">
                        <Icon name={s.icon} className="h-[22px] w-[22px]" />
                      </span>
                    )}
                    <h3 className="mt-4 text-lg font-medium text-ink">{s.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#475569]">{s.summary}</p>
                    <ul className="mt-4 space-y-1.5">
                      {s.whatYouGet.map((w) => (
                        <li key={w} className="flex gap-2 text-[13px] text-ink">
                          <span
                            className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={s.start.href}
                      className="mt-5 text-[13px] font-medium text-brand after:absolute after:inset-0 hover:text-brand-hover"
                    >
                      {s.start.label} →
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="bg-[var(--color-surface-2)]">
        <Container className="py-16">
          <h2 className="text-[1.6rem] font-medium text-ink">{servicesPage.stepsHeading}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {servicesPage.steps.map((step) => (
              <div
                key={step.n}
                className="rounded-xl border border-[var(--color-line)] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-brand">
                    <Icon name={step.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <span className="font-mono text-sm text-[var(--color-muted-2)]">{step.n}</span>
                </div>
                <h3 className="mt-4 text-base font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            Work with us
          </Link>
        </Container>
      </section>
    </>
  );
}
