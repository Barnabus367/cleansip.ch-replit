import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "./cart-sheet";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import logoPath from "/logo-ceansip.svg";

export default function Header() {
  const [location] = useLocation();
  const { cartItemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic header behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    // Show/hide based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    
    // Add background on scroll
    setIsScrolled(currentScrollY > 20);
    setLastScrollY(currentScrollY);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", label: "Start", isActive: location === "/" },
    { href: "/product/plastik-strohhalm", label: "Shop", isActive: location.includes("/product") },
    { href: "/about", label: "Über uns", isActive: location === "/about" },
    { href: "/contact", label: "Kontakt", isActive: location === "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-premium" 
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <img
                  src={logoPath}
                  alt="CleanSip"
                  className={cn(
                    "h-8 w-auto transition-all duration-500",
                    isScrolled ? "filter-none" : "brightness-0 invert"
                  )}
                />
                {/* Premium dot indicator */}
                <div className="absolute -right-2 -top-1 w-2 h-2 bg-[#00BFA6] rounded-full animate-pulse" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <span className={cn(
                      "type-label text-sm transition-colors duration-300",
                      isScrolled ? "text-[#0A0A0A]" : "text-white",
                      item.isActive && "text-[#00BFA6]",
                      "hover:text-[#00BFA6]"
                    )}>
                      {item.label}
                    </span>
                    
                    {/* Active indicator */}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#00BFA6]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: item.isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Cart Button */}
              <CartSheet>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-300",
                    isScrolled 
                      ? "bg-[#0A0A0A] text-white hover:bg-[#00BFA6]" 
                      : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#00BFA6] text-[#0A0A0A] rounded-full flex items-center justify-center type-label text-[10px]"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.button>
              </CartSheet>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-all duration-300",
                  isScrolled 
                    ? "bg-[#0A0A0A] text-white" 
                    : "bg-white/10 backdrop-blur-sm text-white"
                )}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-[#FAFAF9] z-40 md:hidden"
      >
        <div className="flex flex-col h-full pt-24 px-8">
          <nav className="flex-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : 50 
                }}
                transition={{ delay: index * 0.1 }}
                className="py-6 border-b border-[#0A0A0A]/10"
              >
                <Link to={item.href}>
                  <span className={cn(
                    "type-h2 text-[#0A0A0A] transition-colors",
                    item.isActive && "text-[#00BFA6]"
                  )}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="py-8 border-t border-[#0A0A0A]/10"
          >
            <p className="type-caption text-[#6B7280]">
              © 2024 CleanSip. Swiss Quality.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}