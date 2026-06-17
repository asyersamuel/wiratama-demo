import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { IncidentRegister } from "@/features/erp/components/incident-register";
import { getIncidents } from "@/features/erp/service";

export default async function ErpIncidentsPage() {
  const seedIncidents = await getIncidents();

  return (
    <>
      <PortalPageIntro
        eyebrow="Incident Register"
        title="Daftar tiket insiden kawasan dengan status, severity, dan PIC."
        description="Daftar ini membaca seed incident yang sama dengan Dashboard dan halaman detail. Filter sederhana untuk pencarian cepat."
      />

      <SectionCard
        title="All Incidents"
        description="Cari tiket berdasarkan kode, judul, atau lokasi, lalu buka detail untuk melihat activity log dan lampiran."
      >
        <IncidentRegister seedIncidents={seedIncidents} />
      </SectionCard>
    </>
  );
}
