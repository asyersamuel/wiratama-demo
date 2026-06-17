"use client";

import dynamic from "next/dynamic";
import type { Incident } from "@/features/erp/types";

const ErpRealMap = dynamic(
  () => import("@/features/erp/components/erp-real-map"),
  { ssr: false },
);

type ErpMapPanelProps = {
  zones: unknown[];
  incidents: Incident[];
};

const severityLegend = [
  { label: "Critical", color: "bg-rose-700" },
  { label: "High", color: "bg-rose-600" },
  { label: "Medium", color: "bg-amber-600" },
  { label: "Low", color: "bg-slate-500" },
] as const;

export function ErpMapPanel({ incidents }: ErpMapPanelProps) {
  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "closed",
  );

  return (
    <div className="panel-strong flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="code-label">Estate Map</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Peta kawasan dan insiden aktif
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-900">
          {activeIncidents.length} active
        </span>
      </div>

      <div className="relative w-full overflow-hidden rounded-[18px] border border-[var(--line)] bg-gradient-to-br from-slate-50 to-slate-100/60">
        <ErpRealMap incidents={incidents} />

        <div className="absolute bottom-4 left-4 z-[400] rounded-2xl border border-[var(--line)] bg-white/92 px-4 py-3 shadow-sm pointer-events-none">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Legend severity
          </p>
          <div className="mt-3 flex flex-wrap gap-3 pointer-events-auto">
            {severityLegend.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-slate-700">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs copy-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-600" />
          Active incident marker
        </span>
        <span className="ml-auto text-xs copy-muted">
          Closed incidents tidak ditampilkan di peta
        </span>
      </div>
    </div>
  );
}
