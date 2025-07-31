import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
// SVG will be embedded directly in the component

// Provokante Claims als Array-Props (einfach steuerbar)
const REBELLION_CLAIMS = [
  { text: "Nie matschig.", position: "top-left" },
  { text: "100% Stabil.", position: "top-right" },
  { text: "Swiss Quality.", position: "bottom-left" },
  { text: "Uncool für Ökos.", position: "bottom-right" }
];

interface HeroMinimalistProps {
  claims?: Array<{ text: string; position: string; }>;
  className?: string;
}

export default function HeroMinimalist({ 
  claims = REBELLION_CLAIMS, 
  className = "" 
}: HeroMinimalistProps) {
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const strawRef = useRef<HTMLDivElement>(null);

  // Scroll progress for animations
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const strawRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const strawY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200]);
  const strawScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.8]);

  // Check if straw is in view for claims animation
  const strawInView = useInView(strawRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px" 
  });

  // Trigger claims when scrolling starts
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.1 && !isScrollTriggered) {
        setIsScrollTriggered(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isScrollTriggered]);

  // Position mapping for claims around the straw
  const getClaimPosition = (position: string) => {
    const positions = {
      "top-left": "top-4 left-4 lg:top-8 lg:left-8",
      "top-right": "top-4 right-4 lg:top-8 lg:right-8", 
      "bottom-left": "bottom-4 left-4 lg:bottom-8 lg:left-8",
      "bottom-right": "bottom-4 right-4 lg:bottom-8 lg:right-8"
    };
    return positions[position as keyof typeof positions] || "top-4 left-4";
  };

  const handleOrderClick = () => {
    // Scroll to products section or navigate to shop
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      ref={heroRef}
      className={cn(
        "relative min-h-screen bg-gradient-to-br from-white to-[#F6FFFC] overflow-hidden",
        className
      )}
    >
      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Large Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-brand-secondary text-center leading-tight mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Endlich wieder<br />
          <span className="text-brand-primary">echte</span><br />
          Strohhalme.
        </motion.h1>

        {/* SVG Straw - Central Hero Object */}
        <motion.div
          ref={strawRef}
          className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] mb-8 lg:mb-12"
          style={{ 
            rotate: strawRotation,
            y: strawY,
            scale: strawScale
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* CleanSip Premium Straw SVG - Brand Primary Color #00BFA6 */}
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 800 600" 
              className="drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 191, 166, 0.15))' }}
            >
              <defs>
                {/* Brand gradient for premium look */}
                <linearGradient id="strawGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00BFA6" />
                  <stop offset="50%" stopColor="#00D4AA" />
                  <stop offset="100%" stopColor="#00BFA6" />
                </linearGradient>
                
                {/* Glow effect */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Swiss-quality plastic straw - vertical design */}
              <g transform="translate(400, 300)">
                
                {/* Main straw body - premium Swiss quality */}
                <rect 
                  x="-12" 
                  y="-250" 
                  width="24" 
                  height="500" 
                  fill="url(#strawGradient)" 
                  rx="12"
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />
                
                {/* Premium ridged texture - Swiss engineering */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <g key={i}>
                    <rect 
                      x="-10" 
                      y={-240 + i * 32} 
                      width="20" 
                      height="2" 
                      fill="#00E6B8" 
                      opacity="0.7"
                      rx="1"
                    />
                    <rect 
                      x="-8" 
                      y={-238 + i * 32} 
                      width="16" 
                      height="1" 
                      fill="#FFFFFF" 
                      opacity="0.3"
                      rx="0.5"
                    />
                  </g>
                ))}
                
                {/* Bent top section - ergonomic design */}
                <path
                  d="M 0 -250 Q -20 -270 -45 -265 Q -70 -260 -80 -240 Q -85 -225 -75 -210"
                  stroke="url(#strawGradient)"
                  strokeWidth="24"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                
                {/* Top opening */}
                <ellipse
                  cx="-75"
                  cy="-210"
                  rx="12"
                  ry="8"
                  fill="#00BFA6"
                  opacity="0.8"
                />
                
                {/* Bottom opening */}
                <ellipse
                  cx="0"
                  cy="250"
                  rx="12"
                  ry="4"
                  fill="#003B46"
                  opacity="0.6"
                />
                
                {/* Swiss quality badge */}
                <circle
                  cx="30"
                  cy="-150"
                  r="15"
                  fill="#00BFA6"
                  opacity="0.1"
                />
                <text
                  x="30"
                  y="-145"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#00BFA6"
                  fontWeight="bold"
                >
                  CH
                </text>
                
                {/* Rebellious streak - subtle design element */}
                <line
                  x1="-15"
                  y1="0"
                  x2="15"
                  y2="0"
                  stroke="#FFD54F"
                  strokeWidth="2"
                  opacity="0.4"
                />
              </g>
            </svg>
          </div>

          {/* Animated Claims/Badges around the straw */}
          {isScrollTriggered && strawInView && claims.map((claim, index) => (
            <motion.div
              key={index}
              className={cn(
                "absolute z-20",
                getClaimPosition(claim.position)
              )}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
              }}
            >
              <Badge 
                variant="outline" 
                className="bg-white/90 backdrop-blur-sm border-brand-primary text-brand-secondary font-semibold text-sm px-3 py-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {claim.text}
              </Badge>
              
              {/* Connecting line to straw (optional) */}
              <motion.div
                className="absolute w-px h-8 bg-brand-primary/30 left-1/2 -translate-x-1/2"
                style={{
                  [claim.position.includes('top') ? 'top' : 'bottom']: '100%',
                  transform: claim.position.includes('top') ? 'translateX(-50%) rotate(45deg)' : 'translateX(-50%) rotate(-45deg)'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            onClick={handleOrderClick}
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
          >
            Jetzt bestellen
          </Button>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-brand-primary/30 rounded-full flex justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-brand-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle mint background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-primary rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-brand-primary rounded-full"></div>
          <div className="absolute bottom-1/4 left-3/4 w-3 h-3 bg-brand-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}