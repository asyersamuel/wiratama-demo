import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getContractorById } from "@/features/contractor/service";
import { formatDate } from "@/lib/format";

type ContractorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContractorDetailPage({
  params,
}: ContractorDetailPageProps) {
  const { id } = await params;
  const contractor = await getContractorById(id);

  if (!contractor) {
    notFound();
  }

  return (
    <>
      <PortalPageIntro
        eyebrow="Contractor Detail"
        title={contractor.name}
        description={contractor.summary}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionCard title="Profile">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Specialization: {contractor.specialization}</p>
            <p>Last award: {formatDate(contractor.lastAward)}</p>
            <p>Completed projects: {contractor.completedProjects}</p>
            <p>Average score: {contractor.averageScore}</p>
            <p>On-time record: {contractor.onTimeRecord}</p>
            <div className="pt-2">
              <StatusPill>{contractor.status}</StatusPill>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Why keep this record">
          <ul className="space-y-3 text-sm leading-7 text-slate-700">
            {contractor.strengths.map((item) => (
              <li key={item} className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <SectionCard
        title="Project history"
        description="Riwayat ini yang nantinya bisa tumbuh menjadi basis keputusan jangka panjang."
      >
        <div className="grid gap-4">
          {contractor.history.map((item) => (
            <article
              key={`${item.project}-${item.year}`}
              className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{item.project}</p>
                  <p className="mt-1 text-sm copy-muted">
                    {item.packageName} • {item.year}
                  </p>
                </div>
                <StatusPill>{item.result}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
