import type { Metadata } from "next";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { GlobalHero } from "@/components/shared/global-hero";
import { MasterplanSection } from "@/components/company-profile/masterplan-section";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { Timeline } from "@/components/shared/timeline";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.development;

export const metadata: Metadata = pageContent.metadata;

export default async function DevelopmentPage() {
  const site = await getCompanyProfile();
  const masterplanContent = {
    ...site.home.masterplan,
    cta: {
      label: "Open portfolio",
      href: "/portfolio",
    },
  };

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="DEVELOPMENT"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <PageSection
        eyebrow="Clusters"
        title={pageContent.intro?.title}
        description={pageContent.intro?.description}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.developmentClusters.map((item) => (
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
      <MasterplanSection content={masterplanContent} />
      <PageSection
        eyebrow="Milestones"
        title="An infrastructure timeline gives the development page more substance than the old placeholder."
        description="This preserves the idea of phased progress without embedding any real video or protected planning content."
      >
        <Timeline items={site.developmentTimeline} />
      </PageSection>
    </PublicPageShell>
  );
}
