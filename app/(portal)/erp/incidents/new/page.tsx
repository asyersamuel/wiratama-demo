import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { IncidentWizardForm } from "@/features/erp/components/incident-wizard-form";
import {
  getEstateZones,
  getIncidents,
  getPicOptions,
} from "@/features/erp/service";

export default async function ErpNewIncidentPage() {
  const [seedIncidents, zones, picOptions] = await Promise.all([
    getIncidents(),
    getEstateZones(),
    getPicOptions(),
  ]);

  return (
    <>
      <PortalPageIntro
        eyebrow="Report Incident"
        title="Initial Log laporan insiden kawasan."
        description="Catat laporan awal insiden dari Command Center. Setelah dikirim, tiket berstatus Reported dan diteruskan ke HSE / Operations untuk Impact Assessment, lalu Operations Manager untuk CAPA & Assignment."
      />

      <IncidentWizardForm
        seedIncidents={seedIncidents}
        zones={zones}
        picOptions={picOptions}
      />
    </>
  );
}
