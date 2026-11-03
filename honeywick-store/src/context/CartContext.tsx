import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ColorOption, FragranceMode } from '../types';
import { calculateVariantPrice } from '../data/catalogue';

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    pack: 'Single' | 'Set of 2',
    fragranceMode: FragranceMode,
    fragranceName: string | undefined,
    color: ColorOption,
    quantity?: number
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'honeywick_cart_v1';
const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 60;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (
    product: Product,
    pack: 'Single' | 'Set of 2',
    fragranceMode: FragranceMode,
    fragranceName: string | undefined,
    color: ColorOption,
    quantity = 1
  ) => {
    const unitPrice = calculateVariantPrice(product, pack, fragranceMode);
    const uniqueId = `${product.id}-${pack}-${fragranceMode}-${fragranceName || 'none'}-${color.id}`;

    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          productName: product.name,
          slug: product.slug,
          image: product.images[0],
          pack,
          fragranceMode,
          fragranceName,
          color,
          unitPrice,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GLOW10') {
      setAppliedPromo('GLOW10 (10% Off)');
      setDiscountPercent(0.10);
      return { success: true, message: 'Yay! 10% discount applied.' };
    } else if (cleanCode === 'HONEYWICK') {
      setAppliedPromo('HONEYWICK (15% Welcome Gift)');
      setDiscountPercent(0.15);
      return { success: true, message: 'Special 15% discount applied!' };
    } else if (cleanCode === 'COZY') {
      setAppliedPromo('COZY (Free Shipping)');
      setDiscountPercent(0.05);
      return { success: true, message: 'Cozy discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try GLOW10 or HONEYWICK' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const discount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discount + shipping);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        discount,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
