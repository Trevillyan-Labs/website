import { Container } from "@/app/_components/container";
import { RenConsole } from "@/app/_components/home/ren-console";
import { homePage } from "@/lib/content/pages";

export function OperatedByRen() {
  return (
    <section className="bg-[var(--color-hero)] text-white">
      <Container className="py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-medium text-[var(--color-hero-accent)]">
              {homePage.howWeWork.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.7rem] font-medium leading-tight sm:text-3xl">
              {homePage.howWeWork.heading}
            </h2>
            {homePage.howWeWork.paras.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-2)] [&:not(:first-of-type)]:mt-4"
              >
                {para}
              </p>
            ))}
          </div>
          <RenConsole />
        </div>
      </Container>
    </section>
  );
}
