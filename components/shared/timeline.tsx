import { formatDate, formatDateTime } from "@/lib/format";

type LegacyTimelineItem = {
  label: string;
  date: string;
  note: string;
};

type RichTimelineItem = {
  time: string;
  title: string;
  description: string;
  officer?: string;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
};

type TimelineItem = LegacyTimelineItem | RichTimelineItem;

type TimelineProps = {
  items: TimelineItem[];
};

const markerToneClasses = {
  neutral: "bg-slate-300",
  accent: "bg-[var(--accent)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
} as const;

function isRichTimelineItem(item: TimelineItem): item is RichTimelineItem {
  return "title" in item;
}

function formatTimelineDate(value: string) {
  return value.includes("T") ? formatDateTime(value) : formatDate(value);
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => {
        const title = isRichTimelineItem(item) ? item.title : item.label;
        const description = isRichTimelineItem(item) ? item.description : item.note;
        const dateValue = isRichTimelineItem(item) ? item.time : item.date;
        const officer = isRichTimelineItem(item) ? item.officer : undefined;
        const tone = isRichTimelineItem(item) ? item.tone ?? "accent" : "accent";

        return (
          <li
            key={`${title}-${dateValue}`}
            className="grid gap-3 sm:grid-cols-[20px_minmax(0,1fr)]"
          >
            <div className="hidden sm:flex flex-col items-center">
              <span className={`mt-1 h-3 w-3 rounded-full ${markerToneClasses[tone]}`} />
              {index < items.length - 1 ? (
                <span className="mt-2 h-full w-px bg-[var(--line)]" />
              ) : null}
            </div>
            <div className="rounded-[22px] border border-[var(--line)] bg-white/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{title}</p>
                <p className="code-label">{formatTimelineDate(dateValue)}</p>
              </div>
              <p className="mt-2 text-sm leading-7 copy-muted">{description}</p>
              {officer ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  Officer: {officer}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
