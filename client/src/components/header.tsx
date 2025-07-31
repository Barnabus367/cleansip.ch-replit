import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import CleanSipLogo from "../../logo-ceansip.svg";

export default function Header() {
  const [location] = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const { toast } = useToast();

  const navigation = [
    { name: "Strohhalme", href: "/category/strohhalme" },
    { name: "Party Cups", href: "/coming-soon" },
    { name: "Rührstäbchen", href: "/coming-soon" },
    { name: "Besteck", href: "/coming-soon" },
  ];

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount === 5) {
      // Reset counter
      setLogoClickCount(0);
      
      // Confetti effect simulation
      toast({
        title: "🎉 Du hast die geheime Strohhalm-Party gefunden!",
        description: "Hier ist ein spezieller 10% Rabatt-Code: REBEL10",
      });
      
      // Add some visual celebration
      const confettiColors = ['#00BFA6', '#003B46', '#FFD54F'];
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.style.position = 'fixed';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.width = '10px';
          confetti.style.height = '10px';
          confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          confetti.style.borderRadius = '50%';
          confetti.style.zIndex = '9999';
          confetti.style.animation = 'fall 3s linear forwards';
          confetti.style.pointerEvents = 'none';
          
          document.body.appendChild(confetti);
          
          setTimeout(() => {
            document.body.removeChild(confetti);
          }, 3000);
        }, i * 100);
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center hover:scale-105 transition-transform duration-200" onClick={handleLogoClick}>
                <img 
                  src={CleanSipLogo} 
                  alt="CleanSip Logo" 
                  className="h-10 w-auto"
                />
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`transition-colors ${
                  location === item.href 
                    ? "text-brand-primary font-medium" 
                    : "text-gray-700 hover:text-brand-primary"
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className={`text-lg transition-colors ${
                        location === item.href 
                          ? "text-brand-primary font-medium" 
                          : "text-gray-700 hover:text-brand-primary"
                      }`}>
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
