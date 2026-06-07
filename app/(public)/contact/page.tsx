import type { Metadata } from "next";
import { ContactSection } from "@/components/company-profile/contact-section";
import { GlobalHero } from "@/components/shared/global-hero";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.contact;

export const metadata: Metadata = pageContent.metadata;

export default async function ContactPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="CONTACT"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <ContactSection info={site.contactInfo} fields={site.contactFields} />
    </PublicPageShell>
  );
}
