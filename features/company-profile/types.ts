export type PublicLink = {
  label: string;
  href: string;
};

export type HighlightStat = {
  label: string;
  value: string;
  note?: string;
};

export type PlaceholderTone =
  | "gold"
  | "slate"
  | "teal"
  | "emerald"
  | "copper"
  | "sand";

export type HeroSlide = {
  title: string;
  caption: string;
  tone: PlaceholderTone;
};

export type HeroAction = PublicLink & {
  variant?: "primary" | "secondary";
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  slides: HeroSlide[];
  stats: HighlightStat[];
};

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: HighlightStat[];
};

export type MegaMenuItem = PublicLink & {
  title: string;
  description: string;
  anchorId: string;
  mediaLabel: string;
  tone: PlaceholderTone;
};

export type NavigationItem = PublicLink & {
  children?: MegaMenuItem[];
};

export type NavigationData = {
  brand: {
    name: string;
    descriptor: string;
    mark: string;
    supportMark: string;
  };
  primary: NavigationItem[];
  contactAction: PublicLink;
};

export type AboutLogoItem = {
  label: string;
  description: string;
  tone: PlaceholderTone;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  description: string;
  supportingText: string;
  logos: AboutLogoItem[];
};

export type ProductItem = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  summary: string;
  features: string[];
  cta: PublicLink;
  mediaLabel: string;
  mediaCaption: string;
  tone: PlaceholderTone;
};

export type AwardItem = {
  title: string;
  subtitle: string;
  description: string;
  tone: PlaceholderTone;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  tone: PlaceholderTone;
};

export type MilestoneItem = {
  title: string;
  description: string;
  time: string;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
};

export type MasterplanContent = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta: PublicLink;
  mediaLabel: string;
  mediaCaption: string;
  tone: PlaceholderTone;
};

export type HighlightVideoContent = {
  eyebrow: string;
  title: string;
  description: string;
  action: PublicLink;
  mediaLabel: string;
  tone: PlaceholderTone;
};

export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  tone: PlaceholderTone;
  imageUrl?: string;
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  actions: HeroAction[];
};

export type FooterColumn = {
  title: string;
  links?: PublicLink[];
  details?: string[];
};

export type FooterData = {
  brandName: string;
  descriptor: string;
  summary: string;
  socialLinks: PublicLink[];
  columns: FooterColumn[];
  copyright: string;
};

export type ValueItem = {
  title: string;
  description: string;
  items?: string[];
  tone?: PlaceholderTone;
};

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  meta: string;
  tone: PlaceholderTone;
};

export type CertificateItem = {
  title: string;
  description: string;
  tone: PlaceholderTone;
};

export type ContactInfo = {
  officeLabel: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export type ContactFormField = {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
};

export type RouteKey =
  | "about"
  | "whyUs"
  | "products"
  | "development"
  | "portfolio"
  | "resources"
  | "compliance"
  | "news"
  | "contact";

export type PublicPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: PageHeroContent;
  intro?: {
    eyebrow?: string;
    title: string;
    description: string;
  };
  values?: ValueItem[];
  milestones?: MilestoneItem[];
  resources?: ResourceItem[];
  certificates?: CertificateItem[];
  featuredNewsSlug?: string;
  cta?: CtaContent;
};

export type CompanyProfileSiteData = {
  navigation: NavigationData;
  home: {
    hero: HomeHeroContent;
    about: AboutContent;
    awards: AwardItem[];
    testimonials: TestimonialItem[];
    masterplan: MasterplanContent;
    highlightVideo: HighlightVideoContent;
    cta: CtaContent;
  };
  products: ProductItem[];
  news: NewsItem[];
  footer: FooterData;
  contactInfo: ContactInfo;
  contactFields: ContactFormField[];
  pages: Record<RouteKey, PublicPageContent>;
  aboutTimeline: MilestoneItem[];
  developmentTimeline: MilestoneItem[];
  developmentClusters: ValueItem[];
  portfolioProjects: ValueItem[];
  partnerEcosystem: ValueItem[];
  resourceItems: ResourceItem[];
  complianceFramework: ValueItem[];
  sustainabilityItems: ValueItem[];
  certificateItems: CertificateItem[];
  whyUsItems: ValueItem[];
  operationsSupportItems: ValueItem[];
};

// ── PID (Public Information Disclosure) ──────────────────────────────────────

export type PidTabItem = {
  /** Short label shown in the left sidebar tab button */
  id: string;
  label: string;
  /** Main heading rendered inside the right content card */
  title: string;
  /** One or more body paragraphs */
  paragraphs: string[];
  /** Optional ordered list of items shown after paragraphs */
  numberedList?: string[];
  /** Optional image URL — triggers the image + download layout */
  imageUrl?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** If provided, a "Download Document" button links here */
  documentHref?: string;
};


// ── Compliance Tabs ───────────────────────────────────────────────────────────

export type ComplianceSubSection = {
  heading: string;
  paragraphs?: string[];
  orderedList?: string[];
};

export type ComplianceTabItem = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  /** Unordered bullet list items */
  bulletList?: string[];
  /** Ordered / numbered list items */
  numberedList?: string[];
  /** H3 sub-sections (used for Privacy Policy text-heavy layout) */
  subSections?: ComplianceSubSection[];
  /** Side image URL — triggers 2-col text+image layout */
  imageUrl?: string;
  imageAlt?: string;
  /** Download CTA href */
  documentHref?: string;
  /**
   * "banner" → full-width clickable banner below text (Whistleblowing tab).
   * "side"   → image in right column (default for image tabs).
   * "none"   → text-only or sub-sections layout.
   */
  layout?: "side" | "banner" | "none";
};
