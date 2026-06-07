import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { FeatureCard } from "@/components/company-profile/feature-card";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PageSection } from "@/components/company-profile/page-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";

const pageContent = publicPageContent.resources;

export const metadata: Metadata = pageContent.metadata;

export default function ResourcesPage() {
  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <PageSection
        eyebrow="Resource center"
        title="Resources are grouped into a cleaner internal-only library."
        description="Every link stays inside the demo and avoids external downloads or third-party documents."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pageContent.resources?.map((item) => (
            <FeatureCard
              key={item.title}
              eyebrow={item.meta}
              title={item.title}
              description={item.description}
              tone={item.tone}
              href={{ label: "Open resource", href: item.href }}
            />
          ))}
        </div>
      </PageSection>
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
