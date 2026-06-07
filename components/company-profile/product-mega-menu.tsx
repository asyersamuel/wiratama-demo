import Link from "next/link";
import type { MegaMenuItem } from "@/features/company-profile/types";

type ProductMegaMenuProps = {
  items: MegaMenuItem[];
  open: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
};

export function ProductMegaMenu({
  items,
  open,
  mobile = false,
  onNavigate,
}: ProductMegaMenuProps) {
  if (!open) {
    return null;
  }

  if (mobile) {
    return (
      <div className="mt-3 rounded-[24px] border border-[var(--line)] bg-stone-50 p-4">
        <div className="grid gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-[20px] border border-white/70 bg-white p-4 transition hover:border-[var(--accent)]/30 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {item.mediaLabel}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-full z-40 mt-6 w-screen -translate-x-1/2 px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-white/70 bg-white/96 p-6 shadow-[0_30px_100px_-46px_rgba(15,23,42,0.58)] backdrop-blur-xl">
        <div className="grid gap-5 lg:grid-cols-5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group rounded-[24px] border border-[var(--line)] bg-stone-50/80 p-4 transition hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white"
            >
              <div className={`mega-menu-card mega-menu-card--${item.tone}`}>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  {item.mediaLabel}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
