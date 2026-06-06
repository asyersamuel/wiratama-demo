import Link from "next/link";
import { publicNavigation } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(245,241,232,0.8)] backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            WI
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Wiratama Industrial
            </p>
            <p className="code-label">MVP Demo Platform</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
