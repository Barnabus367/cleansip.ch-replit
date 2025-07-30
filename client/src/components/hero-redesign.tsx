import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import { FadeInSection } from "./page-transition";
import heroImagePath from "@assets/pexels-3170155-9462365_1753910576699.jpg";

// Professional Trust Badge Icons
const TrustBadge = ({ icon, text, className }: { icon: React.ReactNode; text: string; className?: string }) => (
  <div className={cn(
    "flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-4",
    "shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
    className
  )}>
    <div className="w-6 h-6 flex items-center justify-center text-brand-secondary">
      {icon}
    </div>
    <span className="text-brand-secondary font-semibold text-sm whitespace-nowrap">{text}</span>
  </div>
);

export default function HeroRedesign() {
  const [isVisible, setIsVisible] = useState(false);
  const { spawnParticle } = useSubtleParticles();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (e: React.MouseEvent) => {
    // Spawn subtle particles on CTA click
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnParticle(centerX, centerY);
      }, i * 20);
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Hero Image Background with subtle blur overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImagePath}
          alt="CleanSip Premium Strohhalme - Endlich wieder echte Strohhalme"
          className="w-full h-full object-cover filter blur-[1px]"
        />
        {/* Sophisticated overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          
          {/* Iconic Three-Line Headline */}
          <FadeInSection>
            <h1 className={cn(
              "text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8",
              "font-inter tracking-tighter leading-[0.85]",
              "drop-shadow-2xl",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Endlich wieder
              <br />
              <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(0,191,166,0.5)]">echte</span>
              <br />
              Strohhalme.
            </h1>
          </FadeInSection>

          {/* Punchy Subtext */}
          <FadeInSection delay={0.2}>
            <p className="text-xl lg:text-2xl text-gray-100 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              Keine aufweichenden Alternativen. Keine Kompromisse. 
              <br className="hidden sm:block" />
              Nur bewährte Qualität für erwachsene Ansprüche.
            </p>
          </FadeInSection>

          {/* Iconic CTA Button */}
          <FadeInSection delay={0.4}>
            <Link to="/shop">
              <Button 
                size="lg"
                onClick={handleCTAClick}
                className={cn(
                  "bg-brand-primary hover:bg-brand-primary/90 text-black font-bold",
                  "text-xl px-16 py-6 rounded-full mb-20",
                  "shadow-[0_20px_40px_rgba(0,191,166,0.3)] hover:shadow-[0_25px_50px_rgba(0,191,166,0.4)]",
                  "transform hover:scale-110 transition-all duration-300 hover:-translate-y-2",
                  "tracking-wide uppercase letterspacing-wider"
                )}
              >
                Jetzt bestellen
              </Button>
            </Link>
          </FadeInSection>

          {/* Professional Trust Badge Bar */}
          <FadeInSection delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-5xl mx-auto">
              
              {/* Swiss Quality Badge */}
              <TrustBadge 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12,2L13.09,8.26L18,9L13.09,9.74L12,16L10.91,9.74L6,9L10.91,8.26L12,2Z"/>
                  </svg>
                }
                text="Swiss Quality"
              />

              {/* Reliability Shield Badge */}
              <TrustBadge 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10.5,17L6.5,13L7.91,11.59L10.5,14.17L16.59,8.09L18,9.5L10.5,17Z"/>
                  </svg>
                }
                text="Zuverlässig"
              />

              {/* Customer Satisfaction Badge */}
              <TrustBadge 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
                  </svg>
                }
                text="4.8★ Bewertung"
              />

              {/* Anti-Mainstream Badge */}
              <TrustBadge 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                  </svg>
                }
                text="Anti-Trend"
              />

            </div>
          </FadeInSection>

        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <FadeInSection delay={0.8}>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-semibold tracking-wider uppercase">Mehr erfahren</span>
            <div className="w-6 h-12 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1.5 h-4 bg-brand-primary rounded-full mt-2 animate-bounce shadow-[0_0_10px_rgba(0,191,166,0.5)]"></div>
            </div>
          </div>
        </div>
      </FadeInSection>

    </section>
  );
}