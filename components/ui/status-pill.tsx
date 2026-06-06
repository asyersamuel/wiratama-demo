import { getStatusTone, type StatusTone } from "@/lib/status";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: StatusTone;
};

const toneClasses: Record<StatusTone, string> = {
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  accent: "border-[#d8b1b9] bg-[#f7e9ed] text-[#7b2235]",
  success: "border-emerald-200 bg-emerald-100 text-emerald-900",
  warning: "border-amber-200 bg-amber-100 text-amber-900",
  danger: "border-rose-200 bg-rose-100 text-rose-900",
};

export function StatusPill({ children, tone }: StatusPillProps) {
  const label = String(children);
  const resolvedTone = tone ?? getStatusTone(label);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[resolvedTone]}`}
    >
      {children}
    </span>
  );
}
