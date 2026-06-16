import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutContent from "@/components/AboutContent";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="cyber-grid min-h-screen">
      <Header />
      <AboutHero />
      <AboutContent />
      <Footer />
    </main>
  );
}
