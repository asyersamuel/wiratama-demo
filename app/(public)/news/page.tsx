import type { Metadata } from "next";
import { CtaSection } from "@/components/company-profile/cta-section";
import { HeroSection } from "@/components/company-profile/hero-section";
import { NewsSection } from "@/components/company-profile/news-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.news;

export const metadata: Metadata = pageContent.metadata;

export default async function NewsPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <NewsSection
        items={site.news}
        eyebrow="Newsroom"
        title="A full listing page extends the homepage news band with a featured article and a complete grid."
        description="Categories and dates are generic, internal, and aligned with the public company profile narrative."
        featuredSlug={pageContent.featuredNewsSlug}
      />
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
