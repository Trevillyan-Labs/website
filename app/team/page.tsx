import Link from "next/link";
import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";
import { team } from "@/lib/team";

export const metadata = pageMeta({
  title: "Team",
  description: "The people behind Trevillyan Labs.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHeader eyebrow="Team" title="Who's behind it" intro="A studio that runs on leverage — a founder, and an AI assistant." />
      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                className="group rounded-xl border border-[var(--color-line)] bg-white p-6"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h2 className="mt-4 text-base font-medium text-ink group-hover:text-brand">
                  {m.name}
                </h2>
                <p className="text-[13px] text-muted">{m.title}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
