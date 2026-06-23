import Link from "next/link";
import { Container } from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-hero)] text-slate-300">
      <Container className="py-14">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-4 text-sm text-[var(--color-hero-muted)]">
              An independent software studio. We build and run software — ours and yours.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-hero-muted)]">
                Studio
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/patents" className="hover:text-white">
                    Patents
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-hero-muted)]">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href={site.newsnookUrl} className="hover:text-white">
                    NewsNook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/williamtrevillyan/"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[var(--color-hero-muted)]">
          © {new Date().getFullYear()} Trevillyan Labs, LLC
        </div>
      </Container>
    </footer>
  );
}
