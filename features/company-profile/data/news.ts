import type { NewsItem } from "@/features/company-profile/types";

/**
 * News items data — all content is sanitized generic dummy copy.
 * No real articles, dates, or image names are used. (docs/design.md §4)
 */
export const newsItems: NewsItem[] = [
  {
    slug: "lorem-ipsum-news-1",
    category: "Lorem Ipsum 1",
    date: "2026-01-01",
    title: "Lorem Ipsum Dolor Sit Amet I",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/news",
    tone: "gold",
    imageUrl: "https://picsum.photos/seed/news1/800/600",
  },
  {
    slug: "lorem-ipsum-news-2",
    category: "Lorem Ipsum 2",
    date: "2026-01-15",
    title: "Lorem Ipsum Dolor Sit Amet II",
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    href: "/news",
    tone: "emerald",
    imageUrl: "https://picsum.photos/seed/news2/800/600",
  },
  {
    slug: "lorem-ipsum-news-3",
    category: "Lorem Ipsum 3",
    date: "2026-02-01",
    title: "Lorem Ipsum Dolor Sit Amet III",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    href: "/news",
    tone: "slate",
    imageUrl: "https://picsum.photos/seed/news3/800/600",
  },
  {
    slug: "lorem-ipsum-news-4",
    category: "Lorem Ipsum 4",
    date: "2026-02-15",
    title: "Lorem Ipsum Dolor Sit Amet IV",
    excerpt:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    href: "/news",
    tone: "copper",
    imageUrl: "https://picsum.photos/seed/news4/800/600",
  },
  {
    slug: "lorem-ipsum-news-5",
    category: "Lorem Ipsum 5",
    date: "2026-03-01",
    title: "Lorem Ipsum Dolor Sit Amet V",
    excerpt:
      "Morbi feugiat, erat id interdum luctus, lorem mi elementum elit, eget tristique ex libero in nisl.",
    href: "/news",
    tone: "teal",
    imageUrl: "https://picsum.photos/seed/news5/800/600",
  },
  {
    slug: "lorem-ipsum-news-6",
    category: "Lorem Ipsum 6",
    date: "2026-03-15",
    title: "Lorem Ipsum Dolor Sit Amet VI",
    excerpt:
      "Maecenas tristique massa vel tempor egestas. Phasellus tincidunt nulla ac metus vestibulum pretium.",
    href: "/news",
    tone: "sand",
    imageUrl: "https://picsum.photos/seed/news6/800/600",
  },
];
