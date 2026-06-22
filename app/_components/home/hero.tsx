import { Button } from "@/app/_components/button";
import { Container } from "@/app/_components/container";
import { Icon } from "@/app/_components/icon";
import { offerings } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative bg-[var(--color-hero)] text-white">
      <Container className="pb-16 pt-28 sm:pb-20 sm:pt-36">
        <p className="text-[13px] font-medium text-[var(--color-hero-accent)]">
          Independent software studio
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.1] sm:text-[2.75rem]">
          We build and run software — ours and yours.
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted-2)]">
          Trevillyan Labs ships custom software for clients, operates its own products, and advises
          founders and early-stage startups on product and go-to-market execution.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/contact">Work with us</Button>
          <Button href="/products/newsnook" variant="outline">
            See what we ship → NewsNook
          </Button>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {offerings.map((o) => (
            <li
              key={o.title}
              className="rounded-xl border border-[var(--color-hero-line)] bg-[var(--color-hero-card)] p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-[var(--color-hero-accent)]">
                <Icon name={o.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[15px] font-medium text-white">{o.title}</h3>
              <p className="mt-2 text-[12.5px] leading-snug text-[var(--color-hero-muted)]">
                {o.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
