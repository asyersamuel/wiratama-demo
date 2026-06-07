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

function ActionLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const classes =
    variant === "primary"
      ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]"
      : "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-slate-950";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${classes}`}
    >
      {label}
    </Link>
  );
}

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
    <section className="relative isolate overflow-hidden bg-[#08111f] text-white">
      <div className="absolute inset-0">
        {content.slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`public-hero-slide public-hero-slide--${slide.tone}`}
            style={{ animationDelay: `${index * 5}s` }}
          >
            <div className="shell flex h-full items-end pb-[4.5rem] opacity-20">
              <div className="max-w-sm rounded-[28px] border border-white/12 bg-black/15 p-5 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-white/70">Scene</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">{slide.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/65">{slide.caption}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,14,0.55),rgba(5,8,14,0.78))]" />
      </div>
      <div className="shell relative z-10 grid min-h-[47rem] gap-14 pt-[7.5rem] pb-28 sm:pt-[8.5rem] lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.7fr)] lg:items-end">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{content.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink {...content.primaryAction} />
            <ActionLink {...content.secondaryAction} />
          </div>
        </div>
        <div className="grid gap-4">
          {content.slides.map((slide) => (
            <article
              key={slide.title}
              className="rounded-[24px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                {slide.caption}
              </p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">{slide.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
