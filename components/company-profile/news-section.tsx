import Link from "next/link";
import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";
import type { NewsItem } from "@/features/company-profile/types";

type NewsSectionProps = {
  items: NewsItem[];
  title?: string;
  description?: string;
  eyebrow?: string;
  featuredSlug?: string;
};

export function NewsSection({
  items,
  title = "News and updates",
  description = "A responsive grid replaces the original news filtering and masonry behavior.",
  eyebrow = "News",
  featuredSlug,
}: NewsSectionProps) {
  const featured = featuredSlug ? items.find((item) => item.slug === featuredSlug) : undefined;
  const gridItems = featured ? items.filter((item) => item.slug !== featured.slug) : items;

  return (
    <PageSection eyebrow={eyebrow} title={title} description={description}>
      {featured ? (
        <article className="mb-8 grid gap-6 rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.45)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <PlaceholderMedia
            label={featured.category}
            caption={featured.title}
            tone={featured.tone}
            aspect="landscape"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Featured · {featured.date}
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {featured.title}
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">{featured.excerpt}</p>
            <Link href={featured.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-[var(--accent)]">
              Read more
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {gridItems.map((item) => (
          <article
            key={item.slug}
            className="rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.4)]"
          >
            <PlaceholderMedia label={item.category} caption={item.title} tone={item.tone} aspect="landscape" />
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{item.date}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
              <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-[var(--accent)]">
                Read more
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
