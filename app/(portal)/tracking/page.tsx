import Link from "next/link";
import { BarcodeSearch } from "@/components/shared/barcode-search";
import { DemoNote } from "@/components/shared/demo-note";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import {
  getFlaggedTrackingRecords,
  getRecentGateEntries,
  getTrackingRecords,
  getTrackingStats,
} from "@/features/tracking/service";
import { formatDate } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function TrackingPage() {
  const [records, stats, recentEntries, attentionEntries] = await Promise.all([
    getTrackingRecords(),
    getTrackingStats(),
    getRecentGateEntries(),
    getFlaggedTrackingRecords(),
  ]);

  const sampleBarcodes = records.map((record) => record.barcode);

  return (
    <>
      <PortalPageIntro
        eyebrow="Tracking"
        title="Gate & Supply Tracking"
        description="Track contractors, suppliers, vehicles, drivers, and materials entering the industrial estate."
      />

      <DemoNote>
        This module tracks operational access into the estate and is separate from tender
        selection.
      </DemoNote>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="today's entries"
          value={String(stats.todaysEntries)}
          hint="Total gate tracking records prepared for today's operational demo."
        />
        <MetricCard
          label="pending verification"
          value={String(stats.pendingVerification)}
          hint="Entries that still need document completion or supervisor review."
        />
        <MetricCard
          label="flagged supplies"
          value={String(stats.flaggedSupplies)}
          hint="Supplies with legal or document issues that need immediate attention."
        />
        <MetricCard
          label="approved vehicles"
          value={String(stats.approvedVehicles)}
          hint="Vehicles that passed gate verification and received access approval."
        />
      </section>

      <BarcodeSearch
        initialValue={sampleBarcodes[0]}
        validBarcodes={sampleBarcodes}
        sampleBarcodes={sampleBarcodes}
      />

      <SectionCard
        title="Recent Gate Entries"
        description="Use this queue to inspect contractor responsibility, supplier legality, vehicle identity, and material movement at a glance."
      >
        <div className="grid gap-4">
          {recentEntries.map((record) => (
            <article
              key={record.barcode}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="code-label">{record.barcode}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {record.contractorName}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">
                    {record.supplierName} | {record.vehiclePlate} | {record.driverName}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill>{getStatusLabel(record.legalStatus)}</StatusPill>
                  <StatusPill>{getStatusLabel(record.riskLevel)}</StatusPill>
                  <StatusPill>{getStatusLabel(record.gateStatus)}</StatusPill>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-5">
                <div>
                  <p className="code-label">Supplier</p>
                  <p className="mt-2">{record.supplierName}</p>
                </div>
                <div>
                  <p className="code-label">Vehicle</p>
                  <p className="mt-2">{record.vehiclePlate}</p>
                </div>
                <div>
                  <p className="code-label">Driver</p>
                  <p className="mt-2">{record.driverName}</p>
                </div>
                <div>
                  <p className="code-label">Material</p>
                  <p className="mt-2">
                    {record.materialName} ({record.quantity} {record.unit})
                  </p>
                </div>
                <div>
                  <p className="code-label">Scheduled</p>
                  <p className="mt-2">{formatDate(record.scheduledDate)}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
                <p className="text-sm copy-muted">
                  Destination: {record.destinationZone} | Work area: {record.workArea}
                </p>
                <Link href={`/tracking/${record.barcode}`} className="btn btn-secondary px-4 py-2">
                  View Detail
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      {attentionEntries.length ? (
        <SectionCard
          title="Attention Required"
          description="Held, flagged, or rejected records stay visible here so operational risks are easy to present during the demo."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {attentionEntries.map((record) => (
              <article
                key={record.barcode}
                className="rounded-[24px] border border-[#ecd7db] bg-[#fcf7f8] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{record.barcode}</p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-950">
                      {record.materialName}
                    </h2>
                    <p className="mt-2 text-sm copy-muted">
                      {record.contractorName} | {record.supplierName}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill>{getStatusLabel(record.legalStatus)}</StatusPill>
                    <StatusPill>{getStatusLabel(record.gateStatus)}</StatusPill>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {record.rejectionReason ?? record.verificationNotes}
                </p>
                <Link
                  href={`/tracking/${record.barcode}`}
                  className="mt-5 inline-flex rounded-full border border-[#d7b6bf] px-4 py-2 text-sm font-semibold text-[var(--accent)]"
                >
                  Review Record
                </Link>
              </article>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}
