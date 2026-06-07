import Link from "next/link";
import type { CtaContent } from "@/features/company-profile/types";

type CtaSectionProps = {
  content: CtaContent;
};

export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section className="shell py-20">
      <div className="rounded-[36px] bg-[linear-gradient(135deg,#111827_0%,#202d3d_58%,#6b4f1d_100%)] px-6 py-12 text-white shadow-[0_28px_100px_-44px_rgba(15,23,42,0.62)] sm:px-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/76">{content.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {content.actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={
                  action.variant === "secondary"
                    ? "btn border border-white/18 bg-white/10 text-white hover:bg-white hover:text-slate-950"
                    : "btn btn-primary"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
