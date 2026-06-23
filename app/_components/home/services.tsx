import { Container } from "@/app/_components/container";
import { Icon } from "@/app/_components/icon";
import Link from "next/link";

const services = [
  {
    title: "Build",
    icon: "Hammer",
    body: "Custom software development and web/portfolio builds.",
    detail: "MVPs · internal tools · sites",
    cta: { label: "Start a project →", href: "/services" },
  },
  {
    title: "Advise",
    icon: "Compass",
    body: "Product & go-to-market execution for founders and early-stage startups.",
    detail: "product · PMF · raise · GTM",
    cta: { label: "Book a call →", href: "/contact?intent=advisory" },
  },
  {
    title: "Products",
    icon: "Package",
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
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-brand">
                <Icon name={s.icon} className="h-[22px] w-[22px]" />
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
