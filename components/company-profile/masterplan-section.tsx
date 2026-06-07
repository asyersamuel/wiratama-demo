import Link from "next/link";
import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import type { MasterplanContent } from "@/features/company-profile/types";

type MasterplanSectionProps = {
  content: MasterplanContent;
};

export function MasterplanSection({ content }: MasterplanSectionProps) {
  return (
    <PageSection
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <ul className="space-y-4">
            {content.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-4 rounded-[22px] border border-[var(--line)] bg-white/78 p-5 text-sm leading-7 text-slate-700"
              >
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link href={content.cta.href} className="btn btn-primary mt-8">
            {content.cta.label}
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -left-4 top-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-[32px] border border-[var(--accent)]/25" />
          <PlaceholderMedia
            label={content.mediaLabel}
            caption={content.mediaCaption}
            tone={content.tone}
            aspect="landscape"
            playButton
          />
        </div>
      </div>
    </PageSection>
  );
}
