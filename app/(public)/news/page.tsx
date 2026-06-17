import type { Metadata } from "next";
import { GlobalHero } from "@/components/shared/global-hero";
import { NewsSection } from "@/components/company-profile/news-section";
import { PidSection } from "@/components/company-profile/pid-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { pidTabs } from "@/features/company-profile/data/pid";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.news;

export const metadata: Metadata = pageContent.metadata;

export default async function NewsPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="NEWS"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <NewsSection items={site.news} />
      <PidSection tabs={pidTabs} />
    </PublicPageShell>
  );
}
