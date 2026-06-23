import { Container } from "@/app/_components/container";
import { RenConsole } from "@/app/_components/home/ren-console";

export function OperatedByRen() {
  return (
    <section className="bg-[var(--color-hero)] text-white">
      <Container className="py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-medium text-[var(--color-hero-accent)]">How we work</p>
            <h2 className="mt-3 text-[1.7rem] font-medium leading-tight sm:text-3xl">
              Run by a founder. Operated by an AI.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-2)]">
              Trevillyan Labs runs lean on agentic AI: a founder&apos;s judgment, and an AI assistant —
              Ren — doing the heavy lifting. It&apos;s how we ship fast at senior quality without an
              agency&apos;s overhead.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-2)]">
              We don&apos;t just advise on agentic AI — we run on it. That&apos;s the lived proof behind
              the AI work we help founders and teams adopt.
            </p>
          </div>
          <RenConsole />
        </div>
      </Container>
    </section>
  );
}
