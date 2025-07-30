import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import { FadeInSection } from "./page-transition";

export default function HeroRedesign() {
  const [customerCount, setCustomerCount] = useState(4827);
  const [inView, setInView] = useState(false);
  const { spawnParticle } = useSubtleParticles();

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    
    // Customer count animation
    const interval = setInterval(() => {
      setCustomerCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Hero Image Background - Large like Simply Chocolate */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="CleanSip Premium Strohhalme - Zuverlässig seit jeher"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Column - Hero Content */}
          <div className="text-white">
            <FadeInSection>
              <Badge className="mb-6 bg-brand-primary text-black font-bold px-4 py-2 text-sm">
                #1 Alternative zu Öko-Strohhalmen
              </Badge>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="block">Endlich wieder</span>
                <span className="block text-brand-primary">echte</span>
                <span className="block">Strohhalme.</span>
              </h1>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                Während Papier-Strohhalme nach 30 Sekunden aufweichen, bleiben CleanSip Strohhalme 
                <span className="text-brand-primary font-semibold"> stabil und zuverlässig</span> - 
                wie es sein sollte.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/product/plastik-strohhalm">
                  <Button 
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold px-8 py-4 text-lg h-auto"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      spawnParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, 'interaction');
                    }}
                  >
                    Jetzt bestellen - CHF 14.90
                  </Button>
                </Link>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg h-auto"
                >
                  Mehr erfahren
                </Button>
              </div>
            </FadeInSection>

            {/* Trust Indicators */}
            <FadeInSection delay={0.8}>
              <div className="flex items-center gap-8 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                  <span>{customerCount.toLocaleString()}+ zufriedene Kunden</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  <span>Schweizer Qualität</span>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column - Product Feature */}
          <div className="relative">
            <FadeInSection delay={1.0}>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Das Problem mit "grünen" Alternativen
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✗</span>
                    </div>
                    <div className="text-white">
                      <div className="font-semibold">Papier-Strohhalme</div>
                      <div className="text-sm text-gray-300">Werden matschig nach 30 Sekunden</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✗</span>
                    </div>
                    <div className="text-white">
                      <div className="font-semibold">Bambus-Strohhalme</div>
                      <div className="text-sm text-gray-300">Teuer und geschmacksneutral? Fehlanzeige</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">✓</span>
                    </div>
                    <div className="text-white">
                      <div className="font-semibold">CleanSip Strohhalme</div>
                      <div className="text-sm text-brand-primary">Zuverlässig, hygienisch, bezahlbar</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}