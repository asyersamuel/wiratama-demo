import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { GuestTenderDirectory } from "@/features/tender/components/guest-tender-directory";
import { TenderAreaMap } from "@/features/tender/components/tender-area-map";
import { getGuestTenderCards, getTenderAreaMapItems } from "@/features/tender/service";

export default async function GuestTenderPage() {
  const [guestTenders, mapItems] = await Promise.all([
    getGuestTenderCards(),
    getTenderAreaMapItems("guest"),
  ]);

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="POV Guest"
        title="Dashboard Tender Publik"
        description="Halaman ini menampilkan informasi tender publik secara terbatas untuk calon vendor yang belum memiliki akses ke portal PT WIP."
      />

      <TenderAreaMap audience="guest" items={mapItems} />

      <GuestTenderDirectory tenders={guestTenders} />
    </div>
  );
}
