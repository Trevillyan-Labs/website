"use client";

import { nav } from "@/lib/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 sm:flex">
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`block rounded-lg px-3.5 py-2 text-[15px] transition-colors ${
                active
                  ? "bg-white/15 font-medium text-white"
                  : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
