import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const src = tone === "dark" ? "/logo-full-white.svg" : "/logo-full-blue.svg";
  return (
    <Link href="/" aria-label="Trevillyan Labs — home" className="group inline-flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Trevillyan Labs"
        className="h-7 w-auto origin-left transition duration-300 ease-out group-hover:scale-[1.04] group-hover:[filter:drop-shadow(0_0_10px_rgba(21,131,250,0.55))]"
      />
    </Link>
  );
}
