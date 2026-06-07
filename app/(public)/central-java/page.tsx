import type { Metadata } from "next";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { RegionSection } from "@/components/company-profile/region-section";
import { regionTabs } from "@/features/company-profile/data/region";

export const metadata: Metadata = {
  title: "Central Java",
  description:
    "Discover the advantages of investing in our region — a strategic hub with strong infrastructure, skilled labor, and reliable connectivity.",
};

const regionHero = {
  eyebrow: "Central Java",
  title: "Central Java",
  description:
    "Discover the advantages of investing in our region — a strategic hub with strong infrastructure, skilled labor, and reliable connectivity.",
};

export default function CentralJavaPage() {
  return (
    <PublicPageShell>
      <HeroSection
        variant="dark"
        pageLabel="Central Java"
        content={regionHero}
      />
      <RegionSection tabs={regionTabs} />
    </PublicPageShell>
  );
}
