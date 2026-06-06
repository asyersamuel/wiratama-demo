import { PageHero } from "@/components/shared/page-hero";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getCompanyProfile } from "@/features/company-profile/service";

export default async function DevelopmentPage() {
  const profile = await getCompanyProfile();

  return (
    <>
      <PageHero
        eyebrow="Development"
        title="Pipeline pengembangan kawasan industri dibungkus seperti corporate microsite."
        description="Halaman ini berfungsi sebagai layer presentasi publik. Tujuannya bukan detail GIS atau transaksi, tetapi memperlihatkan skala pengembangan dan kaitannya dengan future procurement."
      />

      <SectionCard
        title="Development areas"
        description="Tiga contoh cluster cukup untuk pitching tanpa membuat konten publik terlalu berat."
      >
        <div className="grid gap-4">
          {profile.developments.map((item) => (
            <article
              key={item.name}
              className="grid gap-4 rounded-[24px] border border-[var(--line)] bg-white/70 p-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
            >
              <div>
                <p className="code-label">{item.location}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm copy-muted">Area {item.area}</p>
              </div>
              <div>
                <StatusPill>{item.status}</StatusPill>
                <p className="mt-4 text-sm leading-7 copy-muted">{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
