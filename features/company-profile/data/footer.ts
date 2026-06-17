import type { ContactInfo, ContactFormField, FooterData } from "@/features/company-profile/types";

export const footerContent: FooterData = {
  brandName: "Wiratama Indramayu Perkasa",
  descriptor: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  summary:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Media Kit", href: "#" },
  ],
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Why Us", href: "#" },
        { label: "Development", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "News", href: "#" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Industrial Land", href: "#" },
        { label: "Factory Building", href: "#" },
        { label: "Commercial Area", href: "#" },
        { label: "Commercial Space", href: "#" },
        { label: "Residential", href: "#" },
        { label: "Warehouse", href: "#" },
      ],
    },
    {
      title: "Resource Desk",
      links: [
        { label: "Resources", href: "#" },
        { label: "Compliance", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Portfolio", href: "#" },
      ],
    },
    {
      title: "Contact",
      details: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "sed do eiusmod tempor",
        "incididunt ut labore",
      ],
    },
  ],
  copyright: "Copyright 2026 Wiratama Indramayu Perkasa. Demo content only.",
};

export const contactInfo: ContactInfo = {
  officeLabel: "Public Inquiry Office",
  address: "Lorem ipsum dolor sit amet",
  phone: "+62 000 1111 2222",
  email: "hello@wiratama-indramayu.demo",
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
