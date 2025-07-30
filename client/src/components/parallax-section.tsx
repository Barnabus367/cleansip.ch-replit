import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxSection({ children, offset = 30, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  // Sehr subtiler Parallax-Effekt
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : offset]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={`relative ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}

export function SmoothScrollContainer({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Smooth scroll behavior
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [prefersReducedMotion]);
  
  return <>{children}</>;
}