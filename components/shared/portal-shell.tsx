import { PortalTopNav } from "@/components/shared/portal-top-nav";

type PortalShellProps = {
  children: React.ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-[#fcfbfa]">
      <PortalTopNav />
      <main className="portal-shell space-y-6 py-6 sm:py-8 lg:space-y-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}
