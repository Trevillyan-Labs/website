import { Container } from "@/app/_components/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-hero)] text-white">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-[13px] font-medium tracking-widest text-[var(--color-hero-accent)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted-2)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-hover"
          >
            Back home →
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-white/10"
          >
            See the work →
          </Link>
        </div>
      </Container>
    </section>
  );
}
