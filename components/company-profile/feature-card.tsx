import Link from "next/link";
import type { PlaceholderTone, PublicLink } from "@/features/company-profile/types";

type FeatureCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
  items?: string[];
  tone?: PlaceholderTone;
  href?: PublicLink;
};

const toneClasses: Record<PlaceholderTone, string> = {
  gold: "border-amber-200/70 bg-amber-50/80",
  slate: "border-slate-200/80 bg-white/80",
  teal: "border-teal-200/70 bg-teal-50/70",
  emerald: "border-emerald-200/70 bg-emerald-50/75",
  copper: "border-orange-200/70 bg-orange-50/75",
  sand: "border-stone-200/80 bg-stone-50/85",
};

export function FeatureCard({
  title,
  description,
  eyebrow,
  items,
  tone = "slate",
  href,
}: FeatureCardProps) {
  return (
    <article
      className={`rounded-[28px] border p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.45)] ${toneClasses[tone]}`}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      {items?.length ? (
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {href ? (
        <Link
          href={href.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-[var(--accent)]"
        >
          {href.label}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
