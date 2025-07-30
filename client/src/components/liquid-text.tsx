import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function LiquidText({ children, className }: { children: string, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      className={cn(
        "inline-block transition-all duration-700 ease-out",
        isHovered && "transform scale-[1.02]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </span>
  );
}

export function AnimatedWeight({ text, className }: { text: string, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      className={cn(
        "inline-block transition-all duration-500 ease-out cursor-default",
        className
      )}
      style={{
        fontWeight: isHovered ? 800 : 600,
        letterSpacing: isHovered ? '-0.02em' : '-0.01em'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
}

export function AccentText({ children, className }: { children: string, className?: string }) {
  return (
    <span className={cn(
      "relative inline-block",
      "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]",
      "after:bg-brand-accent after:transform after:scale-x-0 after:origin-left",
      "after:transition-transform after:duration-300 after:ease-out",
      "hover:after:scale-x-100",
      className
    )}>
      {children}
    </span>
  );
}

export function TypewriterText({ text, delay = 50 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Respektiere prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  useEffect(() => {
    if (isComplete || prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, delay);
    
    return () => clearInterval(interval);
  }, [text, delay, isComplete, prefersReducedMotion]);
  
  return (
    <span className="font-black">
      {displayText}
      {!isComplete && !prefersReducedMotion && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Legacy exports for backwards compatibility
export const GlitchText = AccentText;