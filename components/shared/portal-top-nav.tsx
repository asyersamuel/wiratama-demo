"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portalNavigation } from "@/lib/navigation";

function isNavItemActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/tender") {
    const segments = pathname.split("/").filter(Boolean);

    return (
      pathname === "/tender" ||
      (segments[0] === "tender" &&
        segments[1] !== "vendor" &&
        segments[1] !== "internal")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PortalTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/96 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="portal-shell flex flex-col gap-4 py-4 lg:gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/dashboard"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.16em] text-[#ffffff] shadow-[0_16px_32px_-24px_rgba(143,34,52,0.8)]"
          >
            PT
          </Link>
          <div className="min-w-0">
            <Link
              href="/dashboard"
              className="block truncate text-base font-semibold tracking-[-0.02em] text-slate-950"
            >
              PT WIP Procurement Portal
            </Link>
            <p className="truncate text-sm text-slate-500">
              Industrial Estate Tender MVP
            </p>
          </div>
        </div>

        <nav className="-mx-1 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 px-1">
            {portalNavigation.map((item) => {
              const active = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  style={active ? { color: "#ffffff" } : undefined}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "border border-white/70 bg-[var(--accent)] text-[#ffffff] font-semibold shadow-[0_10px_24px_-18px_rgba(143,34,52,0.9)] ring-2 ring-white/80"
                      : "text-slate-600 font-medium hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center">
          <Link
            href="/"
            className="btn btn-secondary px-4 py-2"
          >
            Company Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
