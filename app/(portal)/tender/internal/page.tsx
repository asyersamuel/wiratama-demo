import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { InternalReviewList } from "@/features/tender/components/internal-review-list";
import { getTenders } from "@/features/tender/service";

export default async function InternalTenderPage() {
  const tenders = await getTenders();

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Mode Internal PT WIP"
        title="Review Tender"
        description="Halaman ini dipakai tim internal PT WIP untuk memilih tender yang memiliki proposal masuk, lalu melanjutkan review ke detail proposal vendor."
      />

      <InternalReviewList tenders={tenders} />
    </div>
  );
}
