import type { Metadata } from "next";
import { AboutSection } from "@/components/company-profile/about-section";
import { AwardsSection } from "@/components/company-profile/awards-section";
import { CtaSection } from "@/components/company-profile/cta-section";
import { HeroSection } from "@/components/company-profile/hero-section";
import { HighlightVideoSection } from "@/components/company-profile/highlight-video-section";
import { MasterplanSection } from "@/components/company-profile/masterplan-section";
import { NewsSection } from "@/components/company-profile/news-section";
import { ProductGrid } from "@/components/company-profile/product-grid";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { StatsBand } from "@/components/company-profile/stats-band";
import { TestimonialsSection } from "@/components/company-profile/testimonials-section";
import { getCompanyProfile } from "@/features/company-profile/service";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Public landing page for the sanitized industrial estate company profile MVP.",
};

export default async function HomePage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="home" content={site.home.hero} />
      <StatsBand stats={site.home.hero.stats} />
      <AboutSection content={site.home.about} />
      <ProductGrid products={site.products} />
      <AwardsSection items={site.home.awards} />
      <TestimonialsSection items={site.home.testimonials} />
      <MasterplanSection content={site.home.masterplan} />
      <HighlightVideoSection content={site.home.highlightVideo} />
      <NewsSection items={site.news.slice(0, 3)} />
      <CtaSection content={site.home.cta} />
    </PublicPageShell>
  );
}
