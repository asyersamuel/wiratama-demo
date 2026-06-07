import type { ReactNode } from "react";

type PageSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PageSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: PageSectionProps) {
  return (
    <section id={id} className={cn("shell py-[4.5rem] sm:py-[5.5rem]", className)}>
      {title ? (
        <div className="mb-10 max-w-3xl sm:mb-12">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 h-1 w-24 rounded-full bg-[var(--accent)]/80" />
          {description ? (
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
