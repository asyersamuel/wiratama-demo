import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { getCompanyProfile } from "@/features/company-profile/service";

export default async function HomePage() {
  const profile = await getCompanyProfile();

  return (
    <>
      <PageHero
        eyebrow="Company Profile + Procurement"
        title="Satu MVP untuk mempresentasikan kawasan, tender, histori kontraktor, dan gate & supply tracking."
        description={profile.description}
        stats={profile.highlights.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        actions={
          <>
            <Link
              href="/dashboard"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open demo dashboard
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              View portfolio
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {profile.highlights.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            hint={item.note}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <SectionCard
          title="Empat fitur utama MVP"
          description="Struktur dibangun untuk fokus flow presentasi, bukan integrasi database."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Company profile",
                copy: "Home, development, dan portfolio untuk membangun trust sejak slide pertama.",
              },
              {
                title: "Tender management",
                copy: "Tender catalog, tender detail, apply flow, vendor dashboard, dan internal review workspace ada dalam satu aplikasi.",
              },
              {
                title: "Contractor and supplier history",
                copy: "Histori 30 tahun disimulasikan lewat score, proyek terdahulu, dan partner notes.",
              },
              {
                title: "Gate & supply tracking",
                copy: "Separate operational tracking demo untuk contractor, supplier, kendaraan, driver, dan material entry berbasis barcode record.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-[var(--line)] bg-white/70 p-5"
              >
                <p className="font-semibold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-7 copy-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Pitch flow yang disarankan"
          description="Urutan ini membuat narasi dari trust menuju decision support."
        >
          <ol className="space-y-4 text-sm leading-7 text-slate-700">
            <li>1. Tunjukkan konteks company, kawasan, dan portfolio.</li>
            <li>2. Pindah ke dashboard untuk melihat command center proyek.</li>
            <li>3. Masuk ke tender untuk browse catalog lalu buka tender detail.</li>
            <li>4. Tunjukkan apply page dan Vendor Portal sebagai flow dari sisi eksternal.</li>
            <li>5. Buka Internal View untuk decision support dan comparison.</li>
            <li>6. Buka histori contractor untuk konteks partner.</li>
            <li>7. Tutup dengan gate & supply tracking sebagai demo operasional terpisah.</li>
          </ol>
        </SectionCard>
      </section>
    </>
  );
}
