import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wiratama Industrial Demo",
  description:
    "MVP demo untuk profile company, tender management, contractor-supplier history, dan gate & supply tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-foreground)]">
        {children}
      </body>
    </html>
  );
}
