import { useState, useEffect } from "react";
import { ShoppingCart, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { FadeInSection } from "./page-transition";
import { cn } from "@/lib/utils";
import productImagePath from "@assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg";

export default function FeaturedProductSimple() {
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedColor, setSelectedColor] = useState("");
    const { toast } = useToast();
    const { addToCart } = useCart();

    // Fetch real Shopify products
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['/api/shopify/products'],
        queryFn: () => getProducts(1),
    });

    const product = products[0];

    // Initialize selected color and variant when product loads
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

    const currentPrice = selectedVariant?.price || product?.price || 0;

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            toast({
                title: "Bitte wähle eine Variante",
                description: "Wähle zuerst eine Farbe aus.",
                variant: "destructive",
            });
            return;
        }

        try {
            await addToCart({
                variantId: selectedVariant.id,
                title: product.title,
                image: selectedVariant.image?.url || product.images?.[0]?.url || productImagePath,
                color: selectedColor,
                price: currentPrice,
                quantity: 1,
            });

            toast({
                title: "🎉 In den Warenkorb gelegt!",
                description: `${product.title} - ${selectedColor}`,
            });
        } catch (error) {
            toast({
                title: "Fehler beim Hinzufügen",
                description: "Versuche es nochmal oder kontaktiere uns.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return (
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !product) {
        return (
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500">Produkt konnte nicht geladen werden.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <FadeInSection>
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-brand-primary text-white px-6 py-2">
                            Featured Product
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-secondary mb-6">
                            Unser <span className="text-brand-primary">Bestseller</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Der Strohhalm, der hält was er verspricht. Bewährt, zuverlässig, schweizerisch.
                        </p>
                    </div>
                </FadeInSection>

                {/* Product Card */}
                <FadeInSection delay={0.2}>
                    <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl border-0">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                                {/* Product Image */}
                                <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 p-8 lg:p-12 flex items-center justify-center">
                                    <img
                                        src={selectedVariant?.image?.url || product.images?.[0]?.url || productImagePath}
                                        alt={product.title}
                                        className="w-full max-w-sm h-auto object-contain filter drop-shadow-2xl"
                                    />

                                    {/* Quality Badge */}
                                    <div className="absolute top-6 left-6 bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Swiss Quality
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">

                                    {/* Product Title & Rating */}
                                    <div className="mb-6">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-brand-secondary mb-4">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="text-brand-secondary font-semibold">4.8 (1,247 Bewertungen)</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-8">
                                        <div className="text-4xl font-bold text-brand-primary mb-2">
                                            CHF {(currentPrice / 100).toFixed(2)}
                                        </div>
                                        <p className="text-gray-600">
                                            Inkl. MwSt. • Kostenloser Versand ab CHF 30
                                        </p>
                                    </div>

                                    {/* Color Selection */}
                                    {product.availableColors && product.availableColors.length > 1 && (
                                        <div className="mb-8">
                                            <h4 className="font-semibold text-brand-secondary mb-4">Farbe wählen:</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {product.availableColors.map((color: string) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={cn(
                                                            "px-6 py-3 rounded-full font-medium transition-all duration-200",
                                                            selectedColor === color
                                                                ? "bg-brand-primary text-white shadow-lg scale-105"
                                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        )}
                                                    >
                                                        {color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Features */}
                                    <div className="mb-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <Shield className="w-6 h-6 text-brand-primary" />
                                                <div>
                                                    <div className="font-semibold text-sm">Langlebig</div>
                                                    <div className="text-xs text-gray-600">Bis zum letzten Tropfen</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <Zap className="w-6 h-6 text-brand-primary" />
                                                <div>
                                                    <div className="font-semibold text-sm">Sofort einsatzbereit</div>
                                                    <div className="text-xs text-gray-600">Kein Aufweichen</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <Star className="w-6 h-6 text-brand-primary" />
                                                <div>
                                                    <div className="font-semibold text-sm">Bewährt</div>
                                                    <div className="text-xs text-gray-600">Seit Jahren etabliert</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <Button
                                        onClick={handleAddToCart}
                                        size="lg"
                                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    >
                                        <ShoppingCart className="w-6 h-6 mr-3" />
                                        In den Warenkorb - CHF {(currentPrice / 100).toFixed(2)}
                                    </Button>

                                    {/* Trust Signals */}
                                    <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
                                        <span>✓ Schneller Versand</span>
                                        <span>✓ 30 Tage Rückgabe</span>
                                        <span>✓ Swiss Quality</span>
                                    </div>

                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </FadeInSection>

            </div>
        </section>
    );
}
