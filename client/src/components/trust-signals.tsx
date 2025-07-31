import { FadeInSection } from "./page-transition";
import { Star, Shield, Truck, Award } from "lucide-react";

export default function TrustSignals() {
  return (
    <section className="py-20 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">

            {/* Swiss Made */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-base mb-3">SWISS MADE</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hergestellt in der Schweiz nach höchsten Qualitätsstandards
              </p>
            </div>

            {/* Quality Tested */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-base mb-3">QUALITÄTS-GETESTET</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Jeder Strohhalm durchläuft strenge Qualitätskontrollen
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-white fill-white" />
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-base mb-3">KUNDENZUFRIEDENHEIT</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                4.8/5 Sterne bei über 1000 Bewertungen
              </p>
            </div>

            {/* Fast Shipping */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-secondary to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-brand-secondary text-base mb-3">SCHNELLER VERSAND</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
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