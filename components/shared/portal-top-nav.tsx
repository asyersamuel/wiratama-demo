"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  getDefaultPortalMode,
  getGlobalPortalNavigation,
  getModeLandingHref,
  getPortalModeLabel,
  getPortalNavigation,
  isGlobalPortalNavItemActive,
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

export function PortalTopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const portalMode = getDefaultPortalMode(pathname);

  useEffect(() => {
    storePortalMode(portalMode);
  }, [portalMode]);

  const globalNavigation = useMemo(
    () => getGlobalPortalNavigation(portalMode),
    [portalMode],
  );
  const navigationItems = useMemo(
    () => getPortalNavigation(portalMode),
    [portalMode],
  );

  const handleModeChange = (mode: PortalMode) => {
    if (mode === portalMode) {
      return;
    }

    storePortalMode(mode);
    router.push(getModeLandingHref(mode));
  };

  const handleResetDemo = () => {
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

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/96 backdrop-blur">
      <div className="portal-shell py-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href={getModeLandingHref(portalMode)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:opacity-90"
              >
                PT
              </Link>
              <div className="min-w-0">
                <Link
                  href={getModeLandingHref(portalMode)}
                  className="block truncate text-base font-bold tracking-tight text-slate-900"
                >
                  PT WIP Procurement Portal
                </Link>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  Tender dan company profile untuk demo pitching
                </p>
              </div>
            </div>

            <nav className="flex items-center gap-2 overflow-x-auto">
              {globalNavigation.map((item) => {
                const active = isGlobalPortalNavItemActive(pathname, item.section);

                return (
                  <Link
                    key={item.section}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex whitespace-nowrap items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[var(--accent)] text-white shadow-sm"
                        : "border border-[var(--line)] bg-white text-slate-700 hover:border-[#dcc5ca] hover:bg-[#faf7f7]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleResetDemo}
              className="btn btn-secondary px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            >
              Reset Demo
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-[24px] border border-[var(--line)] bg-[#fcfbfa] px-4 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="code-label">POV Tender</p>
                <p className="mt-2 text-sm text-slate-600">
                  Pilih sudut pandang demo untuk menampilkan dashboard dan menu yang
                  relevan.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {portalModes.map((mode) => {
                  const active = mode === portalMode;

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleModeChange(mode)}
                      aria-pressed={active}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[var(--accent)] text-white shadow-sm"
                          : "border border-[var(--line)] bg-white text-slate-700 hover:border-[#dcc5ca] hover:bg-[#faf7f7]"
                      }`}
                    >
                      {getPortalModeLabel(mode)}
                    </button>
                  );
                })}
              </div>
            </div>

            <nav className="flex items-center gap-2 overflow-x-auto">
              {navigationItems.map((item) => {
                const active = isPortalNavItemActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex whitespace-nowrap items-center rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "bg-[var(--accent)] font-semibold text-white shadow-sm"
                        : "border border-[var(--line)] bg-white font-medium text-slate-600 hover:border-[#dcc5ca] hover:bg-[#faf7f7] hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
