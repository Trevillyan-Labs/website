import { BookingLink } from "@/app/_components/booking-link";
import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { contactPage } from "@/lib/content/pages";
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
      <PageHeader eyebrow="Contact" title="Tell us what you need." intro={contactPage.intro} />
      <section className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-2xl">
            <BookingLink
              location="contact_intro_card"
              className="group mb-8 flex items-center justify-between gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition hover:border-brand"
            >
              <div>
                <p className="text-[15px] font-medium text-ink">{contactPage.booking.title}</p>
                <p className="mt-0.5 text-[13px] text-muted">{contactPage.booking.desc}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-brand px-4 py-2 text-[13px] font-medium text-white transition group-hover:bg-brand-hover">
                Book a call →
              </span>
            </BookingLink>
            <ContactForm initialIntent={intent} />
          </div>
        </Container>
      </section>
    </>
  );
}
