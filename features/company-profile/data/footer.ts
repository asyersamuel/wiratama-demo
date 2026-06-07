import type { ContactInfo, ContactFormField, FooterData } from "@/features/company-profile/types";

export const footerContent: FooterData = {
  brandName: "Northstar Industrial District",
  descriptor: "Integrated business estate demo",
  summary:
    "A sanitized public-facing company profile for showcasing industrial estate positioning, development potential, and procurement readiness.",
  socialLinks: [
    { label: "LinkedIn", href: "/resources" },
    { label: "Media Kit", href: "/resources" },
    { label: "Newsroom", href: "/news" },
  ],
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About", href: "/about" },
        { label: "Why Us", href: "/why-us" },
        { label: "Development", href: "/development" },
        { label: "Portfolio", href: "/portfolio" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Industrial Land", href: "/products#industrial-land" },
        { label: "Factory Building", href: "/products#factory-building" },
        { label: "Commercial Area", href: "/products#commercial-area" },
        { label: "Warehouse", href: "/products#warehouse" },
        { label: "Residential", href: "/products#residential" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Resource Center", href: "/resources" },
        { label: "Compliance", href: "/compliance" },
        { label: "News", href: "/news" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      details: [
        "Innovation Avenue 08, Harbor District, Meridian City 48120",
        "+62 800 555 0198",
        "hello@northstar-demo.local",
        "Mon - Fri, 08:00 - 17:00",
      ],
    },
  ],
  copyright: "© 2026 Northstar Industrial District. Demo content only.",
};

export const contactInfo: ContactInfo = {
  officeLabel: "Public Inquiry Office",
  address: "Innovation Avenue 08, Harbor District, Meridian City 48120",
  phone: "+62 800 555 0198",
  email: "hello@northstar-demo.local",
  hours: "Monday to Friday, 08:00 - 17:00",
};

export const contactFields: ContactFormField[] = [
  {
    label: "Full name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    label: "Work email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    label: "Company",
    placeholder: "Enter your company",
    type: "text",
  },
  {
    label: "Phone",
    placeholder: "Enter your phone number",
    type: "tel",
  },
];
