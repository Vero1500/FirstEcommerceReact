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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const cartService = new CartService();

const CartPage = () => {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [dataSource, setDataSource] = useState<CartItem[]>([]);

  useEffect(() => {
    const subscription = cartService.cart$.subscribe((_cart) => {
      setCart(_cart);
      setDataSource(_cart.items);
    });

    // Load initial cart items
    cartService.getCartItems();
    return () => subscription.unsubscribe();
  }, []);

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
    <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
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
    </Card>
  );
};

export default CartPage;
