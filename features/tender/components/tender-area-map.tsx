"use client";

import dynamic from "next/dynamic";
import { StatusPill } from "@/components/ui/status-pill";
import type { TenderAreaMapItem } from "@/features/tender/types";
import { getStatusLabel } from "@/lib/status";

const TenderRealMap = dynamic(
  () => import("@/features/tender/components/tender-real-map"),
  { ssr: false }
);

type TenderAreaMapProps = {
  audience: "vendor" | "internal" | "guest";
  items: TenderAreaMapItem[];
};

const audienceCopy = {
  vendor:
    "Peta area ini membantu vendor melihat sebaran tender aktif per zona sebelum membuka daftar paket secara rinci.",
  internal:
    "Peta area ini menampilkan sebaran paket tender per zona untuk membantu tim internal memantau fokus kawasan dan status prosesnya.",
  guest:
    "Peta area ini menampilkan ringkasan tender publik yang dapat dilihat calon vendor sebelum mengajukan akses portal.",
} as const;

const statusLegend: Array<TenderAreaMapItem["status"]> = [
  "open",
  "under_review",
  "shortlisting",
  "awarded",
];

function getMarkerClasses(status: TenderAreaMapItem["status"]) {
  if (status === "open") return "bg-emerald-600";
  if (status === "under_review") return "bg-amber-500";
  if (status === "shortlisting") return "bg-[var(--accent)]";
  if (status === "awarded") return "bg-slate-900";
  return "bg-slate-500";
}

export function TenderAreaMap({ audience, items }: TenderAreaMapProps) {
  return (
    <section className="tender-card overflow-hidden p-6 sm:p-7">
      <div className="grid gap-6 grid-cols-1">
        <div>
          <p className="code-label">Peta kawasan tender</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Sebaran area proyek dan status tender
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 copy-muted">
            {audienceCopy[audience]}
          </p>

          <div className="mt-5 overflow-hidden rounded-[28px] border border-[var(--line)] bg-white relative">
            <TenderRealMap items={items} audience={audience} />

            <div className="absolute bottom-4 left-4 z-[400] rounded-2xl border border-[var(--line)] bg-white/92 px-4 py-3 shadow-sm pointer-events-none">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Legend status
              </p>
              <div className="mt-3 flex flex-wrap gap-3 pointer-events-auto">
                {statusLegend.map((status) => (
                  <div key={status} className="flex items-center gap-2 text-xs text-slate-700">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${getMarkerClasses(status)}`}
                    />
                    <span>{getStatusLabel(status)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
