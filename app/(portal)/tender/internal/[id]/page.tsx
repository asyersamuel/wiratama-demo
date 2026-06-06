import { notFound } from "next/navigation";
import { listContractors } from "@/features/contractor/service";
import { InternalTenderReviewDetail } from "@/features/tender/components/internal-tender-review-detail";
import { getInternalReviewTenderById } from "@/features/tender/service";

type InternalTenderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InternalTenderDetailPage({
  params,
}: InternalTenderDetailPageProps) {
  const { id } = await params;
  const [tender, contractors] = await Promise.all([
    getInternalReviewTenderById(id),
    listContractors(),
  ]);

  if (!tender) {
    notFound();
  }

  return <InternalTenderReviewDetail contractors={contractors} tender={tender} />;
}
