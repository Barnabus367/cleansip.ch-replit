import Header from "@/components/header";
import HeroWithStory from "@/components/hero-with-story";
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
        <HeroWithStory />
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
