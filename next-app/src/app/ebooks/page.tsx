import Header from "@/components/Header";
// removed from "@/components/EbooksHero";
import EbooksLibrary from "@/components/EbooksLibrary";
import Footer from "@/components/Footer";

export default function EbooksPage() {
  return (
    <main className="cyber-grid min-h-screen">
      <Header />
      
      <EbooksLibrary />
      <Footer />
    </main>
  );
}
