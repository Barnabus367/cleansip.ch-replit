import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedProduct from "@/components/featured-product";
import ComingSoonSection from "@/components/coming-soon-section";
import TrustSection from "@/components/trust-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProduct />
        <ComingSoonSection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
