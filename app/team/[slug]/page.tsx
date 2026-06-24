import { Container } from "@/app/_components/container";
import { pageMeta } from "@/lib/seo";
import { team } from "@/lib/team";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return {};
  return pageMeta({
    title: `${member.name} — ${member.title}`,
    description: member.bio,
    path: `/team/${member.slug}`,
  });
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <>
      <section className="bg-[var(--color-hero)] text-white">
        <Container className="pb-14 pt-28 sm:pt-32">
          <Link
            href="/team"
            className="text-[13px] text-[var(--color-hero-accent)] hover:text-white"
          >
            ← Team
          </Link>
          <div className="mt-6 flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.photo}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-medium">{member.name}</h1>
              <p className="mt-1 text-[15px] text-[var(--color-muted-2)]">{member.title}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          <div className="max-w-2xl">
            <p className="text-[15px] leading-relaxed text-ink">{member.bio}</p>
            <div className="mt-6 flex gap-4 text-[13px]">
              {member.links.linkedin ? (
                <a
                  href={member.links.linkedin}
                  className="font-medium text-brand hover:text-brand-hover"
                >
                  LinkedIn →
                </a>
              ) : null}
              {member.links.twitter ? (
                <a href={member.links.twitter} className="font-medium text-muted hover:text-ink">
                  X / Twitter →
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
