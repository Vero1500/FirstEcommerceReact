import React, { useEffect, useState } from 'react';
import { Cart, CartItem } from '../app/models/cart';
import { CartService } from '../app/services/cartService'; // Adjust based on your CartService implementation
// import { loadStripe } from '@stripe/stripe-js';
import {
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@mui/material';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Header from '../app/components/Header';

const cartService = new CartService();

const CartPage = () => {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [dataSource, setDataSource] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const subscription = cartService.cart$.subscribe((_cart) => {
      setCart(_cart);
      setDataSource(_cart.items);
    });

    setIsHydrated(true);

    // Load initial cart items
    cartService.getCartItems();
    return () => subscription.unsubscribe();
  }, []);

  if (!isHydrated) {
    // Avoids rendering client-specific content before hydration is complete
    return <div>Loading...</div>;
  }

  const getTotal = (items: CartItem[]): number => cartService.getTotal();

  const handleClearCart = () => {
    cartService.clearCart();
  };

  const handleRemoveFromCart = (item: CartItem) => {
    cartService.removeFromCart(item);
  };

  const handleAddQuantity = (item: CartItem) => {
    cartService.addToCart(item);
  };

  const handleRemoveQuantity = (item: CartItem) => {
    cartService.removeQuantity(item);
  };

  return (
    <>
      <Header cart={cart} />
      <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
        {dataSource.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSource.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img src={item.product} alt={item.name} width="50" />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleRemoveQuantity(item)}>-</Button>
                        {item.quantity}
                        <Button onClick={() => handleAddQuantity(item)}>+</Button>
                      </TableCell>
                      <TableCell>{item.price * item.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveFromCart(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <strong>Total:</strong> ${getTotal(cart.items).toFixed(2)}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty!
            </Typography>
            <Button variant='text' href="/" color="primary" size="small">
              View Cart
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default CartPage;
