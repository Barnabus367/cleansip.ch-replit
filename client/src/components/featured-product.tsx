import { useState } from "react";
import { Minus, Plus, ShoppingCart, Palette, Package, Star, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { LiquidText, GlitchText, AnimatedWeight } from "./liquid-text";

export default function FeaturedProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { toast } = useToast();

  // Fetch real Shopify products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/shopify/products'],
    queryFn: () => getProducts(1), // Get just the first product
  });

  // Use the first product (our single product focus)
  const product = products[0];

  const incrementQuantity = () => {
    if (quantity < 10) {
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
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const colorText = selectedColor ? ` in ${selectedColor}` : '';
    toast({
      title: "🔥 In den Warenkorb gepackt!",
      description: `${quantity} Pack(s) ${product?.title || 'CleanSip Strohhalme'}${colorText} - Die Rebellion beginnt!`,
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

  const totalPrice = (product.price * quantity).toFixed(2);
  const availableColors = product.availableColors || [];
  const hasColors = availableColors.length > 0;

  // Set default color if not set
  if (hasColors && !selectedColor) {
    setSelectedColor(availableColors[0]);
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full mb-4">
            <GlitchText>Die Unbeugsamen</GlitchText>
          </div>
          <h2 className="text-4xl font-bold text-brand-secondary mb-4">
            <AnimatedWeight text={product.title} />
          </h2>
          {product.subtitle && (
            <p className="text-lg text-brand-primary font-medium mb-3">{product.subtitle}</p>
          )}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-brand-secondary">Die Wahrheit über Strohhalme:</strong><br />
            Während andere nach <LiquidText className="text-red-600 font-bold">30 Sekunden aufgeben</LiquidText>, bleiben CleanSip Strohhalme <AnimatedWeight text="standhaft" className="text-brand-primary font-bold" />.
          </p>
        </div>

        <div className="bg-brand-neutral rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
                alt={product.images?.[0]?.altText || `${product.title} - CleanSip Premium Strohhalme`}
                className="rounded-xl shadow-lg w-full h-auto"
              />
              {product.rebelliousScore && (
                <Badge className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1">
                  {product.rebelliousScore}% Rebellisch
                </Badge>
              )}
              {hasColors && (
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                  <Palette className="inline w-4 h-4 mr-1" />
                  {availableColors.length} Farben
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-brand-secondary mb-2">{product.title}</h3>
                <p className="text-lg text-brand-primary font-medium mb-3">{product.subtitle || "100 Strohhalme, die dich nie im Stich lassen"}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(500+ Bewertungen)</span>
                </div>
              </div>

              <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-4">
                <div className="text-4xl font-bold text-brand-secondary">CHF {product.price.toFixed(2)}</div>
                <div className="text-sm text-gray-600">
                  nur CHF {product.pricePerUnit || (product.price / 100).toFixed(3)} pro stabilem Trinkerlebnis
                </div>
              </div>

              {/* Color Selection */}
              {hasColors && (
                <div className="space-y-3">
                  <Label className="text-base font-medium text-brand-secondary">
                    Wähle deine rebellische Farbe:
                  </Label>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                    <div className="grid grid-cols-2 gap-3">
                      {availableColors.map((color: string) => (
                        <div key={color} className="flex items-center space-x-2">
                          <RadioGroupItem value={color} id={color} />
                          <Label 
                            htmlFor={color} 
                            className="flex-1 cursor-pointer text-sm font-medium capitalize"
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Emotional Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">100% Formstabil - vom ersten bis zum letzten Schluck</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">In 48h bei dir - aus Schweizer Lager</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                    <Package className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Premium-Qualität - BPA-frei & lebensmittelecht</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Von 500+ Schweizern geliebt</span>
                </div>
                {hasColors && (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                      <Palette className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{availableColors.length} rebellische Farben zur Auswahl</span>
                  </div>
                )}
              </div>

              {/* Quantity Selection */}
              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-base font-medium text-brand-secondary">
                  Anzahl Packungen:
                </Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
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
                    className="w-16 text-center h-10"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    = {quantity * 100} Strohhalme
                  </span>
                </div>
              </div>

              {/* Total Price & Add to Cart */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-medium text-brand-secondary">Gesamtpreis:</span>
                  <span className="text-2xl font-bold text-brand-primary">CHF {totalPrice}</span>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black font-bold py-3 text-lg pulse-rebellious"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  🔥 <AnimatedWeight text="ZUR REBELLION HINZUFÜGEN" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="text-center text-sm text-gray-600">
                <div className="flex justify-center items-center space-x-4">
                  <span>✓ Kostenloser Versand</span>
                  <span>✓ 30 Tage Rückgabe</span>
                  <span>✓ Schweizer Qualität</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Info */}
        {product.description && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div 
              className="prose prose-lg mx-auto text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
            />
          </div>
        )}
      </div>
    </section>
  );
}