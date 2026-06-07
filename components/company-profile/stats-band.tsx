import type { HighlightStat } from "@/features/company-profile/types";

type StatsBandProps = {
  stats: HighlightStat[];
};

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <div className="shell relative z-10 -mt-16 pb-6 sm:-mt-20 sm:pb-10">
      <div className="grid gap-4 rounded-[32px] border border-white/70 bg-white/92 p-4 shadow-[0_26px_80px_-36px_rgba(15,23,42,0.42)] sm:grid-cols-2 lg:grid-cols-5 lg:p-6">
        {stats.map((item) => (
          <article key={item.label} className="rounded-[24px] bg-stone-50/90 p-5">
            <p className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">{item.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {item.label}
            </p>
            {item.note ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
