import type { TestimonialItem } from "@/features/company-profile/types";

type TestimonialsSectionProps = {
  items: TestimonialItem[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section className="cp-section cp-testimonials">
      <div className="cp-shell">
        <div className="cp-section__head cp-section__head--center">
          <p className="cp-section__eyebrow">Testimonials</p>
          <h2 className="cp-section__title">What partners and operators say about the district story</h2>
          <div className="cp-section__divider cp-section__divider--center" />
        </div>
        <div className="cp-testimonials__grid">
          {items.map((item) => (
            <article key={`${item.name}-${item.role}`} className="cp-testimonial-card">
              <div className="cp-testimonial-card__quote-mark">&quot;</div>
              <p className="cp-testimonial-card__quote">{item.quote}</p>
              <div className="cp-testimonial-card__meta">
                <div className={`cp-testimonial-card__avatar cp-tone-${item.tone}`} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                  <span>{item.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
