import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, isOpen, setIsOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("Checkout-Prozess würde hier starten");
    }, 2000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full sm:w-[480px] bg-[#FAFAF9] p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <h2 className="type-h2 text-[#0A0A0A]">
              Warenkorb
              {cartItems.length > 0 && (
                <span className="ml-2 type-caption text-[#6B7280]">
                  ({cartItems.length})
                </span>
              )}
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-[#0A0A0A]/5 hover:bg-[#0A0A0A]/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {cartItems.length === 0 ? (
              // Empty Cart State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-[calc(100vh-200px)] px-8"
              >
                <ShoppingBag className="w-16 h-16 text-[#E5E7EB] mb-6" />
                <h3 className="type-h3 text-[#0A0A0A] mb-4">
                  Dein Warenkorb ist leer
                </h3>
                <p className="type-body text-[#6B7280] text-center mb-8">
                  Zeit für echte Qualität ohne Kompromisse.
                </p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#0A0A0A] hover:bg-[#00BFA6] text-white rounded-full px-8 py-4 type-label"
                >
                  Jetzt einkaufen
                </Button>
              </motion.div>
            ) : (
              // Cart Items
              <div className="px-8 py-6 space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-white rounded-sm overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="type-body font-medium text-[#0A0A0A]">
                              {item.title}
                            </h4>
                            <p className="type-caption text-[#6B7280]">
                              {item.color}
                            </p>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6B7280] hover:text-[#DC2626] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-[#E5E7EB] hover:border-[#0A0A0A] flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            
                            <span className="type-body-sm font-medium text-[#0A0A0A] w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-[#E5E7EB] hover:border-[#0A0A0A] flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <p className="type-body font-medium text-[#0A0A0A]">
                            CHF {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with Checkout */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="border-t border-[#E5E7EB] bg-white px-8 py-6"
          >
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="type-body text-[#6B7280]">Zwischensumme</span>
              <span className="type-h3 text-[#0A0A0A]">
                CHF {cartTotal.toFixed(2)}
              </span>
            </div>
            
            <p className="type-caption text-[#6B7280] mb-6">
              Versand wird beim Checkout berechnet
            </p>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={cn(
                "w-full bg-[#0A0A0A] text-white rounded-full py-4 type-label tracking-widest",
                "hover:bg-[#00BFA6] transition-all duration-500",
                "flex items-center justify-center gap-3",
                "relative overflow-hidden group",
                isCheckingOut && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="relative z-10">
                {isCheckingOut ? "Wird verarbeitet..." : "Zur Kasse"}
              </span>
              {!isCheckingOut && (
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              )}
              
              {/* Background animation */}
              <div className="absolute inset-0 bg-[#00BFA6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 type-caption text-[#6B7280]">
                <div className="w-4 h-4 bg-[#00BFA6] rounded-full" />
                <span>Sicher bezahlen</span>
              </div>
              <div className="flex items-center gap-2 type-caption text-[#6B7280]">
                <div className="w-4 h-4 bg-[#00BFA6] rounded-full" />
                <span>Schneller Versand</span>
              </div>
            </div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}