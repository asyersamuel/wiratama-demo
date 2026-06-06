import Link from "next/link";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { listSuppliers } from "@/features/supplier/service";

export default async function SuppliersPage() {
  const suppliers = await listSuppliers();

  return (
    <>
      <PortalPageIntro
        eyebrow="Supplier Records"
        title="Supplier history membantu evaluasi tender, bukan berdiri sendiri."
        description="Ini sengaja dipisah dari contractor agar saat pitching kamu bisa menunjukkan dua lapisan keputusan: siapa membangun dan siapa memasok."
      />

      <SectionCard
        title="Supplier records"
        description="Formatnya ringkas: kategori, reliability, lead time, dan catatan risiko."
      >
        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <article
              key={supplier.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {supplier.name}
                  </h2>
                  <p className="mt-2 text-sm copy-muted">{supplier.category}</p>
                </div>
                <StatusPill>{supplier.status}</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-7 copy-muted">{supplier.summary}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
                <span>Reliability {supplier.reliabilityScore}</span>
                <span>Lead time {supplier.leadTime}</span>
              </div>
              <Link
                href={`/suppliers/${supplier.id}`}
                className="mt-5 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Open supplier
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
