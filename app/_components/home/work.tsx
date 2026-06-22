import Link from "next/link";
import { Container } from "@/app/_components/container";
import { work } from "@/lib/site";

export function Work() {
  return (
    <section className="bg-white">
      <Container className="py-20">
        <p className="text-[13px] font-medium text-brand">Selected work</p>
        <h2 className="mt-2 text-[1.6rem] font-medium text-ink">Proof, across engagement types</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {work.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
            >
              <div
                className={`flex h-24 items-center px-5 ${
                  item.dark ? "bg-[var(--color-hero)]" : "bg-[#eef3f8]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.dark && (
                    <span className="block h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />
                  )}
                  <span
                    className={`text-sm font-medium ${item.dark ? "text-white" : "text-[#334155]"}`}
                  >
                    {item.title}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-[var(--color-brand-tint)] px-3 py-1 text-[11px] font-medium text-[#1565c0]">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-base font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-snug text-[#475569]">{item.outcome}</p>
                <Link
                  href="/work"
                  className="mt-4 inline-block text-[12.5px] font-medium text-brand hover:text-brand-hover"
                >
                  Read case study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
