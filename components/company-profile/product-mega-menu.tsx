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
      <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 mt-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="group flex flex-col gap-1 py-1"
          >
            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#d6b56d] transition-colors">{item.title}</h3>
            <p className="text-xs text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 bg-white shadow-[0_24px_60px_rgba(15,34,58,0.14)] border-t border-slate-100" role="region" aria-label="Products menu">
      <div className="max-w-[1440px] mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-105 ${
                  item.tone === 'gold' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' :
                  item.tone === 'slate' ? 'bg-gradient-to-br from-slate-200 to-slate-300' :
                  item.tone === 'copper' ? 'bg-gradient-to-br from-orange-100 to-orange-200' :
                  item.tone === 'sand' ? 'bg-gradient-to-br from-stone-200 to-stone-300' :
                  item.tone === 'emerald' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' :
                  'bg-gradient-to-br from-teal-100 to-teal-200'
                }`} />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-white/90 px-2 py-1 rounded backdrop-blur-sm">
                  {item.mediaLabel}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-[#d6b56d] transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
