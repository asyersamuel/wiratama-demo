"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductMegaMenu } from "@/components/company-profile/product-mega-menu";
import type { NavigationData, NavigationItem } from "@/features/company-profile/types";

type PublicNavbarProps = {
  navigation: NavigationData;
};

function isActive(pathname: string, item: NavigationItem) {
  if (item.href === "/") {
    return pathname === "/";
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function PublicNavbar({ navigation }: PublicNavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsMobileOpen, setProductsMobileOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const desktopItems = navigation.primary
    .filter((item) => item.href !== navigation.contactAction.href)
    .filter((item) => item.label !== "Products");

  function closeMenus() {
    setMobileOpen(false);
    setProductsOpen(false);
    setProductsMobileOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!productsRef.current) {
        return;
      }

      if (!productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }

    // Close menus when route/pathname changes
    closeMenus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/70 shadow-[0_10px_30px_rgba(15,34,58,0.08)]">
      <div className="h-24 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between gap-6 w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={closeMenus}>
          <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
          <span className="text-lg font-semibold text-slate-900 hidden md:block tracking-tight">
            Wiratama Indramayu Perkasa
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex items-center gap-6 shrink-0" aria-label="Primary navigation">
          <ul className="flex items-center gap-5 xl:gap-6 2xl:gap-8">
            {desktopItems.map((item) => {
              const active = mounted && isActive(pathname, item);

              if (item.children?.length) {
                return (
                  <li
                    key={item.href}
                    ref={productsRef}
                    className="flex h-full items-center"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <div className="flex items-center gap-0.5">
                      <Link
                        href={item.href}
                        className={`text-[15px] font-normal transition-colors ${
                          active ? "!text-[#d3a23b]" : "text-slate-800 hover:!text-[#d3a23b]"
                        }`}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className={`p-1 transition-colors ${active ? "!text-[#d3a23b]" : "text-slate-800 hover:!text-[#d3a23b]"}`}
                        aria-expanded={productsOpen}
                        aria-label="Toggle products menu"
                        onClick={() => setProductsOpen((value) => !value)}
                        onFocus={() => setProductsOpen(true)}
                      >
                        <Chevron open={productsOpen} />
                      </button>
                    </div>
                    <ProductMegaMenu
                      items={item.children}
                      open={productsOpen}
                      onNavigate={() => setProductsOpen(false)}
                    />
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[15px] font-normal transition-colors ${
                      active ? "!text-[#d3a23b]" : "text-slate-800 hover:!text-[#d3a23b]"
                    }`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={navigation.contactAction.href}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#d3a23b] text-slate-800 bg-transparent hover:bg-yellow-50/50 px-6 py-2.5 text-[15px] font-normal transition-all shadow-sm active:scale-95"
          >
            Tender Portal
          </Link>
          <Link
            href="/erp"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-soft)] px-6 py-2.5 text-[15px] font-normal transition-all shadow-sm active:scale-95"
          >
            ERP Portal
          </Link>
          
          <button
            type="button"
            className="xl:hidden p-2 text-slate-800"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 absolute left-0 right-0 top-full shadow-lg">
          <div className="px-6 py-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <ul className="flex flex-col gap-4 mb-6">
              {navigation.primary.filter((item) => item.label !== "Products").map((item) => {
                const active = mounted && isActive(pathname, item);

                if (item.children?.length) {
                  return (
                    <li key={item.href} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Link 
                          href={item.href} 
                          className={`text-[15px] font-normal ${active ? "!text-[#d3a23b]" : "text-slate-800 hover:!text-[#d3a23b]"}`}
                          onClick={closeMenus}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="p-2"
                          aria-expanded={productsMobileOpen}
                          onClick={() => setProductsMobileOpen((value) => !value)}
                        >
                          <Chevron open={productsMobileOpen} />
                        </button>
                      </div>
                      <ProductMegaMenu
                        items={item.children}
                        mobile
                        open={productsMobileOpen}
                        onNavigate={() => {
                          setProductsMobileOpen(false);
                          setMobileOpen(false);
                        }}
                      />
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-[15px] font-normal block transition-colors ${active ? "!text-[#d3a23b]" : "text-slate-800 hover:!text-[#d3a23b]"}`}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link 
              href={navigation.contactAction.href} 
              className="flex w-full items-center justify-center rounded-full border border-[#d3a23b] text-slate-800 bg-transparent hover:bg-yellow-50/50 px-6 py-2.5 text-[15px] font-normal transition-all mt-4"
              onClick={closeMenus}
            >
              Tender Portal
            </Link>
            <Link 
              href="/erp" 
              className="flex w-full items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-soft)] px-6 py-2.5 text-[15px] font-normal transition-all mt-3"
              onClick={closeMenus}
            >
              ERP Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
