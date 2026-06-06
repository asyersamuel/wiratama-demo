type TimelineItem = {
  label: string;
  date: string;
  note: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={`${item.label}-${item.date}`} className="grid gap-3 sm:grid-cols-[20px_minmax(0,1fr)]">
          <div className="hidden sm:flex flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
            {index < items.length - 1 ? (
              <span className="mt-2 h-full w-px bg-[var(--line)]" />
            ) : null}
          </div>
          <div className="rounded-[22px] border border-[var(--line)] bg-white/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-slate-950">{item.label}</p>
              <p className="code-label">{item.date}</p>
            </div>
            <p className="mt-2 text-sm leading-7 copy-muted">{item.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
