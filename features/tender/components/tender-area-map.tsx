import { StatusPill } from "@/components/ui/status-pill";
import type { TenderAreaMapItem } from "@/features/tender/types";
import { getStatusLabel } from "@/lib/status";

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
  if (status === "open") {
    return "bg-emerald-600 ring-emerald-100";
  }

  if (status === "under_review") {
    return "bg-amber-500 ring-amber-100";
  }

  if (status === "shortlisting") {
    return "bg-[var(--accent)] ring-[#f3d7dd]";
  }

  if (status === "awarded") {
    return "bg-slate-900 ring-slate-200";
  }

  return "bg-slate-500 ring-slate-200";
}

export function TenderAreaMap({ audience, items }: TenderAreaMapProps) {
  return (
    <section className="tender-card overflow-hidden p-6 sm:p-7">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
        <div>
          <p className="code-label">Peta kawasan tender</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Sebaran area proyek dan status tender
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 copy-muted">
            {audienceCopy[audience]}
          </p>

          <div className="mt-5 overflow-hidden rounded-[28px] border border-[var(--line)] bg-white">
            <div className="relative h-[320px] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(143,34,52,0.14),transparent_28%),linear-gradient(180deg,#fffdfd_0%,#f8f4f4_100%)]">
              <div className="absolute inset-0 mesh-grid opacity-60" />
              <div className="absolute left-[8%] top-[12%] h-[28%] w-[24%] rounded-[28px] border border-dashed border-[#e7d6d9] bg-white/60" />
              <div className="absolute left-[36%] top-[24%] h-[34%] w-[26%] rounded-[32px] border border-dashed border-[#e7d6d9] bg-white/55" />
              <div className="absolute left-[66%] top-[10%] h-[26%] w-[20%] rounded-[26px] border border-dashed border-[#e7d6d9] bg-white/60" />

              {items.map((item) => (
                <div
                  key={item.tenderId}
                  className="absolute"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`flex h-4 w-4 rounded-full ring-4 ${getMarkerClasses(item.status)}`}
                    />
                    <div className="rounded-2xl border border-[var(--line)] bg-white/95 px-3 py-2 shadow-sm">
                      <p className="text-xs font-semibold text-slate-900">
                        {item.shortLabel}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 rounded-2xl border border-[var(--line)] bg-white/92 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Legend status
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {statusLegend.map((status) => (
                    <div key={status} className="flex items-center gap-2 text-xs text-slate-700">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getMarkerClasses(status).split(" ")[0]}`}
                      />
                      <span>{getStatusLabel(status)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.tenderId}
              className="rounded-[24px] border border-[var(--line)] bg-[#faf8f8] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="code-label">{item.markerLabel}</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">
                    {item.title}
                  </h3>
                </div>
                <StatusPill>{getStatusLabel(item.status)}</StatusPill>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                {item.zone} | {item.location}
              </p>
              <p className="mt-3 text-sm leading-7 copy-muted">{item.publicSummary}</p>
              {audience === "guest" && item.publicValueLabel ? (
                <p className="mt-3 text-sm font-medium text-slate-900">
                  {item.publicValueLabel}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
