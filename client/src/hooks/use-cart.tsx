import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Cart item type based on Shopify data structure
export interface CartItem {
    id: string;
    variantId: string; // Shopify variant ID (gid://shopify/ProductVariant/...)
    title: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
    sku?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    cartItemCount: number;
    cartTotal: number;
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cleansip-cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cleansip-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
        const quantity = newItem.quantity || 1;

        // Check if item with same variant already exists
        const existingItemIndex = cartItems.findIndex(item => item.variantId === newItem.variantId);

        if (existingItemIndex > -1) {
            // Update quantity of existing item
            setCartItems(items =>
                items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );

            toast({
                title: "✅ Menge erhöht",
                description: `${newItem.title} (${newItem.color}) wurde aktualisiert.`,
            });
        } else {
            // Add new item
            const cartItem: CartItem = {
                ...newItem,
                id: `${newItem.variantId}-${Date.now()}`,
                quantity,
            };

            setCartItems(items => [...items, cartItem]);

            toast({
                title: "✅ Zum Warenkorb hinzugefügt!",
                description: `${newItem.title} (${newItem.color}) wurde erfolgreich hinzugefügt.`,
            });
        }

        // Open cart sheet for immediate feedback
        setIsOpen(true);
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(items => items.filter(item => item.id !== itemId));
        toast({
            title: "Produkt entfernt",
            description: "Das Produkt wurde aus dem Warenkorb entfernt.",
        });
    };

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(items =>
            items.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast({
            title: "Warenkorb geleert",
            description: "Alle Produkte wurden entfernt.",
        });
    };

    const value: CartContextType = {
        cartItems,
        cartItemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
