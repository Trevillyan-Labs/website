import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "dark" ? "text-white" : "text-ink";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${"Trevillyan Labs"} home`}>
      <span className="block h-3.5 w-3.5 rounded-[3px] bg-brand" aria-hidden="true" />
      <span className={`text-[15px] font-medium ${text}`}>Trevillyan Labs</span>
    </Link>
  );
}
