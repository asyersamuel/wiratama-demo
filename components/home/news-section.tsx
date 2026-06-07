import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

export function NewsSection() {
  const news = [
    { title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "Oct 12, 2023", img: "https://picsum.photos/400/250?random=41" },
    { title: "Sed do eiusmod tempor incididunt ut labore et dolore", date: "Oct 10, 2023", img: "https://picsum.photos/400/250?random=42" },
    { title: "Ut enim ad minim veniam, quis nostrud exercitation", date: "Oct 05, 2023", img: "https://picsum.photos/400/250?random=43" },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Lorem Ipsum News
          </h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto rounded-full" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article key={index} className="group cursor-pointer flex flex-col h-full border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="overflow-hidden aspect-video">
                <img 
                  src={item.img} 
                  alt="News placeholder" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                  <Link 
                    href="#" 
                    className="text-sm font-semibold text-slate-900 group-hover:text-yellow-600 border-b border-slate-300 group-hover:border-yellow-600 transition-colors pb-0.5"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
