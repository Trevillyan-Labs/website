import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { legalHtml } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms and Conditions",
  description: "The legal terms for using Trevillyan Labs, LLC's website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms and Conditions" />
      <section className="bg-white">
        <Container className="py-16">
          <div
            className="legal mx-auto max-w-3xl"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: faithful legal copy from our own export
            dangerouslySetInnerHTML={{ __html: legalHtml("terms") }}
          />
        </Container>
      </section>
    </>
  );
}
