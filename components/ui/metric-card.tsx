type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
};

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <article className="panel p-5">
      <p className="code-label">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm copy-muted">{hint}</p>
    </article>
  );
}
