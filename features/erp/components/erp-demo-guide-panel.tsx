import Link from "next/link";

type ErpDemoGuidePanelProps = {
  variant?: "landing" | "dashboard";
};

const demoSteps = [
  {
    step: 1,
    title: "Buka Dashboard Eksekutif",
    description:
      "Tunjukkan ringkasan kawasan: lahan, progress konstruksi, insiden aktif, kerugian operasional.",
    cta: { href: "/erp/dashboard", label: "Buka Dashboard" },
  },
  {
    step: 2,
    title: "Buat Laporan Insiden",
    description:
      "Jalankan wizard 4 langkah untuk membuat tiket insiden baru yang langsung tersinkronisasi.",
    cta: { href: "/erp/incidents/new", label: "Buat Insiden" },
  },
  {
    step: 3,
    title: "Jalankan workflow sampai Closed",
    description:
      "Transisi tiket melalui Reported → Under Investigation → Action Taken → Resolved → Closed.",
  },
  {
    step: 4,
    title: "Lihat perubahan real-time",
    description:
      "Active count, kerugian aktif, dan pin peta kawasan berubah otomatis mengikuti status tiket.",
  },
];

export function ErpDemoGuidePanel({
  variant = "landing",
}: ErpDemoGuidePanelProps) {
  return (
    <div className="panel rounded-[24px] border border-[var(--accent-soft)] p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="code-label">Demo Flow</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
            {variant === "dashboard"
              ? "Skenario demo pitching 5–7 menit"
              : "Alur demo untuk pitching"}
          </h2>
          <p className="mt-1 text-sm copy-muted">
            Ikuti empat langkah di bawah ini untuk menunjukkan end-to-end flow
            Mini ERP secara konsisten.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Presenter Guide
        </span>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {demoSteps.map((item) => (
          <li
            key={item.step}
            className="rounded-[18px] border border-[var(--line)] bg-white/75 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                {item.step}
              </span>
              <p className="text-sm font-semibold text-slate-950">
                {item.title}
              </p>
            </div>
            <p className="mt-2 text-xs leading-6 copy-muted">
              {item.description}
            </p>
            {item.cta ? (
              <Link
                href={item.cta.href}
                className="mt-3 inline-flex rounded-full border border-[var(--accent)] px-3 py-1.5 text-[11px] font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
              >
                {item.cta.label}
              </Link>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
