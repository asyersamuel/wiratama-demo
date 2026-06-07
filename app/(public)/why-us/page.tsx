import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.whyUs;

export const metadata: Metadata = pageContent.metadata;

export default async function WhyUsPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <PageSection
        title={pageContent.intro?.title}
        description={pageContent.intro?.description}
        eyebrow="Advantages"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {site.whyUsItems.map((item) => (
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
        eyebrow="Support system"
        title="Infrastructure, access, and operational support are presented as distinct value layers."
        description="This preserves the section hierarchy of the target site while using sanitized content."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.operationsSupportItems.map((item) => (
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
