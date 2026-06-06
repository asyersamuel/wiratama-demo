import Link from "next/link";
import { BarcodeSearch } from "@/components/shared/barcode-search";
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
        eyebrow="Barcode Tracking"
        title="Tracking cukup dibuat sederhana: scan barcode, lihat status, lalu buka event log."
        description="Untuk MVP tidak perlu integrasi scanner dulu. Input manual barcode sudah cukup untuk menyampaikan bahwa paket material dapat dilacak setelah tender berjalan."
      />

      <BarcodeSearch initialValue={items[0]?.barcode} />

      <SectionCard
        title="Sample tracked items"
        description="Gunakan salah satu barcode ini untuk demo cepat."
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
                Open tracking detail
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
