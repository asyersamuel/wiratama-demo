import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { ComplianceSection } from "@/components/company-profile/compliance-section";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { complianceTabs } from "@/features/company-profile/data/compliance-tabs";
import { publicPageContent } from "@/features/company-profile/data/pages";

const pageContent = publicPageContent.compliance;

export const metadata: Metadata = pageContent.metadata;

// Override the hero content with the compliance-specific copy required.
const complianceHero = {
  eyebrow: "Compliance",
  title: "Compliance",
  description:
    "Understand our compliance standards — transparent, reliable, and designed to ensure secure and integrity-driven business operations.",
};

export default function CompliancePage() {
  return (
    <PublicPageShell>
      <HeroSection
        variant="dark"
        pageLabel="Compliance"
        content={complianceHero}
      />
      <ComplianceSection tabs={complianceTabs} />
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
