export type NavigationItem = {
  href: string;
  label: string;
};

export type PortalMode = "vendor" | "internal";

export const publicNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/development", label: "Development" },
  { href: "/portfolio", label: "Portfolio" },
];

export const vendorNavigation: NavigationItem[] = [
  { href: "/tender", label: "Daftar Tender" },
  { href: "/tender/vendor", label: "Portal Vendor" },
];

export const internalNavigation: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tender/internal", label: "Review Tender" },
  { href: "/contractors", label: "Kontraktor" },
  { href: "/tracking", label: "Tracking" },
];

export function getDefaultPortalMode(pathname: string): PortalMode {
  if (
    pathname === "/tender" ||
    pathname === "/tender/vendor" ||
    (pathname.startsWith("/tender/") && !pathname.startsWith("/tender/internal"))
  ) {
    return "vendor";
  }

  return "internal";
}

export function getModeLandingHref(mode: PortalMode) {
  return mode === "vendor" ? "/tender" : "/dashboard";
}

export function getPortalNavigation(mode: PortalMode) {
  return mode === "vendor" ? vendorNavigation : internalNavigation;
}

export function isPortalNavItemActive(pathname: string, href: string) {
  if (href === "/tender") {
    return (
      pathname === "/tender" ||
      (pathname.startsWith("/tender/") &&
        !pathname.startsWith("/tender/vendor") &&
        !pathname.startsWith("/tender/internal"))
    );
  }

  if (href === "/tender/vendor") {
    return pathname === "/tender/vendor";
  }

  if (href === "/tender/internal") {
    return pathname === "/tender/internal" || pathname.startsWith("/tender/internal/");
  }

  if (href === "/contractors") {
    return pathname === "/contractors" || pathname.startsWith("/contractors/");
  }

  if (href === "/tracking") {
    return pathname === "/tracking" || pathname.startsWith("/tracking/");
  }

  return pathname === href;
}
