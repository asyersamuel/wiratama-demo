"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  const testimonials = [
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", name: "Lorem Ipsum", title: "CEO, Dolor Sit", avatar: "https://picsum.photos/100?random=31" },
    { text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.", name: "Amet Consectetur", title: "Director, Adipiscing", avatar: "https://picsum.photos/100?random=32" },
    { text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.", name: "Elit Tempor", title: "Manager, Incididunt", avatar: "https://picsum.photos/100?random=33" },
    { text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.", name: "Ut Labore", title: "Founder, Magna Aliqua", avatar: "https://picsum.photos/100?random=34" },
  ];

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Lorem Ipsum Testimonials
          </h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 pl-6 md:flex-[0_0_50%]"
              >
                <div className="flex flex-col h-full items-center text-center">
                  {/* Quote Box */}
                  <div className="bg-slate-50 p-8 md:p-10 rounded-2xl relative w-full mb-8">
                    <Quote className="text-yellow-600 w-10 h-10 mx-auto mb-6 opacity-50" />
                    <p className="text-slate-600 italic text-lg leading-relaxed">
                      "{item.text}"
                    </p>
                    {/* Bottom triangle pointer */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-slate-50" />
                  </div>
                  
                  {/* Avatar & Info */}
                  <img 
                    src={item.avatar} 
                    alt="Avatar" 
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-slate-100"
                  />
                  <h4 className="text-yellow-600 font-bold text-lg">{item.name}</h4>
                  <p className="text-slate-500 text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-12">
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
