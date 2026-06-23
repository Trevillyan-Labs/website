import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const src = tone === "dark" ? "/logo-full-white.svg" : "/logo-full-blue.svg";
  return (
    <Link href="/" aria-label="Trevillyan Labs — home" className="group inline-flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Trevillyan Labs"
        className="h-7 w-auto opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
    </Link>
  );
}
