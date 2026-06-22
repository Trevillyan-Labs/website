import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-white/20 text-slate-200 hover:bg-white/5",
  ghost: "text-brand hover:text-brand-hover",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
