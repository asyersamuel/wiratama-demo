import Link from "next/link";
import { BarcodeSearch } from "@/components/shared/barcode-search";
import { DemoNote } from "@/components/shared/demo-note";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listTrackingItems } from "@/features/tracking/service";
import { formatDate } from "@/lib/format";

export default async function TrackingPage() {
  const items = await listTrackingItems();

  return (
    <>
      <PortalPageIntro
        eyebrow="Operational Tracking Demo"
        title="Monitor materials or items through a simple barcode-based tracking demo."
        description="This page is intentionally separate from the tender review flow. It helps PT WIP demonstrate how operational tracking could be presented in the future."
      />

      <DemoNote>
        This separate demo shows how PT WIP could monitor materials or items operationally.
      </DemoNote>

      <BarcodeSearch initialValue={items[0]?.barcode} />

      <SectionCard
        title="Sample Tracking Items"
        description="Use one of these sample items to open the Operational Tracking Demo quickly during a presentation."
      >
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.barcode}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="code-label">{item.barcode}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {item.itemName}
                  </h2>
                </div>
                <StatusPill>{item.status}</StatusPill>
              </div>
              <p className="mt-4 text-sm copy-muted">
                {item.packageName} • {item.supplier}
              </p>
              <p className="mt-2 text-sm leading-7 copy-muted">
                Current location: {item.currentLocation}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                ETA / latest update: {formatDate(item.eta)}
              </p>
              <Link
                href={`/tracking/${item.barcode}`}
                className="mt-5 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Open Tracking Detail
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
