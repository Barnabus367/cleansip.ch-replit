import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { LiquidText, GlitchText, AnimatedWeight } from "./liquid-text";

export default function HeroWithStory() {
  const [customerCount, setCustomerCount] = useState(4827);
  const [inView, setInView] = useState(false);

  // Animierte Zählung der Kunden und Scroll-Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomerCount(prev => prev + Math.floor(Math.random() * 2));
    }, 8000);
    
    // Trigger animation after mount
    const timer = setTimeout(() => setInView(true), 200);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-brand-secondary to-brand-secondary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,191,166,0.1),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Content - Rebellische Message */}
          <div className="space-y-8 text-white">
            <div className={cn(
              "transition-all duration-1000 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full">
                  Revolution
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tight">
                <AnimatedWeight text="SCHLUSS MIT" className="block mb-2" /><br />
                <LiquidText className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent block">
                  AUFGEWEICHTEN
                </LiquidText><br />
                <GlitchText className="text-brand-accent text-glow">
                  TRÄUMEN
                </GlitchText>
              </h1>
            </div>

            <div className={cn(
              "transition-all duration-1000 delay-400",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg">
                CleanSip bringt dir Strohhalme zurück,<br />
                die <AnimatedWeight text="durchhalten" className="text-brand-primary font-bold" />
              </p>
            </div>

            {/* Animierter Kunden-Counter */}
            <div className={cn(
              "transition-all duration-1000 delay-600",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-brand-primary">
                      <AnimatedWeight text={`${customerCount.toLocaleString('de-CH')}+`} /> <span className="text-white">Schweizer</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      trinken wieder mit Stil
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-800",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <Link href="/product/cleansip-100">
                <Button className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold px-8 py-4 h-auto text-lg shadow-2xl shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300 transform hover:scale-105 pulse-rebellious">
                  🔥 <AnimatedWeight text="REBELLION STARTEN" />
                </Button>
              </Link>
              <Link href="/manifest">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-auto text-lg font-bold transition-all duration-300">
                  📜 MANIFEST LESEN
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className={cn(
              "flex items-center space-x-6 text-sm text-gray-400 transition-all duration-1000 delay-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span>Live auf Lager</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-brand-accent">⚡</div>
                <span>48h Lieferung</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-brand-accent">🇨🇭</div>
                <span>Swiss Made Quality</span>
              </div>
            </div>
          </div>

          {/* Right Side - Split Screen Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              
              {/* Links: Versagender Papierstrohhalm */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/50 z-10 rounded-2xl" />
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                  alt="Zerfallender Papierstrohhalm" 
                  className={cn(
                    "w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700",
                    inView ? "blur-sm scale-95 opacity-60" : "blur-none scale-100 opacity-100"
                  )}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-bold">
                    ❌ PAPIERFRUST
                  </div>
                </div>
              </div>

              {/* Rechts: Premium CleanSip */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/20 z-10 rounded-2xl" />
                <img 
                  src="https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                  alt="CleanSip Premium Strohhalm in Cocktail" 
                  className={cn(
                    "w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700",
                    inView ? "scale-105 brightness-110" : "scale-100 brightness-100"
                  )}
                />
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="bg-brand-primary text-black px-3 py-2 rounded-lg text-sm font-bold">
                    ✅ CLEANSIP POWER
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Badges */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-2xl border-l-4 border-brand-primary">
              <div className="text-sm font-bold text-brand-secondary">CHF 14.90</div>
              <div className="text-xs text-gray-600">100 Stück = CHF 0.15/Stück</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-brand-accent text-black rounded-xl p-4 shadow-2xl">
              <div className="text-sm font-bold">🛡️ 100% Stabilität</div>
              <div className="text-xs">Garantiert kein Aufweichen</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}