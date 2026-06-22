import { Container } from "@/app/_components/container";
import { PageHeader } from "@/app/_components/page-header";
import { legalHtml } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Trevillyan Labs, LLC collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-white">
        <Container className="py-16">
          <div
            className="legal mx-auto max-w-3xl"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: faithful legal copy from our own export
            dangerouslySetInnerHTML={{ __html: legalHtml("privacy") }}
          />
        </Container>
      </section>
    </>
  );
}
