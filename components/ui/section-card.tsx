type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <section className="panel p-6 sm:p-7">
      <div className="mb-5 flex flex-col gap-2 border-b border-[var(--line)] pb-5">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
          {title}
        </h2>
        {description ? <p className="text-sm copy-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
