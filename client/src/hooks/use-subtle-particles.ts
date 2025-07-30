import { useState, useEffect, useCallback, useRef } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  lifetime: number;
  opacity: number;
  type: 'success' | 'interaction' | 'ambient';
}

export function useSubtleParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  const spawnParticle = useCallback((x: number, y: number, type: Particle['type'] = 'interaction') => {
    if (prefersReducedMotion) return;
    
    const colors = {
      success: '#00BFA6',
      interaction: '#FFD54F', 
      ambient: '#00BFA6'
    };
    
    // Nur 3-5 Partikel spawnen - sehr minimal
    const particleCount = type === 'success' ? 5 : 3;
    
    for (let i = 0; i < particleCount; i++) {
      const newParticle: Particle = {
        id: Math.random().toString(36),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 1.5, // Sehr langsame Bewegung
        vy: -Math.random() * 1 - 0.5,
        size: Math.random() * 4 + 2, // Kleine Partikel
        color: colors[type],
        lifetime: 60, // Kurze Lebensdauer
        opacity: 0.6,
        type
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]); // Max 20 Partikel
    }
  }, [prefersReducedMotion]);
  
  // Minimal physics
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const updateParticles = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.02, // Sehr minimale Gravitation
          lifetime: p.lifetime - 1,
          opacity: (p.lifetime / 60) * 0.6, // Fade out
          size: Math.max(0.5, p.size - 0.02) // Schrumpfen
        }))
        .filter(p => p.lifetime > 0 && p.size > 0.5)
      );
      
      animationRef.current = requestAnimationFrame(updateParticles);
    };
    
    animationRef.current = requestAnimationFrame(updateParticles);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);
  
  return { particles, spawnParticle };
}