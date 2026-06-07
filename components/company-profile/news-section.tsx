import Link from "next/link";
import type { NewsItem } from "@/features/company-profile/types";

type NewsSectionProps = {
  items: NewsItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  featuredSlug?: string;
};

export function NewsSection({
  items,
  eyebrow = "Latest News",
  title = "Updates from across the district",
  description,
  featuredSlug,
}: NewsSectionProps) {
  const featured = featuredSlug ? items.find((item) => item.slug === featuredSlug) : undefined;
  const gridItems = featured ? items.filter((item) => item.slug !== featured.slug) : items;

  return (
    <section className="cp-section cp-news">
      <div className="cp-shell">
        <div className="cp-section__head cp-section__head--center">
          <p className="cp-section__eyebrow">{eyebrow}</p>
          <h2 className="cp-section__title">{title}</h2>
          <div className="cp-section__divider cp-section__divider--center" />
          {description ? (
            <p className="cp-section__body cp-section__body--center">{description}</p>
          ) : null}
        </div>
        {featured ? (
          <article className="cp-news-card cp-news-card--featured">
            <div className={`cp-news-card__media cp-tone-${featured.tone}`}>
              <span>{featured.category}</span>
            </div>
            <div className="cp-news-card__body">
              <p className="cp-news-card__date">{featured.date}</p>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <Link href={featured.href}>Read More</Link>
            </div>
          </article>
        ) : null}
        <div className="cp-news__grid">
          {gridItems.map((item) => (
            <article key={item.slug} className="cp-news-card">
              <div className={`cp-news-card__media cp-tone-${item.tone}`}>
                <span>{item.category}</span>
              </div>
              <div className="cp-news-card__body">
                <p className="cp-news-card__date">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={item.href}>Read More</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
