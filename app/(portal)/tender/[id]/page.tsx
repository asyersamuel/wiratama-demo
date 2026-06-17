import { notFound } from "next/navigation";
import { TenderDetailView } from "@/features/tender/components/tender-detail-view";
import { getTenderById, getTenders } from "@/features/tender/service";

export default async function TenderDetailPage(props: PageProps<"/tender/[id]">) {
  const { id } = await props.params;
  const [tender, allTenders] = await Promise.all([getTenderById(id), getTenders()]);

  if (!tender) {
    notFound();
  }

  return <TenderDetailView seedTenders={allTenders} tenderId={tender.id} />;
}
