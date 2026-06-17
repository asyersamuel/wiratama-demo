import type { Metadata } from "next";
import { GlobalHero } from "@/components/shared/global-hero";
import { ResourcesSection } from "@/components/company-profile/resources-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import {
  annualReports,
  investmentPrinciples,
  newsLetters,
  sustainabilityReports,
} from "@/features/company-profile/data/resources-docs";

const pageContent = publicPageContent.resources;

export const metadata: Metadata = pageContent.metadata;

export default function ResourcesPage() {
  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="RESOURCES"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <ResourcesSection
        annualReports={annualReports}
        sustainabilityReports={sustainabilityReports}
        investmentPrinciples={investmentPrinciples}
        newsLetters={newsLetters}
      />
    </PublicPageShell>
  );
}
