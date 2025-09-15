"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "@/app/actions/cart";

interface CartContextType {
  cartItemCount: number;
  setCartItemCount: (count: number) => void;
  refreshCartCount: () => Promise<void>;

  shippingTotal: number;
  setShippingTotal: (total: number) => void;
  refreshShippingTotal: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);

  const refreshCartCount = async () => {
    try {
      const cart = await getCart();
      const count = cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) ?? 0;
      setCartItemCount(count);
    } catch {
      setCartItemCount(0);
    }
  };

  const refreshShippingTotal = async () => {
    try {
      const cart = await getCart();
      const total = cart?.shippingTotal;
      setShippingTotal(total || 0);
    } catch {
      setShippingTotal(0);
    }
  };

  useEffect(() => {
    refreshCartCount();
    refreshShippingTotal();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount, refreshCartCount, shippingTotal, setShippingTotal, refreshShippingTotal }}>
      {children}
    </CartContext.Provider>
  );
}
