import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { Timeline } from "@/components/shared/timeline";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getTrackingRecordByBarcode } from "@/features/tracking/service";
import { formatDate, formatDateTime } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

type TrackingDetailPageProps = {
  params: Promise<{ barcode: string }>;
};

function getDocumentStatus(recordDocuments: Array<{ name: string; status: string }>, name: string) {
  return recordDocuments.find((document) => document.name === name)?.status ?? "Not available";
}

export default async function TrackingDetailPage({
  params,
}: TrackingDetailPageProps) {
  const { barcode } = await params;
  const record = await getTrackingRecordByBarcode(decodeURIComponent(barcode));

  if (!record) {
    notFound();
  }

  return (
    <>
      <PortalPageIntro
        eyebrow="Gate Tracking Record"
        title={record.barcode}
        description={`${record.contractorName} membawa ${record.materialName} dari ${record.supplierName} menuju ${record.destinationZone}.`}
      />

      <div className="flex flex-wrap gap-2">
        <StatusPill>{getStatusLabel(record.legalStatus)}</StatusPill>
        <StatusPill>{getStatusLabel(record.riskLevel)}</StatusPill>
        <StatusPill>{getStatusLabel(record.gateStatus)}</StatusPill>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Contractor", value: record.contractorName },
          { label: "Supplier", value: record.supplierName },
          { label: "Vehicle", value: record.vehiclePlate },
          { label: "Driver", value: record.driverName },
          { label: "Destination Zone", value: record.destinationZone },
        ].map((item) => (
          <article key={item.label} className="panel p-5">
            <p className="code-label">{item.label}</p>
            <p className="mt-4 text-lg font-semibold text-slate-950">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard
          title="Contractor & Supplier Information"
          description="Use this section to identify operational accountability before the vehicle is allowed into the estate."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5">
              <p className="code-label">Contractor</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{record.contractorName}</p>
              <p className="mt-2 text-sm copy-muted">PIC: {record.contractorPic}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5">
              <p className="code-label">Supplier</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{record.supplierName}</p>
              <p className="mt-2 text-sm copy-muted">Origin: {record.supplierOrigin}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-950">Legal status:</span>{" "}
              {getStatusLabel(record.legalStatus)}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Risk notes:</span>{" "}
              {record.riskNotes ?? "No additional risk notes for this record."}
            </p>
          </div>
        </SectionCard>

        <SectionCard
          title="Vehicle & Driver Information"
          description="Vehicle and driver identity help the gate team confirm that the incoming unit matches the approved access plan."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5">
              <p className="code-label">Vehicle</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{record.vehiclePlate}</p>
              <p className="mt-2 text-sm copy-muted">{record.vehicleType}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5">
              <p className="code-label">Driver</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{record.driverName}</p>
              <p className="mt-2 text-sm copy-muted">ID: {record.driverId}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-950">Driver ID status:</span>{" "}
              {getStatusLabel(getDocumentStatus(record.documents, "Driver ID"))}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Vehicle document status:</span>{" "}
              {getStatusLabel(getDocumentStatus(record.documents, "Vehicle Document"))}
            </p>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard
          title="Material / Goods Information"
          description="Operational teams can validate the type, quantity, and destination of the incoming material before unloading."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="code-label">Material</p>
              <p className="mt-2 text-sm text-slate-700">{record.materialName}</p>
            </div>
            <div>
              <p className="code-label">Category</p>
              <p className="mt-2 text-sm text-slate-700">{record.materialCategory}</p>
            </div>
            <div>
              <p className="code-label">Quantity</p>
              <p className="mt-2 text-sm text-slate-700">
                {record.quantity} {record.unit}
              </p>
            </div>
            <div>
              <p className="code-label">Origin</p>
              <p className="mt-2 text-sm text-slate-700">{record.origin}</p>
            </div>
            <div>
              <p className="code-label">Destination Zone</p>
              <p className="mt-2 text-sm text-slate-700">{record.destinationZone}</p>
            </div>
            <div>
              <p className="code-label">Work Area</p>
              <p className="mt-2 text-sm text-slate-700">{record.workArea}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Gate Verification"
          description="This section summarizes the latest verification decision at the gate for the selected tracking record."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="code-label">Gate Status</p>
              <p className="mt-2 text-sm text-slate-700">{getStatusLabel(record.gateStatus)}</p>
            </div>
            <div>
              <p className="code-label">Gate Officer</p>
              <p className="mt-2 text-sm text-slate-700">{record.gateOfficer}</p>
            </div>
            <div>
              <p className="code-label">Scheduled Date</p>
              <p className="mt-2 text-sm text-slate-700">{formatDate(record.scheduledDate)}</p>
            </div>
            <div>
              <p className="code-label">Entry Time</p>
              <p className="mt-2 text-sm text-slate-700">
                {record.entryTime ? formatDateTime(record.entryTime) : "Not recorded"}
              </p>
            </div>
            <div>
              <p className="code-label">Exit Time</p>
              <p className="mt-2 text-sm text-slate-700">
                {record.exitTime ? formatDateTime(record.exitTime) : "Not recorded"}
              </p>
            </div>
            <div>
              <p className="code-label">Verification Notes</p>
              <p className="mt-2 text-sm text-slate-700">{record.verificationNotes}</p>
            </div>
          </div>
          {record.rejectionReason ? (
            <div className="mt-5 rounded-[22px] border border-[#ecd7db] bg-[#fcf7f8] p-4">
              <p className="code-label">Rejection Reason</p>
              <p className="mt-2 text-sm text-slate-700">{record.rejectionReason}</p>
            </div>
          ) : null}
        </SectionCard>
      </section>

      <SectionCard
        title="Documents"
        description="Gate verification relies on quick visibility into delivery, supplier, driver, and vehicle documents."
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
            <thead>
              <tr>
                {["Document", "Status", "Note"].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-[var(--line)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {record.documents.map((document) => (
                <tr key={document.name}>
                  <td className="border-b border-[var(--line)] px-4 py-4 font-medium text-slate-950">
                    {document.name}
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4">
                    <StatusPill>{getStatusLabel(document.status)}</StatusPill>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-4">{document.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <SectionCard
          title="Event Timeline"
          description="The timeline shows how the record moved from barcode generation to gate decision and final site movement."
        >
          <Timeline items={record.events} />
        </SectionCard>

        <SectionCard
          title="Visual-only Actions"
          description="These controls are presentation-only in the MVP and do not change any underlying data."
        >
          <div className="grid gap-3">
            <button
              type="button"
              className="btn btn-primary w-full justify-center"
            >
              Approve Entry
            </button>
            <button
              type="button"
              className="btn btn-secondary-accent w-full justify-center"
            >
              Hold for Review
            </button>
            <button
              type="button"
              className="rounded-full border border-[#dfb0b9] bg-white px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
            >
              Reject Entry
            </button>
            <button
              type="button"
              className="btn btn-secondary w-full justify-center"
            >
              Add Verification Note
            </button>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
