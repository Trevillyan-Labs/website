import { Button } from "@/app/_components/button";
import { Container } from "@/app/_components/container";
import { homePage } from "@/lib/content/pages";

export function ClosingCta() {
  return (
    <section className="bg-[var(--color-surface-2)]">
      <Container className="py-20 text-center">
        <h2 className="text-[1.6rem] font-medium text-ink">{homePage.closingCta.heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted">{homePage.closingCta.body}</p>
        <div className="mt-7 flex justify-center">
          <Button href="/contact">Work with us</Button>
        </div>
      </Container>
    </section>
  );
}
