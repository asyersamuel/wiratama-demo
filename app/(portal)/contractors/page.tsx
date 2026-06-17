import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listContractors } from "@/features/contractor/service";

export default async function ContractorsPage() {
  const contractors = await listContractors();

  return (
    <div className="space-y-6">
      <PortalPageIntro
        eyebrow="Mode Internal PT WIP"
        title="Daftar Kontraktor"
        description="Direktori ini dipakai tim internal untuk melihat profil vendor, legalitas utama, bidang usaha, dan ringkasan pengalaman sebelum mengambil keputusan tender."
      />

      <SectionCard
        title="Profil vendor dan kontraktor"
        description="Setiap kartu menampilkan informasi legal dasar, verifikasi vendor, dan ringkasan rekam jejak pekerjaan."
      >
        <div className="grid gap-4">
          {contractors.map((contractor) => (
            <article
              key={contractor.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {contractor.name}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">{contractor.businessField}</p>
                </div>
                <StatusPill tone="success">{contractor.verificationStatus}</StatusPill>
              </div>

              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="code-label">Kategori</p>
                  <p className="mt-2 text-slate-700">{contractor.category}</p>
                </div>
                <div>
                  <p className="code-label">NIB</p>
                  <p className="mt-2 text-slate-700">{contractor.nib}</p>
                </div>
                <div>
                  <p className="code-label">PIC</p>
                  <p className="mt-2 text-slate-700">{contractor.picName}</p>
                </div>
                <div>
                  <p className="code-label">Skor rata-rata</p>
                  <p className="mt-2 text-slate-700">{contractor.averageScore}/100</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 copy-muted">{contractor.summary}</p>

              <Link href={`/contractors/${contractor.id}`} className="mt-5 btn btn-secondary w-fit">
                Lihat Profil
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
