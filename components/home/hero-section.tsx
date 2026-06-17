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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-20 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center">
      {/* Background overlay using Navy Blue */}
      <div
        className="absolute inset-0 bg-[#0B1B3D]/75"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center flex-1 w-full pt-12 pb-[320px] sm:pb-[220px] lg:pb-[140px] px-6 md:px-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <span className="text-sm font-semibold text-yellow-500 tracking-widest mb-4 block uppercase">
            SELAMAT DATANG DI WIRATAMA INDRAMAYU PERKASA
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Lorem Ipsum Dolor Sit Amet Consectetur
          </h1>
          <p className="text-gray-200 text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          {/* CTA Button */}
          <Link
            href="#"
            className="px-8 py-3 rounded-full border-2 border-white bg-transparent !text-white font-medium hover:bg-yellow-500 hover:border-yellow-500 hover:!text-slate-900 transition-all duration-300"
          >
            Lorem Ipsum
          </Link>
        </div>
      </div>

      {/* Floating Bottom Stats Bar */}
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
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
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

