// components/product-box/ProductBox.tsx
import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box  } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../models/product'; // Adjust the import path based on your project structure
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type ProductBoxProps = {
  fullWidthMode?: boolean;
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductBox: React.FC<ProductBoxProps> = ({ fullWidthMode = false, product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <Card sx={{ maxWidth: fullWidthMode ? '100%' : 345, margin: '16px' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <IconButton onClick={handleAddToCart} color="primary">
          <AddShoppingCartIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProductBox;
