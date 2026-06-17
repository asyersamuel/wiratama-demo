"use client";

import type { InfrastructureProgress } from "@/features/erp/types";

type InfrastructureProgressChartProps = {
  items: InfrastructureProgress[];
};

export function InfrastructureProgressChart({
  items,
}: InfrastructureProgressChartProps) {
  const averageActual = Math.round(
    items.reduce((sum, item) => sum + item.actual, 0) / items.length,
  );

  return (
    <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="code-label">Infrastructure</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Progress konstruksi kawasan
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Avg {averageActual}%
        </span>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const gap = item.target - item.actual;
          const isBehind = gap > 0;
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium text-slate-900">{item.label}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="copy-muted">
                    Target <span className="font-semibold">{item.target}%</span>
                  </span>
                  <span
                    className={
                      isBehind
                        ? "font-semibold text-rose-700"
                        : "font-semibold text-emerald-700"
                    }
                  >
                    Realisasi <span>{item.actual}%</span>
                  </span>
                </div>
              </div>

              <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-200/80">
                {/* Target marker */}
                <div
                  className="absolute top-0 h-full w-0.5 bg-slate-400/60"
                  style={{ left: `${item.target}%` }}
                />
                {/* Actual progress bar */}
                <div
                  className={`h-full rounded-full transition-all ${
                    isBehind
                      ? "bg-gradient-to-r from-rose-500 to-rose-400"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-500"
                  }`}
                  style={{ width: `${item.actual}%` }}
                />
              </div>

              {isBehind && (
                <p className="text-[11px] font-medium text-rose-600">
                  −{gap}% gap dari target
                </p>
              )}
              {!isBehind && (
                <p className="text-[11px] font-medium text-emerald-600">
                  +{Math.abs(gap)}% melampaui target
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
