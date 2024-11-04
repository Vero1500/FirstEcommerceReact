// pages/home.tsx
import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, Container } from '@mui/material';
import ProductsHeader from './ProductsHeader';
import Filters from './Filters';
import ProductBox from './ProductBox';
import { CartService } from '../services/cartService';
import StoreService from '../services/storeService';
import { Product } from '../models/product';
import Header from '../components/Header';

import { Cart } from '../models/cart';

// import { useCart } from '../context/CartContext';

// Equivalent of the ROWS_HEIGHT mapping
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
const cartService = new CartService();

const Home = () => {
  // React state hooks for the component state
  const [cols, setCols] = useState<number>(3);
  const [rowHeight, setRowHeight] = useState<number>(ROWS_HEIGHT[3]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [sort, setSort] = useState<string>('desc');
  const [count, setCount] = useState<string>('12');
  const [cart, setCart] = useState<Cart>({ items: [] });

  // Fetch products on initial render and when relevant state changes
  useEffect(() => {
    getProducts();
    cartService.getCartItems(); 
    
    // Subscribe to cart updates from cartService
    const subscription = cartService.cart$.subscribe((_cart) => {
      console.log("Updated cart:", _cart);  // Check if cart updates
      setCart(_cart);
    });

    // Cleanup subscription when component unmounts
    return () => subscription.unsubscribe();
    
    // Fetch cart items (similarly to ngOnInit)
  }, [count, sort, category, cart]); // Re-fetch products whenever these dependencies change

  // Function to get products using StoreService
  const getProducts = () => {
    StoreService.getAllProducts(count, sort, category).then((_products) => {
      setProducts(_products);
    });
  };

  // Handlers for column changes, adding to cart, etc.
  const onColumnsCountChange = (colsNum: number) => {
    setCols(colsNum);
    setRowHeight(ROWS_HEIGHT[colsNum]);
  };

  const onShowCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const onAddToCart = (product: Product) => {
    console.log('Adding product to cart:', product); // Verify product details
    cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  };

  const onItemsCountChange = (newCount: number) => {
    setCount(newCount.toString());
  };

  const onSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <Container maxWidth="xl" className="min-h-full border-x">
      <Box sx={{ display: 'flex' }}>
       
        {/* Drawer for Filters */}
        <Drawer
          variant="permanent"
          open
          sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}
        >
          <Box p={3}>
            <Filters onShowCategory={onShowCategory} />
          </Box>
        </Drawer>
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Pass cart as props to Header */}
          <Header cart={cart} />
          <ProductsHeader
            onColumnsUpdated={onColumnsCountChange}
            onSortUpdated={onSortChange}
            onItemsUpdated={onItemsCountChange}
          />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {products?.map((product) => (
              <ProductBox
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
