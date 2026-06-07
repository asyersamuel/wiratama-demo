import type { AboutContent } from "@/features/company-profile/types";

type AboutSectionProps = {
  content: AboutContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="cp-section cp-about">
      <div className="cp-shell">
        <div className="cp-about__grid">
          <div className="cp-about__copy">
            <p className="cp-section__eyebrow">{content.eyebrow}</p>
            <h2 className="cp-section__title">{content.title}</h2>
            <div className="cp-section__divider" />
            <p className="cp-section__body">{content.description}</p>
            <p className="cp-section__body cp-section__body--muted">{content.supportingText}</p>
          </div>
          <div className="cp-about__media">
            <div className="cp-about__media-main">
              <span>Estate Identity</span>
            </div>
            <div className="cp-about__logo-grid">
              {content.logos.map((item) => (
                <article key={item.label} className={`cp-about__logo-card cp-tone-${item.tone}`}>
                  <div className="cp-about__logo-badge">{item.label}</div>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
