type NavigationItem = {
  href: string;
  label: string;
};

export const publicNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/development", label: "Development" },
  { href: "/portfolio", label: "Portfolio" },
];

export const portalNavigation: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tender", label: "Tender" },
  { href: "/tender/vendor", label: "Vendor Portal" },
  { href: "/tender/internal", label: "Internal View" },
  { href: "/contractors", label: "Contractors" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/tracking", label: "Tracking" },
];
