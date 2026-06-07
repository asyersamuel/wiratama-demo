import type { Metadata } from "next";
import { PublicFooter } from "@/components/company-profile/public-footer";
import { PublicNavbar } from "@/components/company-profile/public-navbar";
import { getCompanyProfile } from "@/features/company-profile/service";

export const metadata: Metadata = {
  title: {
    default: "Northstar Industrial District",
    template: "%s | Northstar Industrial District",
  },
  description:
    "Sanitized industrial estate company profile for the public-facing MVP landing experience.",
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
