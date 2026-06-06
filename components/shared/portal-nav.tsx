"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portalNavigation } from "@/lib/navigation";

export function PortalNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {portalNavigation.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
              active
                ? "bg-[var(--accent)] text-white"
                : "text-slate-700 hover:bg-white hover:text-slate-950"
            }`}
          >
            <span>{item.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {item.label.slice(0, 3)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
