import React from "react";
import Link from "next/link";

export function HeroSection() {
  const stats = [
    { num: "4,300 Ha", label: "Total Managed Area" },
    { num: "100+", label: "Active Tenants" },
    { num: "12", label: "Countries Represented" },
    { num: "30+", label: "Strategic Partners" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://picsum.photos/1920/1080')]"
      />
      <div className="absolute inset-0 bg-[#0B1B3D]/75" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto flex-1 w-full pt-12 pb-[320px] sm:pb-[220px] lg:pb-[140px]">
        <span className="text-yellow-500 font-bold uppercase tracking-wider text-xs md:text-sm mb-4">
          SELAMAT DATANG DI WIRATAMA INDRAMAYU PERKASA
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Lorem Ipsum Dolor Sit Amet Consectetur
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <Link 
          href="#" 
          className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0B1B3D] transition-colors duration-300 shadow-lg text-white"
        >
          Lorem Ipsum
        </Link>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#111c38]/70 backdrop-blur-sm border-t border-white/20 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 text-center">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center justify-center px-4 ${
                  i < 3 ? "border-r border-white/20" : ""
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
    </section>
  );
}

