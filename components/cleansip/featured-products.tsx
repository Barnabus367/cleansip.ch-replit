import Link from 'next/link';

const products = [
  {
    id: 'cs-100',
    name: 'CleanSip Strohhalme 100er Pack',
    price: 'CHF 14.90',
    description: 'Premium Plastikstrohhalme für jeden Anlass. Robust, hygienisch und perfekt für alle Getränke.',
    image: '/api/placeholder/400/400',
    features: ['Nie matschig', 'Robust', 'Hygienisch', '100 Stück'],
    colors: ['Transparent', 'Weiss', 'Schwarz']
  },
  {
    id: 'cs-party-set',
    name: 'Party Starter Set',
    price: 'CHF 29.90',
    description: 'Komplettes Party-Set mit Strohhalmen, Bechern und Rührern. Perfekt für bis zu 20 Personen.',
    image: '/api/placeholder/400/400',
    features: ['200 Strohhalme', '50 Becher', '25 Rührer', 'Komplettset'],
    colors: ['Bunt gemischt'],
    badge: 'Bestseller'
  },
  {
    id: 'cs-premium',
    name: 'CleanSip Premium Edition',
    price: 'CHF 24.90',
    description: 'Extrastarke Premium-Strohhalme mit eleganter Verpackung. Ideal für besondere Anlässe.',
    image: '/api/placeholder/400/400',
    features: ['Extra stark', 'Elegante Box', 'Premium Qualität', '150 Stück'],
    colors: ['Gold', 'Silber', 'Schwarz'],
    badge: 'Premium'
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unsere Bestseller
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie unsere beliebtesten Produkte – perfekt für jede Feier und jeden Anlass.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.badge === 'Bestseller' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                {/* SVG Straw Illustration */}
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <svg width="120" height="180" viewBox="0 0 120 180" className="drop-shadow-lg">
                    <defs>
                      <linearGradient id={`gradient-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#00BFA6', stopOpacity: 0.8}} />
                        <stop offset="50%" style={{stopColor: '#20B2AA', stopOpacity: 0.9}} />
                        <stop offset="100%" style={{stopColor: '#003B46', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    
                    {/* Main straw body */}
                    <rect x="50" y="20" width="20" height="140" rx="10" fill={`url(#gradient-${product.id})`} />
                    
                    {/* Bendable section */}
                    <path d="M50 40 L70 40 L80 30 L60 30 Z" fill={`url(#gradient-${product.id})`} />
                    
                    {/* Ridges */}
                    <line x1="50" y1="45" x2="70" y2="45" stroke="#FFD54F" strokeWidth="1" />
                    <line x1="50" y1="50" x2="70" y2="50" stroke="#FFD54F" strokeWidth="1" />
                    <line x1="50" y1="55" x2="70" y2="55" stroke="#FFD54F" strokeWidth="1" />
                    
                    {/* Highlight */}
                    <ellipse cx="60" cy="25" rx="8" ry="2" fill="#FFD54F" opacity="0.7" />
                  </svg>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Verfügbare Farben:</p>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-emerald-500 text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300"
          >
            Alle Produkte anzeigen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}