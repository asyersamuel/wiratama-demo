import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { HeroSection } from "@/components/company-profile/hero-section";
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

const resourcesHero = {
  eyebrow: "Resources",
  title: "Resources",
  description:
    "Access official documents, data, and reports — well-structured, downloadable, and designed to support informed decision-making.",
};

export default function ResourcesPage() {
  return (
    <PublicPageShell>
      <HeroSection
        variant="dark"
        pageLabel="Resources"
        content={resourcesHero}
      />
      <ResourcesSection
        annualReports={annualReports}
        sustainabilityReports={sustainabilityReports}
        investmentPrinciples={investmentPrinciples}
        newsLetters={newsLetters}
      />
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
