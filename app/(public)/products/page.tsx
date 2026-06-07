import type { Metadata } from "next";
import Link from "next/link";
import { GlobalHero } from "@/components/shared/global-hero";
import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import { ProductGrid } from "@/components/company-profile/product-grid";
import { PublicPageShell } from "@/components/company-profile/public-page-shell";
import { publicPageContent } from "@/features/company-profile/data/pages";
import { getCompanyProfile } from "@/features/company-profile/service";

const pageContent = publicPageContent.products;

export const metadata: Metadata = pageContent.metadata;

export default async function ProductsPage() {
  const site = await getCompanyProfile();

  return (
    <PublicPageShell>
      <GlobalHero
        eyebrow="PRODUCTS"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        hasCTA={false}
      />
      <ProductGrid
        products={site.products}
        eyebrow="Overview"
        title="The homepage product band expands into anchored detail sections."
        description="Each product keeps the same public positioning logic while adding deeper dummy content."
      />
      {site.products.map((product, index) => (
        <PageSection
          key={product.id}
          id={product.id}
          eyebrow={product.kicker}
          title={product.title}
          description={product.description}
          className="pt-6"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <PlaceholderMedia
                label={product.mediaLabel}
                caption={product.mediaCaption}
                tone={product.tone}
                aspect="landscape"
              />
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
              <p className="text-base leading-8 text-slate-600">{product.summary}</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-4 rounded-[22px] border border-[var(--line)] bg-white/78 p-4"
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={product.cta.href} className="btn btn-primary mt-7">
                {product.cta.label}
              </Link>
            </div>
          </div>
        </PageSection>
      ))}
    </PublicPageShell>
  );
}
