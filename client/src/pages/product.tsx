import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { ShoppingCart, ArrowLeft, Package, Palette, Ruler, Recycle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link, useLocation } from "wouter";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { FadeInSection } from "@/components/page-transition";
import { cn } from "@/lib/utils";

export default function Product() {
  const params = useParams();
  const [location] = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [imageTransition, setImageTransition] = useState(false);

  // Determine product handle from URL
  const productHandle = params?.handle || (location === '/category/strohhalme' ? 'plastik-strohhalm' : null);

  // Fetch real Shopify product data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/shopify/products', productHandle],
    queryFn: () => productHandle ? getProductByHandle(productHandle) : getProducts(1).then(products => products[0]),
    enabled: !!productHandle || location === '/category/strohhalme',
  });

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

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Bitte wählen Sie eine Variante",
        description: "Wählen Sie eine Farbe aus, bevor Sie das Produkt hinzufügen.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Erfolgreich hinzugefügt",
      description: `${quantity}x ${product.title} (${selectedColor}) wurde hinzugefügt.`,
    });
  };

  const currentPrice = selectedVariant?.price || product?.price || 0;

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

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Produkt wird geladen...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produkt nicht gefunden</h1>
            <p className="text-gray-600 mb-4">Das angeforderte Produkt konnte nicht geladen werden.</p>
            <Link to="/">
              <Button>Zurück zur Startseite</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <TooltipProvider>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-primary/5 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumb */}
          <FadeInSection>
            <div className="mb-8">
              <Link to="/">
                <Button variant="ghost" className="p-0 text-brand-primary hover:text-brand-primary/80">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück
                </Button>
              </Link>
            </div>
          </FadeInSection>

          {/* Main Product Layout - Inspired by Apple */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Product Images */}
            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                
                {/* Main Product Image Card - Square like Apple */}
                <Card className="overflow-hidden border-2 border-brand-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 aspect-square relative bg-white">
                    {/* TODO: Replace with your authentic product photo */}
                    {/* Upload your high-quality square product photo here */}
                    <img 
                      src={currentImage || (product.images?.[0]?.url)}
                      alt={`${product.title} - ${selectedColor || 'CleanSip Premium Strohhalme'}`}
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
                    {/* TODO: Add your lifestyle/usage photo here as small overlay */}
                    <div className="absolute bottom-4 left-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                      <img 
                        src={product.images?.[1]?.url || currentImage}
                        alt="Lifestyle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail Gallery - Like Apple */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.slice(0, 4).map((image: any, index: number) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImage(image.url)}
                        className={cn(
                          "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg",
                          currentImage === image.url 
                            ? 'border-brand-primary shadow-brand-primary/25' 
                            : 'border-gray-200 hover:border-brand-primary/50'
                        )}
                      >
                        {/* TODO: Replace with your authentic product thumbnails */}
                        <img 
                          src={image.url}
                          alt={image.altText}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeInSection>

            {/* Right Column - Product Details */}
            <FadeInSection delay={0.4}>
              <div className="space-y-8 lg:pl-8">
                
                {/* Product Title - Very Large and Bold like Apple */}
                <div>
                  <h1 className="text-4xl lg:text-6xl font-black text-brand-secondary leading-tight mb-4">
                    {product.title}
                  </h1>
                  {product.subtitle && (
                    <p className="text-xl text-gray-600 font-medium">{product.subtitle}</p>
                  )}
                </div>

                {/* Color Variant Selection with Color Circles */}
                {product.availableColors && product.availableColors.length > 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Farbe</h3>
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

                {/* Extremely Large Price - Like Apple */}
                <div className="py-4">
                  <div className="text-5xl lg:text-7xl font-black text-brand-primary mb-2">
                    CHF {currentPrice.toFixed(2)}
                  </div>
                  {product.pricePerUnit && (
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

                {/* Rebellion Score Badge */}
                {product.rebelliousScore && (
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
        </div>

        {/* Sticky CTA Button - Mobile & Desktop */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              
              {/* Price Info on Mobile */}
              <div className="lg:hidden">
                <div className="text-2xl font-bold text-brand-primary">
                  CHF {currentPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedColor && `${selectedColor} • `}Sofort lieferbar
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 lg:w-full"
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                Jetzt zurückholen
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </TooltipProvider>
  );
}