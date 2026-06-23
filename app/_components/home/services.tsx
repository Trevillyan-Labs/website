import { Container } from "@/app/_components/container";
import { type Service, ServiceCard } from "@/app/_components/home/service-card";

const services: Service[] = [
  {
    title: "Build",
    icon: "Hammer",
    body: "Custom software development and web/portfolio builds.",
    detail: "MVPs · internal tools · sites",
    motif: "terminal",
    cta: { label: "Start a project →", href: "/services" },
  },
  {
    title: "Advise",
    icon: "Compass",
    body: "Product & go-to-market execution for founders and early-stage startups.",
    detail: "product · PMF · raise · GTM",
    motif: "trajectory",
    cta: { label: "Book a call →", href: "/contact?intent=advisory" },
  },
  {
    title: "Products",
    icon: "Package",
    body: "We build and operate our own (NewsNook, live today).",
    detail: "Proof we ship & run",
    motif: "window",
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

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
