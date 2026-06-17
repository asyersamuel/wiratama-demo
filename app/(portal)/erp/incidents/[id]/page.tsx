import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { IncidentDetailView } from "@/features/erp/components/incident-detail-view";
import { getIncidents } from "@/features/erp/service";

type ErpIncidentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ErpIncidentDetailPage(
  props: ErpIncidentDetailPageProps,
) {
  const { id } = await props.params;
  const seedIncidents = await getIncidents();

  return (
    <>
      <PortalPageIntro
        eyebrow="Mini ERP · Incident Detail"
        title="Detail tiket insiden kawasan."
        description="Halaman detail membaca seed incident yang sama dengan dashboard dan register. State demo akan menambahkan tiket baru yang dibuat dari form pelaporan insiden."
      />

      <IncidentDetailView
        incidentId={id}
        seedIncidents={seedIncidents}
      />
    </>
  );
}
