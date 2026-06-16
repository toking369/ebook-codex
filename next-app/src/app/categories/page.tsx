import Header from "@/components/Header";
import CategoriesHero from "@/components/CategoriesHero";
import CategoryDetailSection from "@/components/CategoryDetailSection";
import Footer from "@/components/Footer";

export default function CategoriesPage() {
  return (
    <main className="cyber-grid min-h-screen">
      <Header />
      <CategoriesHero />
      <CategoryDetailSection />
      <Footer />
    </main>
  );
}
