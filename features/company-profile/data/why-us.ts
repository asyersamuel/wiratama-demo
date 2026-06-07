import type { WhyUsTabContent } from "@/features/company-profile/types";

/**
 * All content is sanitized dummy data — no real company names,
 * real statistics context, or real external URLs.
 * (docs/design.md §4 — Content Sanitization)
 */

export const whyUsTabs: WhyUsTabContent[] = [
  {
    id: "sez",
    label: "Lorem Ipsum 1",
    title: "Lorem Ipsum Title 1",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    imageUrl: "https://picsum.photos/seed/whyus1/800/600",
    imageAlt: "Placeholder Image 1",
  },
  {
    id: "master-plan",
    label: "Lorem Ipsum 2",
    title: "Lorem Ipsum Title 2",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus erat vitae lorem sollicitudin, ut facilisis nisl imperdiet. Pellentesque molestie ante a mi tristique sodales.",
      "Morbi feugiat, erat id interdum luctus, lorem mi elementum elit, eget tristique ex libero in nisl. Maecenas tristique massa vel tempor egestas. Phasellus tincidunt nulla ac metus vestibulum pretium.",
    ],
    imageUrl: "https://picsum.photos/seed/whyus2/800/600",
    imageAlt: "Placeholder Image 2",
  },
  {
    id: "infrastructure",
    label: "Lorem Ipsum 3",
    title: "Lorem Ipsum Title 3",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque tristique ex, pulvinar tempor purus molestie non. Proin finibus hendrerit est sed commodo.",
      "Suspendisse ac accumsan erat. Phasellus sed justo nec sem lacinia dignissim at ut sem. Mauris iaculis feugiat orci. In eleifend ex quis sem efficitur, ut scelerisque tellus eleifend.",
    ],
    imageUrl: "https://picsum.photos/seed/whyus3/800/600",
    imageAlt: "Placeholder Image 3",
  },
  {
    id: "one-stop",
    label: "Lorem Ipsum 4",
    title: "Lorem Ipsum Title 4",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id interdum arcu. Sed et ipsum quis velit porttitor efficitur non in nibh. Vivamus scelerisque erat sit amet magna pretium efficitur.",
      "Aliquam tristique ligula nec egestas tempus. Proin egestas nunc at sapien tristique, quis elementum libero hendrerit. Phasellus vestibulum leo ut nulla dignissim convallis.",
    ],
    imageUrl: "https://picsum.photos/seed/whyus4/800/600",
    imageAlt: "Placeholder Image 4",
  },
  {
    id: "policy",
    label: "Lorem Ipsum 5",
    title: "Lorem Ipsum Title 5",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur mi purus, et efficitur neque hendrerit id. Proin sodales sollicitudin eleifend.",
      "In feugiat lacus dictum sem sodales molestie. Etiam volutpat purus eu ipsum sollicitudin pellentesque. Ut porta facilisis dolor, rhoncus placerat metus laoreet pulvinar.",
    ],
    imageUrl: "https://picsum.photos/seed/whyus5/800/600",
    imageAlt: "Placeholder Image 5",
  },
];
