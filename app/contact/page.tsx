import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { pageMeta } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell Trevillyan Labs what you need — a build, a website, or product/go-to-market advice. We'll come back with a clear, scoped next step.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need."
        intro="A short note is enough — the problem, not a spec. We'll come back with a clear, scoped next step: a fixed-scope build, or an advisory call."
      />
      <section className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-2xl">
            <ContactForm initialIntent={intent} />
          </div>
        </Container>
      </section>
    </>
  );
}
