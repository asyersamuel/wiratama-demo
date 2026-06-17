import Link from "next/link";
import { SectionCard } from "@/components/ui/section-card";
import { ErpAppGrid } from "@/features/erp/components/erp-app-grid";
import { getErpModules } from "@/features/erp/service";

const roleShortcuts = [
  {
    label: "Executive Dashboard",
    description: "Metrik kawasan, progress konstruksi, dan executive visibility.",
    href: "/erp/dashboard",
    icon: "dashboard",
    tone: "primary" as const,
  },
  {
    label: "Buat Laporan Insiden",
    description: "Laporkan insiden baru dengan wizard form terstruktur.",
    href: "/erp/incidents/new",
    icon: "report" as const,
    tone: "accent" as const,
  },
  {
    label: "Incident Register",
    description: "Daftar semua tiket insiden dengan filter dan pencarian.",
    href: "/erp/incidents",
    icon: "register" as const,
    tone: "neutral" as const,
  },
  {
    label: "My Actions",
    description: "Insiden yang ditugaskan kepada Anda dan perlu ditindaklanjuti.",
    href: "/erp/my-actions",
    icon: "actions" as const,
    tone: "neutral" as const,
  },
];

function ShortcutIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case "report":
      return (
        <svg {...common} aria-hidden>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M12 18v-6" />
          <path d="M9 15l3 3 3-3" />
        </svg>
      );
    case "register":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M9 11h6" />
          <path d="M9 15h4" />
        </svg>
      );
    case "actions":
      return (
        <svg {...common} aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 11l-3 3-3-3" />
          <path d="M19 14v7" />
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

export default async function ErpLandingPage() {
  const modules = await getErpModules();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="eyebrow">Wiratama ERP</p>
        <h1 className="mt-3 display-title">Operations Command Center</h1>
        <p className="mt-4 text-lg copy-muted leading-relaxed">
          Integrated dashboard for estate incidents, infrastructure progress, and executive visibility.
        </p>
      </div>

      {/* Role Shortcuts */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roleShortcuts.map((shortcut) => (
          <Link
            key={shortcut.href}
            href={shortcut.href}
            className={`panel-strong group flex h-full flex-col gap-4 rounded-[24px] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-30px_rgba(17,24,39,0.28)] ${
              shortcut.tone === "primary"
                ? "border border-[var(--accent)]"
                : ""
            }`}
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                shortcut.tone === "primary"
                  ? "bg-[var(--accent)] text-white"
                  : shortcut.tone === "accent"
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "bg-slate-100 text-slate-600 group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]"
              }`}
            >
              <ShortcutIcon name={shortcut.icon} />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-[-0.02em] text-slate-950">
                {shortcut.label}
              </h3>
              <p className="mt-1 text-sm leading-6 copy-muted">
                {shortcut.description}
              </p>
            </div>
            <p className="mt-auto text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Buka modul
            </p>
          </Link>
        ))}
      </section>

      {/* ERP App Grid */}
      <SectionCard
        title="ERP Modules"
        description="Modul aktif siap digunakan. Modul bertanda Coming soon adalah placeholder roadmap."
      >
        <ErpAppGrid modules={modules} />
      </SectionCard>

      {/* Footer note */}
      <p className="text-center text-xs copy-muted">
        Demo modules active: Dashboard, Incident Reporting, Incident Register.
      </p>
    </div>
  );
}
