import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import CategorySection from "@/components/CategorySection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="cyber-grid min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedEbooks />
      <CategorySection />
      <WhyUsSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  );
}
