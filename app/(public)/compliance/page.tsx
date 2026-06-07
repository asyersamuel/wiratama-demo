import type { Metadata } from "next";
import { ComplianceSection } from "@/components/company-profile/compliance-section";
import { GlobalHero } from "@/components/shared/global-hero";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { complianceTabs } from "@/features/company-profile/data/compliance-tabs";
import { publicPageContent } from "@/features/company-profile/data/pages";

const pageContent = publicPageContent.compliance;

export const metadata: Metadata = pageContent.metadata;

export default function CompliancePage() {
  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="COMPLIANCE"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <ComplianceSection tabs={complianceTabs} />
    </PublicPageShell>
  );
}
