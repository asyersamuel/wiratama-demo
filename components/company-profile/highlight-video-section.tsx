import Link from "next/link";
import type { HighlightVideoContent } from "@/features/company-profile/types";

type HighlightVideoSectionProps = {
  content: HighlightVideoContent;
};

export function HighlightVideoSection({ content }: HighlightVideoSectionProps) {
  return (
    <section className="shell py-20">
      <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(120deg,#101725_0%,#24354a_38%,#785c26_100%)] px-6 py-14 text-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.55)] sm:px-10 sm:py-[4.5rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(90deg,rgba(10,14,22,0.36),rgba(10,14,22,0.08))]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-white/78">{content.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[30px] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm">
            <span className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/18 bg-white/15 text-2xl">
              ▶
            </span>
            <p className="mt-5 text-lg font-semibold tracking-[-0.03em]">{content.mediaLabel}</p>
            <Link href={content.action.href} className="btn mt-6 border border-white/20 bg-white/12 text-white hover:bg-white hover:text-slate-950">
              {content.action.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
