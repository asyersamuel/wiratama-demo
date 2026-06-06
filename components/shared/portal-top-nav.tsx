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

function storePortalMode(mode: PortalMode) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTAL_MODE_KEY, mode);
}

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
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
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
    if (!window.confirm("Reset demo akan mengembalikan data proposal lokal ke kondisi awal. Lanjutkan?")) {
      return;
    }

    resetTenderDemoState();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/96 backdrop-blur">
      <div className="portal-shell py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Branding */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={getModeLandingHref(portalMode)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.1em] text-white shadow-sm hover:opacity-90 transition"
            >
              PT
            </Link>
            <div className="hidden lg:block min-w-0">
              <Link
                href={getModeLandingHref(portalMode)}
                className="block truncate text-base font-bold tracking-tight text-slate-900"
              >
                PT WIP Procurement Portal
              </Link>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center gap-1 overflow-x-auto flex-1 justify-center">
            {navigationItems.map((item) => {
              const active = isPortalNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap items-center rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)]"
                      : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: User / Access Dropdown */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  {/* User Icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <span className="hidden sm:inline-block">
                  {portalMode === "vendor" ? "Vendor Access" : "Internal Access"}
                </span>
                {/* Chevron Down SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-[var(--line)] bg-white py-2 shadow-lg focus:outline-none">
                  <div className="px-4 py-2">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Switch Mode</p>
                  </div>
                  <button
                    onClick={() => handleModeChange("vendor")}
                    className={`flex w-full items-center px-4 py-2 text-sm text-left transition ${
                      portalMode === "vendor" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Vendor Access
                    {portalMode === "vendor" && (
                      <svg className="ml-auto h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleModeChange("internal")}
                    className={`flex w-full items-center px-4 py-2 text-sm text-left transition ${
                      portalMode === "internal" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Internal Access
                    {portalMode === "internal" && (
                      <svg className="ml-auto h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    )}
                  </button>
                  
                  <div className="my-2 border-t border-[var(--line)]"></div>
                  
                  <Link
                    href="/"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center px-4 py-2 text-sm text-slate-700 text-left hover:bg-slate-50 transition"
                  >
                    <svg className="mr-2 h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Company Profile
                  </Link>
                  
                  <div className="my-2 border-t border-[var(--line)]"></div>
                  
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleResetDemo();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 text-left hover:bg-red-50 transition"
                  >
                    <svg className="mr-2 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    Reset Demo
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
