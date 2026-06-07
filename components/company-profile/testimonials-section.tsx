import type { TestimonialItem } from "@/features/company-profile/types";
import { PageSection } from "@/components/company-profile/page-section";

type TestimonialsSectionProps = {
  items: TestimonialItem[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <PageSection
      eyebrow="Testimonials"
      title="A testimonial block still anchors social proof, but every voice is sanitized."
      description="Quotes, names, roles, and companies are replaced with generic stakeholders while keeping the same section weight."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={`${item.name}-${item.role}`}
            className="rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-[0_22px_80px_-42px_rgba(15,23,42,0.45)]"
          >
            <div className="flex items-start justify-between gap-6">
              <p className="text-5xl leading-none text-[var(--accent)]">“</p>
              <div
                className={`h-16 w-16 shrink-0 rounded-full border border-white/70 bg-gradient-to-br testimonial-badge--${item.tone}`}
              />
            </div>
            <p className="mt-5 text-base leading-8 text-slate-700">{item.quote}</p>
            <div className="mt-7 border-t border-[var(--line)] pt-5">
              <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{item.name}</p>
              <p className="mt-1 text-sm text-slate-600">
                {item.role} · {item.company}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
