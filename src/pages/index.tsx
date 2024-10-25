// pages/_app.tsx
import '../app/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import Header from '../app/components/Header';
import { CartService } from '../app/services/cartService';  // We'll implement this service similar to Angular's cartService
import { Cart } from '../app/models/cart';
import Home from '../app/components/home';

const cartService = new CartService();

// Main application component
export default function MyApp({ Component, pageProps }: AppProps) {
  // Initialize cart state with an empty cart
  const [cart, setCart] = useState<Cart>({ items: [] });

  // This mimics Angular's ngOnInit, subscribing to cartService updates
  useEffect(() => {
    // Subscribe to cart updates from cartService
    const subscription = cartService.cart$.subscribe((_cart) => {
      setCart(_cart);
    });

    // Cleanup subscription when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* Pass cart as props to Header */}
      <Header cart={cart} />
      {/* Render the routed page component */}
      <Home {...pageProps} />
    </>
  );
}