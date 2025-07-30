import { FadeInSection } from "./page-transition";

export default function TrustSignals() {
  return (
    <section className="py-16 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            
            {/* Swiss Made */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🇨🇭</span>
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-sm mb-2">SWISS MADE</h3>
              <p className="text-xs text-gray-600">
                Hergestellt in der Schweiz nach höchsten Qualitätsstandards
              </p>
            </div>

            {/* Quality Tested */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center">
                  <span className="text-black text-2xl">✓</span>
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-sm mb-2">QUALITÄTS-GETESTET</h3>
              <p className="text-xs text-gray-600">
                Jeder Strohhalm durchläuft strenge Qualitätskontrollen
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center">
                  <span className="text-black text-xl font-bold">4.8★</span>
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-sm mb-2">KUNDENZUFRIEDENHEIT</h3>
              <p className="text-xs text-gray-600">
                4.8/5 Sterne bei über 1000 Bewertungen
              </p>
            </div>

            {/* Fast Shipping */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🚚</span>
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-sm mb-2">SCHNELLER VERSAND</h3>
              <p className="text-xs text-gray-600">
                Kostenloser Versand ab CHF 30 in der ganzen Schweiz
              </p>
            </div>

          </div>
        </FadeInSection>

        {/* Statistics Banner */}
        <FadeInSection delay={0.4}>
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div>
                <div className="text-4xl font-bold text-brand-primary mb-2">4,827</div>
                <div className="text-gray-600 font-medium">Zufriedene Kunden</div>
              </div>

              <div>
                <div className="text-4xl font-bold text-brand-primary mb-2">98%</div>
                <div className="text-gray-600 font-medium">Weiterempfehlungsrate</div>
              </div>

              <div>
                <div className="text-4xl font-bold text-brand-primary mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Zuverlässigkeit</div>
              </div>

            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}