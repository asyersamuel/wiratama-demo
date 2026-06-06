import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { Timeline } from "@/components/shared/timeline";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getTrackingItemByBarcode } from "@/features/tracking/service";
import { formatDate } from "@/lib/format";

type TrackingDetailPageProps = {
  params: Promise<{ barcode: string }>;
};

export default async function TrackingDetailPage({
  params,
}: TrackingDetailPageProps) {
  const { barcode } = await params;
  const item = await getTrackingItemByBarcode(decodeURIComponent(barcode));

  if (!item) {
    notFound();
  }

  return (
    <>
      <PortalPageIntro
        eyebrow={item.barcode}
        title={item.itemName}
        description={`Package ${item.packageName} dari ${item.supplier}.`}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard title="Tracking snapshot">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Current location: {item.currentLocation}</p>
            <p>Supplier: {item.supplier}</p>
            <p>Package: {item.packageName}</p>
            <p>ETA / latest checkpoint: {formatDate(item.eta)}</p>
            <div className="pt-2">
              <StatusPill>{item.status}</StatusPill>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Event log">
          <Timeline items={item.events} />
        </SectionCard>
      </section>
    </>
  );
}
