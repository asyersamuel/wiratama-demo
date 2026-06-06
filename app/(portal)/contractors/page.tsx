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
        title="Histori kontraktor dipakai sebagai dasar shortlist dan award."
        description="Untuk proyek jangka panjang, nilai utamanya ada di memori institusional. Halaman ini menyimpan rekam jejak, spesialisasi, dan performa ringkas."
      />

      <SectionCard
        title="Contractor records"
        description="Tiga sampai lima record berkualitas lebih berguna untuk demo dibanding data yang terlalu banyak."
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
                    {contractor.specialization}
                  </p>
                </div>
                <StatusPill>{contractor.status}</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-7 copy-muted">{contractor.summary}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
                <span>{contractor.completedProjects} completed projects</span>
                <span>Score {contractor.averageScore}</span>
              </div>
              <Link
                href={`/contractors/${contractor.id}`}
                className="mt-5 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Open record
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
