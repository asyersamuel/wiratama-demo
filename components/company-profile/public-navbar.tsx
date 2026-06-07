"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductMegaMenu } from "@/components/company-profile/product-mega-menu";
import type { NavigationData } from "@/features/company-profile/types";

type PublicNavbarProps = {
  navigation: NavigationData;
};

export function PublicNavbar({ navigation }: PublicNavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsMobileOpen, setProductsMobileOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement | null>(null);

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

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setProductsMobileOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-[rgba(246,244,239,0.88)] backdrop-blur-xl">
      <div className="shell relative flex min-h-[5.5rem] items-center justify-between gap-6">
        <Link href="/" onClick={closeMenus} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-slate-950 text-sm font-semibold text-white">
            {navigation.brand.mark}
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-950">{navigation.brand.name}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              {navigation.brand.descriptor}
            </p>
          </div>
          <span className="hidden rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 lg:inline-flex">
            {navigation.brand.supportMark}
          </span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navigation.primary.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/products"
                    ? pathname === "/products"
                    : pathname === item.href;

              if (item.children?.length) {
                return (
                  <li
                    key={item.href}
                    ref={productsRef}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={item.href}
                        onClick={closeMenus}
                        className={`text-sm font-medium transition ${
                          active ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setProductsOpen((value) => !value)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-slate-700 transition hover:border-[var(--line)] hover:bg-white"
                        aria-label="Toggle products menu"
                        aria-expanded={productsOpen}
                      >
                        <span
                          className={`transition ${productsOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
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
                    onClick={closeMenus}
                    className={`text-sm font-medium transition ${
                      active ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link href={navigation.contactAction.href} onClick={closeMenus} className="btn btn-primary">
            {navigation.contactAction.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--line)] bg-white text-slate-950 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-current transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--line)] bg-[rgba(246,244,239,0.96)] px-5 py-5 lg:hidden">
          <div className="shell px-0">
            <ul className="space-y-3">
              {navigation.primary.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href === "/products"
                      ? pathname === "/products"
                      : pathname === item.href;

                if (item.children?.length) {
                  return (
                    <li key={item.href} className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={item.href}
                          onClick={closeMenus}
                          className={`text-sm font-semibold ${active ? "text-slate-950" : "text-slate-700"}`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setProductsMobileOpen((value) => !value)}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-slate-700"
                          aria-expanded={productsMobileOpen}
                        >
                          {productsMobileOpen ? "Close" : "Open"}
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
                      onClick={closeMenus}
                      className={`block rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm font-semibold ${
                        active ? "text-slate-950" : "text-slate-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href={navigation.contactAction.href} onClick={closeMenus} className="btn btn-primary mt-5 w-full">
              {navigation.contactAction.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
