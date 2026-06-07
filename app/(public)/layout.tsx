import type { Metadata } from "next";
import { PublicFooter } from "@/components/company-profile/public-footer";
import { PublicNavbar } from "@/components/company-profile/public-navbar";
import { getCompanyProfile } from "@/features/company-profile/service";

export const metadata: Metadata = {
  title: {
    default: "Nusantara Industrial Estate",
    template: "%s | Nusantara Industrial Estate",
  },
  description:
    "A generic company profile website for an integrated industrial estate and business district.",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getCompanyProfile();

  return (
    <div className="public-profile min-h-screen bg-[#f3f0e8] text-slate-950" data-public-profile>
      <PublicNavbar navigation={site.navigation} />
      <main>{children}</main>
      <PublicFooter content={site.footer} />
    </div>
  );
}
