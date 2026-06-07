import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { Timeline } from "@/components/shared/timeline";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.about;

export const metadata: Metadata = pageContent.metadata;

export default async function AboutPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <PageSection
        eyebrow={pageContent.intro?.eyebrow}
        title={pageContent.intro?.title}
        description={pageContent.intro?.description}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="grid gap-5 md:grid-cols-3">
            {pageContent.values?.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
                tone={item.tone}
              />
            ))}
          </div>
          <PlaceholderMedia
            label="Company overview"
            caption="A decorative panel expands the homepage about section into a fuller company-profile moment."
            tone="sand"
            aspect="portrait"
          />
        </div>
      </PageSection>
      <PageSection
        eyebrow="Milestones"
        title="A short timeline keeps the page grounded in progression and delivery."
        description="The content is intentionally generic but structured enough to support a guided demo narrative."
      >
        <Timeline items={site.aboutTimeline} />
      </PageSection>
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
