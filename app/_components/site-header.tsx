import { Button } from "@/app/_components/button";
import { Container } from "@/app/_components/container";
import { HeaderNav } from "@/app/_components/header-nav";
import { Logo } from "@/app/_components/logo";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container>
        <div className="flex h-20 items-center justify-between border-b border-white/10">
          <Logo tone="dark" />
          <nav className="flex items-center gap-2 sm:gap-4">
            <HeaderNav />
            <Button href="/contact" location="header" className="px-5 py-2.5 text-sm">
              Work with us
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
