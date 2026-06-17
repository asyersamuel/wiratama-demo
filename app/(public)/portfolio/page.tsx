import type { Metadata } from "next";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { GlobalHero } from "@/components/shared/global-hero";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.portfolio;

export const metadata: Metadata = pageContent.metadata;

export default async function PortfolioPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="PORTFOLIO"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <PageSection
        eyebrow="Projects"
        title={pageContent.intro?.title}
        description={pageContent.intro?.description}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {site.portfolioProjects.map((item) => (
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
        eyebrow="Ecosystem"
        title="A partner ecosystem section keeps the portfolio page from feeling like a thin card list."
        description="These dummy cards suggest a wider network of support around estate delivery and operations."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.partnerEcosystem.map((item) => (
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
        eyebrow="Impact"
        title="Impact summary cards help translate the portfolio into broader business confidence."
        description="This section replaces the old placeholder page with stronger public-facing evidence cues."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            title="On-time delivery rhythm"
            description="Dummy project phasing reflects predictable sequencing across access, support, and building packages."
            tone="gold"
          />
          <FeatureCard
            title="Operational readiness focus"
            description="Every sample project prioritizes circulation, support services, and stakeholder clarity."
            tone="teal"
          />
          <FeatureCard
            title="Partner coordination discipline"
            description="The portfolio reinforces the broader MVP story around structured collaboration and decision support."
            tone="slate"
          />
        </div>
      </PageSection>
    </PublicPageShell>
  );
}
