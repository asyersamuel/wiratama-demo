import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listContractors } from "@/features/contractor/service";
import { listSuppliers } from "@/features/supplier/service";
import { getTenders } from "@/features/tender/service";
import { listTrackingItems } from "@/features/tracking/service";
import { formatCompactCurrency } from "@/lib/format";
import { getStatusLabel } from "@/lib/status";

export default async function DashboardPage() {
  const [tenders, contractors, suppliers, trackingItems] = await Promise.all([
    getTenders(),
    listContractors(),
    listSuppliers(),
    listTrackingItems(),
  ]);

  return (
    <>
      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <PortalPageIntro
            eyebrow="Dashboard"
            title="Ringkasan flow utama untuk pitching"
            description="Dashboard ini sengaja dibuat sebagai command center yang langsung memetakan decision flow: tender aktif, histori partner, dan material tracking."
          />

          <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 xl:max-w-sm">
            <p className="code-label">Demo Flow</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Presentasi bisa bergerak lurus dari dashboard ke tender, lalu turun ke vendor, internal review, contractor history, dan tracking tanpa perlu berpindah pola navigasi.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="active tenders"
          value={String(tenders.length)}
          hint="Paket prioritas yang sedang dipresentasikan."
        />
        <MetricCard
          label="shortlisted contractors"
          value={String(contractors.filter((item) => item.status !== "Under review").length)}
          hint="Siap dipakai untuk evaluasi cepat."
        />
        <MetricCard
          label="supplier records"
          value={String(suppliers.length)}
          hint="Riwayat performa dan lead time mock."
        />
        <MetricCard
          label="tracked materials"
          value={String(trackingItems.length)}
          hint="Contoh item yang bisa discan selama demo."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <SectionCard
          title="Tender pulse"
          description="Setiap tender menyambungkan alur publik, vendor, evaluasi internal, dan histori partner."
        >
          <div className="space-y-4">
            {tenders.map((tender) => (
              <article
                key={tender.id}
                className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-label">{tender.code}</p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-950">
                      {tender.title}
                    </h2>
                  </div>
                  <StatusPill>{getStatusLabel(tender.status)}</StatusPill>
                </div>
                <p className="mt-3 text-sm leading-7 copy-muted">
                  {tender.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                  <span>{tender.location}</span>
                  <span>{formatCompactCurrency(tender.estimatedValue)}</span>
                  <span>{tender.proposals.length} proposals</span>
                </div>
                <Link
                  href={`/tender/${tender.id}`}
                  className="mt-5 btn btn-secondary px-4 py-2 w-fit"
                >
                  Open tender detail
                </Link>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recommended pitch path"
          description="Urutan singkat agar demo tetap rapih dan waktunya terjaga."
        >
          <ol className="space-y-4 text-sm leading-7 text-slate-700">
            <li>1. Dashboard untuk konteks cepat tentang scope MVP.</li>
            <li>2. Tender untuk masuk ke pencarian paket dan detail tender.</li>
            <li>3. Vendor Portal untuk menunjukkan experience dari sisi eksternal.</li>
            <li>4. Internal View untuk menunjukkan pemilihan partner.</li>
            <li>5. Contractor record sebagai justifikasi histori.</li>
            <li>6. Tracking untuk menunjukkan nilai operasional sesudah award.</li>
          </ol>
        </SectionCard>
      </section>
    </>
  );
}
