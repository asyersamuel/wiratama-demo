export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="shell flex flex-col gap-3 text-sm copy-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Prototype only. Semua data masih local mock untuk kebutuhan pitching.</p>
        <p className="font-mono uppercase tracking-[0.18em]">Company • Tender • History • Tracking</p>
      </div>
    </footer>
  );
}
