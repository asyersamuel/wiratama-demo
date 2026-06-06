import type { Tender } from "@/features/tender/types";

export const tenders: Tender[] = [
  {
    id: "jalan-utama-zona-a",
    code: "TND-WIP-001",
    title: "Pembangunan Jalan Utama Kawasan Industri Zona A",
    category: "Civil Infrastructure",
    location: "PT WIP Industrial Estate, Indramayu",
    zone: "Zona A",
    estimatedValue: 148000000000,
    status: "under_review",
    deadline: "2026-06-24",
    startDate: "2026-07-15",
    description:
      "Main access road package for the first industrial estate cluster, covering heavy-duty pavement, road shoulder, and supporting drainage coordination for early tenant access.",
    scope: [
      "Site clearing and subgrade preparation for the main estate corridor.",
      "Construction of heavy-duty rigid pavement and road shoulder.",
      "Road signage, curb line, and basic traffic safety installation.",
      "Coordination with utility and drainage package interfaces.",
    ],
    requirements: [
      "Minimum three similar industrial road or estate infrastructure projects in the last five years.",
      "Proven site management team with weekly progress reporting discipline.",
      "Ability to mobilize equipment and core manpower within two weeks after award.",
    ],
    requiredDocuments: [
      "Company profile and business license summary.",
      "Similar project reference list.",
      "Method statement and high-level resource plan.",
      "Commercial proposal and estimated project duration.",
    ],
    milestones: [
      {
        label: "Tender published",
        date: "2026-06-03",
        note: "Tender package released to invited and registered vendors.",
      },
      {
        label: "Site briefing",
        date: "2026-06-10",
        note: "Vendors receive corridor alignment and construction constraints.",
      },
      {
        label: "Proposal closing",
        date: "2026-06-24",
        note: "Commercial and technical proposals submitted for review.",
      },
      {
        label: "Evaluation window",
        date: "2026-06-28",
        note: "Internal team compares cost, duration, and relevant experience.",
      },
    ],
    proposals: [
      {
        id: "PR-WIP-001",
        tenderId: "jalan-utama-zona-a",
        vendorId: "prima-infrastruktur-abadi",
        contractorName: "PT Prima Infrastruktur Abadi",
        type: "contractor",
        offeredPrice: 142500000000,
        estimatedDurationDays: 210,
        relevantExperience:
          "Delivered industrial access road packages and logistics yard corridor.",
        technicalFit:
          "Strong heavy-duty pavement capability and disciplined site reporting.",
        recommendation:
          "Strong candidate with balanced pricing, relevant industrial road experience, and clear mobilization planning.",
        status: "shortlisted",
        submittedAt: "2026-06-23",
        notes:
          "Commercial offer is competitive and the site reporting approach is well structured for the owner team.",
        submittedDocuments: [
          "Company Profile",
          "Technical Proposal",
          "Price Proposal",
          "Project Experience",
          "Safety Statement",
        ],
        score: 91,
      },
      {
        id: "PR-WIP-002",
        tenderId: "jalan-utama-zona-a",
        vendorId: "indra-konstruksi-mandiri",
        contractorName: "PT Indra Konstruksi Mandiri",
        type: "contractor",
        offeredPrice: 145200000000,
        estimatedDurationDays: 198,
        relevantExperience:
          "Handled estate road and drainage tie-in works for industrial developments.",
        technicalFit:
          "Fast execution plan with solid coordination model.",
        recommendation:
          "Strong technical contender with excellent schedule confidence and good integration planning.",
        status: "under_review",
        submittedAt: "2026-06-23",
        notes:
          "Execution confidence is strong, with internal review still focused on schedule assumptions and site coordination detail.",
        submittedDocuments: [
          "Company Profile",
          "Technical Proposal",
          "Price Proposal",
          "Equipment List",
        ],
        score: 89,
      },
    ],
  },
  {
    id: "drainase-utama-zona-a",
    code: "TND-WIP-002",
    title: "Pekerjaan Drainase Utama Zona A",
    category: "Drainage Works",
    location: "PT WIP Industrial Estate, Indramayu",
    zone: "Zona A",
    estimatedValue: 64000000000,
    status: "open",
    deadline: "2026-07-02",
    startDate: "2026-07-20",
    description:
      "Primary drainage package for Zone A to support estate runoff control, road corridor protection, and future plot readiness.",
    scope: [
      "Excavation and construction of the main drainage channel.",
      "Box culvert and crossing points for internal estate roads.",
      "Outfall coordination with downstream estate water management plan.",
    ],
    requirements: [
      "Experience in industrial drainage or flood-control related civil works.",
      "Availability of dewatering equipment and field supervision resources.",
      "Basic HSE plan and quality control approach.",
    ],
    requiredDocuments: [
      "Company profile.",
      "Drainage work references.",
      "Execution methodology.",
      "Commercial proposal.",
    ],
    milestones: [
      {
        label: "Tender opened",
        date: "2026-06-08",
        note: "Vendors can review package scope and qualification criteria.",
      },
      {
        label: "Clarification session",
        date: "2026-06-18",
        note: "Internal engineering team answers technical questions.",
      },
      {
        label: "Submission deadline",
        date: "2026-07-02",
        note: "Final deadline for proposal submission.",
      },
    ],
    proposals: [
      {
        id: "PR-WIP-009",
        tenderId: "drainase-utama-zona-a",
        vendorId: "karya-beton-nusantara",
        contractorName: "PT Karya Beton Nusantara",
        type: "contractor",
        offeredPrice: 62000000000,
        estimatedDurationDays: 135,
        relevantExperience:
          "Completed concrete drainage and rigid pavement support works.",
        technicalFit:
          "Good civil works experience with drainage structure capability.",
        recommendation:
          "Balanced civil proposal with relevant drainage structure capability and acceptable commercial position.",
        status: "under_review",
        submittedAt: "2026-06-21",
        notes:
          "Internal team is reviewing capacity assumptions and structure sequencing detail.",
        submittedDocuments: [
          "Company Profile",
          "Technical Proposal",
          "Price Proposal",
          "Project Portfolio",
        ],
        score: 82,
      },
      {
        id: "PR-WIP-004",
        tenderId: "drainase-utama-zona-a",
        vendorId: "tirta-drainase-mandiri",
        contractorName: "PT Tirta Drainase Mandiri",
        type: "contractor",
        offeredPrice: 63500000000,
        estimatedDurationDays: 150,
        relevantExperience:
          "Focused on open channel drainage and utility crossing works.",
        technicalFit:
          "Relevant drainage specialization but requires capacity review.",
        recommendation:
          "Specialized drainage submission that can move through early review before shortlist discussion.",
        status: "submitted",
        submittedAt: "2026-06-22",
        notes:
          "Submission is complete, with internal review still needed on execution capacity and mobilization depth.",
        submittedDocuments: [
          "Company Profile",
          "Technical Proposal",
          "Price Proposal",
        ],
        score: 79,
      },
    ],
  },
  {
    id: "pipa-hdpe-air-bersih",
    code: "TND-WIP-003",
    title: "Pengadaan Pipa HDPE untuk Jaringan Air Bersih",
    category: "Utility Procurement",
    location: "PT WIP Industrial Estate, Indramayu",
    zone: "Zona Utilitas",
    estimatedValue: 21500000000,
    status: "open",
    deadline: "2026-06-28",
    startDate: "2026-07-10",
    description:
      "Supply package for HDPE pipe network to support the first phase of clean water distribution across the initial estate development area.",
    scope: [
      "Supply of HDPE pipes and fittings according to approved specification.",
      "Delivery planning by batch for staged installation works.",
      "Basic product documentation and quality certificates.",
    ],
    requirements: [
      "Demonstrated supply record for utility or infrastructure projects.",
      "Ability to support staggered delivery schedule.",
      "Product certificates and quality assurance documents available.",
    ],
    requiredDocuments: [
      "Product catalog and technical datasheet.",
      "Supply references.",
      "Delivery schedule proposal.",
      "Commercial quotation.",
    ],
    milestones: [
      {
        label: "RFQ issued",
        date: "2026-06-05",
        note: "Utility supply package released to potential vendors.",
      },
      {
        label: "Technical clarification",
        date: "2026-06-14",
        note: "Specification alignment for pipe class and fittings.",
      },
      {
        label: "Bid closing",
        date: "2026-06-28",
        note: "Supply proposals submitted for commercial review.",
      },
    ],
    proposals: [
      {
        id: "PR-WIP-005",
        tenderId: "pipa-hdpe-air-bersih",
        vendorId: "sumber-jaya-teknik",
        contractorName: "CV Sumber Jaya Teknik",
        type: "supplier",
        offeredPrice: 21250000000,
        estimatedDurationDays: 32,
        relevantExperience:
          "Handled distribution of utility materials for estate-scale and municipal support works.",
        technicalFit:
          "Flexible logistics plan with moderate documentation maturity and phased delivery readiness.",
        recommendation:
          "Useful benchmark submission for commercial review in the open tender stage.",
        status: "submitted",
        submittedAt: "2026-06-20",
        notes:
          "Delivery agility is strong, but product traceability detail is still average.",
        submittedDocuments: [
          "Product Catalog",
          "Utility Supply References",
          "Delivery Schedule",
          "Commercial Quotation",
        ],
        score: 77,
      },
      {
        id: "PR-WIP-006",
        tenderId: "pipa-hdpe-air-bersih",
        vendorId: "utility-supply-nusantara",
        contractorName: "PT Utility Supply Nusantara",
        type: "supplier",
        offeredPrice: 21410000000,
        estimatedDurationDays: 30,
        relevantExperience:
          "Supplied HDPE pipe systems and fittings for industrial utility and infrastructure projects.",
        technicalFit:
          "Well-documented material compliance with a clean staggered delivery schedule.",
        recommendation:
          "Competitive open submission with strong documentation quality for early review.",
        status: "submitted",
        submittedAt: "2026-06-21",
        notes:
          "Material compliance documentation is complete and commercially close to owner estimate.",
        submittedDocuments: [
          "Product Catalog",
          "Technical Datasheet",
          "Delivery Schedule",
          "Commercial Quotation",
        ],
        score: 81,
      },
    ],
  },
  {
    id: "kantor-pengelola-kawasan",
    code: "TND-WIP-004",
    title: "Pembangunan Kantor Pengelola Kawasan",
    category: "Building Construction",
    location: "PT WIP Industrial Estate, Indramayu",
    zone: "Zona Administrasi",
    estimatedValue: 38500000000,
    status: "draft",
    deadline: "2026-07-18",
    startDate: "2026-08-04",
    description:
      "Planned construction of the estate management office to support operational command, tenant services, and project coordination.",
    scope: [
      "Main office building construction.",
      "Architectural, MEP, and basic fit-out package coordination.",
      "External works and parking area connection.",
    ],
    requirements: [
      "Building contractor experience with office or administration facilities.",
      "Basic MEP coordination capability.",
      "Availability of project manager and site engineer.",
    ],
    requiredDocuments: [
      "Company profile.",
      "Building project references.",
      "Preliminary method statement.",
      "Draft commercial breakdown.",
    ],
    milestones: [
      {
        label: "Package preparation",
        date: "2026-06-12",
        note: "Internal team finalizes scope and owner estimate.",
      },
      {
        label: "Draft review",
        date: "2026-06-21",
        note: "Management reviews packaging approach before tender release.",
      },
    ],
    proposals: [],
  },
  {
    id: "jaringan-listrik-zona-b",
    code: "TND-WIP-005",
    title: "Instalasi Jaringan Listrik Zona B",
    category: "Electrical Infrastructure",
    location: "PT WIP Industrial Estate, Indramayu",
    zone: "Zona B",
    estimatedValue: 57200000000,
    status: "under_review",
    deadline: "2026-05-26",
    startDate: "2026-06-18",
    description:
      "Electrical distribution package for Zone B to establish reliable early power access for estate operations and future tenant readiness.",
    scope: [
      "Medium-voltage distribution installation.",
      "Panel, cable tray, and estate feeder routing works.",
      "Testing, energization, and handover support.",
    ],
    requirements: [
      "Electrical infrastructure experience for industrial or utility environments.",
      "Commissioning capability and documentation readiness.",
      "Resource plan for staged energization.",
    ],
    requiredDocuments: [
      "Electrical project references.",
      "Technical execution plan.",
      "Commissioning method summary.",
      "Commercial proposal.",
    ],
    milestones: [
      {
        label: "Proposal review",
        date: "2026-05-18",
        note: "Internal commercial and technical review completed.",
      },
      {
        label: "Clarification round",
        date: "2026-05-23",
        note: "Selected vendors answer clarification on commissioning readiness.",
      },
      {
        label: "Shortlist preparation",
        date: "2026-05-27",
        note: "Procurement team prepares shortlist before final decision.",
      },
    ],
    proposals: [
      {
        id: "PR-WIP-007",
        tenderId: "jaringan-listrik-zona-b",
        vendorId: "energi-mandiri-sistem",
        contractorName: "PT Energi Mandiri Sistem",
        type: "contractor",
        offeredPrice: 56300000000,
        estimatedDurationDays: 126,
        relevantExperience:
          "Delivered multiple industrial power distribution and utility integration packages.",
        technicalFit:
          "Strong technical fit for commissioning, energization, and electrical interface coordination.",
        recommendation:
          "Strong candidate based on commissioning readiness and clear electrical execution planning.",
        status: "shortlisted",
        submittedAt: "2026-05-24",
        notes:
          "Commissioning track record is strong and supplier coordination appears well structured.",
        submittedDocuments: [
          "Electrical References",
          "Execution Plan",
          "Commissioning Method",
          "Commercial Proposal",
        ],
        score: 92,
      },
      {
        id: "PR-WIP-008",
        tenderId: "jaringan-listrik-zona-b",
        vendorId: "cahaya-utilitas-indonesia",
        contractorName: "PT Cahaya Utilitas Indonesia",
        type: "contractor",
        offeredPrice: 55650000000,
        estimatedDurationDays: 134,
        relevantExperience:
          "Executed medium-voltage installation and feeder routing works for utility and industrial clients.",
        technicalFit:
          "Solid execution plan with acceptable documentation, pending final clarification on testing resources.",
        recommendation:
          "Appropriate contender to keep under review while technical staffing is validated.",
        status: "under_review",
        submittedAt: "2026-05-23",
        notes:
          "Commercial position is balanced, but testing and energization manpower still need confirmation.",
        submittedDocuments: [
          "Electrical References",
          "Technical Execution Plan",
          "Testing Schedule",
          "Commercial Proposal",
        ],
        score: 86,
      },
      {
        id: "PR-WIP-010",
        tenderId: "jaringan-listrik-zona-b",
        vendorId: "sumber-jaya-teknik",
        contractorName: "CV Sumber Jaya Teknik",
        type: "contractor",
        offeredPrice: 54800000000,
        estimatedDurationDays: 149,
        relevantExperience:
          "General utility support works with limited portfolio in estate-scale electrical infrastructure packages.",
        technicalFit:
          "Commercially attractive but less convincing on commissioning depth and specialist electrical execution.",
        recommendation:
          "Useful price benchmark, though the proposal remains early in the review process.",
        status: "submitted",
        submittedAt: "2026-05-22",
        notes:
          "Interesting cost position, but utility specialist depth should be reviewed carefully.",
        submittedDocuments: [
          "Utility References",
          "Execution Plan",
          "Commercial Proposal",
        ],
        score: 74,
      },
    ],
  },
];
