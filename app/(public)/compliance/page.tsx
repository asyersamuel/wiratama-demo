import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.compliance;

export const metadata: Metadata = pageContent.metadata;

export default async function CompliancePage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <PageSection
        eyebrow="Framework"
        title="Compliance is explained through framework, policies, and review rhythm."
        description="The page retains the trust-building role of the target navigation item without reusing any original references."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {site.complianceFramework.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              items={item.items}
              tone={item.tone}
            />
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Sustainability"
        title="Sustainability is treated as an operational discipline with visible priorities."
        description="These cards are generic placeholders for water, energy, and community-oriented programs."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.sustainabilityItems.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              tone={item.tone}
            />
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Certificates"
        title="Certificate cards provide visual proof without relying on any original award or certificate references."
        description="This gives the page a stronger closing section before the final CTA."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.certificateItems.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              tone={item.tone}
            />
          ))}
        </div>
      </PageSection>
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
