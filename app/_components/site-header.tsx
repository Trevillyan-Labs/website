import Link from "next/link";
import { Button } from "@/app/_components/button";
import { Container } from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";
import { nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container>
        <div className="flex h-20 items-center justify-between border-b border-white/10">
          <Logo tone="dark" />
          <nav className="flex items-center gap-8">
            <ul className="hidden items-center gap-8 sm:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/contact" className="px-5 py-2.5 text-sm">
              Work with us
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
