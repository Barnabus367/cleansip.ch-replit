import Footer from 'components/layout/footer';
import { CleanSipHero } from 'components/cleansip/hero';
import { FeaturedProducts } from 'components/cleansip/featured-products';
import { USPSection } from 'components/cleansip/usp-section';

export const metadata = {
  description:
    'CleanSip - Premium Plastikstrohhalme und Party-Zubehör. Nie mehr matschige Alternativen! Schnelle Lieferung in der ganzen Schweiz.',
  openGraph: {
    type: 'website',
    title: 'CleanSip - Plastikstrohhalme & Party-Zubehör',
    description: 'Premium Plastikstrohhalme und Party-Zubehör. Nie mehr matschige Alternativen!'
  }
};

export default function HomePage() {
  return (
    <>
      <CleanSipHero />
      <USPSection />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
