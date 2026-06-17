import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { getIncidents } from "@/features/erp/service";
import { MyActionsView } from "@/features/erp/components/my-actions-view";

export default async function MyActionsPage() {
  const seedIncidents = await getIncidents();

  return (
    <>
      <PortalPageIntro
        eyebrow="My Actions"
        title="Assigned actions yang memerlukan penanganan Anda."
        description="Daftar insiden yang ditugaskan kepada Anda dan masih aktif. SLA summary membantu memprioritaskan tindakan."
      />
      <MyActionsView seedIncidents={seedIncidents} />
    </>
  );
}
