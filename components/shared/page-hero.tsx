type HeroStat = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  stats?: HeroStat[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  stats,
}: PageHeroProps) {
  return (
    <section className="panel mesh-grid overflow-hidden p-7 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.9fr)]">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-title mt-5">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 copy-muted sm:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {stats?.length ? (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
                <p className="code-label">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {stat.value}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
