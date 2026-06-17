"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { ErpModule } from "@/features/erp/types";

type ErpAppGridProps = {
  modules: ErpModule[];
};

type IconProps = {
  className?: string;
};

function Icon({ name }: { name: string }): ReactNode {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "LayoutDashboard":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "FileSignature":
      return (
        <svg {...common} aria-hidden>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 17c1.5-1 2.8-1 4 0s2.5 1 4 0" />
        </svg>
      );
    case "ClipboardList":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M9 11h6" />
          <path d="M9 15h4" />
        </svg>
      );
    case "Calculator":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8" />
          <circle cx="9" cy="12" r="0.6" fill="currentColor" />
          <circle cx="13" cy="12" r="0.6" fill="currentColor" />
          <circle cx="17" cy="12" r="0.6" fill="currentColor" />
          <circle cx="9" cy="16" r="0.6" fill="currentColor" />
          <circle cx="13" cy="16" r="0.6" fill="currentColor" />
          <circle cx="17" cy="16" r="0.6" fill="currentColor" />
        </svg>
      );
    case "Boxes":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 12l9 4 9-4" />
          <path d="M3 17l9 4 9-4" />
        </svg>
      );
    case "TrendingUp":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "Users":
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c.5-3.5 3.4-5.5 6.5-5.5s6 2 6.5 5.5" />
          <path d="M16 4a3 3 0 0 1 0 6" />
          <path d="M21.5 19c-.3-2.2-1.7-3.7-3.5-4.4" />
        </svg>
      );
    case "UserCog":
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c.5-3.5 3.4-5.5 6.5-5.5 1.1 0 2.2.2 3.1.6" />
          <circle cx="18" cy="15" r="2" />
          <path d="M18 11v1" />
          <path d="M18 18v1" />
          <path d="M20.6 13.4l-.7.7" />
          <path d="M16.1 17.9l-.7.7" />
          <path d="M21 15h-1" />
          <path d="M16 15h-1" />
          <path d="M20.6 16.6l-.7-.7" />
          <path d="M16.1 12.1l-.7-.7" />
        </svg>
      );
    case "ShoppingCart":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
        </svg>
      );
    case "Building2":
      return (
        <svg {...common} aria-hidden>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
          <path d="M2 22h20" />
          <path d="M9 7h.01" />
          <path d="M9 11h.01" />
          <path d="M9 15h.01" />
          <path d="M15 7h.01" />
          <path d="M15 11h.01" />
          <path d="M15 15h.01" />
        </svg>
      );
    case "Wrench":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.9-.4-.4-2.9 2.5-2.5z" />
        </svg>
      );
    case "FolderLock":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
          <rect x="13" y="13" width="7" height="6" rx="1.2" />
          <path d="M14.5 13v-1.5a2 2 0 0 1 4 0V13" />
        </svg>
      );
    case "Scale":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z" />
          <path d="M19 7l-3 7a3 3 0 0 0 6 0L19 7z" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
  }
}

function ModuleCard({ module }: { module: ErpModule }) {
  const isDisabled = module.tone === "disabled" || !module.isActive;
  const isSemi = module.tone === "semi";

  const toneClasses = isDisabled
    ? "border border-dashed border-[var(--line)] bg-white/40 text-slate-400"
    : isSemi
      ? "border border-[var(--line)] bg-white/75 text-slate-700"
      : "panel-strong text-slate-950";

  const iconWrapClasses = isDisabled
    ? "rounded-2xl bg-slate-100 p-3 text-slate-400"
    : isSemi
      ? "rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent-strong)]"
      : "rounded-2xl bg-[var(--accent)] p-3 text-white";

  const content = (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <span className={iconWrapClasses}>
          <Icon name={module.icon} />
        </span>
        {module.badge ? (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              isDisabled
                ? "border-slate-200 bg-slate-100 text-slate-500"
                : "border-[var(--accent-soft)] bg-[var(--accent-soft)] text-[var(--accent-strong)]"
            }`}
          >
            {module.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className={`text-base font-semibold tracking-[-0.02em] ${isDisabled ? "text-slate-400" : "text-slate-950"}`}
        >
          {module.label}
        </h3>
        <p
          className={`text-sm leading-6 ${isDisabled ? "text-slate-400" : "copy-muted"}`}
        >
          {module.description}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between text-xs font-semibold">
        <span
          className={
            isDisabled
              ? "uppercase tracking-[0.18em] text-slate-400"
              : isSemi
                ? "uppercase tracking-[0.18em] text-[var(--accent-strong)]"
                : "uppercase tracking-[0.18em] text-[var(--accent)]"
          }
        >
          {isDisabled
            ? "Coming soon"
            : isSemi
              ? "Modul pendukung"
              : "Buka modul"}
        </span>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${isDisabled ? "text-slate-400" : "text-slate-500"}`}
        >
          {module.id}
        </span>
      </div>
    </div>
  );

  const cardClass = `flex h-full flex-col rounded-[24px] p-5 transition ${
    isDisabled ? "cursor-not-allowed" : "hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-30px_rgba(17,24,39,0.28)]"
  } ${toneClasses}`;

  if (isDisabled || !module.href) {
    return (
      <div className={cardClass} aria-disabled>
        {content}
      </div>
    );
  }

  return (
    <Link href={module.href} className={cardClass}>
      {content}
    </Link>
  );
}

export function ErpAppGrid({ modules }: ErpAppGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}

export type { IconProps };
