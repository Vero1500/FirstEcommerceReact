// pages/_app.tsx
import '../app/styles/globals.css'
import type { AppProps } from 'next/app'
import Home from '../app/components/home';

// Main application component
export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      {/* Render the routed page component */}
      <Home {...pageProps} />
    </>
  );
}
