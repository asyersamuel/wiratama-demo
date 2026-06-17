import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { MasterPlanningSection } from "@/components/home/master-planning-section";
import { ProductsSection } from "@/components/home/products-section";
import { AwardsCarousel } from "@/components/home/awards-carousel";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { WelcomeVideoSection } from "@/components/home/welcome-video-section";
import { NewsSection } from "@/components/home/news-section";

export const metadata: Metadata = {
  title: "Home",
  description: "Responsive Home Page built with Next.js and Tailwind CSS",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <MasterPlanningSection />
      <ProductsSection />
      <AwardsCarousel />
      <TestimonialsCarousel />
      <WelcomeVideoSection />
      <NewsSection />
    </div>
  );
}
