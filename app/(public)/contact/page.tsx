import type { Metadata } from "next";
import { ContactSection } from "@/components/company-profile/contact-section";
import { CtaSection } from "@/components/company-profile/cta-section";
import { HeroSection } from "@/components/company-profile/hero-section";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.contact;

export const metadata: Metadata = pageContent.metadata;

export default async function ContactPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <HeroSection variant="page" content={pageContent.hero} />
      <ContactSection info={site.contactInfo} fields={site.contactFields} />
      {pageContent.cta ? <CtaSection content={pageContent.cta} /> : null}
    </PublicPageShell>
  );
}
