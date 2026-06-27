import { Button } from "@/app/_components/button";
import { Container } from "@/app/_components/container";
import { HeroCarousel } from "@/app/_components/hero/hero-carousel";
import { HeroDots } from "@/app/_components/hero/hero-dots";
import { ProofTicker } from "@/app/_components/hero/proof-ticker";
import { homePage } from "@/lib/content/pages";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-hero)] text-white">
      <div className="aurora" aria-hidden="true" />
      <HeroDots />

      <Container className="relative z-10 pb-16 pt-28 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p
              className="reveal text-[13px] font-medium text-[var(--color-hero-accent)]"
              style={{ animationDelay: "0.05s" }}
            >
              {homePage.hero.eyebrow}
            </p>
            <h1
              className="reveal mt-4 max-w-2xl text-4xl font-medium leading-[1.08] sm:text-[2.85rem]"
              style={{ animationDelay: "0.12s" }}
            >
              {homePage.hero.headline}
            </h1>
            <p
              className="reveal mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-2)]"
              style={{ animationDelay: "0.22s" }}
            >
              {homePage.hero.subcopy}
            </p>
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.32s" }}
            >
              <Button href="/contact" location="home_hero">
                Work with us
              </Button>
              <Button href="/products" location="home_hero" variant="outline">
                See what we ship →
              </Button>
            </div>
            <div className="reveal mt-10" style={{ animationDelay: "0.42s" }}>
              <ProofTicker />
            </div>
          </div>

          <div
            className="reveal hidden lg:block"
            style={{ animationDelay: "0.3s" }}
            aria-label="A selection of products built by Trevillyan Labs"
          >
            <HeroCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
