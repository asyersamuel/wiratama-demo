import type { ReactNode } from "react";

type PublicPageShellProps = {
  children: ReactNode;
  className?: string;
};

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PublicPageShell({ children, className }: PublicPageShellProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(184,134,11,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(15,118,110,0.14),transparent_36%)]" />
      {children}
    </div>
  );
}
