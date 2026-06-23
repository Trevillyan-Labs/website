import type { CaseStudy } from "@/lib/content";
import Link from "next/link";

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={`${item.title} — ${item.tag}`}
          className="h-40 w-full bg-[var(--color-surface-2)] object-cover"
        />
      ) : (
        <div
          className={`flex h-40 items-center px-5 ${
            item.dark ? "bg-[var(--color-hero)]" : "bg-[#eef3f8]"
          }`}
        >
          <div className="flex items-center gap-2">
            {item.dark && (
              <span className="block h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />
            )}
            <span className={`text-sm font-medium ${item.dark ? "text-white" : "text-[#334155]"}`}>
              {item.title}
            </span>
          </div>
        </div>
      )}
      <div className="p-5">
        <span className="inline-block rounded-full bg-[var(--color-brand-tint)] px-3 py-1 text-[11px] font-medium text-[#1565c0]">
          {item.tag}
        </span>
        <h3 className="mt-4 text-base font-medium text-ink">{item.title}</h3>
        <p className="mt-2 text-[12.5px] leading-snug text-[#475569]">{item.summary}</p>
        <Link
          href={`/work/${item.slug}`}
          className="mt-4 inline-block text-[12.5px] font-medium text-brand after:absolute after:inset-0 hover:text-brand-hover"
        >
          Read case study →
        </Link>
      </div>
    </article>
  );
}
