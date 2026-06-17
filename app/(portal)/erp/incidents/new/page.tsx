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
        eyebrow="Mini ERP · Pelaporan Insiden"
        title="Wizard pelaporan insiden kawasan 4 langkah."
        description="Catat insiden baru dengan wizard interaktif. Setelah dikirim, tiket akan tersimpan di demo store, muncul di Incident Register, dashboard, dan peta kawasan secara real-time."
      />

      <IncidentWizardForm
        seedIncidents={seedIncidents}
        zones={zones}
        picOptions={picOptions}
      />
    </>
  );
}
