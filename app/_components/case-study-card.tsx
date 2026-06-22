import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
      <div
        className={`flex h-24 items-center px-5 ${
          item.dark ? "bg-[var(--color-hero)]" : "bg-[#eef3f8]"
        }`}
      >
        <div className="flex items-center gap-2">
          {item.dark && <span className="block h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />}
          <span className={`text-sm font-medium ${item.dark ? "text-white" : "text-[#334155]"}`}>
            {item.title}
          </span>
        </div>
      </div>
      <div className="p-5">
        <span className="inline-block rounded-full bg-[var(--color-brand-tint)] px-3 py-1 text-[11px] font-medium text-[#1565c0]">
          {item.tag}
        </span>
        <h3 className="mt-4 text-base font-medium text-ink">{item.title}</h3>
        <p className="mt-2 text-[12.5px] leading-snug text-[#475569]">{item.summary}</p>
        <Link
          href={`/work/${item.slug}`}
          className="mt-4 inline-block text-[12.5px] font-medium text-brand hover:text-brand-hover"
        >
          Read case study →
        </Link>
      </div>
    </article>
  );
}
