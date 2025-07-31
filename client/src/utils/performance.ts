// Performance monitoring and optimization utilities

export function reportWebVitals() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Basic performance monitoring
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.group('🚀 Performance Metrics');
      console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
      console.log('Load Complete:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
      console.log('Total Load Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
      console.groupEnd();
    });
  }
}

// Image optimization helper
export function optimizeImage(src: string, width?: number, quality = 85): string {
  if (!src) return '';
  
  // If it's already optimized or external, return as-is
  if (src.includes('unsplash.com') || src.includes('shopify')) {
    return src;
  }
  
  return src;
}

// Preload critical resources
export function preloadCriticalResources() {
  const criticalResources = [
    // Font preloading removed - fonts are handled by CSS
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.woff') ? 'font' : 'image';
    if (resource.includes('.woff')) {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options = { threshold: 0.1, rootMargin: '50px' }
) {
  if (!('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, options);
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Check device capabilities
export function getDeviceCapabilities() {
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  const isSlowConnection = (navigator as any).connection && (navigator as any).connection.effectiveType && 
    ['slow-2g', '2g'].includes((navigator as any).connection.effectiveType);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    isLowEnd,
    isSlowConnection,
    prefersReducedMotion,
    shouldReduceAnimations: isLowEnd || isSlowConnection || prefersReducedMotion
  };
}