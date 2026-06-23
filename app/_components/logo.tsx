import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const src = tone === "dark" ? "/logo-full-white.svg" : "/logo-full-blue.svg";
  return (
    <Link
      href="/"
      aria-label="Trevillyan Labs — home"
      className="group relative inline-flex items-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Trevillyan Labs" className="h-7 w-auto" />
      {/* Brand-blue overlay fades in on hover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-full-blue.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-7 w-auto opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
    </Link>
  );
}
