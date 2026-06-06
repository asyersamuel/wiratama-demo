import Link from "next/link";
import { notFound } from "next/navigation";
import { VendorProposalForm } from "@/features/tender/components/vendor-proposal-form";
import { getContractorById } from "@/features/contractor/service";
import { getTenderById } from "@/features/tender/service";
import { formatCurrency, formatDate } from "@/lib/format";

type TenderApplyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TenderApplyPage({
  params,
}: TenderApplyPageProps) {
  const { id } = await params;
  const [tender, vendor] = await Promise.all([
    getTenderById(id),
    getContractorById("prima-infrastruktur-abadi"),
  ]);

  if (!tender || !vendor) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link href={`/tender/${tender.id}`} className="btn btn-secondary px-4 py-2">
          Kembali ke Detail Tender
        </Link>
      </div>

      <section className="tender-card p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="code-label">Mode Vendor</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Ajukan Proposal
            </h1>
            <p className="mt-4 text-base leading-8 copy-muted">
              Halaman ini dipakai vendor untuk mengirim simulasi proposal ke tender
              yang sudah dipelajari pada tahap detail tender.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#ead8dc] bg-[#fcf7f8] p-5 xl:max-w-sm">
            <p className="code-label">Catatan MVP</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Semua aksi pada halaman ini bersifat local-only. Tidak ada database,
              upload file real, atau workflow approval produksi.
            </p>
          </div>
        </div>
      </section>

      <section className="tender-card p-6 sm:p-7">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="code-label">Ringkasan tender</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {tender.title}
          </h2>
        </div>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <dt className="code-label">Kode tender</dt>
            <dd className="mt-2 font-medium text-slate-900">{tender.code}</dd>
          </div>
          <div>
            <dt className="code-label">Deadline</dt>
            <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.deadline)}</dd>
          </div>
          <div>
            <dt className="code-label">Nilai estimasi</dt>
            <dd className="mt-2 font-medium text-slate-900">
              {formatCurrency(tender.estimatedValue)}
            </dd>
          </div>
          <div>
            <dt className="code-label">Target mulai</dt>
            <dd className="mt-2 font-medium text-slate-900">{formatDate(tender.startDate)}</dd>
          </div>
        </dl>
      </section>

      <VendorProposalForm
        tender={{
          id: tender.id,
          code: tender.code,
          title: tender.title,
          deadline: tender.deadline,
          startDate: tender.startDate,
        }}
        vendor={vendor}
        successCtas={[
          {
            href: "/tender/vendor",
            label: "Lihat Portal Vendor",
          },
          {
            href: `/tender/${tender.id}`,
            label: "Kembali ke Detail Tender",
            tone: "secondary",
          },
        ]}
      />
    </div>
  );
}
