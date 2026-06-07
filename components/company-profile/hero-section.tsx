import Link from "next/link";
import type { HomeHeroContent, PageHeroContent } from "@/features/company-profile/types";

type HomeHeroSectionProps = {
  variant: "home";
  content: HomeHeroContent;
};

type PageHeroSectionProps = {
  variant: "page";
  content: PageHeroContent;
};

type HeroSectionProps = HomeHeroSectionProps | PageHeroSectionProps;

export function HeroSection(props: HeroSectionProps) {
  if (props.variant === "page") {
    const { content } = props;

    return (
      <section className="shell pt-[7.5rem] sm:pt-[8.5rem]">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,#111827_0%,#273449_48%,#64532a_100%)] px-6 py-12 text-white shadow-[0_28px_90px_-38px_rgba(15,23,42,0.6)] sm:px-10 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.18),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                {content.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 text-base leading-8 text-white/78 sm:text-lg">{content.description}</p>
            </div>
            {content.stats?.length ? (
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {content.stats.map((stat) => (
                  <article key={stat.label} className="rounded-[24px] border border-white/12 bg-white/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/58">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {stat.value}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const { content } = props;

  return (
    <section className="cp-hero">
      <div className="cp-hero__slides" aria-hidden="true">
        {content.slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`cp-hero__slide cp-hero__slide--${slide.tone}`}
            style={{ animationDelay: `${index * 6}s` }}
          />
        ))}
      </div>
      <div className="cp-hero__overlay" />
      <div className="cp-shell cp-hero__inner">
        <div className="cp-hero__content">
          <p className="cp-hero__eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="cp-hero__actions">
            <Link href={content.primaryAction.href} className="cp-hero__button">
              {content.primaryAction.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
