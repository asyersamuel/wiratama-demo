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
    title: "Good Corporate Governance",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    bulletList: [
      "Lorem Ipsum Principle 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem Ipsum Principle 2 — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem Ipsum Principle 3 — Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Lorem Ipsum Principle 4 — Duis aute irure dolor in reprehenderit in voluptate velit.",
      "Lorem Ipsum Principle 5 — Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    ],
    imageUrl: "https://picsum.photos/seed/gcg/800/600",
    imageAlt: "Corporate governance placeholder",
    documentHref: "/resources",
  },

  // ── Tab 2: Gratification Control ─────────────────────────────────────────
  {
    id: "gratification",
    label: "Gratification Control",
    layout: "side",
    title: "Gratification Control",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.",
    ],
    numberedList: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Duis aute irure dolor in reprehenderit in voluptate velit.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    ],
    imageUrl: "https://picsum.photos/seed/gratification/800/600",
    imageAlt: "Compliance officer placeholder",
    documentHref: "/resources",
  },

  // ── Tab 3: Risk Management ────────────────────────────────────────────────
  {
    id: "risk",
    label: "Risk Management",
    layout: "side",
    title: "Risk Management",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    bulletList: [
      "Lorem Ipsum Risk 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem Ipsum Risk 2 — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem Ipsum Risk 3 — Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Lorem Ipsum Risk 4 — Duis aute irure dolor in reprehenderit in voluptate velit.",
      "Lorem Ipsum Risk 5 — Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    ],
    imageUrl: "https://picsum.photos/seed/risk/800/600",
    imageAlt: "Risk management placeholder",
    documentHref: "/resources",
  },

  // ── Tab 4: Anti-Bribery Management System ────────────────────────────────
  {
    id: "smap",
    label: "Anti-Bribery System",
    layout: "side",
    title: "Anti-Bribery Management System",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    bulletList: [
      "Lorem Ipsum policy — Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem Ipsum screening — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem Ipsum controls — Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Lorem Ipsum segregation — Duis aute irure dolor in reprehenderit in voluptate velit.",
      "Lorem Ipsum training — Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      "Lorem Ipsum reporting — Confidential reporting channel for any issues.",
    ],
    imageUrl: "https://picsum.photos/seed/smap/800/600",
    imageAlt: "Legal and compliance placeholder",
    documentHref: "/resources",
  },

  // ── Tab 5: Whistleblowing System ─────────────────────────────────────────
  {
    id: "whistleblowing",
    label: "Whistleblowing System",
    layout: "banner",
    title: "Whistleblowing System",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.",
    ],
    imageUrl: "https://picsum.photos/seed/wbs/800/600",
    imageAlt: "Reporting portal placeholder",
    documentHref: "/resources",
  },

  // ── Tab 6: Privacy Policy ────────────────────
  {
    id: "privacy",
    label: "Privacy Policy",
    layout: "none",
    title: "Privacy Policy",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    subSections: [
      {
        heading: "1. Lorem Ipsum Section I",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
        orderedList: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing.",
          "Sed do eiusmod tempor incididunt ut labore.",
          "Ut enim ad minim veniam, quis nostrud.",
          "Duis aute irure dolor in reprehenderit in.",
        ],
      },
      {
        heading: "2. Lorem Ipsum Section II",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
        orderedList: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing.",
          "Sed do eiusmod tempor incididunt ut labore.",
          "Ut enim ad minim veniam, quis nostrud.",
          "Duis aute irure dolor in reprehenderit in.",
          "Excepteur sint occaecat cupidatat non.",
        ],
      },
      {
        heading: "3. Lorem Ipsum Section III",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
      },
      {
        heading: "4. Lorem Ipsum Section IV",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
      },
      {
        heading: "5. Lorem Ipsum Section V",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
      },
      {
        heading: "6. Lorem Ipsum Section VI",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ],
      },
    ],
  },
];
