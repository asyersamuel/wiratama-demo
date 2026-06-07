import Link from "next/link";
import type { HighlightVideoContent } from "@/features/company-profile/types";

type HighlightVideoSectionProps = {
  content: HighlightVideoContent;
};

export function HighlightVideoSection({ content }: HighlightVideoSectionProps) {
  return (
    <section className="cp-highlight">
      <div className="cp-highlight__overlay" />
      <div className="cp-shell cp-highlight__grid">
        <div className="cp-highlight__copy">
          <p className="cp-section__eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <div className="cp-highlight__play-wrap">
          <span className="cp-highlight__play">Play</span>
        </div>
        <div className="cp-highlight__aside">
          <p>{content.description}</p>
          <Link href={content.action.href}>{content.action.label}</Link>
        </div>
      </div>
    </section>
  );
}
