import Link from "next/link";
import type { MasterplanContent } from "@/features/company-profile/types";

type MasterplanSectionProps = {
  content: MasterplanContent;
};

export function MasterplanSection({ content }: MasterplanSectionProps) {
  return (
    <section className="cp-section cp-masterplan">
      <div className="cp-shell">
        <div className="cp-masterplan__grid">
          <div className="cp-masterplan__copy">
            <p className="cp-section__eyebrow">{content.eyebrow}</p>
            <h2 className="cp-section__title">{content.title}</h2>
            <div className="cp-section__divider" />
            <p className="cp-section__body">{content.description}</p>
            <ul className="cp-masterplan__list">
              {content.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link href={content.cta.href} className="cp-masterplan__button">
              {content.cta.label}
            </Link>
          </div>
          <div className="cp-masterplan__media-wrap">
            <div className="cp-masterplan__media-border" />
            <div className={`cp-masterplan__media cp-tone-${content.tone}`}>
              <span className="cp-masterplan__play">Play</span>
              <div className="cp-masterplan__media-copy">
                <strong>{content.mediaLabel}</strong>
                <p>{content.mediaCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
