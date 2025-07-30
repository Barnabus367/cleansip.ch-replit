import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function LiquidText({ children, className }: { children: string, className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Add a subtle wobble animation on mount
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.animation = 'liquid-wobble 3s ease-in-out infinite';
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* SVG Filter für Liquid-Effekt */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-filter" filterUnits="userSpaceOnUse">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.02" 
              numOctaves="3" 
              result="turbulence"
              seed="5"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="8s" 
                values="0.02;0.05;0.02" 
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap 
              in2="turbulence" 
              in="SourceGraphic" 
              scale="6" 
              xChannelSelector="R" 
              yChannelSelector="G"
            >
              <animate 
                attributeName="scale" 
                dur="4s" 
                values="6;12;6" 
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
          
          <filter id="liquid-drip" filterUnits="userSpaceOnUse">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.03" 
              numOctaves="2" 
              result="drip-noise"
            />
            <feDisplacementMap 
              in2="drip-noise" 
              in="SourceGraphic" 
              scale="15" 
              xChannelSelector="R" 
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>
      
      <span 
        ref={textRef}
        className={cn(
          "inline-block relative transition-all duration-300",
          "hover:scale-105 cursor-default",
          "text-shadow-liquid",
          className
        )}
        style={{ 
          filter: isHovered ? 'url(#liquid-drip)' : 'url(#liquid-filter)',
          transform: isHovered ? 'perspective(1000px) rotateX(5deg)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-liquid-text={children}
      >
        {children}
      </span>
    </>
  );
}

export function AnimatedWeight({ text, className }: { text: string, className?: string }) {
  const [weight, setWeight] = useState(400);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWeight(prev => {
        const weights = [300, 400, 500, 600, 700, 800, 700, 600, 500];
        const currentIndex = weights.indexOf(prev);
        return weights[(currentIndex + 1) % weights.length];
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span 
      className={cn("transition-all duration-300", className)}
      style={{ 
        fontWeight: weight,
        fontVariationSettings: `'wght' ${weight}`
      }}
    >
      {text}
    </span>
  );
}

export function GlitchText({ children, className }: { children: string, className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Random glitch intervals
    const createGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
      
      // Next glitch in 2-8 seconds
      setTimeout(createGlitch, Math.random() * 6000 + 2000);
    };
    
    // Start first glitch after 1 second
    const timer = setTimeout(createGlitch, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <span 
      className={cn(
        "relative inline-block",
        isGlitching && "text-glitch",
        className
      )}
      data-text={children}
    >
      {children}
    </span>
  );
}