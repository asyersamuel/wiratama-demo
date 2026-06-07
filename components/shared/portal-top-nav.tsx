"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  getDefaultPortalMode,
  getModeLandingHref,
  getPortalNavigation,
  isPortalNavItemActive,
  type PortalMode,
} from "@/lib/navigation";
import { resetTenderDemoState } from "@/features/tender/demo-store";

const PORTAL_MODE_KEY = "wip-portal-mode-v1";
const portalModes: PortalMode[] = ["vendor", "internal", "guest"];

function storePortalMode(mode: PortalMode) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTAL_MODE_KEY, mode);
}

// Icons
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ResetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

export function PortalTopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const portalMode = getDefaultPortalMode(pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    storePortalMode(portalMode);
  }, [portalMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = useMemo(
    () => getPortalNavigation(portalMode),
    [portalMode],
  );

  const handleModeChange = (mode: PortalMode) => {
    if (mode === portalMode) {
      setIsDropdownOpen(false);
      return;
    }

    storePortalMode(mode);
    setIsDropdownOpen(false);
    router.push(getModeLandingHref(mode));
  };

  const handleResetDemo = () => {
    setIsDropdownOpen(false);
    if (
      !window.confirm(
        "Reset demo akan mengembalikan data proposal lokal ke kondisi awal. Lanjutkan?",
      )
    ) {
      return;
    }

    resetTenderDemoState();
    window.location.reload();
  };

  const getModeLabel = (mode: PortalMode) => {
    if (mode === "internal") return "Internal Access";
    if (mode === "guest") return "Guest Access";
    return "Vendor Access";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/96 backdrop-blur">
      <div className="portal-shell py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={getModeLandingHref(portalMode)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:opacity-90"
            >
              PT
            </Link>
            <div className="hidden min-w-0 md:block">
              <Link
                href={getModeLandingHref(portalMode)}
                className="block truncate text-base font-bold tracking-tight text-slate-900"
              >
                PT WIP Procurement Portal
              </Link>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigationItems.map((item) => {
              const active = isPortalNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap items-center rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-[#f5eeef] font-semibold text-slate-900"
                      : "bg-transparent font-medium text-slate-600 hover:bg-[#faf7f7] hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[#faf7f7]"
            >
              <UserIcon />
              {getModeLabel(portalMode)}
              <ChevronDownIcon />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--line)] bg-white py-2 shadow-lg">
                <div className="px-4 py-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Switch Mode
                  </p>
                </div>

                {portalModes.map((mode) => {
                  const active = mode === portalMode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleModeChange(mode)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-sm transition ${
                        active
                          ? "bg-[#f5eeef] font-semibold text-[var(--accent)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {getModeLabel(mode)}
                      {active && <CheckIcon />}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <ResetIcon />
                  Reset Demo
                </button>

                <div className="my-2 border-t border-[var(--line)]"></div>

                <Link
                  href="/"
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <HomeIcon />
                  Company Profile
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto lg:hidden">
          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const active = isPortalNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap items-center rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "border border-[var(--line)] bg-[#faf7f7] font-semibold text-slate-900"
                      : "border border-transparent bg-white font-medium text-slate-600 hover:bg-[#faf7f7] hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
