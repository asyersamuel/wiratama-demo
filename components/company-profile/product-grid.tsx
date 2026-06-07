import Link from "next/link";
import type { ProductItem } from "@/features/company-profile/types";

type ProductGridProps = {
  products: ProductItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ProductGrid({
  products,
  eyebrow = "Products",
  title = "Flexible products built around the district ecosystem",
  description = "The product grid mirrors the target homepage pattern with image-led cards, large titles, and hover-driven detail reveals.",
}: ProductGridProps) {
  return (
    <section id="products" className="cp-section cp-products">
      <div className="cp-shell">
        <div className="cp-section__head cp-section__head--center">
          <p className="cp-section__eyebrow">{eyebrow}</p>
          <h2 className="cp-section__title">{title}</h2>
          <div className="cp-section__divider cp-section__divider--center" />
          <p className="cp-section__body cp-section__body--center">
            {description}
          </p>
        </div>
        <div className="cp-products__grid">
          {products.map((product) => (
            <article key={product.id} className="cp-product-card">
              <div className="cp-product-card__inner">
                <div className={`cp-product-card__face cp-product-card__face--${product.tone}`}>
                  <div className="cp-product-card__overlay" />
                  <div className="cp-product-card__front-copy">
                    <span>{product.kicker}</span>
                    <h3>{product.title}</h3>
                    <p>{product.summary}</p>
                  </div>
                </div>
                <div className="cp-product-card__back">
                  <span className="cp-product-card__label">{product.mediaLabel}</span>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <ul>
                    {product.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <Link href={product.cta.href}>{product.cta.label}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
