import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import { FadeInSection } from "./page-transition";
import { motion, useScroll, useTransform } from "framer-motion";
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

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, -200]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.6, 0.9]);

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
      {/* Hero Image Background with Parallax Effect */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110"
      >
        <img
          src={heroImagePath}
          alt="CleanSip Premium Strohhalme - Endlich wieder echte Strohhalme"
          className="w-full h-full object-cover filter blur-[1px]"
        />
        {/* Dynamic overlay with scroll-based opacity */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">

          {/* Enhanced Typography - Premium Headlines */}
          <FadeInSection>
            <h1 className={cn(
              "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8",
              "font-inter tracking-[-0.04em] leading-[0.85]",
              "drop-shadow-2xl text-rendering-optimizelegibility",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-white">Endlich wieder</span>
              <br />
              <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(0,191,166,0.5)]">echte</span>
              <br />
              <span className="text-white">Strohhalme.</span>
            </h1>
          </FadeInSection>

          {/* Premium Subtext with Enhanced Readability */}
          <FadeInSection delay={0.2}>
            <p className="text-xl lg:text-2xl text-gray-100 mb-16 max-w-4xl mx-auto leading-relaxed font-medium tracking-[-0.005em]">
              Schluss mit matschigen Öko-Alternativen. Keine Bevormundung.
              <br className="hidden sm:block" />
              Nur bewährte Qualität für erwachsene Ansprüche.
            </p>
          </FadeInSection>

          {/* Iconic CTA Button - Direct to Product */}
          <FadeInSection delay={0.4}>
            <Link to="/product/plastik-strohhalm">
              <Button
                size="lg"
                onClick={handleCTAClick}
                className={cn(
                  "bg-brand-primary hover:bg-brand-primary/90 text-white font-bold",
                  "text-xl px-16 py-6 rounded-full",
                  "shadow-[0_20px_40px_rgba(0,191,166,0.3)] hover:shadow-[0_25px_50px_rgba(0,191,166,0.4)]",
                  "transform hover:scale-110 transition-all duration-300 hover:-translate-y-2",
                  "tracking-wide uppercase"
                )}
              >
                Jetzt zurückholen
              </Button>
            </Link>
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