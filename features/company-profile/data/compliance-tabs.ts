import type { ComplianceTabItem } from "@/features/company-profile/types";

/**
 * Compliance tab data — all content is sanitized generic dummy copy.
 * No real company names, awards, or document links. (docs/design.md §4)
 */
export const complianceTabs: ComplianceTabItem[] = [
  // ── Tab 1: Good Corporate Governance ─────────────────────────────────────
  {
    id: "gcg",
    label: "Good Corporate Governance",
    layout: "side",
    title: "Good Corporate Governance (GCG)",
    paragraphs: [
      "Good Corporate Governance (GCG) is a system of principles and mechanisms that guide the company in managing its operations with accountability, transparency, and integrity. Our organization applies GCG as a fundamental commitment—not merely to satisfy regulatory requirements, but as a genuine foundation for long-term business sustainability.",
      "The implementation of GCG at our organization is based on five core principles: transparency, accountability, responsibility, independence, and fairness. These principles are embedded in every level of the organization—from board-level decisions to day-to-day operational activities.",
    ],
    bulletList: [
      "Transparency — Providing clear, accurate, and timely information to all stakeholders.",
      "Accountability — Clear roles and responsibilities with measurable performance standards.",
      "Responsibility — Compliance with applicable laws, regulations, and ethical norms.",
      "Independence — Management free from undue influence by any individual or group.",
      "Fairness — Equal treatment of all shareholders and stakeholders.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    imageAlt: "Corporate governance meeting in a modern boardroom",
    documentHref: "/resources",
  },

  // ── Tab 2: Gratification Control ─────────────────────────────────────────
  {
    id: "gratification",
    label: "Gratification Control",
    layout: "side",
    title: "Gratification Control Unit (UPG)",
    paragraphs: [
      "Gratification Control is part of the company's commitment to corruption prevention and the creation of a clean, ethical business environment. The organization prohibits all forms of gratification—defined as gifts, benefits, fees, commissions, or any advantage received by company personnel in connection with their official duties.",
      "Our Gratification Control Unit (UPG) serves as the internal function responsible for receiving, recording, and processing gratification reports. Personnel who receive any form of gratification are required to report it to the UPG within 30 (thirty) working days.",
      "All reports are handled confidentially and in accordance with applicable anti-corruption regulations. Failure to report constitutes a disciplinary offence.",
    ],
    numberedList: [
      "Identify whether the item, benefit, or favour is related to official duties.",
      "If it is related to official duties, report to the Gratification Control Unit within 30 working days.",
      "The UPG will register and assess whether it constitutes reportable gratification.",
      "If confirmed, the organization will file a formal report with the relevant anti-corruption authority.",
      "Reporting personnel are protected from any form of retaliation.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "A compliance officer reviewing documents at a desk",
    documentHref: "/resources",
  },

  // ── Tab 3: Risk Management ────────────────────────────────────────────────
  {
    id: "risk",
    label: "Risk Management",
    layout: "side",
    title: "Enterprise Risk Management",
    paragraphs: [
      "Risk management is an integrated process by which the organization identifies, assesses, and responds to risks that could affect the achievement of its objectives. We apply a holistic, enterprise-wide risk management approach that covers strategic, operational, financial, legal, and reputational risk categories.",
      "The Risk Management framework follows the internationally recognized ISO 31000 standard. Risk governance is overseen by the Board of Directors, with first-line, second-line, and third-line defense structures in place across the organization.",
    ],
    bulletList: [
      "Strategic Risk — Risks arising from business strategy decisions and the external environment.",
      "Operational Risk — Risks in internal processes, systems, people, and infrastructure.",
      "Financial Risk — Liquidity, credit, and market risks affecting financial performance.",
      "Compliance Risk — Risks from failure to comply with laws, regulations, or internal policies.",
      "Reputational Risk — Risks arising from public perception and stakeholder trust.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Risk management dashboard with analytics charts",
    documentHref: "/resources",
  },

  // ── Tab 4: Anti-Bribery Management System ────────────────────────────────
  {
    id: "smap",
    label: "Anti-Bribery System (SMAP)",
    layout: "side",
    title: "Anti-Bribery Management System (SMAP)",
    paragraphs: [
      "The Anti-Bribery Management System (SMAP) is the organization's structured framework to prevent, detect, and respond to bribery in all forms. It is aligned with ISO 37001:2016 — Anti-Bribery Management Systems and is applied across all business units, subsidiaries, and third-party relationships.",
      "SMAP demonstrates our commitment to zero tolerance for bribery. It establishes clear procedures for due diligence on business partners, controls over gifts and hospitality, financial controls, and a reporting mechanism for suspected violations.",
    ],
    bulletList: [
      "Anti-Bribery Policy — A formal, board-approved policy prohibiting bribery in all forms.",
      "Business Partner Due Diligence — Risk-based screening of vendors, agents, and partners.",
      "Gifts & Hospitality Procedure — Clear limits and approval processes for all hospitality.",
      "Financial Controls — Segregation of duties and approval thresholds to reduce exposure.",
      "Training & Awareness — Regular anti-bribery training for all personnel.",
      "Reporting Channel — A confidential channel to report suspected bribery incidents.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    imageAlt: "Legal and compliance documents with a gavel on a desk",
    documentHref: "/resources",
  },

  // ── Tab 5: Whistleblowing System ─────────────────────────────────────────
  {
    id: "whistleblowing",
    label: "Whistleblowing System",
    layout: "banner",
    title: "Whistleblowing System (WBS)",
    paragraphs: [
      "The Whistleblowing System (WBS) is a mechanism that allows personnel, partners, and external stakeholders to report suspected violations of laws, regulations, or company policies in a safe, confidential, and protected manner.",
      "We are committed to protecting every person who reports in good faith. Reporters shall not be subject to any form of retaliation, discrimination, or intimidation as a result of their report. All reports are handled by an independent, dedicated team and kept strictly confidential.",
      "Reports may cover—but are not limited to—bribery and gratification, embezzlement, fraud, conflicts of interest, abuse of authority, and violations of applicable laws or company regulations.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    imageAlt: "Secure reporting — person using a laptop anonymously",
    documentHref: "/resources",
  },

  // ── Tab 6: Privacy Policy (text-heavy, sub-sections, no image) ────────────
  {
    id: "privacy",
    label: "Privacy Policy",
    layout: "none",
    title: "Privacy Policy",
    paragraphs: [
      "This Privacy Policy explains how our organization collects, uses, stores, and protects personal data. We are committed to protecting the privacy of all individuals whose data we process, in compliance with applicable personal data protection laws.",
    ],
    subSections: [
      {
        heading: "1. Data We Collect",
        paragraphs: [
          "We may collect personal data you provide directly to us (such as when submitting a contact form or entering into a business agreement) as well as data collected automatically through your use of our website or services.",
        ],
        orderedList: [
          "Identity data — full name, identification number, and similar identifiers.",
          "Contact data — email address, phone number, and mailing address.",
          "Business data — company name, position, and professional background.",
          "Usage data — pages visited, session duration, and device information.",
        ],
      },
      {
        heading: "2. How We Use Your Data",
        paragraphs: [
          "We process personal data only for legitimate purposes and only to the extent necessary for those purposes.",
        ],
        orderedList: [
          "To respond to your inquiries and provide requested services.",
          "To fulfil contractual obligations with business partners and tenants.",
          "To comply with applicable legal and regulatory requirements.",
          "To improve our website, services, and communications.",
          "To send relevant information you have consented to receive.",
        ],
      },
      {
        heading: "3. Data Sharing",
        paragraphs: [
          "We do not sell, rent, or trade your personal data. Data may be shared with trusted third-party service providers who assist us in operating our services, subject to strict confidentiality agreements. Data may also be disclosed where required by law or court order.",
        ],
      },
      {
        heading: "4. Data Retention",
        paragraphs: [
          "We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law. When no longer needed, data is securely deleted or anonymised.",
        ],
      },
      {
        heading: "5. Your Rights",
        paragraphs: [
          "Subject to applicable law, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise any of these rights, please contact us through the official contact channel on the Contact page.",
        ],
      },
      {
        heading: "6. Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Material changes will be communicated through appropriate channels. Continued use of our services after any change constitutes your acceptance of the revised policy.",
        ],
      },
    ],
  },
];
