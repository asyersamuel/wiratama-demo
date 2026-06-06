type DemoNoteProps = {
  label?: string;
  children: React.ReactNode;
};

export function DemoNote({
  label = "Demo Note",
  children,
}: DemoNoteProps) {
  return (
    <div className="rounded-[20px] border border-[#ead8dc] bg-[#fcf7f8] px-4 py-4">
      <p className="code-label">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-700">{children}</p>
    </div>
  );
}
