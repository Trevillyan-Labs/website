"use client";

import { Container } from "@/app/_components/container";
import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Surfaced in server logs / analytics; keep the user-facing copy generic.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-[var(--color-hero)] text-white">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="text-3xl font-medium leading-tight sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted-2)]">
          An unexpected error occurred. Please try again, or head back home.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-lg bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-hover"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-white/10"
          >
            Back home →
          </a>
        </div>
      </Container>
    </section>
  );
}
