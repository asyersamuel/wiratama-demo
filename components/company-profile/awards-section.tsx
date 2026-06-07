import type { AwardItem } from "@/features/company-profile/types";

type AwardsSectionProps = {
  items: AwardItem[];
};

export function AwardsSection({ items }: AwardsSectionProps) {
  return (
    <section className="cp-section cp-awards">
      <div className="cp-shell">
        <div className="cp-section__head cp-section__head--center">
          <p className="cp-section__eyebrow">Recognition</p>
          <h2 className="cp-section__title">Recognition and milestone highlights</h2>
          <div className="cp-section__divider cp-section__divider--center" />
        </div>
        <div className="cp-awards__rail">
          {items.map((item) => (
            <article key={item.title} className="cp-awards__card">
              <div className={`cp-awards__medal cp-tone-${item.tone}`} />
              <p className="cp-awards__subtitle">{item.subtitle}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="cp-awards__controls" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
