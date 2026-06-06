import Link from "next/link";
import { PortalNav } from "@/components/shared/portal-nav";

type PortalShellProps = {
  children: React.ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="shell grid min-h-screen gap-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="panel h-fit p-5 lg:sticky lg:top-6">
        <div className="rounded-[24px] bg-[var(--accent)] p-5 text-white">
          <p className="code-label text-white/65">Demo Mode</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            Procurement Command Center
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/72">
            Single-app MVP untuk pitching: profile company, tender, histori
            vendor, dan barcode tracking.
          </p>
        </div>

        <div className="mt-5">
          <PortalNav />
        </div>

        <div className="mt-6 rounded-[24px] border border-dashed border-[var(--line)] p-4">
          <p className="code-label">Roles</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>External vendor view</li>
            <li>Internal procurement view</li>
            <li>Project director summary</li>
          </ul>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
        >
          Back to company profile
        </Link>
      </aside>

      <main className="space-y-6">{children}</main>
    </div>
  );
}
