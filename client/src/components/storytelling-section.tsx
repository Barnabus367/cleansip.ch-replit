import { FadeInSection } from "./page-transition";
import { Badge } from "@/components/ui/badge";

export default function StorytellingSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Left - Story Text */}
          <div>
            <FadeInSection>
              <Badge className="mb-6 bg-brand-secondary text-white px-4 py-2">
                Unsere Mission
              </Badge>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-secondary mb-8 leading-tight">
                Keine Kompromisse. 
                <span className="text-brand-primary"> Nur Qualität.</span>
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="prose prose-lg text-gray-700 space-y-6">
                <p>
                  <strong>Wir haben genug von Öko-Heuchelei.</strong> Während alle Welt auf den 
                  Papier-Strohhalm-Zug aufspringt, vergessen sie das Wichtigste: 
                  <span className="text-brand-primary font-semibold">die Benutzererfahrung</span>.
                </p>
                
                <p>
                  CleanSip steht für das, was Millionen von Menschen wirklich wollen: 
                  <strong>Strohhalme, die funktionieren</strong>. Keine matschigen Kompromisse, 
                  keine überteuerten "nachhaltigen" Alternativen, die nach zwei Schlucken versagen.
                </p>
                
                <p>
                  <strong>Wir sind ehrlich:</strong> Unsere Strohhalme sind aus Plastik. 
                  Und das ist auch gut so. Denn sie machen genau das, was ein Strohhalm 
                  machen soll - <span className="text-brand-primary font-semibold">durchhalten bis zum letzten Tropfen</span>.
                </p>
              </div>
            </FadeInSection>
          </div>

          {/* Right - Image */}
          <div>
            <FadeInSection delay={0.6}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="CleanSip Produktion - Schweizer Qualität"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-brand-primary text-black p-6 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">4.8/5</div>
                  <div className="text-sm font-medium">Kundenbewertung</div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Values Grid */}
        <FadeInSection delay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-brand-secondary mb-4">Stärke & Zuverlässigkeit</h3>
              <p className="text-gray-600">
                Unsere Strohhalme halten durch - vom ersten bis zum letzten Schluck. 
                Keine bösen Überraschungen.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-brand-secondary mb-4">Ehrlichkeit & Transparenz</h3>
              <p className="text-gray-600">
                Wir verkaufen Plastik-Strohhalme und stehen dazu. 
                Keine Greenwashing-Märchen.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🇨🇭</span>
              </div>
              <h3 className="text-xl font-bold text-brand-secondary mb-4">Schweizer Qualität</h3>
              <p className="text-gray-600">
                Produziert nach höchsten Standards. 
                Qualität, auf die Sie sich verlassen können.
              </p>
            </div>

          </div>
        </FadeInSection>

        {/* Quote Section */}
        <FadeInSection delay={1.0}>
          <div className="bg-brand-secondary text-white rounded-3xl p-12 mt-24 text-center">
            <blockquote className="text-2xl lg:text-3xl font-light italic mb-8">
              "Endlich wieder Strohhalme, die nicht nach zwei Minuten auseinanderfallen. 
              CleanSip macht das, was alle anderen versprechen aber nicht halten."
            </blockquote>
            <div className="text-brand-primary font-semibold">
              - Thomas M., zufriedener Kunde seit 2023
            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}