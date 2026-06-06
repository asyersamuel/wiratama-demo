import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="shell space-y-8 py-8 sm:py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
