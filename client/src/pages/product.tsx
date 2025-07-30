import { useState } from "react";
import { useParams } from "wouter";
import { Minus, Plus, ShoppingCart, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";

export default function Product() {
  const params = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data - in real app this would come from Shopify
  const product = {
    id: "CS-100",
    name: "CleanSip Strohhalme 100er Pack",
    price: 14.90,
    weight: "120g",
    description: "Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck. Unsere hochwertigen Plastikstrohhalme bieten die bewährte Qualität, die du kennst und schätzt.",
    imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    features: [
      "100% Kunststoff-Qualität – kein Aufweichen",
      "BPA-frei und lebensmittelecht",
      "Hygienisch einzeln verpackt",
      "Perfekt für Getränke aller Art",
      "Robust und zuverlässig"
    ]
  };

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
      description: `${quantity} Pack(s) ${product.name} wurden hinzugefügt.`,
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="p-0 text-brand-primary hover:text-brand-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <span className="mr-1">✓</span>
                  Auf Lager
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-brand-secondary mb-2">{product.name}</h1>
                <p className="text-gray-600">SKU: {product.id} | Gewicht: {product.weight}</p>
              </div>

              <div className="text-4xl font-bold text-brand-primary">CHF {product.price.toFixed(2)}</div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-brand-secondary">Produktmerkmale:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Anzahl Packungen (max. 10)
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
