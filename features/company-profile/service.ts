import { contactFields, contactInfo, footerContent } from "@/features/company-profile/data/footer";
import { newsItems } from "@/features/company-profile/data/news";
import { publicNavigation } from "@/features/company-profile/data/navigation";
import {
  aboutContent,
  aboutTimelineItems,
  awardItems,
  developmentClusters,
  developmentTimelineItems,
  highlightVideoContent,
  homeCtaContent,
  homeHeroContent,
  masterplanContent,
  partnerEcosystem,
  portfolioProjects,
  testimonialItems,
} from "@/features/company-profile/data/overview";
import {
  certificateItems,
  complianceFramework,
  operationsSupportItems,
  publicPageContent,
  resourceItems,
  sustainabilityItems,
  whyUsItems,
} from "@/features/company-profile/data/pages";
import { productItems } from "@/features/company-profile/data/products";
import type { CompanyProfileSiteData } from "@/features/company-profile/types";
import { simulateLatency } from "@/lib/mock-api";

const companyProfileSiteData: CompanyProfileSiteData = {
  navigation: publicNavigation,
  home: {
    hero: homeHeroContent,
    about: aboutContent,
    awards: awardItems,
    testimonials: testimonialItems,
    masterplan: masterplanContent,
    highlightVideo: highlightVideoContent,
    cta: homeCtaContent,
  },
  products: productItems,
  news: newsItems,
  footer: footerContent,
  contactInfo,
  contactFields,
  pages: publicPageContent,
  aboutTimeline: aboutTimelineItems,
  developmentTimeline: developmentTimelineItems,
  developmentClusters,
  portfolioProjects,
  partnerEcosystem,
  resourceItems,
  complianceFramework,
  sustainabilityItems,
  certificateItems,
  whyUsItems,
  operationsSupportItems,
};

export async function getCompanyProfile() {
  await simulateLatency();
  return companyProfileSiteData;
}
