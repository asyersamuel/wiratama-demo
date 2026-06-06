import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listContractors } from "@/features/contractor/service";

export default async function ContractorsPage() {
  const contractors = await listContractors();

  return (
    <>
      <PortalPageIntro
        eyebrow="Contractor History"
        title="Contractor History for Tender Evaluation"
        description="Use this page to explain how PT WIP can review external contractor records, project history, and performance context while evaluating tender packages."
      />

      <SectionCard
        title="External Contractor Records"
        description="The navbar stays simple with the label Contractors, while this page represents the broader external partner history used during internal review."
      >
        <div className="grid gap-4">
          {contractors.map((contractor) => (
            <article
              key={contractor.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {contractor.name}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">
                    {contractor.type.charAt(0).toUpperCase() + contractor.type.slice(1)} / {contractor.category}
                  </p>
                </div>
                <StatusPill>{contractor.status}</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-7 copy-muted">
                {contractor.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
                <span>{contractor.completedProjects} completed projects</span>
                <span>Score {contractor.averageScore}</span>
              </div>
              <Link
                href={`/contractors/${contractor.id}`}
                className="mt-5 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-slate-950"
              >
                View Contractor History
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
