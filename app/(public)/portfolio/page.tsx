import { PageHero } from "@/components/shared/page-hero";
import { SectionCard } from "@/components/ui/section-card";
import { getCompanyProfile } from "@/features/company-profile/service";

export default async function PortfolioPage() {
  const profile = await getCompanyProfile();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Portofolio dipakai sebagai jembatan ke histori kontraktor dan supplier."
        description="Untuk MVP ini, portfolio bukan sekadar daftar proyek. Setiap proyek menjadi bukti bahwa histori partner bisa dipakai kembali saat evaluasi tender baru."
      />

      <SectionCard
        title="Sample portfolio"
        description="Isi secukupnya agar sinkron dengan data contractor dan supplier di portal."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {profile.portfolio.map((item) => (
            <article
              key={item.name}
              className="rounded-[24px] border border-[var(--line)] bg-white/75 p-5"
            >
              <p className="code-label">{item.type}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                {item.name}
              </h2>
              <p className="mt-3 text-sm copy-muted">
                {item.location} • {item.completion}
              </p>
              <p className="mt-4 text-sm leading-7 copy-muted">{item.summary}</p>
              <p className="mt-4 text-sm font-medium text-slate-900">
                {item.partners}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
