import type { Metadata } from "next";
import { GlobalHero } from "@/components/shared/global-hero";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { WhyUsSection } from "@/components/company-profile/why-us-section";
import { whyUsTabs } from "@/features/company-profile/data/why-us";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Discover the advantages of investing in our strategic location, featuring government support and an integrated ecosystem built for business growth.",
};

export default function WhyUsPage() {
  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="WHY US"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <WhyUsSection tabs={whyUsTabs} />
    </PublicPageShell>
  );
}
