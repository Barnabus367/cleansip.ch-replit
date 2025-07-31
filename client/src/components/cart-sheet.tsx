import { ShoppingCart, Trash2, Plus, Minus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CartSheetProps {
    trigger?: React.ReactNode;
}

export default function CartSheet({ trigger }: CartSheetProps) {
    const {
        cartItems,
        cartItemCount,
        cartTotal,
        updateQuantity: updateCartQuantity,
        removeFromCart,
        isOpen,
        setIsOpen
    } = useCart();

    const { toast } = useToast();

    const freeShippingThreshold = 50;
    const missingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

    const handleCheckout = () => {
        // Direct Shopify Cart Integration
        const shopifyDomain = "jufprz-44.myshopify.com";

        // Build cart URL with variants - Clean Shopify variant IDs
        const cartItemsString = cartItems.map(item => {
            // Extract numeric ID from Shopify GID format
            const numericId = item.variantId.split('/').pop() || item.variantId;
            return `${numericId}:${item.quantity}`;
        }).join(',');

        const cartUrl = `https://${shopifyDomain}/cart/${cartItemsString}`;

        window.open(cartUrl, '_blank');

        toast({
            title: "🚀 Weiterleitung zu Shopify...",
            description: "Du wirst zum sicheren Checkout weitergeleitet.",
        });
    };

    const EmptyCartMessage = () => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Dein Korb ist leer 😔</h3>
            <p className="text-gray-600 mb-6 max-w-sm">
                Zeit, das zu ändern und der Papier-Tyrannei zu entkommen!
            </p>
            <Button onClick={() => setIsOpen(false)} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                Zur Strohhalm-Revolution
            </Button>
        </div>
    );

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="sm" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartItemCount > 0 && (
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brand-primary text-black text-xs">
                                {cartItemCount}
                            </Badge>
                        )}
                    </Button>
                )}
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Warenkorb ({cartItems.length})
                    </SheetTitle>
                    <SheetDescription>
                        Deine rebellischen Auswahl für echte Strohhalme
                    </SheetDescription>
                </SheetHeader>

                {cartItems.length === 0 ? (
                    <EmptyCartMessage />
                ) : (
                    <div className="mt-8 space-y-6">

                        {/* Free Shipping Progress */}
                        {missingForFreeShipping > 0 && (
                            <Alert className="border-brand-primary/20 bg-brand-primary/5">
                                <AlertDescription className="text-sm">
                                    Nur noch <strong>CHF {missingForFreeShipping.toFixed(2)}</strong> bis zum Gratisversand!
                                    Gönn dir Stabilität ohne Versandkosten.
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-md bg-gray-100"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.color}</p>
                                        <p className="text-lg font-bold text-brand-primary">CHF {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>

                                        <span className="w-8 text-center font-semibold">{item.quantity}</span>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="border-t pt-6 space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Gesamt:</span>
                                <span className="text-brand-primary">CHF {cartTotal.toFixed(2)}</span>
                            </div>

                            {missingForFreeShipping === 0 && (
                                <div className="flex items-center gap-2 text-green-600 text-sm">
                                    <span>✓</span> Gratisversand inklusive!
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3 text-lg"
                                size="lg"
                            >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Sicher bestellen bei Shopify
                            </Button>

                            <p className="text-xs text-gray-500 text-center">
                                Du wirst zu unserem sicheren Shopify-Checkout weitergeleitet
                            </p>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
