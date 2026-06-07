import { FeatureCard } from "@/components/company-profile/feature-card";
import { PageSection } from "@/components/company-profile/page-section";
import type { AwardItem } from "@/features/company-profile/types";

type AwardsSectionProps = {
  items: AwardItem[];
};

export function AwardsSection({ items }: AwardsSectionProps) {
  return (
    <PageSection
      eyebrow="Recognition"
      title="Recognition is rebuilt as a clean grid instead of an external slider."
      description="The structure stays close to the target section but uses fully generic award cards and no third-party scripts."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <FeatureCard
            key={item.title}
            eyebrow={item.subtitle}
            title={item.title}
            description={item.description}
            tone={item.tone}
          />
        ))}
      </div>
    </PageSection>
  );
}
