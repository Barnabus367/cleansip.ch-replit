import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Minus, Plus, ShoppingCart, ArrowLeft, Info, Palette, Package, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link, useLocation } from "wouter";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { FadeInSection } from "@/components/page-transition";

// Icon mapping for features
const iconMap = {
  'Shield': Shield,
  'Zap': Zap,
  'Heart': Heart,
  'Palette': Palette,
  'Package': Package
};

export default function Product() {
  const params = useParams();
  const [location] = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState("");

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

  // Update image and variant when color changes
  useEffect(() => {
    if (product && selectedColor && product.colorVariants[selectedColor]) {
      const colorVariants = product.colorVariants[selectedColor];
      const variant = colorVariants[0];
      setSelectedVariant(variant);
      
      // Use variant image if available, otherwise use product images
      if (variant?.image?.url) {
        setCurrentImage(variant.image.url);
      } else if (product.images?.length > 0) {
        setCurrentImage(product.images[0].url);
      }
    }
  }, [selectedColor, product]);

  const incrementQuantity = () => {
    const maxQuantity = selectedVariant?.quantityAvailable || 10;
    if (quantity < Math.min(maxQuantity, 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const maxQuantity = selectedVariant?.quantityAvailable || 10;
    if (value >= 1 && value <= Math.min(maxQuantity, 10)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Bitte wählen Sie eine Variante",
        description: "Wählen Sie eine Farbe aus, bevor Sie das Produkt in den Warenkorb legen.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "In den Warenkorb gelegt",
      description: `${quantity}x ${product.title} (${selectedColor}) wurden hinzugefügt.`,
    });
  };

  const currentPrice = selectedVariant?.price || product?.price || 0;
  const totalPrice = (currentPrice * quantity).toFixed(2);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Produkt wird geladen...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produkt nicht gefunden</h1>
            <p className="text-gray-600 mb-4">Das angeforderte Produkt konnte nicht geladen werden.</p>
            <Link to="/">
              <Button>Zurück zur Startseite</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <FadeInSection>
            <div className="mb-8">
              <Link to="/">
                <Button variant="ghost" className="p-0 text-brand-primary hover:text-brand-primary/80">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zur Startseite
                </Button>
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <FadeInSection delay={0.2}>
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={currentImage || (product.images?.[0]?.url)}
                    alt={`${product.title} - ${selectedColor || 'CleanSip Premium Strohhalme'}`}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <span className="mr-1">✓</span>
                    {selectedVariant?.availableForSale ? 'Auf Lager' : 'Verfügbar'}
                  </div>
                  {selectedColor && (
                    <div className="absolute top-4 left-4 bg-brand-primary text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedColor}
                    </div>
                  )}
                </div>

                {/* Additional Product Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(0, 4).map((image: any, index: number) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImage(image.url)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          currentImage === image.url ? 'border-brand-primary' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image.url}
                          alt={image.altText}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeInSection>

            {/* Product Details */}
            <FadeInSection delay={0.4}>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-brand-secondary mb-2">{product.title}</h1>
                  {product.subtitle && (
                    <p className="text-lg text-brand-primary font-medium mb-2">{product.subtitle}</p>
                  )}
                  <p className="text-gray-600">
                    Produkt-Handle: {product.handle} | 
                    {product.totalInventory && ` ${product.totalInventory} verfügbar`}
                  </p>
                </div>

                <div className="text-4xl font-bold text-brand-primary">
                  CHF {currentPrice.toFixed(2)}
                  {product.pricePerUnit && (
                    <span className="text-sm text-gray-500 font-normal ml-2">
                      (CHF {product.pricePerUnit} pro Stück)
                    </span>
                  )}
                </div>

                {/* Color Selection */}
                {product.availableColors && product.availableColors.length > 1 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Farbe auswählen
                    </Label>
                    <RadioGroup
                      value={selectedColor}
                      onValueChange={setSelectedColor}
                      className="flex flex-wrap gap-2"
                    >
                      {product.availableColors.map((color: string) => (
                        <div key={color} className="flex items-center">
                          <RadioGroupItem
                            value={color}
                            id={color}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={color}
                            className={`cursor-pointer px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                              selectedColor === color
                                ? 'border-brand-primary bg-brand-primary text-black'
                                : 'border-gray-300 hover:border-brand-primary bg-white text-gray-700'
                            }`}
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div 
                  className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-brand-secondary">CleanSip Qualitätsmerkmale:</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.features.map((feature: any, index: number) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                        return (
                          <div key={index} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {IconComponent && (
                              <IconComponent className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                            )}
                            <span className="font-medium">{feature.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Rebellion Score */}
                {product.rebelliousScore && (
                  <div className="bg-brand-primary/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-brand-secondary">Rebellion Score</span>
                      <span className="text-2xl font-bold text-brand-primary">{product.rebelliousScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-primary h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${product.rebelliousScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Anzahl (max. {Math.min(selectedVariant?.quantityAvailable || 10, 10)})
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Regulatory Info Box */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-800">
                    <strong>Regulierungs-Info:</strong> Aktuell in der Schweiz erlaubt. Keine EU-Pappe nötig.
                  </AlertDescription>
                </Alert>

                {/* Add to Cart */}
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black py-4 h-auto text-lg font-semibold shadow-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  In den Warenkorb – CHF {totalPrice}
                </Button>

                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <h3 className="font-semibold text-brand-secondary">Versandinformationen</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>A-Post Brief (bis 120g):</span>
                      <span>CHF 2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PostPac Economy (≤ 2kg):</span>
                      <span>CHF 7.00</span>
                    </div>
                    <div className="flex justify-between font-medium text-green-600">
                      <span>Gratis Versand ab:</span>
                      <span>CHF 50.00</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Lieferung in 48h aus dem Schweizer Lager
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}