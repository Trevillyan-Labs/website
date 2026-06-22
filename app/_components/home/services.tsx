import Link from "next/link";
import { Container } from "@/app/_components/container";

const services = [
  {
    title: "Build",
    body: "Custom software development and web/portfolio builds.",
    detail: "MVPs · internal tools · sites",
    cta: { label: "Start a project →", href: "/contact" },
  },
  {
    title: "Advise",
    body: "Product & go-to-market execution for founders and early-stage startups.",
    detail: "product · PMF · raise · GTM",
    cta: { label: "Book a call →", href: "/contact" },
  },
  {
    title: "Products",
    body: "We build and operate our own (NewsNook, live today).",
    detail: "Proof we ship & run",
    cta: { label: "See NewsNook →", href: "/products/newsnook" },
  },
];

export function Services() {
  return (
    <section className="bg-[var(--color-surface)]">
      <Container className="py-20">
        <p className="text-[13px] font-medium text-brand">What we do</p>
        <h2 className="mt-2 text-[1.6rem] font-medium text-ink">Three ways to work with us</h2>
        <p className="mt-2 text-[15px] text-muted">Hire the studio to build — or to advise.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                <span className="block h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-medium text-ink">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-snug text-[#475569]">{s.body}</p>
              <div className="mt-5 border-t border-[var(--color-surface-2)] pt-4">
                <p className="text-[11.5px] text-muted">{s.detail}</p>
              </div>
              <Link
                href={s.cta.href}
                className="mt-4 text-[13px] font-medium text-brand hover:text-brand-hover"
              >
                {s.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
