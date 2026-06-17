import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getContractorById } from "@/features/contractor/service";
import { formatCurrency } from "@/lib/format";

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
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Profil Kontraktor / Vendor"
        title={contractor.name}
        description="Profil ini membantu tim internal PT WIP memeriksa legalitas, kontak utama, bidang usaha, dan pengalaman proyek vendor sebelum finalisasi review tender."
      />

      <div className="flex flex-wrap gap-3">
        <Link href="/tender/internal" className="btn btn-secondary-accent">
          Kembali ke Review Tender
        </Link>
        <Link href="/contractors" className="btn btn-secondary">
          Kembali ke Daftar Kontraktor
        </Link>
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard title="Profil Perusahaan">
          <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
            <div>
              <p className="code-label">Kategori</p>
              <p className="mt-2">{contractor.category}</p>
            </div>
            <div>
              <p className="code-label">Status verifikasi</p>
              <div className="mt-2">
                <StatusPill tone="success">{contractor.verificationStatus}</StatusPill>
              </div>
            </div>
            <div>
              <p className="code-label">NIB</p>
              <p className="mt-2">{contractor.nib}</p>
            </div>
            <div>
              <p className="code-label">NPWP</p>
              <p className="mt-2">{contractor.npwp}</p>
            </div>
            <div>
              <p className="code-label">PIC</p>
              <p className="mt-2">
                {contractor.picName} · {contractor.picTitle}
              </p>
            </div>
            <div>
              <p className="code-label">Kontak</p>
              <p className="mt-2">
                {contractor.email}
                <br />
                {contractor.phone}
              </p>
            </div>
            <div>
              <p className="code-label">Bidang usaha</p>
              <p className="mt-2">{contractor.businessField}</p>
            </div>
            <div>
              <p className="code-label">Klasifikasi usaha</p>
              <p className="mt-2">{contractor.businessClassification}</p>
            </div>
            <div>
              <p className="code-label">Tahun berdiri</p>
              <p className="mt-2">{contractor.establishedYear}</p>
            </div>
            <div>
              <p className="code-label">Jumlah tenaga kerja</p>
              <p className="mt-2">{contractor.workforceCount} orang</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="code-label">Alamat</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">{contractor.address}</p>
          </div>

          <div className="mt-5">
            <p className="code-label">Area operasional</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {contractor.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[var(--line)] bg-white/75 px-3 py-2 text-sm text-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Ringkasan Kinerja">
          <p className="text-sm leading-7 text-slate-700">{contractor.summary}</p>
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
              <p className="code-label">Spesialisasi</p>
              <p className="mt-2 text-slate-700">{contractor.specialization}</p>
            </div>
            <div className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
              <p className="code-label">On-time record</p>
              <p className="mt-2 text-slate-700">{contractor.onTimeRecord}</p>
            </div>
            <div className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
              <p className="code-label">Proyek selesai</p>
              <p className="mt-2 text-slate-700">{contractor.completedProjects}</p>
            </div>
            <div className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
              <p className="code-label">Skor rata-rata</p>
              <p className="mt-2 text-slate-700">{contractor.averageScore}/100</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {contractor.performanceSummary.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Dokumen Legal"
        description="Dokumen berikut ditampilkan sebagai ringkasan legalitas vendor untuk kebutuhan review tender demo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {contractor.legalDocuments.map((document) => (
            <article
              key={document.name}
              className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{document.name}</p>
                  {document.note ? (
                    <p className="mt-2 text-sm copy-muted">{document.note}</p>
                  ) : null}
                </div>
                <StatusPill tone="success">{document.status}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Pengalaman Proyek"
        description="Ringkasan pengalaman proyek sejenis untuk memperkuat validasi teknis vendor."
      >
        <div className="grid gap-4">
          {contractor.projectExperiences.map((experience) => (
            <article
              key={`${experience.projectName}-${experience.year}`}
              className="rounded-[22px] border border-[var(--line)] bg-white/75 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{experience.projectName}</p>
                  <p className="mt-1 text-sm copy-muted">
                    {experience.client} · {experience.year}
                  </p>
                </div>
                <StatusPill>{experience.result}</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">{experience.scope}</p>
              <p className="mt-3 text-sm font-medium text-slate-900">
                Nilai kontrak: {formatCurrency(experience.contractValue)}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Histori Pekerjaan"
        description="Preview histori tender dan pekerjaan yang pernah diikuti vendor untuk membantu konteks evaluasi."
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
                    {item.packageName} · {item.year}
                  </p>
                </div>
                <StatusPill>{item.result}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
