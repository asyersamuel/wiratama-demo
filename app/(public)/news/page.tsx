import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { HeroSection } from "@/components/company-profile/hero-section";
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
      <HeroSection variant="news" content={pageContent.hero} />
      <NewsSection items={site.news} />
      <PidSection tabs={pidTabs} />
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
