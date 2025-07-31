import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Palette, Package, Star, Shield, Zap, Heart, Ruler, Recycle, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import { FadeInSection, ScaleOnHover } from "./page-transition";
import { cn } from "@/lib/utils";
import productImagePath from "@assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg";

interface ThumbnailItem {
  id: string;
  url: string;
  alt: string;
  type: 'variant' | 'product';
  color: string | null;
  variant: any;
}

export default function FeaturedProduct() {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [imageTransition, setImageTransition] = useState(false);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { spawnParticle } = useSubtleParticles();

  // Fetch real Shopify products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/shopify/products'],
    queryFn: () => getProducts(1), // Get just the first product
  });

  // Use the first product (our single product focus)
  const product = products[0];

  // Initialize selected color and variant when product loads
  useEffect(() => {
    if (product && product.availableColors?.length > 0) {
      const defaultColor = product.defaultColor || product.availableColors[0];
      setSelectedColor(defaultColor);
      
      // Find first variant for the default color
      const colorVariants = product.colorVariants[defaultColor];
      if (colorVariants?.length > 0) {
        setSelectedVariant(colorVariants[0]);
      }
      
      // Set current image from product images
      if (product.images?.length > 0) {
        setCurrentImage(product.images[0].url);
      }
    }
  }, [product]);

  // Update image and variant when color changes with smooth transition
  useEffect(() => {
    if (product && selectedColor && product.colorVariants[selectedColor]) {
      const colorVariants = product.colorVariants[selectedColor];
      const variant = colorVariants[0];
      setSelectedVariant(variant);
      
      // Find the corresponding thumbnail index
      const thumbnails = getThumbnailGallery();
      const thumbnailIndex = thumbnails.findIndex(t => t.color === selectedColor);
      if (thumbnailIndex !== -1) {
        setCurrentThumbnailIndex(thumbnailIndex);
      }
      
      // Smooth image transition
      setImageTransition(true);
      setTimeout(() => {
        if (variant?.image?.url) {
          setCurrentImage(variant.image.url);
        } else if (product.images?.length > 0) {
          setCurrentImage(product.images[0].url);
        }
        setImageTransition(false);
      }, 150);
    }
  }, [selectedColor, product]);

  const currentPrice = selectedVariant?.price || product?.price || 0;

  // Create thumbnail gallery data from variants and product images
  const getThumbnailGallery = (): ThumbnailItem[] => {
    if (!product) return [];
    
    const thumbnails: ThumbnailItem[] = [];
    
    // Add variant images first (each color variant)
    if (product.availableColors && product.colorVariants) {
      product.availableColors.forEach((color: string) => {
        const colorVariants = product.colorVariants[color];
        if (colorVariants && colorVariants.length > 0) {
          const variant = colorVariants[0];
          if (variant.image?.url) {
            thumbnails.push({
              id: `variant-${color}`,
              url: variant.image.url,
              alt: `${product.title} - ${color}`,
              type: 'variant',
              color: color,
              variant: variant
            });
          }
        }
      });
    }
    
    // Add additional product images
    if (product.images) {
      product.images.forEach((image: any, index: number) => {
        // Skip if this image is already included as a variant image
        const isVariantImage = thumbnails.some(thumb => thumb.url === image.url);
        if (!isVariantImage) {
          thumbnails.push({
            id: `product-${image.id}`,
            url: image.url,
            alt: image.altText || `${product.title} - Bild ${index + 1}`,
            type: 'product',
            color: null,
            variant: null
          });
        }
      });
    }
    
    return thumbnails;
  };

  const thumbnailGallery = getThumbnailGallery();

  // Scroll thumbnail gallery
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbnailScrollRef.current) return;
    
    const container = thumbnailScrollRef.current;
    const scrollAmount = 200; // Adjust based on thumbnail width
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (thumbnail: ThumbnailItem, index: number) => {
    setCurrentThumbnailIndex(index);
    
    // Smooth image transition
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImage(thumbnail.url);
      
      // If it's a variant thumbnail, also update the selected color
      if (thumbnail.type === 'variant' && thumbnail.color) {
        setSelectedColor(thumbnail.color);
        setSelectedVariant(thumbnail.variant);
      }
      
      setImageTransition(false);
    }, 150);
  };

  // Key product facts for icon row
  const keyFacts = [
    { icon: Package, label: "100 Stück", tooltip: "Komplette Packung für alle Events" },
    { icon: Ruler, label: "21cm", tooltip: "Perfekte Länge für alle Gläser" },
    { icon: Recycle, label: "BPA-frei", tooltip: "Lebensmittelecht und sicher" },
    { icon: Palette, label: `${product?.availableColors?.length || 0} Farben`, tooltip: "Verschiedene Farben verfügbar" }
  ];

  // Color mapping for visual color indicators
  const colorMapping: { [key: string]: string } = {
    'Black': '#000000',
    'Schwarz': '#000000',
    'White': '#FFFFFF',
    'Weiß': '#FFFFFF',
    'Red': '#DC2626',
    'Rot': '#DC2626',
    'Blue': '#2563EB',
    'Blau': '#2563EB',
    'Green': '#16A34A',
    'Grün': '#16A34A',
    'Yellow': '#EAB308',
    'Gelb': '#EAB308',
    'Pink': '#EC4899',
    'Rosa': '#EC4899'
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    // Spawn success particles at button location
    const rect = event.currentTarget.getBoundingClientRect();
    spawnParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, 'success');
    
    const colorText = selectedColor ? ` in ${selectedColor}` : '';
    toast({
      title: "🔥 In den Warenkorb gepackt!",
      description: `${product?.title || 'CleanSip Strohhalme'}${colorText} - Die Rebellion beginnt!`,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              Shopify-Daten können nicht geladen werden. Bitte überprüfen Sie die Konfiguration.
              <br />Fehler: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // No product fallback
  if (!product) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600">Noch keine Produkte verfügbar</h2>
            <p className="text-gray-500 mt-2">Bitte konfigurieren Sie Ihre Shopify-Produkte.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <TooltipProvider>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-brand-primary text-black px-6 py-3 text-sm font-bold">
                Das Original
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold text-brand-secondary mb-6 leading-tight">
                {product?.title || 'CleanSip Strohhalme'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Der einzige Strohhalm, der nicht aufgibt, bevor du fertig bist.
                <strong className="text-brand-secondary"> Garantiert zuverlässig, garantiert stabil.</strong>
              </p>
            </div>
          </FadeInSection>

          {/* Main Product Layout - Apple Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Product Images */}
            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                
                {/* Main Product Image Card - Square like Apple */}
                <Card className="overflow-hidden border-2 border-brand-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 aspect-square relative bg-white">
                    {/* TODO: Replace with your authentic product photo */}
                    <img 
                      src={currentImage || (product?.images?.[0]?.url) || productImagePath}
                      alt={`${product?.title || 'CleanSip Premium Strohhalme'} - ${selectedColor || ''}`}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-300",
                        imageTransition ? "opacity-50 scale-105" : "opacity-100 scale-100"
                      )}
                    />
                    
                    {/* Color indicator overlay */}
                    {selectedColor && (
                      <div className="absolute top-4 right-4 bg-brand-primary text-black px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        {selectedColor}
                      </div>
                    )}

                    {/* Lifestyle photo mini-overlay */}
                    {product?.images && product.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                        <img 
                          src={product.images[1]?.url || currentImage}
                          alt="Lifestyle"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Enhanced Thumbnail Gallery - Horizontally Scrollable */}
                {thumbnailGallery.length > 1 && (
                  <div className="relative">
                    {/* Navigation Arrows */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md backdrop-blur-sm w-8 h-8"
                      onClick={() => scrollThumbnails('left')}
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md backdrop-blur-sm w-8 h-8"
                      onClick={() => scrollThumbnails('right')}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </Button>

                    {/* Scrollable Thumbnail Container */}
                    <div 
                      ref={thumbnailScrollRef}
                      className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-8 scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {thumbnailGallery.map((thumbnail, index) => (
                        <button
                          key={thumbnail.id}
                          onClick={() => handleThumbnailClick(thumbnail, index)}
                          className={cn(
                            "flex-shrink-0 aspect-square w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg relative group",
                            currentImage === thumbnail.url || currentThumbnailIndex === index
                              ? 'border-brand-primary shadow-brand-primary/30 shadow-lg' 
                              : 'border-gray-200 hover:border-brand-primary/50'
                          )}
                        >
                          {/* TODO: Replace with your authentic variant/product thumbnails */}
                          <img 
                            src={thumbnail.url}
                            alt={thumbnail.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          
                          {/* Color indicator for variant thumbnails */}
                          {thumbnail.type === 'variant' && thumbnail.color && (
                            <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-sm"
                                 style={{ backgroundColor: colorMapping[thumbnail.color] || '#6B7280' }}
                            />
                          )}
                          
                          {/* Selection indicator */}
                          {(currentImage === thumbnail.url || currentThumbnailIndex === index) && (
                            <div className="absolute inset-0 bg-brand-primary/10 flex items-center justify-center">
                              <div className="w-2 h-2 bg-brand-primary rounded-full shadow-lg"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator dots */}
                    {thumbnailGallery.length > 4 && (
                      <div className="flex justify-center mt-3 gap-1">
                        {Array.from({ length: Math.ceil(thumbnailGallery.length / 4) }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-colors",
                              Math.floor(currentThumbnailIndex / 4) === i 
                                ? 'bg-brand-primary' 
                                : 'bg-gray-300'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeInSection>

            {/* Right Column - Product Details */}
            <FadeInSection delay={0.4}>
              <div className="space-y-8 lg:pl-8">
                
                {/* Product Title - Large and Bold like Apple */}
                <div>
                  <h3 className="text-3xl lg:text-5xl font-black text-brand-secondary leading-tight mb-4">
                    {product?.title || 'CleanSip Strohhalme'}
                  </h3>
                  {product?.subtitle && (
                    <p className="text-xl text-gray-600 font-medium">{product.subtitle}</p>
                  )}
                </div>

                {/* Color Variant Selection with Color Circles */}
                {product?.availableColors && product.availableColors.length > 1 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Farbe</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.availableColors.map((color: string) => (
                        <Tooltip key={color}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setSelectedColor(color)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-full border-2 transition-all duration-200 hover:scale-105",
                                selectedColor === color
                                  ? 'border-brand-primary bg-brand-primary text-black shadow-lg'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-brand-primary/50'
                              )}
                            >
                              {/* Color circle indicator */}
                              <div 
                                className="w-5 h-5 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: colorMapping[color] || '#6B7280' }}
                              />
                              <span className="font-medium">{color}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Auswählen: {color}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                )}

                {/* Large Price - Like Apple */}
                <div className="py-4">
                  <div className="text-4xl lg:text-6xl font-black text-brand-primary mb-2">
                    CHF {currentPrice.toFixed(2)}
                  </div>
                  {product?.pricePerUnit && (
                    <p className="text-lg text-gray-500">
                      CHF {product.pricePerUnit} pro Stück
                    </p>
                  )}
                </div>

                {/* Key Facts Icon Row */}
                <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
                  {keyFacts.map((fact, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="text-center group cursor-help">
                          <div className="w-12 h-12 mx-auto mb-2 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                            <fact.icon className="w-6 h-6 text-brand-primary" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">{fact.label}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fact.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                {/* Product Description - Minimal */}
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p className="text-lg leading-relaxed">
                    Zuverlässige Plastikstrohhalme für alle, die keine Kompromisse eingehen. 
                    Während Papier-Alternativen versagen, bleiben CleanSip Strohhalme stabil.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="mr-3 h-6 w-6" />
                    Jetzt zurückholen
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="text-center text-sm text-gray-600">
                  <div className="flex justify-center items-center space-x-4 flex-wrap">
                    <span>✓ Kostenloser Versand</span>
                    <span>✓ 30 Tage Rückgabe</span>
                    <span>✓ Schweizer Qualität</span>
                  </div>
                </div>

                {/* Rebellion Score Badge */}
                {product?.rebelliousScore && (
                  <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                    <span className="font-semibold text-brand-secondary">
                      Rebellion Score: {product.rebelliousScore}/100
                    </span>
                  </div>
                )}
              </div>
            </FadeInSection>
          </div>

          {/* Additional Product Info */}
          {product?.description && (
            <div className="mt-16 max-w-4xl mx-auto">
              <div 
                className="prose prose-lg mx-auto text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
              />
            </div>
          )}
        </div>
      </section>
    </TooltipProvider>
  );
}