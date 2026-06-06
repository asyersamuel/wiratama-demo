import { getStatusTone, type StatusTone } from "@/lib/status";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: StatusTone;
};

const toneClasses: Record<StatusTone, string> = {
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  accent: "border-[#f0d4da] bg-[var(--accent-soft)] text-[var(--accent)]",
  success: "border-[#bbf7d0] bg-[#ecfdf5] text-[#065f46]",
  warning: "border-[#fef08a] bg-[#fffbeb] text-[#92400e]",
  danger: "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]",
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
