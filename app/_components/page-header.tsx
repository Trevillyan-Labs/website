import type { ReactNode } from "react";
import { Container } from "@/app/_components/container";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-[var(--color-hero)] text-white">
      <Container className="pb-14 pt-28 sm:pb-16 sm:pt-32">
        <p className="text-[13px] font-medium text-[var(--color-hero-accent)]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">{title}</h1>
        {intro ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted-2)]">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
