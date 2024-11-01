// pages/_app.tsx
import '../app/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'

import Home from '../app/components/home';
// import { CartProvider } from '../app/context/CartContext';



// Main application component
export default function MyApp({ Component, pageProps }: AppProps) {
  // Initialize cart state with an empty cart
  
  // This mimics Angular's ngOnInit, subscribing to cartService updates
  useEffect(() => {
  }, []);

  return (
    <>
      {/* Render the routed page component */}
      <Home {...pageProps} />
    </>
  );
}
