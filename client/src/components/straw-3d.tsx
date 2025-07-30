import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// CSS-basierte 3D Strohhalm Komponente - professionell und performant
function CSS3DStraw({ mouse, hovered }: { mouse: { x: number, y: number }, hovered: boolean }) {
  const rotateX = mouse.y * 15; // Sehr subtile Rotation
  const rotateY = mouse.x * 20;
  const scale = hovered ? 1.05 : 1;
  
  return (
    <div className="flex items-center justify-center h-full perspective-1000">
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Hauptstrohhalm */}
        <div className="relative w-8 h-80 mx-auto">
          {/* Strohhalm Körper mit Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary rounded-full shadow-lg">
            {/* Glanz-Effekt */}
            <div className="absolute left-1 top-0 w-1 h-full bg-white/30 rounded-full" />
            <div className="absolute right-1 top-0 w-0.5 h-full bg-black/20 rounded-full" />
          </div>
          
          {/* Streifen Details */}
          <div className="absolute inset-x-0 top-16 h-4 bg-brand-secondary/80 rounded-full" />
          <div className="absolute inset-x-0 top-36 h-4 bg-brand-secondary/80 rounded-full" />
          <div className="absolute inset-x-0 top-56 h-4 bg-brand-secondary/80 rounded-full" />
          
          {/* 3D Shadow */}
          <div 
            className="absolute -bottom-2 left-1/2 w-12 h-6 bg-black/20 rounded-full blur-sm"
            style={{ transform: 'translateX(-50%) rotateX(90deg) translateZ(-10px)' }}
          />
        </div>
        
        {/* Umgebungseffekte */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtile Partikeln */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-primary/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Animiertes SVG als Fallback
function AnimatedSVGStraw() {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-brand-neutral to-white">
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        className="transition-transform duration-300 hover:scale-110"
        style={{ transform: `rotate(${rotation * 0.5}deg)` }}
      >
        <defs>
          <linearGradient id="strawGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00BFA6" />
            <stop offset="50%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#00BFA6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Strohhalm Körper */}
        <rect
          x="85"
          y="20"
          width="30"
          height="240"
          fill="url(#strawGradient)"
          filter="url(#glow)"
          rx="15"
        />
        
        {/* Streifen */}
        <rect x="80" y="60" width="40" height="8" fill="#003B46" opacity="0.7" rx="4" />
        <rect x="80" y="120" width="40" height="8" fill="#003B46" opacity="0.7" rx="4" />
        <rect x="80" y="180" width="40" height="8" fill="#003B46" opacity="0.7" rx="4" />
        
        {/* Glanz-Effekt */}
        <rect
          x="90"
          y="20"
          width="4"
          height="240"
          fill="white"
          opacity="0.3"
          rx="2"
        />
      </svg>
    </div>
  );
}

export function Straw3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [useAnimations, setUseAnimations] = useState(true);
  
  useEffect(() => {
    // Respektiere prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setUseAnimations(!prefersReducedMotion);
  }, []);
  
  if (!useAnimations) {
    return <AnimatedSVGStraw />;
  }
  
  return (
    <div 
      className="w-full h-[400px] cursor-grab active:cursor-grabbing bg-gradient-to-br from-brand-neutral/20 to-white/50 rounded-2xl overflow-hidden shadow-lg relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CSS3DStraw mouse={mouse} hovered={hovered} />
      
      {/* Professional overlay */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-600 font-medium">
        Bewege die Maus für Interaktion
      </div>
      
      {/* Quality indicators */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-secondary flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Premium Qualität
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-secondary flex items-center">
          <div className="w-2 h-2 bg-brand-primary rounded-full mr-2" />
          Swiss Made
        </div>
      </div>
    </div>
  );
}