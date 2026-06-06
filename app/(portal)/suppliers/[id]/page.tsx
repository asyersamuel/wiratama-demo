import { notFound } from "next/navigation";
import { PortalPageIntro } from "@/components/shared/portal-page-intro";
import { SectionCard } from "@/components/ui/section-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getSupplierById } from "@/features/supplier/service";

type SupplierDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SupplierDetailPage({
  params,
}: SupplierDetailPageProps) {
  const { id } = await params;
  const supplier = await getSupplierById(id);

  if (!supplier) {
    notFound();
  }

  return (
    <>
      <PortalPageIntro
        eyebrow="Supplier Detail"
        title={supplier.name}
        description={supplier.summary}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard title="Supplier snapshot">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Category: {supplier.category}</p>
            <p>Reliability score: {supplier.reliabilityScore}</p>
            <p>Lead time: {supplier.leadTime}</p>
            <div className="pt-2">
              <StatusPill>{supplier.status}</StatusPill>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Decision notes">
          <ul className="space-y-3 text-sm leading-7 text-slate-700">
            {supplier.notes.map((note) => (
              <li key={note} className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3">
                {note}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <SectionCard title="Supplied packages">
        <div className="grid gap-3 text-sm text-slate-700">
          {supplier.suppliedPackages.map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-[var(--line)] bg-white/75 px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
