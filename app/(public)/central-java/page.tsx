import type { Metadata } from "next";
import { GlobalHero } from "@/components/shared/global-hero";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { RegionSection } from "@/components/company-profile/region-section";
import { regionTabs } from "@/features/company-profile/data/region";

export const metadata: Metadata = {
  title: "Central Java",
  description:
    "Discover the advantages of investing in our region — a strategic hub with strong infrastructure, skilled labor, and reliable connectivity.",
};

export default function CentralJavaPage() {
  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="CENTRAL JAVA"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <RegionSection tabs={regionTabs} />
    </PublicPageShell>
  );
}
