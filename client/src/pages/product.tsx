import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { Link, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Product() {
  const params = useParams();
  const [location] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 300], [0, -50]);

  // Product handle logic
  const productHandle = params?.handle || (location === '/category/strohhalme' ? 'plastik-strohhalm' : null);

  // Fetch product data
  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/shopify/products', productHandle],
    queryFn: () => productHandle ? getProductByHandle(productHandle) : getProducts(1).then(products => products[0]),
    enabled: !!productHandle || location === '/category/strohhalme',
  });

  // Initialize color and variant
  useEffect(() => {
    if (product && product.availableColors?.length > 0) {
      const defaultColor = product.defaultColor || product.availableColors[0];
      setSelectedColor(defaultColor);
      
      const colorVariants = product.colorVariants[defaultColor];
      if (colorVariants?.length > 0) {
        setSelectedVariant(colorVariants[0]);
      }
    }
  }, [product]);

  // Update variant when color changes
  useEffect(() => {
    if (product && selectedColor && product.colorVariants[selectedColor]) {
      const colorVariants = product.colorVariants[selectedColor];
      setSelectedVariant(colorVariants[0]);
    }
  }, [selectedColor, product]);

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;

    addToCart({
      variantId: selectedVariant.id,
      title: product.title,
      color: selectedColor,
      price: selectedVariant.price,
      image: selectedVariant.image?.url || product.images?.[0]?.url || '',
      sku: selectedVariant.sku,
      quantity: quantity,
    });

    toast({
      title: "Zum Warenkorb hinzugefügt! ✅",
      description: `${quantity}x ${product.title} (${selectedColor})`,
    });
  };

  // Color mapping
  const colorMapping: { [key: string]: string } = {
    "100 Stk. farbig": "#6B7280",
    "100 Stk. Blau": "#2563EB",
    "100 Stk. Grün": "#16A34A",
    "100 Stk. Gelb": "#EAB308",
    "100 Stk. Rot": "#DC2626",
    "100 Stk. Rosa": "#EC4899",
    "100 Stk. Schwarz": "#000000",
    "100 Stk. Weiß": "#FFFFFF",
  };

  const productImages = product?.images || [];
  const currentImage = productImages[currentImageIndex]?.url || selectedVariant?.image?.url;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="loader-premium" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAF9] pt-20">
        {/* Back Navigation */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <Link to="/">
            <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 type-label text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </motion.div>
          </Link>
        </div>

        {/* Product Layout - Editorial Style */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-32">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            
            {/* Left: Images */}
            <motion.div style={{ y: contentY }} className="col-span-12 lg:col-span-7">
              {/* Main Image */}
              <motion.div
                style={{ scale: imageScale }}
                className="relative aspect-square overflow-hidden bg-white rounded-sm"
              >
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Counter */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="type-label text-[#0A0A0A]">
                    {currentImageIndex + 1} / {productImages.length}
                  </span>
                </div>
              </motion.div>

              {/* Thumbnail Grid */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mt-8">
                  {productImages.map((image, index) => (
                    <motion.button
                      key={image.id}
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "aspect-square overflow-hidden rounded-sm transition-all duration-300",
                        currentImageIndex === index 
                          ? "ring-2 ring-[#00BFA6] ring-offset-4" 
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <img
                        src={image.url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
              {/* Title & Price */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="type-display-3 text-[#0A0A0A] mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="type-display-2 font-black text-[#00BFA6]">
                    CHF {selectedVariant?.price || product.price}
                  </span>
                  <span className="type-body text-[#6B7280]">
                    inkl. MwSt.
                  </span>
                </div>
              </motion.div>

              {/* Color Selection */}
              {product.availableColors && product.availableColors.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12"
                >
                  <h3 className="type-label text-[#0A0A0A] mb-6">Farbe auswählen</h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {product.availableColors.map((color: string) => {
                      const displayName = color.replace("100 Stk. ", "");
                      const isSelected = selectedColor === color;
                      
                      return (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "relative p-4 rounded-sm border-2 transition-all duration-300",
                            isSelected 
                              ? "border-[#00BFA6] bg-[#00BFA6]/5" 
                              : "border-[#E5E7EB] hover:border-[#0A0A0A]/20"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-full border border-[#0A0A0A]/20"
                              style={{ backgroundColor: colorMapping[color] || '#6B7280' }}
                            />
                            <span className={cn(
                              "type-body-sm",
                              isSelected ? "text-[#0A0A0A] font-medium" : "text-[#6B7280]"
                            )}>
                              {displayName}
                            </span>
                          </div>
                          
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <Check className="w-4 h-4 text-[#00BFA6]" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12"
              >
                <h3 className="type-label text-[#0A0A0A] mb-6">Menge</h3>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border-2 border-[#E5E7EB] hover:border-[#0A0A0A] transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="type-h3 text-[#0A0A0A] w-16 text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full border-2 border-[#E5E7EB] hover:border-[#0A0A0A] transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Add to Cart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#0A0A0A] hover:bg-[#00BFA6] text-white py-6 rounded-full type-label tracking-widest transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                >
                  In den Warenkorb
                </Button>
                
                <p className="type-caption text-center text-[#6B7280]">
                  Kostenloser Versand ab CHF 50
                </p>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16 space-y-8"
              >
                <div className="border-t border-[#E5E7EB] pt-8">
                  <h3 className="type-label text-[#0A0A0A] mb-4">Details</h3>
                  <ul className="space-y-3 type-body text-[#6B7280]">
                    <li>• 100 Stück pro Packung</li>
                    <li>• 21cm Länge - perfekt für alle Gläser</li>
                    <li>• BPA-frei und lebensmittelecht</li>
                    <li>• Swiss Quality Standards</li>
                  </ul>
                </div>

                <div className="border-t border-[#E5E7EB] pt-8">
                  <h3 className="type-label text-[#0A0A0A] mb-4">Philosophie</h3>
                  <p className="type-body text-[#6B7280]">
                    Keine Kompromisse. Keine Entschuldigungen. 
                    Nur die Strohhalme, die du verdienst.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}