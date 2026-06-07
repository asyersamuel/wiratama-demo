import type { Metadata } from "next";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { WhyUsSection } from "@/components/company-profile/why-us-section";
import { whyUsTabs } from "@/features/company-profile/data/why-us";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Discover the advantages of investing in our strategic location, featuring government support and an integrated ecosystem built for business growth.",
};

const whyUsHero = {
  eyebrow: "Why Us",
  title: "Why Us",
  description:
    "Discover the advantages of investing in our strategic location, featuring government support and an integrated ecosystem built for business growth.",
};

export default function WhyUsPage() {
  return (
    <PublicPageShell>
      <HeroSection
        variant="dark"
        pageLabel="Why Us"
        content={whyUsHero}
      />
      <WhyUsSection tabs={whyUsTabs} />
    </PublicPageShell>
  );
}
