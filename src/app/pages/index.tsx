// pages/home.tsx
import React, { useEffect, useState } from 'react';
import ProductsHeader from '../components/ProductsHeader';
import Filters from '../components/Filters';
import ProductBox from '../components/ProductBox';
import { CartService } from '../services/cartService';
import StoreService from '../services/storeService';
import { Product } from '../models/product';

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

  // Fetch products on initial render and when relevant state changes
  useEffect(() => {
    getProducts();
    cartService.getCartItems(); // Fetch cart items (similarly to ngOnInit)
  }, [count, sort, category]); // Re-fetch products whenever these dependencies change

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
    <div>
      <ProductsHeader
        onColumnsCountChange={onColumnsCountChange}
        onSortChange={onSortChange}
        onItemsCountChange={onItemsCountChange}
      />
      <Filters onShowCategory={onShowCategory} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {products?.map((product) => (
          <ProductBox
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
