import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen items-center py-16">
      <section className="panel mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="eyebrow">Not Found</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-base leading-8 copy-muted">
          Route ini belum ada dalam scaffold MVP atau parameter detailnya tidak
          cocok dengan mock data yang tersedia.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Kembali ke home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Buka dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
