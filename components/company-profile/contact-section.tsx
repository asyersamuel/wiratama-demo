import type { ContactFormField, ContactInfo } from "@/features/company-profile/types";
import { PageSection } from "@/components/company-profile/page-section";
import { PlaceholderMedia } from "@/components/company-profile/placeholder-media";

type ContactSectionProps = {
  info: ContactInfo;
  fields: ContactFormField[];
};

export function ContactSection({ info, fields }: ContactSectionProps) {
  return (
    <PageSection
      eyebrow="Contact"
      title="A local-only contact interface closes the public profile."
      description="The form is intentionally static and does not submit to any backend service."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <form className="rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.45)]">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.label} className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-900">{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className="tender-input w-full"
                />
              </label>
            ))}
          </div>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-900">Project interest</span>
            <textarea
              placeholder="Tell us which product or development area you want to discuss."
              rows={5}
              className="tender-textarea w-full"
            />
          </label>
          <button type="button" className="btn btn-primary mt-6">
            Send inquiry
          </button>
        </form>
        <div className="space-y-6">
          <article className="rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {info.officeLabel}
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
              <p>{info.address}</p>
              <p>{info.phone}</p>
              <p>{info.email}</p>
              <p>{info.hours}</p>
            </div>
          </article>
          <PlaceholderMedia
            label="Map placeholder"
            caption="A static location block replaces any real map embeds or third-party scripts."
            tone="sand"
            aspect="landscape"
          />
        </div>
      </div>
    </PageSection>
  );
}
