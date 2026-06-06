export type CompanyHighlight = {
  label: string;
  value: string;
  note: string;
};

export type DevelopmentArea = {
  name: string;
  location: string;
  area: string;
  status: string;
  focus: string;
};

export type PortfolioProject = {
  name: string;
  type: string;
  location: string;
  completion: string;
  partners: string;
  summary: string;
};

export type CompanyProfile = {
  brand: string;
  positioning: string;
  description: string;
  highlights: CompanyHighlight[];
  developments: DevelopmentArea[];
  portfolio: PortfolioProject[];
};
