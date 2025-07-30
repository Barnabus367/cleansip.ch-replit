import { useState, useEffect } from "react";

export default function SocialProofWidget() {
  const [count, setCount] = useState(2847);
  
  useEffect(() => {
    // Simuliere Live-Updates
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-black shadow-lg p-4 rounded-lg z-50 max-w-xs">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <p className="text-sm font-medium">
          <span className="font-bold text-brand-primary">{count.toLocaleString('de-CH')}</span>
          {' '}Schweizer trinken stabil
        </p>
      </div>
    </div>
  );
}