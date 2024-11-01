import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cart, CartItem } from '../models/cart';
import { CartService } from '../services/cartService';

// Initialize the CartService
const cartService = new CartService();

// Create a CartContext
const CartContext = createContext<{
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getTotal: () => number;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  // Subscribe to cart changes
  useEffect(() => {
    const subscription = cartService.cart$.subscribe((updatedCart) => {
      setCart(updatedCart);
    });
    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (item: CartItem) => cartService.addToCart(item);
  const removeFromCart = (item: CartItem) => cartService.removeFromCart(item);
  const clearCart = () => cartService.clearCart();
  const getTotal = () => cartService.getTotal();

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
