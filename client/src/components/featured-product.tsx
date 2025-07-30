import { useState } from "react";
import { Minus, Plus, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function FeaturedProduct() {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const basePrice = 14.90;

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
    toast({
      title: "In den Warenkorb gelegt",
      description: `${quantity} Pack(s) CleanSip Strohhalme wurden hinzugefügt.`,
    });
  };

  const totalPrice = (basePrice * quantity).toFixed(2);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-secondary mb-4">Unser Bestseller</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.
          </p>
        </div>

        <div className="bg-brand-neutral rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="CleanSip Strohhalme 100er Pack Produktverpackung" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              
              {/* Stock status badge */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">✓</span>
                Auf Lager
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-brand-secondary mb-2">CleanSip Strohhalme 100er Pack</h3>
                <p className="text-gray-600">SKU: CS-100 | Gewicht: 120g</p>
              </div>

              <div className="text-3xl font-bold text-brand-primary">CHF {basePrice.toFixed(2)}</div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Anzahl Packungen
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
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 h-auto text-lg font-semibold shadow-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                In den Warenkorb – CHF {totalPrice}
              </Button>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
