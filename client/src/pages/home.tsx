import Header from "@/components/header";
import HeroRedesign from "@/components/hero-redesign";
import TrustSignals from "@/components/trust-signals";
import StorytellingSection from "@/components/storytelling-section";
import ProductShowcase from "@/components/product-showcase";
import FeaturedProduct from "@/components/featured-product";
import TestimonialsSection from "@/components/testimonials";
import ComingSoonSection from "@/components/coming-soon-section";
import TrustSection from "@/components/trust-section";
import SocialProofWidget from "@/components/social-proof";
import NewsletterPopup from "@/components/newsletter-popup";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroRedesign />
        <TrustSignals />
        <StorytellingSection />
        <ProductShowcase />
        <FeaturedProduct />
        <TestimonialsSection />
        <ComingSoonSection />
        <TrustSection />
      </main>
      <SocialProofWidget />
      <NewsletterPopup />
      <Footer />
    </>
  );
}
