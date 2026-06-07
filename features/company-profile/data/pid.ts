import type { PidTabItem } from "@/features/company-profile/types";

/**
 * Dummy PID (Public Information Disclosure) tab data.
 * All content is generic and sanitized — no real company names,
 * documents, or identifying information. (docs/design.md §4)
 */
export const pidTabs: PidTabItem[] = [
  // ── Tab 1: Text only ───────────────────────────────────────────────────────
  {
    id: "about-ppid",
    label: "About PPID",
    title: "About the Public Information Disclosure Unit",
    paragraphs: [
      "The Public Information Disclosure Unit (PPID) is the designated function responsible for managing and facilitating the public's right to access information held by this organization.",
      "In accordance with applicable information transparency regulations, PPID coordinates the provision of information to any member of the public who submits a formal or informal request. Our commitment is to respond within the regulatory timeframe while protecting information that is classified as exempt from disclosure.",
      "This unit serves as the primary point of contact for all matters relating to public information, including clarifications, disputes, and escalation procedures.",
    ],
  },

  // ── Tab 2: Numbered list ───────────────────────────────────────────────────
  {
    id: "ppid-structure",
    label: "PPID Structure",
    title: "Organizational Structure of the PPID Function",
    paragraphs: [
      "The PPID function operates under a defined organizational structure to ensure accountability, responsiveness, and compliance with information disclosure obligations.",
      "The following roles form the core of the PPID unit:",
    ],
    numberedList: [
      "PPID Principal Officer — Overall accountability for information governance and disclosure decisions.",
      "PPID Coordination Officer — Day-to-day management of incoming information requests and internal routing.",
      "Documentation & Records Officer — Maintenance of the information register, archives, and request logs.",
      "Legal & Compliance Advisor — Review of requests involving sensitive, contested, or boundary-case disclosures.",
      "Communications Liaison — Public-facing communications, portal updates, and stakeholder correspondence.",
    ],
  },

  // ── Tab 3: Text + image + download ─────────────────────────────────────────
  {
    id: "ppid-notice",
    label: "PPID Notice",
    title: "PPID Public Notice & Disclosure Registry",
    paragraphs: [
      "This notice confirms that the organization maintains an up-to-date register of information available for public disclosure. The registry is reviewed on a periodic basis and updated whenever new categories of information are approved for release.",
      "Members of the public may submit a formal information request by completing the standard request form. Requests are processed within the statutory response period unless an extension is formally granted.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "A government-style notice board in a formal office setting",
    documentHref: "/resources",
  },

  // ── Tab 4: Text + numbered list + download ──────────────────────────────────
  {
    id: "ppid-information-request",
    label: "Information Request",
    title: "How to Submit an Information Request",
    paragraphs: [
      "Any individual, group, or legal entity may submit an information request to the PPID. Requests must be submitted in writing and include sufficient detail for the PPID unit to identify and locate the information sought.",
    ],
    numberedList: [
      "Download and complete the Information Request Form from the Resources page.",
      "Clearly state the type and scope of information you are requesting.",
      "Submit the completed form via the official correspondence channel (email or physical submission).",
      "Await acknowledgement — you will receive confirmation of receipt within 3 working days.",
      "PPID will respond with the requested information, a partial disclosure, or a written explanation of any exemption applied, within the statutory deadline.",
    ],
    documentHref: "/resources",
  },

  // ── Tab 5: Text only ────────────────────────────────────────────────────────
  {
    id: "ppid-exemptions",
    label: "Exempt Information",
    title: "Categories of Exempt Information",
    paragraphs: [
      "Not all information held by the organization is available for public disclosure. Certain categories of information are exempt under applicable transparency law and organizational policy.",
      "Exempt categories generally include: information that could compromise national security or public safety; commercially sensitive data relating to third-party agreements; information subject to active legal proceedings; personal data protected under privacy legislation; and information whose disclosure would be contrary to the public interest.",
      "Where a request is declined in full or in part, the PPID officer will provide a written explanation citing the relevant exemption and will advise on the available appeals process.",
    ],
  },

  // ── Tab 6: Image + download ─────────────────────────────────────────────────
  {
    id: "ppid-annual-report",
    label: "Annual Report",
    title: "PPID Annual Transparency Report",
    paragraphs: [
      "The organization publishes an annual PPID transparency report summarizing the total number of information requests received, processed, and declined during the reporting period. This report supports public accountability and demonstrates the organization's commitment to openness.",
      "The current reporting year summary is available for download below. Historical reports from previous periods are accessible upon request through the PPID coordination office.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    imageAlt: "An annual report document open on a desk",
    documentHref: "/resources",
  },
];
