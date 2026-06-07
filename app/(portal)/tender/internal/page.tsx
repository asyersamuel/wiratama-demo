import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { InternalReviewList } from "@/features/tender/components/internal-review-list";
import { getTenders } from "@/features/tender/service";

export default async function InternalTenderPage() {
  const tenders = await getTenders();

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="POV Internal PT WIP"
        title="Review Tender"
        description="Pilih tender yang memiliki proposal masuk, lalu lanjutkan ke detail review untuk membandingkan penawaran dan memperbarui status proposal secara lokal."
      />

      <InternalReviewList tenders={tenders} />
    </div>
  );
}
