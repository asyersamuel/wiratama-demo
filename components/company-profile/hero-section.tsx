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

type NewsHeroSectionProps = {
  variant: "news";
  content: PageHeroContent;
};

/**
 * Generic dark-overlay page hero. Pass `pageLabel` to set the
 * breadcrumb current-page label and the H1 simultaneously.
 */
type DarkHeroSectionProps = {
  variant: "dark";
  content: PageHeroContent;
  /** Text shown as the last breadcrumb segment and as the H1 */
  pageLabel: string;
};

type HeroSectionProps =
  | HomeHeroSectionProps
  | PageHeroSectionProps
  | NewsHeroSectionProps
  | DarkHeroSectionProps;

export function HeroSection(props: HeroSectionProps) {
  if (props.variant === "dark" || props.variant === "news") {
    const pageLabel = props.variant === "dark" ? props.pageLabel : "News";
    const { content } = props;

    return (
      <section className="relative isolate overflow-hidden">
        {/* Dark industrial gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #07111e 0%, #0f1f35 40%, #1a2840 70%, #0b1629 100%)",
          }}
          aria-hidden="true"
        />
        {/* Radial accent overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(198,142,23,0.18) 0%, transparent 45%), radial-gradient(ellipse at 80% 20%, rgba(15,118,110,0.12) 0%, transparent 40%), linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="shell relative z-10 pb-16 pt-[7.5rem] sm:pb-20 sm:pt-[8.5rem]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="cp-breadcrumb mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-[#C68E17]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-white/30">
                /
              </li>
              <li className="font-medium text-white" aria-current="page">
                {pageLabel}
              </li>
            </ol>
          </nav>

          {/* Hero content */}
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {pageLabel}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              {content.description}
            </p>
          </div>

          {/* Accent line */}
          <div className="mt-8 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#C68E17] to-[#C68E17]/30" />
        </div>
      </section>
    );
  }

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
