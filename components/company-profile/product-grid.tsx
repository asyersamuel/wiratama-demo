import Link from "next/link";
import { PageSection } from "@/components/company-profile/page-section";
import type { ProductItem } from "@/features/company-profile/types";

type ProductGridProps = {
  products: ProductItem[];
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function ProductGrid({
  products,
  title = "Products shaped around the district ecosystem",
  description = "The structure follows the target section closely while swapping original content for generic, modular product cards.",
  eyebrow = "Products",
}: ProductGridProps) {
  return (
    <PageSection eyebrow={eyebrow} title={title} description={description} className="py-20">
      <div className="grid gap-6 lg:grid-cols-5">
        {products.map((product) => (
          <article key={product.id} className="product-flip-card min-h-[25rem] lg:min-h-[31rem]">
            <div className="product-flip-card__inner">
              <div className={`product-flip-card__face product-flip-card__face--${product.tone}`}>
                <div className="product-flip-card__overlay" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      {product.kicker}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{product.title}</h3>
                  </div>
                  <p className="max-w-[16rem] text-sm leading-7 text-white/78">{product.summary}</p>
                </div>
              </div>
              <div className="product-flip-card__back">
                <div className="flex h-full flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {product.mediaLabel}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.cta.href}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-slate-950 transition hover:text-[var(--accent)]"
                  >
                    {product.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
