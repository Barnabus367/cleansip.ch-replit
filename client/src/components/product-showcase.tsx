import { FadeInSection } from "./page-transition";

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-secondary mb-6">
              Erlebnis trifft 
              <span className="text-brand-primary"> Zuverlässigkeit</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Während andere Alternativen versagen, liefern CleanSip Strohhalme konstante Qualität - 
              vom ersten bis zum letzten Schluck.
            </p>
          </div>
        </FadeInSection>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          <FadeInSection delay={0.2}>
            <div className="relative group">
              <img 
                src="/attached_assets/pexels-pixabay-531634_1753910576700.jpg"
                alt="CleanSip Strohhalm in Aktion - Blasen zeigen Qualität"
                className="rounded-2xl shadow-lg w-full h-80 object-cover group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Funktionalität</h3>
                  <p className="text-sm">Perfekte Durchflussrate ohne Verstopfung</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <div className="relative group">
              <img 
                src="/attached_assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg"
                alt="CleanSip Premium Strohhalm im Alltag"
                className="rounded-2xl shadow-lg w-full h-80 object-cover group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Alltag</h3>
                  <p className="text-sm">Passt perfekt zu jedem Getränk und Anlass</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <div className="relative group">
              <img 
                src="/attached_assets/pexels-3170155-9462365_1753910576699.jpg"
                alt="CleanSip Strohhalme - Moderne Eleganz"
                className="rounded-2xl shadow-lg w-full h-80 object-cover group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Design</h3>
                  <p className="text-sm">Elegante Ästhetik für moderne Ansprüche</p>
                </div>
              </div>
            </div>
          </FadeInSection>

        </div>

        {/* Comparison Section */}
        <FadeInSection delay={0.8}>
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-center text-brand-secondary mb-12">
              Der Unterschied ist klar
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Papier Strohhalme */}
              <div className="text-center p-6 bg-red-50 rounded-2xl">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h4 className="text-xl font-bold text-red-700 mb-3">Papier-Strohhalme</h4>
                <ul className="text-sm text-red-600 space-y-2">
                  <li>✗ Weichen nach 30 Sekunden auf</li>
                  <li>✗ Geschmack wird beeinflusst</li>
                  <li>✗ Unzuverlässige Erfahrung</li>
                  <li>✗ Teuer bei kurzer Lebensdauer</li>
                </ul>
              </div>

              {/* Bambus/Metall */}
              <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎋</span>
                </div>
                <h4 className="text-xl font-bold text-yellow-700 mb-3">Andere Alternativen</h4>
                <ul className="text-sm text-yellow-600 space-y-2">
                  <li>✗ Schwer zu reinigen</li>
                  <li>✗ Nicht für alle Getränke geeignet</li>
                  <li>✗ Umständlich im Alltag</li>
                  <li>✗ Hohe Anschaffungskosten</li>
                </ul>
              </div>

              {/* CleanSip */}
              <div className="text-center p-6 bg-brand-primary/10 rounded-2xl border-2 border-brand-primary">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-black">🏆</span>
                </div>
                <h4 className="text-xl font-bold text-brand-secondary mb-3">CleanSip Strohhalme</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Bleiben stabil und zuverlässig</li>
                  <li>✓ Geschmacksneutral</li>
                  <li>✓ Konstante Qualität</li>
                  <li>✓ Fair und transparent</li>
                </ul>
              </div>

            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}