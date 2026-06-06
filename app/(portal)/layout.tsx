import { PortalShell } from "@/components/shared/portal-shell";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PortalShell>{children}</PortalShell>;
}
