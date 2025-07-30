import { useEffect, useState } from 'react';

export function SubtleBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-brand-neutral/30 to-white" />
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Subtiler Gradient mit minimaler Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-neutral/20 to-white">
        {/* Sehr subtile Blobs - kaum sichtbar */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-subtle-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full mix-blend-multiply filter blur-3xl animate-subtle-blob animation-delay-3000"></div>
      </div>
      
      {/* Minimales Noise Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full">
          <defs>
            <filter id="subtle-noise">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.4" 
                numOctaves="2" 
                result="noise"
              />
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 0.01 0.02 0.01 0" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#subtle-noise)" />
        </svg>
      </div>
    </div>
  );
}

// Particle Overlay Component für Buttons und Interaktionen
export function ParticleOverlay({ particles }: { particles: Array<{
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}> }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
}