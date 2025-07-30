export function USPSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Warum CleanSip?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unsere Plastikstrohhalme bieten die perfekte Balance zwischen Funktionalität, 
            Haltbarkeit und Stil für alle Ihre Feierlichkeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* USP 1 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nie wieder matschig</h3>
            <p className="text-gray-600">
              Unsere robusten Plastikstrohhalme behalten ihre Form und Festigkeit, 
              egal wie lange Sie trinken.
            </p>
          </div>

          {/* USP 2 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Blitzschnelle Lieferung</h3>
            <p className="text-gray-600">
              Express-Versand in der ganzen Schweiz. Heute bestellt, 
              morgen bei Ihnen für die spontane Party.
            </p>
          </div>

          {/* USP 3 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Faire Preise</h3>
            <p className="text-gray-600">
              Transparent und fair – premium Qualität zu einem 
              erschwinglichen Preis für jeden Geldbeutel.
            </p>
          </div>

          {/* USP 4 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Swiss Quality</h3>
            <p className="text-gray-600">
              Höchste Schweizer Qualitätsstandards und lokaler 
              Kundenservice, dem Sie vertrauen können.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Überzeugt? Starten Sie jetzt!
            </h3>
            <p className="text-gray-600 mb-6">
              Erleben Sie den Unterschied mit CleanSip Strohhalmen. 
              Perfekt für jede Gelegenheit, von der Familienfeier bis zum Firmen-Event.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Jetzt bestellen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}