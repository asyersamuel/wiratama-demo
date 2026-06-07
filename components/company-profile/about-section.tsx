import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import type { AboutContent } from "@/features/company-profile/types";

type AboutSectionProps = {
  content: AboutContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <PageSection
      id="about"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      className="pt-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <p className="text-base leading-8 text-slate-600">{content.supportingText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.logos.map((item) => (
              <PlaceholderMedia
                key={item.label}
                label={item.label}
                caption={item.description}
                tone={item.tone}
                aspect="portrait"
                className="min-h-[14rem]"
              />
            ))}
          </div>
        </div>
        <PlaceholderMedia
          label="Public company profile structure"
          caption="Decorative media replaces the original logo collage while preserving a strong right-side visual block."
          tone="sand"
          aspect="landscape"
        />
      </div>
    </PageSection>
  );
}
