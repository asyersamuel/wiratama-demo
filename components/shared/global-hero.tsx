import React from "react";
import Link from "next/link";

interface GlobalHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  hasCTA: boolean;
  hasStatsBar?: boolean;
}

export function GlobalHero({
  eyebrow,
  title,
  description,
  hasCTA,
  hasStatsBar = false,
}: GlobalHeroProps) {
  const stats = [
    { num: "4,300 Ha", label: "Total Managed Area" },
    { num: "100+", label: "Active Tenants" },
    { num: "12", label: "Countries Represented" },
    { num: "30+", label: "Strategic Partners" },
  ];

  return (
    <section className={`relative flex flex-col justify-center overflow-hidden pt-24 bg-[url('https://picsum.photos/1920/600')] bg-cover bg-center ${
      hasStatsBar ? "min-h-screen" : "min-h-[45vh] md:min-h-[50vh]"
    }`}>
      {/* Background Navy Blue Overlay */}
      <div className="absolute inset-0 bg-[#1A2E4C]/80" aria-hidden="true" />
      
      {/* Main Content */}
      <div className={`relative z-10 flex flex-col justify-center flex-1 w-full pt-16 ${
        hasStatsBar ? "pb-[320px] sm:pb-[220px] lg:pb-[140px]" : "pb-20 md:pb-24"
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-left">
            <span className="text-sm font-medium text-yellow-500 mb-4 block">
              {eyebrow}
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              {description}
            </p>
            {/* Conditional CTA Button */}
            {hasCTA && (
              <Link
                href="#"
                className="inline-block border-2 border-white text-white bg-transparent rounded-full px-8 py-3 font-semibold hover:bg-white hover:text-[#0B172A] transition-colors duration-300 shadow-lg"
              >
                Lorem Ipsum
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Conditional Stats Bar (Homepage Only) */}
      {hasStatsBar && (
        <div className="absolute bottom-0 left-0 w-full bg-[#0B1B3D]/80 backdrop-blur-sm border-t border-white/20 z-10">
          <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 text-center">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center px-4 ${
                    i < 3 ? "lg:border-r border-white/20" : ""
                  }`}
                >
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">
                    {stat.num}
                  </span>
                  <span className="font-normal text-gray-300 text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
