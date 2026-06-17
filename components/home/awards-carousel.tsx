"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AwardsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const awards = [
    { title: "Lorem Ipsum Award 2023", img: "https://picsum.photos/200?random=21", text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." },
    { title: "Dolor Sit Amet Prize", img: "https://picsum.photos/200?random=22", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    { title: "Consectetur Recognition", img: "https://picsum.photos/200?random=23", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
    { title: "Adipiscing Elit Medal", img: "https://picsum.photos/200?random=24", text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui." },
    { title: "Tempor Incididunt Trophy", img: "https://picsum.photos/200?random=25", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem." },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Lorem Ipsum Awards
          </h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative px-8 md:px-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {awards.map((award, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full">
                    <img 
                      src={award.img} 
                      alt="Award placeholder" 
                      className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-slate-50 shadow-sm"
                    />
                    <h3 className="text-xl font-bold text-yellow-600 mb-4">{award.title}</h3>
                    <p className="text-slate-500 text-sm">{award.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={scrollPrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-yellow-600 shadow-md border border-slate-100 transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-yellow-600 shadow-md border border-slate-100 transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === selectedIndex ? "bg-yellow-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Scroll to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
