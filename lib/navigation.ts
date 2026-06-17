export type ErpRole =
  | "executive"
  | "command_center"
  | "hse_operations"
  | "operations_manager"
  | "pic_vendor";

export const ERP_ROLE_KEY = "wip-erp-role-v1";

export const erpRoles: ErpRole[] = [
  "executive",
  "command_center",
  "hse_operations",
  "operations_manager",
  "pic_vendor",
];

export const erpNavigation: NavigationItem[] = [
  { href: "/erp", label: "ERP Home" },
  { href: "/erp/dashboard", label: "Executive Dashboard" },
  { href: "/erp/incidents", label: "Incident Register" },
  { href: "/erp/incidents/new", label: "Create Incident" },
  { href: "/erp/my-actions", label: "My Actions" },
];

export function getErpNavigation(role: ErpRole): NavigationItem[] {
  const base: NavigationItem[] = [{ href: "/erp", label: "ERP Home" }];

  switch (role) {
    case "executive":
      return [
        ...base,
        { href: "/erp/dashboard", label: "Executive Dashboard" },
        { href: "/erp/incidents", label: "Incident Register" },
      ];
    case "command_center":
      return [
        ...base,
        { href: "/erp/incidents", label: "Incident Register" },
      ];
    case "hse_operations":
      return [
        ...base,
        { href: "/erp/incidents", label: "Incident Register" },
      ];
    case "operations_manager":
      return [
        ...base,
        { href: "/erp/incidents", label: "Incident Register" },
      ];
    case "pic_vendor":
      return [
        ...base,
        { href: "/erp/my-actions", label: "My Actions" },
      ];
  }
}

export function isErpSectionPath(pathname: string) {
  return pathname === "/erp" || pathname.startsWith("/erp/");
}

export function getErpRoleLanding(role: ErpRole) {
  if (role === "executive") return "/erp/dashboard";
  if (role === "command_center") return "/erp/incidents";
  if (role === "hse_operations") return "/erp/incidents";
  if (role === "operations_manager") return "/erp/incidents";
  return "/erp/my-actions";
}

export function getErpRoleLabel(role: ErpRole) {
  if (role === "executive") return "Executive Access";
  if (role === "command_center") return "Command Center";
  if (role === "hse_operations") return "HSE / Operations";
  if (role === "operations_manager") return "Operations Manager";
  return "PIC / Vendor";
}

export type NavigationItem = {
  href: string;
  label: string;
};

export type GlobalPortalNavigationItem = NavigationItem & {
  section: "tender" | "profile";
};

export type PortalMode = "vendor" | "internal" | "guest";

export const publicNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/development", label: "Development" },
  { href: "/portfolio", label: "Portfolio" },
];

const vendorNavigation: NavigationItem[] = [
  { href: "/tender", label: "Dashboard" },
  { href: "/tender/vendor", label: "Portal Vendor" },
];

const internalNavigation: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tender/internal", label: "Review Tender" },
  { href: "/contractors", label: "Kontraktor" },
  { href: "/erp", label: "Mini ERP" },
];

const guestNavigation: NavigationItem[] = [
  { href: "/tender/guest", label: "Dashboard" },
  { href: "/tender/join", label: "Ajukan Akun Vendor" },
];

export function isTenderSectionPath(pathname: string) {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/tender") ||
    pathname.startsWith("/contractors") ||
    pathname.startsWith("/tracking")
  );
}

export function getDefaultPortalMode(pathname: string): PortalMode {
  if (pathname === "/tender/guest" || pathname === "/tender/join") {
    return "guest";
  }

  if (
    pathname === "/tender" ||
    pathname === "/tender/vendor" ||
    (pathname.startsWith("/tender/") &&
      !pathname.startsWith("/tender/internal") &&
      !pathname.startsWith("/tender/guest") &&
      !pathname.startsWith("/tender/join"))
  ) {
    return "vendor";
  }

  return "internal";
}

export function getModeLandingHref(mode: PortalMode) {
  if (mode === "internal") {
    return "/dashboard";
  }

  if (mode === "guest") {
    return "/tender/guest";
  }

  return "/tender";
}

export function getPortalModeLabel(mode: PortalMode) {
  if (mode === "internal") {
    return "Internal PT WIP";
  }

  if (mode === "guest") {
    return "Guest";
  }

  return "Vendor";
}

export function getGlobalPortalNavigation(
  mode: PortalMode,
): GlobalPortalNavigationItem[] {
  return [
    {
      href: getModeLandingHref(mode),
      label: "Tender",
      section: "tender",
    },
    {
      href: "/",
      label: "Profile",
      section: "profile",
    },
  ];
}

export function getPortalNavigation(mode: PortalMode) {
  if (mode === "internal") {
    return internalNavigation;
  }

  if (mode === "guest") {
    return guestNavigation;
  }

  return vendorNavigation;
}

export function isGlobalPortalNavItemActive(
  pathname: string,
  section: GlobalPortalNavigationItem["section"],
) {
  if (section === "tender") {
    return isTenderSectionPath(pathname);
  }

  return false;
}

export function isPortalNavItemActive(pathname: string, href: string) {
  if (href === "/tender") {
    return (
      pathname === "/tender" ||
      (pathname.startsWith("/tender/") &&
        !pathname.startsWith("/tender/vendor") &&
        !pathname.startsWith("/tender/internal") &&
        !pathname.startsWith("/tender/guest") &&
        !pathname.startsWith("/tender/join"))
    );
  }

  if (href === "/tender/vendor") {
    return pathname === "/tender/vendor";
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/tender/internal") {
    return pathname === "/tender/internal" || pathname.startsWith("/tender/internal/");
  }

  if (href === "/tender/guest") {
    return pathname === "/tender/guest";
  }

  if (href === "/tender/join") {
    return pathname === "/tender/join";
  }

  if (href === "/contractors") {
    return pathname === "/contractors" || pathname.startsWith("/contractors/");
  }

  if (href === "/tracking") {
    return pathname === "/tracking" || pathname.startsWith("/tracking/");
  }

  if (href === "/erp") {
    return pathname === "/erp";
  }

  if (href === "/erp/incidents") {
    return pathname === "/erp/incidents" || pathname.startsWith("/erp/incidents/");
  }

  return pathname === href;
}
