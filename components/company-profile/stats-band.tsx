import type { HighlightStat } from "@/features/company-profile/types";

type StatsBandProps = {
  stats: HighlightStat[];
};

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <section className="cp-stats-band">
      <div className="cp-shell">
        <div className="cp-stats-band__grid">
          {stats.map((item) => (
            <article key={item.label} className="cp-stats-band__item">
              <h2>{item.value}</h2>
              <p>{item.label}</p>
              {item.note ? <small>{item.note}</small> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
