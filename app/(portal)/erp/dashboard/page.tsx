import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { ErpDashboardSummary } from "@/features/erp/components/erp-dashboard-summary";
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
        eyebrow="Executive Dashboard"
        title="Ringkasan metrik estate, progress konstruksi, dan status insiden kawasan."
        description="Data insiden dibaca langsung dari Incident Register sehingga angka selalu konsisten dengan list dan halaman detail."
      />

      <ErpDashboardSummary
        seedIncidents={seedIncidents}
        seed={seed}
        zones={zones}
      />
    </>
  );
}
