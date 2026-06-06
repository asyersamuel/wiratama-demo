type PortalPageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PortalPageIntro({
  eyebrow,
  title,
  description,
}: PortalPageIntroProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow w-fit">{eyebrow}</span>
      <h1 className="section-title">{title}</h1>
      <p className="max-w-3xl text-sm leading-7 copy-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}
