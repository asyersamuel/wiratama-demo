import type { PlaceholderTone } from "@/features/company-profile/types";

type PlaceholderMediaProps = {
  label: string;
  caption?: string;
  tone?: PlaceholderTone;
  aspect?: "wide" | "landscape" | "portrait" | "square";
  playButton?: boolean;
  className?: string;
};

const toneClasses: Record<PlaceholderTone, string> = {
  gold: "from-amber-200 via-amber-50 to-stone-100 text-amber-950",
  slate: "from-slate-300 via-slate-100 to-stone-50 text-slate-950",
  teal: "from-teal-200 via-cyan-50 to-stone-100 text-teal-950",
  emerald: "from-emerald-200 via-emerald-50 to-stone-100 text-emerald-950",
  copper: "from-orange-200 via-amber-50 to-stone-100 text-orange-950",
  sand: "from-stone-300 via-stone-100 to-white text-stone-900",
};

const aspectClasses = {
  wide: "aspect-[16/7]",
  landscape: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PlaceholderMedia({
  label,
  caption,
  tone = "slate",
  aspect = "landscape",
  playButton,
  className,
}: PlaceholderMediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.42)]",
        toneClasses[tone],
        aspectClasses[aspect],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),transparent_55%)]" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-current/20" />
      <div className="absolute bottom-5 right-5 h-16 w-16 rounded-full border border-current/25" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full border border-current/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]">
            Placeholder
          </span>
          {playButton ? (
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-current/20 bg-white/50 text-lg">
              ▶
            </span>
          ) : null}
        </div>
        <div className="max-w-sm">
          <p className="text-2xl font-semibold tracking-[-0.04em]">{label}</p>
          {caption ? <p className="mt-3 text-sm leading-7 text-current/75">{caption}</p> : null}
        </div>
      </div>
    </div>
  );
}
