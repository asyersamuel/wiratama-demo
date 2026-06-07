import Link from "next/link";
import type { FooterData } from "@/features/company-profile/types";

type PublicFooterProps = {
  content: FooterData;
};

export function PublicFooter({ content }: PublicFooterProps) {
  return (
    <footer className="mt-14 bg-[#0d1522] text-white">
      <div className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/10 text-lg font-semibold">
              NS
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{content.brandName}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/55">
              {content.descriptor}
            </p>
            <p className="mt-5 text-sm leading-7 text-white/70">{content.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              {content.socialLinks.map((link) => (
                <Link key={link.label} href={link.href} className="rounded-full border border-white/12 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {content.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                {column.title}
              </h3>
              {column.links ? (
                <ul className="mt-5 space-y-3 text-sm text-white/75">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              {column.details ? (
                <div className="mt-5 space-y-3 text-sm leading-7 text-white/75">
                  {column.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="shell text-sm text-white/60">{content.copyright}</div>
      </div>
    </footer>
  );
}
