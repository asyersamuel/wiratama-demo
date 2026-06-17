import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { ErpDashboardSummary } from "@/features/erp/components/erp-dashboard-summary";
import { ResetErpDemoButton } from "@/features/erp/components/reset-erp-demo-button";
import {
  getErpDashboardSeed,
  getEstateZones,
  getIncidents,
} from "@/features/erp/service";

export default async function ErpDashboardPage() {
  const [seed, seedIncidents, zones] = await Promise.all([
    getErpDashboardSeed(),
    getIncidents(),
    getEstateZones(),
  ]);

  return (
    <>
      <PortalPageIntro
        eyebrow="Mini ERP · Dashboard"
        title="Executive dashboard untuk area operasional kawasan."
        description="Ringkasan metrik estate, progress konstruksi, dan status insiden kawasan. Data insiden dibaca langsung dari Incident Register sehingga angka selalu konsisten dengan list dan halaman detail."
      />

      <ErpDashboardSummary
        seedIncidents={seedIncidents}
        seed={seed}
        zones={zones}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/erp"
          className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
        >
          Back to Mini ERP Home
        </Link>
        <ResetErpDemoButton />
      </div>
    </>
  );
}
