import Header from "@/components/header";
import Hero from "@/components/hero";
import StorytellingSection from "@/components/storytelling-section";
import ProductGrid from "@/components/product-grid";
import Testimonials from "@/components/testimonials";
import TrustSection from "@/components/trust-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#FAFAF9]">
        <Hero />
        <StorytellingSection />
        <ProductGrid />
        <Testimonials />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
