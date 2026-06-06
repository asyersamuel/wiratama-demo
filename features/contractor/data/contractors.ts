import type { Contractor } from "@/features/contractor/types";

export const contractors: Contractor[] = [
  {
    id: "prima-infrastruktur-abadi",
    name: "PT Prima Infrastruktur Abadi",
    specialization: "Industrial roads and heavy civil infrastructure",
    onTimeRecord: "92% on-time delivery across the last 5 completed packages",
    status: "Preferred shortlist",
    lastAward: "2026-02-14",
    completedProjects: 12,
    averageScore: 91,
    summary:
      "Strong contractor profile for estate road packages, utility corridor coordination, and disciplined site delivery across industrial developments.",
    strengths: [
      "Consistent performance on main access roads and heavy-duty pavement works.",
      "Weekly reporting and mobilization planning are well structured for owner review.",
      "Good coordination track record with drainage and utility interface packages.",
    ],
    history: [
      {
        project: "East Corridor Access Road",
        year: "2026",
        packageName: "Main estate road construction",
        result: "Awarded and completed",
      },
      {
        project: "Logistics Spine Pavement Upgrade",
        year: "2025",
        packageName: "Rigid pavement and shoulder works",
        result: "Awarded and completed",
      },
      {
        project: "Industrial Gate Connector",
        year: "2024",
        packageName: "Road and drainage tie-in",
        result: "Shortlisted",
      },
    ],
  },
  {
    id: "karya-beton-nusantara",
    name: "PT Karya Beton Nusantara",
    specialization: "Rigid pavement, concrete structures, and precast works",
    onTimeRecord: "87% on-time delivery with strong cost control on concrete packages",
    status: "Under review",
    lastAward: "2025-10-09",
    completedProjects: 9,
    averageScore: 85,
    summary:
      "Reliable for concrete-heavy industrial packages with good commercial competitiveness, though multi-package coordination tends to be more conservative.",
    strengths: [
      "Strong rigid pavement execution and precast coordination capability.",
      "Commercial proposals are usually efficient and well structured.",
      "Requires closer review on schedule acceleration and interface planning.",
    ],
    history: [
      {
        project: "Container Yard Hardstand",
        year: "2025",
        packageName: "Rigid pavement package",
        result: "Awarded and completed",
      },
      {
        project: "Utility Crossing Structures",
        year: "2024",
        packageName: "Precast and culvert works",
        result: "Awarded",
      },
      {
        project: "North Access Loop",
        year: "2023",
        packageName: "Road slab and shoulder package",
        result: "Shortlisted",
      },
    ],
  },
  {
    id: "indra-konstruksi-mandiri",
    name: "PT Indra Konstruksi Mandiri",
    specialization: "Integrated civil infrastructure and estate enabling works",
    onTimeRecord: "90% on-time delivery with strong coordination on parallel site packages",
    status: "Active partner",
    lastAward: "2026-01-27",
    completedProjects: 10,
    averageScore: 89,
    summary:
      "Balanced contractor for estate infrastructure with good schedule confidence, field coordination, and readiness for multi-workfront execution.",
    strengths: [
      "Fast mobilization and strong field coordination for overlapping packages.",
      "Good communication between engineering, site execution, and commercial teams.",
      "Well suited for integrated estate road and drainage interfaces.",
    ],
    history: [
      {
        project: "Tenant Access Boulevard",
        year: "2026",
        packageName: "Civil enabling works",
        result: "Awarded and completed",
      },
      {
        project: "Drainage Spine Extension",
        year: "2025",
        packageName: "Drainage and culvert package",
        result: "Awarded and completed",
      },
      {
        project: "South Plot Readiness Works",
        year: "2024",
        packageName: "Road and utility preparation",
        result: "Awarded",
      },
    ],
  },
];
